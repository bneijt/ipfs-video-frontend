<template>
  <div>
    <path-form />
    <video ref="video" v-bind:src="gatewayUrl" controls muted autoplay />
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
