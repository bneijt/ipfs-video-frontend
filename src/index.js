import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import App from "./App";
import IpfsVideo from "./IpfsVideo";
import IpfsGatewayVideo from "./IpfsGatewayVideo";
import VueIpfs from './plugins/vue-ipfs';

const routes = [
    { path: '/', component: App },
    { path: '/ipfs/:ipfsPath+', component: IpfsVideo},
    { path: '/gw/:ipfsPath+', component: IpfsGatewayVideo}
  ]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const app = createApp({});
app.use(router)
app.use(VueIpfs);
app.mount("#app");


