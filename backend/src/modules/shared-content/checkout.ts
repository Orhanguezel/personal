import { enabled, site, publishedSchema } from './config';
import { getContentPool, getLegacyPool } from './routing';

/** Website packages are a country's operational offer, never the editorial products table. */
export async function resolveCheckoutProduct(original:any,locale:string,fallback:string,id:string){
 if(!enabled)return original(locale,fallback,id);
 const [rows]:any=await getLegacyPool().query("SELECT p.*,COALESCE(t.title,d.title,'') AS title,COALESCE(t.slug,d.slug,'') AS slug FROM site_packages p LEFT JOIN site_packages_i18n t ON BINARY t.product_id=BINARY p.id AND t.locale=? LEFT JOIN site_packages_i18n d ON BINARY d.product_id=BINARY p.id AND d.locale=? WHERE p.id=? LIMIT 1",[locale,fallback,id]);
 const row=rows[0];if(!row||!row.currency)return null;for(const field of ['price_onetime','price_monthly'])if(!(Number(row[field])>0))row[field]=null;return row;
}
/** Insert only a closed historical FK anchor for a newly shared sellable identity.
 * Existing country rows, orders, amounts and snapshots are never updated. */
export async function ensureCheckoutReference(type:string,id:string){
 if(!enabled||!['service','project'].includes(type))return;
 const table=type==='service'?'services':'projects';
 const [rows]:any=await getContentPool().query('SELECT * FROM `'+publishedSchema+'`.`'+site+'_'+table+'` WHERE id=?',[id]);
 const row=rows[0];
 if(!row||Number(row.is_purchasable)!==1||!(Number(row.price_onetime)>0)||!row.currency)
  throw Object.assign(Error('country_offer_not_available'),{statusCode:400});
 const legacy=getLegacyPool();const [existing]:any=await legacy.query('SELECT id FROM `'+table+'` WHERE id=?',[id]);if(existing.length)return;
 const [columns]:any=await legacy.query('SHOW COLUMNS FROM `'+table+'`');const anchor:Record<string,any>={};
 for(const c of columns){if(c.Field in row)anchor[c.Field]=row[c.Field]&&typeof row[c.Field]==='object'?JSON.stringify(row[c.Field]):row[c.Field];if(/(?:^|_)asset_id$/.test(c.Field))anchor[c.Field]=null;}
 anchor[type==='project'?'is_published':'is_active']=0;anchor.is_purchasable=0;anchor.price_onetime=null;
 const keys=Object.keys(anchor);await legacy.query('INSERT IGNORE INTO `'+table+'` ('+keys.map(k=>'`'+k+'`').join(',')+') VALUES ('+keys.map(()=>'?').join(',')+')',keys.map(k=>anchor[k]));
 const [saved]:any=await legacy.query('SELECT id FROM `'+table+'` WHERE id=?',[id]);if(!saved.length)throw Error('country_catalog_reference_failed');
}
