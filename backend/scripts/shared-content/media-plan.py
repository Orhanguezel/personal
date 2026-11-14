"""Inspect public editorial uploads; --apply copies the verified union without overwriting files."""
import argparse, hashlib, json, pathlib, shutil
p=argparse.ArgumentParser();p.add_argument('--apply',action='store_true');p.add_argument('--selection');p.add_argument('--output',default='/tmp/shared-media-plan.json');args=p.parse_args()
base=pathlib.Path('/var/www/vps-guezel');target=base/'shared-editorial/uploads';files={};conflicts=[]
for site,directory in [('gwd','guezelwebdesign'),('gzl','gzlteknoloji-site')]:
 root=base/directory/'backend/uploads'
 for file in sorted(root.rglob('*')):
  if not file.is_file() or file.is_symlink():continue
  rel=str(file.relative_to(root));digest=hashlib.sha256(file.read_bytes()).hexdigest()
  row={'path':rel,'sha256':digest,'bytes':file.stat().st_size,'source':str(file),'sites':[site]}
  if rel in files:
   if files[rel]['sha256']!=digest:conflicts.append({'path':rel,'hashes':[files[rel]['sha256'],digest]})
   else:files[rel]['sites'].append(site)
  else:files[rel]=row
if args.selection:
 selected=set(json.loads(pathlib.Path(args.selection).read_text())['media']['paths']);missing=selected-set(files)
 if missing:raise SystemExit('Referenced editorial files missing: '+str(len(missing)))
 files={k:v for k,v in files.items() if k in selected}
report={'files':list(files.values()),'conflicts':conflicts,'total_bytes':sum(f['bytes'] for f in files.values())}
pathlib.Path(args.output).write_text(json.dumps(report,indent=2));pathlib.Path(args.output).chmod(0o600)
if conflicts:raise SystemExit('Unresolved media path conflicts: '+str(len(conflicts)))
if args.apply:
 for row in files.values():
  dest=target/row['path'];dest.parent.mkdir(parents=True,exist_ok=True)
  if dest.exists():
   if hashlib.sha256(dest.read_bytes()).hexdigest()!=row['sha256']:raise SystemExit('Target media hash conflict')
  else:shutil.copyfile(row['source'],dest);dest.chmod(0o644)
print(json.dumps({'files':len(files),'conflicts':len(conflicts),'bytes':report['total_bytes'],'applied':args.apply}))
