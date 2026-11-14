import path from 'node:path';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const shared=path.resolve(root,'../../packages/shared-backend');
const shim=path.join(root,'src/modules/shared-content/routing.ts');
const test=process.argv.includes('--test');
const result=await Bun.build({entrypoints:[path.join(root,test?'test/shared-content/app.ts':'src/index.ts')],outdir:path.join(root,'dist'),naming:test?'test-app.js':'index.js',target:'bun',packages:'external',sourcemap:'none',plugins:[{name:'immutable-shared-backend',setup(build){
 build.onResolve({filter:/^@\//},async args=>{const suffix=args.path.slice(2);for(const p of [path.join(root,'src',suffix+'.ts'),path.join(root,'src',suffix+'.json'),path.join(root,'src',suffix,'index.ts')]){try{await fs.access(p);return {path:p,external:false}}catch{}}throw Error('Unresolved local import '+args.path)});
 build.onResolve({filter:/^@vps\/shared-backend(?:\/|$)/},args=>{let suffix=args.path.replace(/^@vps\/shared-backend\/?/,'');const possibilities=[path.join(shared,suffix+'.ts'),path.join(shared,suffix,'index.ts')];return fs.access(possibilities[0]).then(()=>({path:possibilities[0],external:false})).catch(()=>({path:possibilities[1],external:false}));});
 build.onLoad({filter:/\/packages\/shared-backend\/modules\/projects\/admin.controller.ts$/},async args=>({contents:(await fs.readFile(args.path,'utf8')).replace("if (process.env.LINKEDIN_ENABLED !== 'true' || !isPublished) return;","if (process.env.CONTENT_SHARED_ENABLED === '1' || process.env.LINKEDIN_ENABLED !== 'true' || !isPublished) return;"),loader:'ts'}));
 build.onLoad({filter:/\/packages\/shared-backend\/modules\/storage\/cloudinary.ts$/},async args=>({contents:(await fs.readFile(args.path,'utf8')).replace('localRoot: settings?.localRoot ?? null,',"localRoot: process.env.CONTENT_SHARED_ENABLED==='1'?process.env.CONTENT_MEDIA_ROOT:settings?.localRoot ?? null,"),loader:'ts'}));
 build.onLoad({filter:/\/packages\/shared-backend\/db\/client\.ts$/},()=>({contents:'export {db,getPool} from '+JSON.stringify(shim)+';',loader:'ts'}));
}}]});
if(!result.success){for(const log of result.logs)console.error(log);process.exit(1);}
const bundle=await fs.readFile(path.join(root,'dist',test?'test-app.js':'index.js'));
await fs.writeFile(path.join(root,'dist/content-build.json'),JSON.stringify({builtAt:new Date().toISOString(),sha256:createHash('sha256').update(bundle).digest('hex'),sharedBackendBundled:true},null,2));
console.log('Immutable backend bundle:',bundle.length,'bytes');

if(!test){
 const migration=await Bun.build({entrypoints:[path.join(root,'scripts/shared-content/merge.ts')],outdir:path.join(root,'dist'),naming:'shared-content-merge.js',target:'bun',packages:'external'});
 if(!migration.success){for(const log of migration.logs)console.error(log);process.exit(1);}
 await fs.copyFile(path.join(root,'src/modules/shared-content/schema.sql'),path.join(root,'dist/content-schema.sql'));
 await fs.copyFile(path.join(root,'src/db/seed/sql/225_gzl_crm_content_imports.sql'),path.join(root,'dist/crm-imports.sql'));
}
