import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import App from "./App";
import IpfsVideo from "./IpfsVideo";
import PathForm from "./components/PathForm";
import IpfsGatewayVideo from "./IpfsGatewayVideo";
import IpfsLs from './IpfsLs';
import NotFound from './NotFound';
import VueIpfs from './plugins/vue-ipfs';

const routes = [
  { path: '/', component: App },
  { path: '/ipfs/:ipfsPath+', component: IpfsVideo },
  { path: '/gw/:ipfsPath+', component: IpfsGatewayVideo },
  { path: '/ls/:ipfsPath+', component: IpfsLs },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from) => {
  document.title = "IPFS video player";
  return true
})

const app = createApp({});
app.use(router);
app.use(VueIpfs);
app.component('path-form', PathForm);
app.mount("#app");


