import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

import App from "./App";
import Home from "./Home";
import IpfsVideo from "./IpfsVideo";
import PathForm from "./components/PathForm";
import IpfsGatewayVideo from "./IpfsGatewayVideo";
import IpfsLs from './IpfsLs';
import NotFound from './NotFound';
import VueIpfs from './plugins/vue-ipfs';

const routes = [
  { path: '/', component: Home },
  { path: '/ipfs/:ipfsPath+', component: IpfsVideo },
  { path: '/gw/:ipfsPath+', component: IpfsGatewayVideo },
  { path: '/ls/:ipfsPath+', component: IpfsLs },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const app = createApp(App)
  .use(router)
  .use(VueIpfs)
  .use(createMetaManager())
  .use(metaPlugin)

app.component('path-form', PathForm);
app.mount("#app");


