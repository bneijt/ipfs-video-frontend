<template>
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
</template>

<script>
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";

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
  setup() {
    const route = useRoute();
    useMeta(extractMeta(route));
  },

  computed: {
    title: function () {
      return extractMeta(this.$route).title;
    },
    localhostGatewayUrl: function () {
      if (this.$route.params.ipfsPath !== undefined) {
        const ipfsPath = this.$route.params.ipfsPath.join("/");
        return `http://localhost:8080/ipfs/${ipfsPath}`;
      }
      return "";
    },
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
