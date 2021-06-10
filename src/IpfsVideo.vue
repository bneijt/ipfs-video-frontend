<template>
  <div class="block has-text-centered">
    <video ref="video" controls muted autoplay />
    <p>Status: {{ status }}</p>
  </div>
  <div class="block">
    <path-form />
  </div>
</template>

<script>
async function load_ipfs_path(ipfs, path, errorHandler) {
  var mediaSource = new MediaSource();

  mediaSource.addEventListener("sourceended", function sourceEnded() {
    console.log("sourceended");
  });
  mediaSource.addEventListener("sourceopen", onMediaSourceOpen);
  mediaSource.addEventListener("sourceclose", function sourceClose() {
    console.log("sourceclose");
  });

  async function onMediaSourceOpen() {
    var mimeCodec = 'video/webm; codecs="vp8, opus"',
      sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    if (!MediaSource.isTypeSupported(mimeCodec)) {
      errorHandler("Your browser does not support VP8 streams");
      return;
    }
    sourceBuffer.addEventListener("abort", function (ev) {
      errorHandler(ev);
    });
    sourceBuffer.addEventListener("error", function (ev) {
      errorHandler(ev);
    });

    try {
      for await (const file of ipfs.get(path)) {
        if (!file.content) {
          errorHandler("Given path does not point to a file");
          return;
        }
        var firstChunk = await file.content.next();
        sourceBuffer.addEventListener(
          "updateend",
          onUpdateEndContinue(file.content)
        );
        sourceBuffer.appendBuffer(firstChunk.value);
      }
    } catch (err) {
      errorHandler(err);
    }
  }
  function onUpdateEndContinue(asyncIterableContents) {
    return async function appendNext(ev) {
      var sourceBuffer = ev.target,
        chunk = await asyncIterableContents.next();
      if (chunk.done) {
        sourceBuffer.removeEventListener("updateend", appendNext);
        mediaSource.endOfStream();
      } else {
        sourceBuffer.appendBuffer(chunk.value);
      }
    };
  }

  return mediaSource;
}

export default {
  inject: ["ipfs"],
  data() {
    if (!window.MediaSource) {
      return {
        status: "No Media Source API available, you can't use IPFS directly.",
      };
    }

    return {
      status: "Initializing...",
    };
  },
  mounted: function () {
    this.getIpfsNodeInfo();
  },
  methods: {
    async getIpfsNodeInfo() {
      const component = this;
      try {
        const ipfs = await this.$ipfs,
          ipfsPath = this.$route.params.ipfsPath.join("/");

        const { agentVersion, node_id } = await ipfs.id();
        this.status = `Loading from ipfs directly`;

        video_element = this.$refs["video"];
        var mediaSource = await load_ipfs_path(
          ipfs,
          ipfsPath,
          function errorHandler(msg, switchToGateway) {
            this.status = `Failed to use IPFS directly: ${msg}`;
          }
        );
        if (mediaSource !== undefined) {
          video_element.src = window.URL.createObjectURL(mediaSource);
          mediaSource.addEventListener("sourceopen", function () {
            URL.revokeObjectURL(video_element.src);
          });
        }
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
      }
    },
  },
};
</script>
