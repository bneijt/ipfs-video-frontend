<template>
  <metainfo />
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
import { ref, computed, onMounted } from 'vue'

export default {

/*
  setup() {

    const title = ref("title");
    console.log("SETUP", this);
    const computedMeta = computed(() => ({
      title: `"${title.value}"`,
    }))

    useMeta(computedMeta)
  },
*/
  metaInfo: {
    title: "hello"
  },
  computed: {
    title: function () {
      var titleValue = "IPFS video player";
      if (this.$route.params.ipfsPath !== undefined) {
        titleValue =
          this.$route.params.ipfsPath[this.$route.params.ipfsPath.length - 1];
      }
      console.log("compute", this);
      return titleValue;
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
