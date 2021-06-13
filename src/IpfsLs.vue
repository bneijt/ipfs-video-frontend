<template>
  <div class="block">
    <h1 class="title">{{ title }}</h1>
    <h2 class="subtitle">IPFS listing</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th><abbr title="Content Identifier">CID</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" v-bind:key="entry.cid">
          <td>
            <router-link v-bind:to="'/ipfs/' + entry.path">{{
              entry.name
            }}</router-link>
          </td>
          <td>{{ entry.size }}</td>
          <td>
            <code>{{ entry.cid }}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="has-text-right">
      <small>{{ status }}</small>
    </p>
  </div>
  <div class="block">
    <path-form />
  </div>
</template>

<script>
function entryInformationFrom(block) {
  var entry = {
    path: block.path,
    cid: block.cid.string,
    name: block.name,
    size: block.size,
  };
  return entry;
}
export default {
  inject: ["ipfs"],
  data() {
    return {
      status: "Initializing...",
      entries: [],
    };
  },
  mounted: function () {
    this.getBlockInfo();
  },
  computed: {
    ipfsPath: function () {
      if (this.$route.params.ipfsPath !== undefined) {
        return this.$route.params.ipfsPath.join("/");
      }
      return "";
    },
    title: function () {
      var titleValue = "IPFS listing";
      if (this.$route.params.ipfsPath !== undefined) {
        titleValue =
          this.$route.params.ipfsPath[this.$route.params.ipfsPath.length - 1];
        document.title = titleValue + " - IPFS listing";
      }
      return titleValue;
    },
  },
  methods: {
    async getBlockInfo() {
      const component = this;
      try {
        const ipfs = await this.$ipfs,
          ipfsPath = this.ipfsPath;

        this.status = "Looking up: " + ipfsPath;
        for await (const chunk of ipfs.ls(ipfsPath)) {
          this.entries.push(entryInformationFrom(chunk));
        }
        this.status = "";
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
      }
    },
  },
};
</script>
