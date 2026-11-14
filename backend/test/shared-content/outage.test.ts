import {test,expect,afterAll} from 'bun:test';
import {createApp} from '../../dist/test-app.js';
const app=await createApp();await app.ready();afterAll(()=>app.close());
test('a common-source outage is 503 and never a local fallback or false 404',async()=>{for(const url of ['/projects','/projects/e3673f55-d45e-52f5-a6fd-ab659ab931e5','/services','/skills','/content/resolve?kind=projects&locale=tr&slug=missing']){const r=await app.inject({url:'/api/v1'+url});expect(r.statusCode,url).toBe(503);}});
test('local brand settings remain available during a content outage',async()=>{const r=await app.inject({url:'/api/v1/site_settings/default_locale'});expect(r.statusCode).toBe(200);});
