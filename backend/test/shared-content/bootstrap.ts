import mysql from 'mysql2/promise';
import {readFile} from 'node:fs/promises';
const c=await mysql.createConnection({host:'127.0.0.1',port:18346,user:'root',database:'gzl_shared_content',multipleStatements:true});
await c.query(await readFile(new URL('../../src/modules/shared-content/schema.sql',import.meta.url),'utf8'));
await c.query((await readFile(new URL('../../src/db/seed/sql/225_gzl_crm_content_imports.sql',import.meta.url),'utf8')).replace(/,\s*CONSTRAINT[\s\S]*?ON DELETE CASCADE ON UPDATE CASCADE/,''));
await c.end();
