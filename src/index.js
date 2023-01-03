import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

import App from "./App.vue";
import Home from "./Home.vue";
import IpfsVideo from "./IpfsVideo.vue";
import PathForm from "./components/PathForm.vue";
import IpfsGatewayVideo from "./IpfsGatewayVideo.vue";
import IpfsLs from './IpfsLs.vue';
import NotFound from './NotFound.vue';
import VueIpfs from './plugins/vue-ipfs.js';

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


