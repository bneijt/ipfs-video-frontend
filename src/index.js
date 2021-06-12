import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import App from "./App";
import IpfsVideo from "./IpfsVideo";
import PathForm from "./components/PathForm";
import IpfsGatewayVideo from "./IpfsGatewayVideo";
import IpfsLs from './IpfsLs';
import VueIpfs from './plugins/vue-ipfs';

const routes = [
  { path: '/', component: App },
  { path: '/ipfs/:ipfsPath+', component: IpfsVideo },
  { path: '/gw/:ipfsPath+', component: IpfsGatewayVideo },
  { path: '/ls/:ipfsPath+', component: IpfsLs }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const app = createApp({});
app.use(router);
app.use(VueIpfs);
app.component('path-form', PathForm);
app.mount("#app");


