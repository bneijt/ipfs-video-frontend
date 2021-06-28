<template>
  <div>
    <div class="block">
      <h1 class="title">{{ title }}</h1>
      <video ref="video" controls muted autoplay />
      <p class="has-text-right">
        <small>{{ status }}</small>
      </p>
    </div>
    <div class="block">
      <path-form />
    </div>
  </div>
</template>

<script>

// MP4 mime info: https://gist.github.com/jimkang/f23ce12c359c7465e83f
const V_VP8 = new TextEncoder().encode("V_VP8"),
  V_VP9 = new TextEncoder().encode("V_VP9"),
  V_AV1 = new TextEncoder().encode("V_AV1"),
  A_OPUS = new TextEncoder().encode("A_OPUS"),
  A_VORBIS = new TextEncoder().encode("A_VORBIS"),
  A_MP4A = new TextEncoder().encode("mp4a"),
  V_AVC1_42E01E = [0x42, 0xe0, 0x1e],
  V_AVC1_640032 = [0x64, 0x00, 0x32];

function isSubsequenceOf(subsequence, offset, data) {
  return subsequence.every(function(value, index) {
    return value === data[offset + index];
  });
}
function containsSubsequence(needle, haystack) {
  var startIndex = haystack.indexOf(needle[0]);
  do {
    if (isSubsequenceOf(needle, startIndex, haystack)) {
      return true;
    }
    startIndex = haystack.indexOf(needle[0], startIndex + 1);
  } while (startIndex > 0);
  return false;
}
function findFirstSubsequence(needles, haystack) {
  for (let needle_name in needles) {
    if (containsSubsequence(needles[needle_name], haystack)) {
      return needle_name;
    }
  }
  return undefined;
}

function mimeCodecFor(blob) {
  //See also https://www.garykessler.net/library/file_sigs.html
  // mime, offset, magic bytes
  var container = "video/webm",
    codecs = "";
  const mimes = [
      ["video/mp4", 4, [0x66, 0x74, 0x79, 0x70, 0x4d, 0x53, 0x4e, 0x56]],
      ["video/mp4", 4, [0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]],
      ["video/mp4", 4, [0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32]],
      ["video/webm", 0, [0x1a, 0x45, 0xdf, 0xa3]],
    ],
    firstChunk = blob.slice(0, 0x3b0);

  for (const match of mimes) {
    const name = match[0],
      magicBytesOffset = match[1],
      magicBytes = match[2];
    if (isSubsequenceOf(magicBytes, magicBytesOffset, firstChunk)) {
      container = name;
      break;
    }
  }

  //Sniff codecs
  if (container == "video/webm") {
    const video_formats = {
        vp8: V_VP8,
        vp9: V_VP9,
        av1: V_AV1,
      },
      audio_formats = {
        opus: A_OPUS,
        vorbis: A_VORBIS,
      };

    codecs = [
      findFirstSubsequence(video_formats, firstChunk),
      findFirstSubsequence(audio_formats, firstChunk),
    ]
      .filter((i) => i !== undefined)
      .join(", ");
  } else if (container == "video/mp4") {
    const video_formats = {
        "avc1.42E01E": V_AVC1_42E01E,
        "avc1.640032": V_AVC1_640032,
      },
      audio_formats = {
        "mp4a.40.2": A_MP4A,
      };
    codecs = [
      findFirstSubsequence(video_formats, firstChunk),
      findFirstSubsequence(audio_formats, firstChunk),
    ]
      .filter((i) => i !== undefined)
      .join(", ");
  }

  if (codecs.length > 0) {
    return `${container}; codecs="${codecs}"`;
  }
  return `${container}`;
}

async function loadIpfsPath(ipfs, path, errorHandler) {
  var mediaSource = new MediaSource();

  mediaSource.addEventListener("sourceopen", onMediaSourceOpen);

  async function onMediaSourceOpen() {
    try {
      for (const filePromise of ipfs.get(path)) {
        const file = await filePromise;
        if (file.type == "dir") {
          errorHandler("This points to a directory", "ls");
          return;
        }
        if (!file.content) {
          errorHandler("Given path does not point to a file");
          return;
        }
        var firstChunk = await file.content.next();
        var mimeCodec = mimeCodecFor(firstChunk.value),
          sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

        console.log("Detected mime codec: ", mimeCodec);
        if (!MediaSource.isTypeSupported(mimeCodec)) {
          errorHandler("Your browser does not support " + mimeCodec);
          return;
        }
        sourceBuffer.addEventListener("abort", function(ev) {
          errorHandler(ev);
        });
        sourceBuffer.addEventListener("error", function(ev) {
          errorHandler(ev);
        });
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
        try {
          sourceBuffer.appendBuffer(chunk.value);
        } catch (exp) {
          //Quota exceeded if the video element was already removed
          console.error("Failed to append video buffer.", exp);
          errorHandler(`Failed to append video buffer: '${exp}' `);
          sourceBuffer.removeEventListener("updateend", appendNext);
        }
      }
    };
  }

  return mediaSource;
}

function extractMeta(route) {
  if (route.params.ipfsPath !== undefined) {
    const titleValue = route.params.ipfsPath[route.params.ipfsPath.length - 1];
    return {
      title: titleValue,
      description: `IPFS video player playing '${titleValue}'`,
    };
  }
  return {
    title: "IPFS video player using js-ipfs",
    description: "IPFS video player using js-ipfs",
  };
}

export default {
  inject: ["ipfs"],
  setup() {
    const route = useRoute();
    useMeta(extractMeta(route));
  },
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
  mounted: function() {
    this.loadVideo();
  },
  computed: {
    title: function() {
      return extractMeta(this.$route).title;
    },
    ipfsPath: function() {
      if (this.$route.params.ipfsPath !== undefined) {
        return this.$route.params.ipfsPath.join("/");
      }
      return "";
    },
  },
  watch: {
    ipfsPath(newPath, oldPath) {
      if (newPath !== undefined && newPath.length) {
        this.loadVideo();
      }
    },
  },
  methods: {
    async loadVideo() {
      const component = this;
      try {
        const ipfs = await this.$ipfs,
          ipfsPath = this.ipfsPath;

        const { agentVersion, node_id } = await ipfs.id();
        this.status = "Loading";

        video_element = this.$refs["video"];
        var mediaSource = await loadIpfsPath(
          ipfs,
          ipfsPath,
          function errorHandler(msg, reroute) {
            component.status = `Failed to use IPFS directly: ${msg}`;
            if (reroute !== undefined) {
              component.$router.push(`/${reroute}/${ipfsPath}`);
            }
          }
        );
        if (mediaSource !== undefined) {
          video_element.src = window.URL.createObjectURL(mediaSource);
          mediaSource.addEventListener("sourceended", function sourceEnded() {
            component.status = "Media source ended";
          });
          mediaSource.addEventListener("sourceclose", function sourceClose() {
            component.status = "Media source closed";
          });
          mediaSource.addEventListener("sourceopen", function() {
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
