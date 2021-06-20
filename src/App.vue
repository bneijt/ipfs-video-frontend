<template>
  <metainfo />
  <router-view></router-view>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
  metaInfo() {
    return {
      title: "IPFS video player",
      description: "Play a video from the IPFS CDN using js-ipfs or the ipfs.io gateway."
    };
  },
};
</script>
