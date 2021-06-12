<template>
  <div class="block has-text-centered">
    <video ref="video" v-bind:src="gatewayUrl" controls muted autoplay />
    <p>Playing from <a v-bind:href="gatewayUrl">{{gatewayUrl}}</a>.</p>
  </div>
  <div class="block">
    <path-form />
  </div>
</template>

<script>
export default {
  computed: {
    gatewayUrl: function () {
      if (this.$route.params.ipfsPath !== undefined) {
        const ipfsPath = this.$route.params.ipfsPath.join("/");
        return `https://ipfs.io/ipfs/${ipfsPath}`;
      }
      return "";
    },
  },
};
</script>
