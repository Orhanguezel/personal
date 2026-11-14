import {test,expect,afterAll} from 'bun:test';import mysql from 'mysql2/promise';
import {verify,byKind,deliverPending,closeContentPools} from '../../dist/test-app.js';
const c=await mysql.createConnection({host:'127.0.0.1',port:18346,user:'root',database:'gzl_shared_content'});afterAll(async()=>{await c.end();await closeContentPools()});
test('one failed origin remains pending and a later retry verifies both origins',async()=>{
 const id='38000000-0000-4000-8000-000000000004';const original=globalThis.fetch;let fail=true;
 globalThis.fetch=(async(input:any)=>{const url=String(input);if(fail&&url.includes('gzlteknoloji.com'))throw Error('Isolated unavailable Turkey origin');if(url.includes('/content/state/'))return Response.json({revision:1});return new Response('Isolated HTML',{headers:{'x-content-revision':'1'}})}) as any;
 const [before]:any=await c.query('SELECT id,attempts FROM content_outbox');
 try{
 const first=await verify(byKind.get('projects'),id,1,'publish');expect(first.find((x:any)=>x.site==='gwd').state).toBe('verified');expect(first.find((x:any)=>x.site==='gzl').state).toBe('pending');
 await c.query("INSERT INTO content_outbox(kind,entity_id,revision,action) VALUES ('projects',?,1,'publish') ON DUPLICATE KEY UPDATE delivered_at=NULL,attempts=0",[id]);
 await c.query('UPDATE content_outbox SET attempts=100 WHERE entity_id<>?',[id]);fail=false;await deliverPending();
 const [[done]]:any=await c.query("SELECT delivered_at FROM content_outbox WHERE entity_id=? AND revision=1 AND action='publish'",[id]);expect(done.delivered_at).not.toBe(null);
 const [receipts]:any=await c.query('SELECT state FROM content_delivery_receipts WHERE entity_id=?',[id]);expect(receipts.length).toBe(2);expect(receipts.every((x:any)=>x.state==='verified')).toBe(true);
 }finally{globalThis.fetch=original;for(const row of before)await c.query('UPDATE content_outbox SET attempts=? WHERE id=?',[row.attempts,row.id]);}
});
