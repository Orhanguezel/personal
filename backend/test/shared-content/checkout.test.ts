import {test,expect,afterAll} from 'bun:test';
import mysql from 'mysql2/promise';
import {resolveCheckoutProduct,ensureCheckoutReference,closeContentPools} from '../../dist/test-app.js';
const c=await mysql.createConnection({host:'127.0.0.1',port:18346,user:'root'});
afterAll(async()=>{await c.end();await closeContentPools()});
test('new shared sales use a country offer and preserve a closed historical reference',async()=>{
 const id=crypto.randomUUID();
 const [[source]]:any=await c.query('SELECT * FROM gzl_shared_public.projects WHERE is_published=1 LIMIT 1');
 const parent={...source,id,featured_image_asset_id:null};
 try{
 await c.query('INSERT INTO gzl_shared_public.projects SET ?',[parent]);
 await c.query("INSERT INTO gzl_shared_content.content_entries(kind,entity_id,revision,published_revision,state,hash) VALUES ('projects',?,1,1,'published',REPEAT('a',64))",[id]);
 await expect(ensureCheckoutReference('project',id)).rejects.toThrow('country_offer_not_available');
 const [[empty]]:any=await c.query('SELECT COUNT(*) n FROM guezelwebdesign.projects WHERE id=?',[id]);expect(Number(empty.n)).toBe(0);
 await c.query("INSERT INTO gzl_shared_content.content_offers(site_id,kind,entity_id,offer) VALUES ('gwd','projects',?,?)",[id,JSON.stringify({is_purchasable:1,price_onetime:'123.00',currency:'EUR'})]);
 await ensureCheckoutReference('project',id);await ensureCheckoutReference('project',id);
 const [anchors]:any=await c.query('SELECT * FROM guezelwebdesign.projects WHERE id=?',[id]);expect(anchors.length).toBe(1);expect(Number(anchors[0].is_published)).toBe(0);expect(Number(anchors[0].is_purchasable)).toBe(0);expect(anchors[0].price_onetime).toBe(null);
 await c.query("UPDATE gzl_shared_content.content_entries SET state='withdrawn' WHERE entity_id=?",[id]);
 await expect(ensureCheckoutReference('project',id)).rejects.toThrow('country_offer_not_available');
 }finally{for(const table of ['guezelwebdesign.projects','gzl_shared_public.projects'])await c.query('DELETE FROM '+table+' WHERE id=?',[id]);for(const table of ['content_entries','content_offers'])await c.query('DELETE FROM gzl_shared_content.'+table+' WHERE entity_id=?',[id]);}
});
test('checkout package lookup uses local site_packages and excludes editorial products',async()=>{
 const id=crypto.randomUUID();try{
 await c.query("INSERT INTO guezelwebdesign.site_packages(id,status,price_onetime,currency) VALUES (?,'active',89.50,'EUR')",[id]);
 const item=await resolveCheckoutProduct(()=>{throw Error('legacy products must not be read')},'de','de',id);expect(item.price_onetime).toBe('89.50');expect(item.currency).toBe('EUR');expect(item.status).toBe('active');
 expect(await resolveCheckoutProduct(()=>null,'de','de',crypto.randomUUID())).toBe(null);
 }finally{await c.query('DELETE FROM guezelwebdesign.site_packages WHERE id=?',[id])}
});
