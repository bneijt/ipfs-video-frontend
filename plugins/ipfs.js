import IPFS from 'ipfs'
// import Vue from "vue";

// const IpfsPlugin = {
//   install: (app, options) => {
//     app.config.globalProperties.$ipfs = IPFS.create(options)
//     console.log("SETUP")
//   }
// }

// Vue.use(IpfsPlugin)

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('ipfs', IPFS.create())
}
