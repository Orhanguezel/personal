import {definitions} from '../../src/modules/shared-content/definitions';
/** Publication views are derived from the single immutable published projection. */
export async function createContentViews(c:any,workspace:string,published:string,sources:any){
 const q=(s:string,t:string)=>'`'+s+'`.`'+t+'`';
 for(const d of definitions){
  await c.query('CREATE OR REPLACE SQL SECURITY DEFINER VIEW '+q(published,'live_'+d.table)+' AS SELECT p.* FROM '+q(published,d.table)+' p JOIN '+q(workspace,'content_entries')+' e ON BINARY e.entity_id=BINARY p.id AND e.kind=? WHERE e.published_revision IS NOT NULL AND e.state NOT IN (\'withdrawn\',\'deleted\') AND p.`'+d.publishedField+'`=1',[d.kind]);
 }
 for(const target of ['gwd','gzl'])for(const d of definitions.filter(d=>d.commercial?.length)){
  const [columns]:any=await c.query('SELECT COLUMN_NAME AS name FROM information_schema.columns WHERE table_schema=? AND table_name=? ORDER BY ordinal_position',[published,d.table]);
  const select=columns.map((col:any)=>{const field=col.name;if(!d.commercial!.includes(field))return 'p.`'+field+'`';
   if(field==='stock_quantity')return 'COALESCE(local_stock.stock_quantity,0) AS `stock_quantity`';
   const value="NULLIF(JSON_UNQUOTE(JSON_EXTRACT(o.offer,'$."+field+"')),'null')";
   if(field==='is_purchasable')return 'COALESCE(CAST('+value+' AS UNSIGNED),0) AS `'+field+'`';
   if(/price|amount/.test(field)&&field!=='price_unit')return 'CAST('+value+' AS DECIMAL(12,2)) AS `'+field+'`';
   return value+' AS `'+field+'`';}).join(',');
  const stock=d.kind==='products'?' LEFT JOIN '+q(sources[target].database,'products')+' local_stock ON BINARY local_stock.id=BINARY p.id':'';
  await c.query('CREATE OR REPLACE SQL SECURITY DEFINER VIEW '+q(published,target+'_'+d.table)+' AS SELECT '+select+' FROM '+q(published,'live_'+d.table)+' p LEFT JOIN '+q(workspace,'content_offers')+" o ON BINARY o.entity_id=BINARY p.id AND o.kind='"+d.kind+"' AND o.site_id='"+target+"'"+stock);
 }
 for(const source of ['gwd','gzl']){const local=sources[source].database;for(const [mode,remote] of [['work',workspace],['public',published]]){
  const parent=mode==='public'?'live_custom_pages':'custom_pages';
  await c.query('CREATE OR REPLACE SQL SECURITY DEFINER VIEW '+q(local,'content_'+mode+'_custom_pages')+' AS SELECT * FROM '+q(local,'custom_pages')+' WHERE module_key<>\'blog\' UNION ALL SELECT * FROM '+q(remote,parent));
  await c.query('CREATE OR REPLACE SQL SECURITY DEFINER VIEW '+q(local,'content_'+mode+'_custom_pages_i18n')+' AS SELECT i.* FROM '+q(local,'custom_pages_i18n')+' i JOIN '+q(local,'custom_pages')+' p ON p.id=i.page_id WHERE p.module_key<>\'blog\' UNION ALL SELECT i.* FROM '+q(remote,'custom_pages_i18n')+' i JOIN '+q(remote,parent)+' p ON p.id=i.page_id');
 }}
}
