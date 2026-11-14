"""Short editorial write freeze for the migration; accounts, orders and payments stay available."""
import argparse,pathlib,shutil,subprocess
p=argparse.ArgumentParser();p.add_argument('action',choices=['enable','disable']);a=p.parse_args()
config=pathlib.Path('/etc/nginx/conf.d/shared-editorial-freeze.conf');snippet=pathlib.Path('/etc/nginx/snippets/shared-editorial-freeze.conf')
files=[pathlib.Path('/etc/nginx/sites-enabled')/n for n in ['guezelwebdesign.com','panel.guezelwebdesign.com','gzlteknoloji.com-ssl.conf','gzlteknoloji.com.conf']]
marker='  include /etc/nginx/snippets/shared-editorial-freeze.conf; # shared-content-migration\n'
backup=pathlib.Path('/var/backups/guezel-content-unify-20261114/nginx');backup.mkdir(parents=True,exist_ok=True);backup.chmod(0o700)
old={f:f.read_text() for f in files};old_config=config.read_text() if config.exists() else None;old_snippet=snippet.read_text() if snippet.exists() else None
try:
 if a.action=='enable':
  config.write_text('map "$host:$request_method:$uri" $shared_editorial_write_frozen {\n default 0;\n ~^(www\\.|panel\\.)?(guezelwebdesign\\.com|gzlteknoloji\\.com):(POST|PUT|PATCH|DELETE):/api/(v1/)?(admin/(shared-content|projects|services|products|custom[_-]pages|faqs|pricing|brands|resume-entries|skill-counters|skill-logos|categories|sub[_-]categories|storage|site_settings)|integrations/gzl-crm/projects|storage)(/|$) 1;\n}\n')
  snippet.write_text('if ($shared_editorial_write_frozen) { return 503; }\n')
  for f in files:
   dest=backup/f.name
   if not dest.exists():shutil.copyfile(f,dest);dest.chmod(0o600)
   if marker not in old[f]:f.write_text(''.join(line+(marker if 'server_name ' in line else '') for line in old[f].splitlines(keepends=True)))
 else:
  for f in files:f.write_text(old[f].replace(marker,''))
  if config.exists():config.unlink()
  if snippet.exists():snippet.unlink()
 subprocess.run(['nginx','-t'],check=True,capture_output=True)
 subprocess.run(['systemctl','reload','nginx'],check=True)
except Exception:
 for f,text in old.items():f.write_text(text)
 for f,text in [(config,old_config),(snippet,old_snippet)]:
  if text is None:
   if f.exists():f.unlink()
  else:f.write_text(text)
 raise
print('Editorial write freeze '+('enabled' if a.action=='enable' else 'disabled'))
