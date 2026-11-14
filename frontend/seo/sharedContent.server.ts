import {BASE_URL} from '@/integrations/apiBase';
import {localizePath,routeFromSegment} from '@/i18n/routes';
export const commonEnabled=process.env.NEXT_PUBLIC_SHARED_CONTENT==='1';
export async function resolveCommon(kind:string,locale:string,slug:string){
 const r=await fetch(`${BASE_URL}/content/resolve?${new URLSearchParams({kind,locale,slug})}`,{cache:'no-store'});
 if(r.status===404)return null;if(!r.ok)throw Error('Ortak içerik kaynağına erişilemiyor');return r.json();
}
export function commonRoute(path:string){const [locale,segment,slug]=path.split('/').filter(Boolean);const route=routeFromSegment(locale,segment)||segment;const kind=({work:'projects',services:'services',products:'products',blog:'blog'}as Record<string,string>)[route];return {locale,route,kind,slug};}
export async function commonAlternates(path:string){
 const {locale,route,kind,slug}=commonRoute(path);if(!kind&&!(!route))return null;
 if(kind&&slug){const r=await resolveCommon(kind,locale,decodeURIComponent(slug));return r?{canonical:r.canonical,languages:{...r.alternates,'x-default':r.x_default}}:null;}
 const languages:Record<string,string>={};for(const l of ['de','en','tr'])languages[l]=(l==='tr'?'https://gzlteknoloji.com':'https://www.guezelwebdesign.com')+'/'+l+(route?localizePath(l,'/'+route):'');languages['x-default']=languages.en;return {canonical:languages[locale],languages};
}
