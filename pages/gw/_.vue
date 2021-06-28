<template>
  <div>
    <div class="block">
      <h1 class="title">{{ title }}</h1>
      <video ref="video" v-bind:src="gatewayUrl" controls muted autoplay />
      <p>
        Direct link <a v-bind:href="gatewayUrl">to ipfs.io</a> or
        <a v-bind:href="localhostGatewayUrl" target="_blank">to localhost</a>.
      </p>
    </div>
    <div class="block">
      <path-form />
    </div>
  </div>
</template>

<script>

function extractMeta(route) {
  if (route.params.ipfsPath !== undefined) {
    const titleValue = route.params.ipfsPath[route.params.ipfsPath.length - 1];
    return {
      title: titleValue,
      description: `IPFS video player playing '${titleValue}' using the IPFS network`,
    };
  }
  return {
    title: "IPFS gateway video",
    description: "IPFS video player using the ipfs.io gateway",
  };
}

export default {
  computed: {
    title: function() {
      return extractMeta(this.$route).title;
    },
    localhostGatewayUrl: function() {
      console.log(this.$route.params);
      if (this.$route.params.pathMatch !== undefined) {
        return `http://localhost:8080/ipfs/${this.$route.params.pathMatch}`;
      }
      return "";
    },
    gatewayUrl: function() {
      if (this.$route.params.pathMatch !== undefined) {
        return `https://ipfs.io/ipfs/${this.$route.params.pathMatch}`;
      }
      return "";
    },
  },
};
</script>
