<template>
  <div>
    <p>
      Will try ipfs, gateway otherwise
      <input placeholder="ipfs path" name="input" v-model.trim="ipfsPath" />
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
  watch: {
    // whenever question changes, this function will run
    ipfsPath(newPath, _) {
      if (newPath.length >= MIN_CID_LENGTH) {
        this.$router.push(`/ipfs/${newPath}`);
      }
    },
  },
};
</script>
