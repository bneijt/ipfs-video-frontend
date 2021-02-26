<template>
  <div>
    <p>
      Will try ipfs, gateway otherwise
      <input placeholder="IPFS path or CID" name="input" v-model.trim="ipfsPath" />
      <button @click="tryIpfs">Try IPFS directly</button>
      <button @click="tryGateway">Try ipfs.io gateway</button>
    </p>
  </div>
</template>

<script>
const MIN_CID_LENGTH = 46;

export default {
  data() {
    return {
      ipfsPath: "",
    };
  },
  methods: {
    tryIpfs() {
        this.$router.push(`/ipfs/${this.ipfsPath}`);
    }
    tryGateway() {
        this.$router.push(`/gw/${this.ipfsPath}`);
    }
  },
};
</script>
