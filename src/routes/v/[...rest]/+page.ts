import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { verifiedFetch } from "@helia/verified-fetch";

export const ssr = false;

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
  return subsequence.every(function (value, index) {
    return value === data[offset + index];
  });
}
function containsSubsequence(needle, haystack) {
  let startIndex = haystack.indexOf(needle[0]);
  do {
    if (isSubsequenceOf(needle, startIndex, haystack)) {
      return true;
    }
    startIndex = haystack.indexOf(needle[0], startIndex + 1);
  } while (startIndex > 0);
  return false;
}
function findFirstSubsequence(needles, haystack) {
  for (const needle_name in needles) {
    if (containsSubsequence(needles[needle_name], haystack)) {
      return needle_name;
    }
  }
  return undefined;
}
function mimeCodecFor(blob: Uint8Array) {
  //See also https://www.garykessler.net/library/file_sigs.html
  // mime, offset, magic bytes
  let container = "video/webm",
    codecs = "";
  const mimes: Array<[string, number, Uint8Array]> = [
      [
        "video/mp4",
        4,
        new Uint8Array([0x66, 0x74, 0x79, 0x70, 0x4d, 0x53, 0x4e, 0x56]),
      ],
      [
        "video/mp4",
        4,
        new Uint8Array([0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]),
      ],
      [
        "video/mp4",
        4,
        new Uint8Array([0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32]),
      ],
      ["video/webm", 0, new Uint8Array([0x1a, 0x45, 0xdf, 0xa3])],
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

export const load: PageLoad = async ({ params }) => {
  if (!params.rest) {
    error(404, "Not found");
  }
  const path = params.rest;
  let title = path;
  let isIpns = false;
  if (title.includes("/")) {
    const parts = title.split("/");
    title = parts[parts.length - 1];
    if (parts[0].includes(".")) {
      isIpns = true;
    }
  }

  const ipfsUrl = isIpns ? `ipns://${path}` : `ipfs://${path}`;
  const response = await verifiedFetch(ipfsUrl);
  if (!response.ok) {
    error(response.status, response.statusText);
  }
  const bigFileStreamReader = await response.body?.getReader();
  if (!bigFileStreamReader) {
    error(500, "Failed to getReader");
  }
  const firstChunk = await bigFileStreamReader?.read();
  if (!firstChunk || firstChunk.done) {
    error(500, "Failed to read data");
  }
  const videoMimetype = mimeCodecFor(firstChunk.value);

  const mediaSource = new MediaSource();
  const videoSrc = URL.createObjectURL(mediaSource);

  mediaSource.addEventListener("sourceopen", (event) => {
    console.log("MediaSource sourceopen:", event);
    // Add source buffers and begin adding media data.
    const sourceBuffer = mediaSource.addSourceBuffer(videoMimetype);
    sourceBuffer.appendBuffer(firstChunk.value);
  });

  mediaSource.addEventListener("sourceended", () => {
    URL.revokeObjectURL(videoSrc);
  });

  // console.log(nextChunk);
  return {
    title: title,
    videoSrc: videoSrc,
  };
};
