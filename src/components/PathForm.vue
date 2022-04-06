<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label">IPFS Path</label>
        <div class="control">
          <input
            placeholder="IPFS path or CID"
            class="input is-link"
            minlength="46"
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
          <button
            @click="useIpfs"
            class="button"
            title="Use js-ipfs from the browser"
            v-bind:disabled="isInvalidIpfsPath"
          >
            Use IPFS directly
          </button>
        </div>
        <div class="control">
          <button
            @click="useGateway"
            class="button"
            title="Use the ipfs.io HTTP gateway"
            v-bind:disabled="isInvalidIpfsPath"
          >
            Use ipfs.io gateway
          </button>
        </div>
        <div class="control">
          <a
            v-bind:href="'http://localhost:8080/ipfs/' + ipfsPath"
            class="button"
            title="Open at localhost:8080"
            v-bind:disabled="isInvalidIpfsPath"
            target="_blank"
          >
            Open at localhost:8080
          </a>
        </div>
        <div class="control">
          <a
            v-bind:href="'https://ipfs.io/ipfs/' + ipfsPath"
            class="button"
            title="Open at ipfs.io"
            v-bind:disabled="isInvalidIpfsPath"
            target="_blank"
          >
            Open at ipfs.io
          </a>
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
      if (
        this.ipfsPath === undefined ||
        this.ipfsPath.length < MIN_CID_LENGTH
      ) {
        return true;
      } else {
        return null;
      }
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
