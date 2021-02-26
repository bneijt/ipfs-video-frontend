import IPFS from 'ipfs'

const plugin = {
  install: (app, options = {}) => {
    app.config.globalProperties.$ipfs = IPFS.create(options)

    app.provide('ipfs', options)
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
