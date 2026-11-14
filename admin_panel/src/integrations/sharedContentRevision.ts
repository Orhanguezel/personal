/** Revisions belong to the response that populated the form, never to the latest server state. */
const revisions=new Map<string,number>();
const modules='categories|sub_categories|sub-categories|projects|services|products|custom_pages|custom-pages|faqs|pricing|brand-logos|brands|resume-entries|resume|skill-counters|skill-logos';
const route=new RegExp('(?:^|/)admin/('+modules+')(?:/plans)?(?:/([^/?]+))?');
export function contentRequest(args:any){
 const req=typeof args==='string'?{url:args}:{...args};const m=String(req.url).match(route);if(!m)return args;
 const method=String(req.method||'GET').toUpperCase();const headers=new Headers(req.headers);
 if(!['GET','HEAD','OPTIONS'].includes(method)){
  if(m[2]&&revisions.has(m[1]+':'+m[2]))headers.set('If-Match',String(revisions.get(m[1]+':'+m[2])));
  if(method==='POST'&&!headers.has('Idempotency-Key'))headers.set('Idempotency-Key',crypto.randomUUID());
 }
 return {...req,headers};
}
export function rememberContent(args:any,data:any){const url=typeof args==='string'?args:args.url;const m=String(url).match(route);if(!m)return;const walk=(v:any)=>{if(!v||typeof v!=='object')return;if(Array.isArray(v)){v.forEach(walk);return;}if(v.id&&Number.isSafeInteger(v._content_revision))revisions.set(m[1]+':'+v.id,v._content_revision);for(const k of ['items','data','plans','education','experience','counters','logos'])walk(v[k]);};walk(data);}
