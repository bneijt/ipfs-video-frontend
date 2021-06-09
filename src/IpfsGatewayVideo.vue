<template>
  <div class="block has-text-centered">
    <video ref="video" v-bind:src="gatewayUrl" controls muted autoplay />
    <p>Video playing from ipfs.io gateway.</p>
  </div>
  <div class="block">
    <path-form />
  </div>
</template>

<script>
export default {
  data() {
    const ipfsPath = this.$route.params.ipfsPath.join("/");
    return {
      gatewayUrl: `https://ipfs.io/ipfs/${ipfsPath}`,
    };
  },
};
</script>
