import {NextRequest,NextResponse} from 'next/server';
import {BASE_URL} from '@/integrations/apiBase';
import {localizePath} from '@/i18n/routes';
export async function POST(request:NextRequest){
 const form=await request.formData();const token=String(form.get('token')||'');
 const r=await fetch(`${BASE_URL}/content/preview`,{headers:{'x-content-preview':token},cache:'no-store'});if(!r.ok)return new NextResponse('Önizleme süresi doldu veya bu markaya ait değil.',{status:r.status,headers:{'Cache-Control':'no-store'}});
 const data=await r.json();const route=({projects:'work',services:'services',products:'products',blog:'blog'}as Record<string,string>)[data.kind];if(!route)return new NextResponse('Önizleme desteklenmiyor',{status:422});
 const origin=process.env.NEXT_PUBLIC_SITE_URL||new URL(BASE_URL).origin;
 const response=NextResponse.redirect(new URL('/'+data.locale+localizePath(data.locale,'/'+route+'/'+encodeURIComponent(data.data.slug)),origin),303);
 response.cookies.set('content_preview',token,{httpOnly:true,secure:true,sameSite:'lax',maxAge:900,path:'/'});response.headers.set('Cache-Control','private, no-store');response.headers.set('X-Robots-Tag','noindex, nofollow');return response;
}
export async function DELETE(){const r=NextResponse.json({ok:true});r.cookies.delete('content_preview');return r;}
