import fp from 'fastify-plugin';
import {createHash} from 'node:crypto';
import {enabled,isWriter,site,workspaceSchema,publishedSchema,editorOrigin} from './config';
import {context,getContentPool,getLegacyPool,routedPool,type ContentContext} from './routing';
import {definitions,definitionForPath,type ContentDefinition} from './definitions';
import {digest,readAggregate,saveRevision,metadata} from './repository';
const q=(name:string)=>'`'+workspaceSchema+'`.`'+name+'`';
const adminPath=(p:string)=>/^\/api(?:\/v1)?\/admin\//.test(p);
const actor=(r:any)=>String(r.user?.sub||r.user?.id||'integration');
async function release(ctx:ContentContext,commit=false){if(!ctx.connection||!ctx.transaction)return;try{if(commit)await ctx.connection.commit();else await ctx.connection.rollback();}finally{ctx.transaction=false;ctx.connection.release();ctx.connection=undefined;}}
export default fp(async(app)=>{
 if(!enabled)return;
 // @fastify/mysql uses the promise pool; only allowlisted content table SQL is redirected.
 (app as any).mysql=routedPool;(app as any).db=routedPool;
 app.addHook('onRequest',(req,reply,done)=>{
  const path=req.url.split('?')[0];const integration=path.includes('/integrations/gzl-crm');
  const scope:ContentContext={admin:adminPath(path)||integration,kind:integration?definitions.find(d=>d.kind==='projects')!:definitionForPath(path),skip:path.includes('/admin/db')||path.includes('/shared-content/'),requestId:String(req.id),media:/\/(?:admin\/)?storage(?:\/|$)/.test(path)};
  context.run(scope,done);
 });
 app.addHook('preValidation',async(req,reply)=>{
  const ctx=context.getStore();if(!ctx)return;
  if(ctx.kind||ctx.mixedCustom||ctx.media||req.url.includes('/skills')||req.url.includes('/content/')||req.url.includes('/shared-content/')){try{await getContentPool().query('SELECT 1');}catch{throw Object.assign(Error('shared_content_unavailable'),{statusCode:503});}}
  if(ctx.skip)return;
  if(ctx.media&&!['GET','HEAD','OPTIONS'].includes(req.method)){
   if(!isWriter)throw Object.assign(Error('shared_content_read_only'),{statusCode:423});
   const body=(req.body||{})as any;const ids=[(req.params as any)?.id,...(Array.isArray(body.ids)?body.ids:[])].filter(Boolean);
   if(req.method==='DELETE'||req.url.includes('bulk-delete')||['name','path','url','provider_public_id'].some(k=>k in body))for(const id of ids){
    const [assets]:any=await getContentPool().query('SELECT path,url FROM '+q('storage_assets')+' WHERE id=?',[id]);
    const needles=[String(id),assets[0]?.url,assets[0]?.path].filter(Boolean);
    for(const value of needles){const [used]:any=await getContentPool().query('SELECT 1 FROM '+q('content_revisions')+' WHERE LOCATE(?,CAST(payload AS CHAR))>0 LIMIT 1',[value]);if(used.length)throw Object.assign(Error('asset_referenced_by_content_revision'),{statusCode:409});}
   }
  }
  if(ctx.kind?.kind==='blog'){
   const query=(req.query||{})as any,body=(req.body||{})as any,params=(req.params||{})as any;
   const module=query.module_key||body.module_key;
   if(module&&module!=='blog'){ctx.localCustom=true;ctx.kind=undefined;return;}
   if(!module&&(params.id||params.slug)){
    const schema=ctx.admin?workspaceSchema:publishedSchema;
    const [rows]:any=await getContentPool().query(params.id?'SELECT id FROM `'+schema+'`.custom_pages WHERE id=?':'SELECT page_id AS id FROM `'+schema+'`.custom_pages_i18n WHERE slug=? LIMIT 1',[params.id||params.slug]);
    if(!rows.length){ctx.localCustom=true;ctx.kind=undefined;return;}
   }else if(!module&&req.method==='GET'){ctx.mixedCustom=true;ctx.kind=undefined;}
  }
  if(ctx.kind&&(req.params as any)?.slug){const p=req.params as any;const locale=String((req.query as any)?.locale||(req as any).locale||'tr');const [aliases]:any=await getContentPool().query('SELECT entity_id FROM '+q('content_url_aliases')+' WHERE site_id=? AND kind=? AND locale=? AND slug=?',[site,ctx.kind.kind,locale,p.slug]);
   if(aliases[0]&&ctx.kind.translations){const t=ctx.kind.translations;const schema=ctx.admin?workspaceSchema:publishedSchema;const [current]:any=await getContentPool().query('SELECT slug FROM `'+schema+'`.`'+t.table+'` WHERE `'+t.fk+'`=? AND locale=?',[aliases[0].entity_id,locale]);if(current[0]?.slug)p.slug=current[0].slug;}
  }
  if(ctx.kind&&!ctx.admin){const params=(req.params||{})as any;const id=params.id||params.projectId||params.serviceId;if(id){const [live]:any=await getContentPool().query('SELECT id FROM `'+publishedSchema+'`.`live_'+ctx.kind.table+'` WHERE id=?',[id]);if(!live.length)throw Object.assign(Error('not_found'),{statusCode:404});}}

 });
 app.addHook('preHandler',(req,reply,done)=>{
  const handle=async()=>{
  const ctx=context.getStore();if(!ctx||ctx.skip||req.url.includes('/integrations/gzl-crm')||!ctx.kind||!ctx.admin||['GET','HEAD','OPTIONS'].includes(req.method))return;
  if(!isWriter){reply.code(423).send({error:{message:'shared_content_read_only',editor_origin:editorOrigin}});return 'handled';}
  const params=(req.params||{})as any;const id=params.id||params.projectId||params.serviceId;
  const c=await getContentPool().getConnection();ctx.connection=c;ctx.transaction=true;await c.beginTransaction();
  if(id){const [entries]:any=await c.query('SELECT revision FROM '+q('content_entries')+' WHERE kind=? AND entity_id=? FOR UPDATE',[ctx.kind.kind,id]);if(entries[0]){const supplied=String(req.headers['if-match']||'').replace(/^W\//,'').replaceAll('"','');if(!supplied){await release(ctx);{reply.code(428).send({error:{message:'content_revision_required'}});return 'handled';}}if(Number(supplied)!==Number(entries[0].revision)){await release(ctx);{reply.code(409).send({error:{message:'revision_conflict',revision:Number(entries[0].revision)}});return 'handled';}}ctx.before=await readAggregate(c,ctx.kind,id);}}
  else if(req.method==='POST'&&!req.url.includes('/integrations/')){const key=String(req.headers['idempotency-key']||'');if(!/^[\w-]{16,128}$/.test(key)){await release(ctx);{reply.code(428).send({error:{message:'idempotency_key_required'}});return 'handled';}}const hash=digest({method:req.method,path:req.url,locale:req.headers['accept-language'],body:req.body});
   try{await c.query('INSERT INTO '+q('content_idempotency')+' (request_key,request_hash) VALUES (?,?)',[key,hash]);}catch(e:any){if(e.code!=='ER_DUP_ENTRY')throw e;const [rows]:any=await c.query('SELECT * FROM '+q('content_idempotency')+' WHERE request_key=? FOR UPDATE',[key]);const previous=rows[0];await release(ctx);if(previous.request_hash!==hash){reply.code(409).send({error:{message:'idempotency_conflict'}});return 'handled';}{reply.code(previous.status_code||409).send(typeof previous.response==='string'?JSON.parse(previous.response):previous.response);return 'handled';}}
  }
  };
  void handle().then(result=>{if(result!=='handled')done();},done);
 });
 app.addHook('onSend',async(req,reply,payload)=>{
  const ctx=context.getStore();if(!ctx||ctx.skip)return payload;
  if(reply.statusCode>=400){await release(ctx);return payload;}
  let value:any;try{value=typeof payload==='string'&&payload?JSON.parse(payload):payload;}catch{await release(ctx);return payload;}
  if(ctx.transaction&&ctx.kind){const id=String((req.params as any)?.id||(req.params as any)?.projectId||(req.params as any)?.serviceId||value?.id||value?.projectId||value?.project?.id||'');if(!id){await release(ctx);throw Error('shared_mutation_missing_entity_id');}
   const revision=await saveRevision(ctx.connection,ctx.kind,id,actor(req),String(req.id),ctx.before);if(value&&typeof value==='object'&&!Array.isArray(value))value._content_revision=revision;const key=String(req.headers['idempotency-key']||'');if(key)await ctx.connection!.query('UPDATE '+q('content_idempotency')+' SET status_code=?,response=? WHERE request_key=?',[reply.statusCode,JSON.stringify(value??null),key]);await release(ctx,true);reply.header('x-content-revision',String(revision));if(value&&typeof value==='object'&&!Array.isArray(value))value._content_revision=revision;
  }
  if(ctx.kind){const ids=new Set<string>();const walk=(o:any)=>{if(!o||typeof o!=='object')return;if(Array.isArray(o)){for(const x of o)walk(x);return;}if(typeof o.id==='string')ids.add(o.id);for(const [k,v]of Object.entries(o))if(['items','data','plans','education','experience','counters','logos'].includes(k))walk(v);};walk(value);
   if(ids.size){const [entries]:any=await getContentPool().query('SELECT entity_id,revision,published_revision,state FROM '+q('content_entries')+' WHERE kind=? AND entity_id IN (?)',[ctx.kind.kind,[...ids]]);const map=new Map(entries.map((e:any)=>[e.entity_id,e]));const [offers]:any=await getContentPool().query('SELECT entity_id,offer FROM '+q('content_offers')+' WHERE kind=? AND site_id=? AND entity_id IN (?)',[ctx.kind.kind,site,[...ids]]);const offerMap=new Map(offers.map((o:any)=>[o.entity_id,typeof o.offer==='string'?JSON.parse(o.offer):o.offer]));
    const decorate=(o:any):any=>{if(!o||typeof o!=='object')return o;if(Array.isArray(o))return o.map(decorate);const e:any=map.get(o.id);if(e){o._content_revision=Number(ctx.admin?e.revision:e.published_revision||0);if(ids.size===1)reply.header('x-content-revision',String(o._content_revision));if(!ctx.admin&&ctx.kind!.commercial?.length){const offer:any=offerMap.get(o.id);o.country_offer_available=!!offer;if(offer){for(const [k,v]of Object.entries(offer)){if(k in o)o[k]=v;}}else{for(const k of ctx.kind!.commercial!)if(k in o)o[k]=k==='is_purchasable'?false:k==='currency'?o[k]:null;}}
     if(!ctx.admin&&typeof o.meta_title==='string')o.meta_title=o.meta_title.replace(/\s*[|–—]\s*(Guezel Web Design|GZL Teknoloji|GZL Technology)\s*$/i,'')+' | '+(site==='gwd'?'Guezel Web Design':'GZL Teknoloji');}
     for(const k of ['items','data','plans','education','experience','counters','logos'])if(k in o)o[k]=decorate(o[k]);return o;};value=decorate(value);
   }
   reply.header('x-content-source','shared');reply.header('x-content-site',site);reply.header('cache-control','private, no-store, max-age=0');
  }
  if(reply.statusCode===204)return payload;
  return value===undefined?payload:typeof payload==='string'?JSON.stringify(value):value;
 });
 app.addHook('onError',async()=>{const ctx=context.getStore();if(ctx)await release(ctx);});
});
