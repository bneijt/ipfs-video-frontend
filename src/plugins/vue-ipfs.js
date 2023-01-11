import { create } from 'ipfs-core';

const plugin = {
  install: (app, options = {}) => {
    app.config.globalProperties.$ipfs = create(options);

    app.provide('ipfs', options)
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
