<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label">IPFS Path</label>
        <div class="control">
          <input
            placeholder="IPFS path or CID"
            class="input is-link"
            v-bind:class="{ 'is-danger': isInvalidIpfsPath }"
            type="text"
            v-model.trim="ipfsPath"
          />
        </div>
        <p class="help">
          For more information on this, read the
          <router-link to="/">help text on the homepage</router-link>.
        </p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button @click="useIpfs" class="button">Use IPFS directly</button>
        </div>
        <div class="control">
          <button @click="useGateway" class="button">
            Use ipfs.io gateway
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MIN_CID_LENGTH = 46;

export default {
  data() {
    var ipfsPath = "";
    if (this.$route.params.ipfsPath !== undefined) {
      ipfsPath = this.$route.params.ipfsPath.join("/");
    }
    return {
      ipfsPath: ipfsPath,
    };
  },
  computed: {
    isInvalidIpfsPath() {
      if (this.ipfsPath !== undefined) {
        return (
          this.ipfsPath.length > 0 && this.ipfsPath.length < MIN_CID_LENGTH
        );
      }
      return false;
    },
  },
  methods: {
    useIpfs() {
      this.$router.push(`/ipfs/${this.ipfsPath}`);
    },
    useGateway() {
      this.$router.push(`/gw/${this.ipfsPath}`);
    },
  },
};
</script>
