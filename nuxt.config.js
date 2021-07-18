export default {
  target: 'static',
  ssr: false,
  components: true,
  css: [
    '@/assets/main.scss'
  ],
  plugins: ['~/plugins/ipfs.js']
}
