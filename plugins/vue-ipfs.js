import Vue from 'vue'
import IPFS from 'ipfs'

const plugin = {
  install: (app, options = {}) => {
    app.config.globalProperties.$ipfs = IPFS.create(options)

    app.provide('ipfs', options)
  }
}

Vue.use(plugin)

