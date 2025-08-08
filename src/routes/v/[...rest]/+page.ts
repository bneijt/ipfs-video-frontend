import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { verifiedFetch } from "@helia/verified-fetch";
import { mimeCodecFor } from "$lib/mimeDetection";

export const ssr = false;

class VideoBufferLoader {
  readonly bufferMeasureSeconds = 60; // approximate buffer time in seconds
  readonly inputStream: ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>>;
  readonly mediaSource: MediaSource;
  outputBuffer?: SourceBuffer;
  mediaElement?: HTMLMediaElement;

  constructor(
    inputStream: ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>>,
    mediaSource: MediaSource,
  ) {
    this.inputStream = inputStream;
    this.mediaSource = mediaSource;
  }

  async dropOldBuffer() {
    return;
    if (this.outputBuffer === undefined) {
      console.debug("Output buffer not set, skipping drop.");
      return;
    }
    if (this.outputBuffer.updating) {
      console.debug("Output buffer is currently updating, skipping drop.");
      return;
    }
    const buffered = this.outputBuffer.buffered;

    if (buffered.length == 0) {
      console.debug("Nothing to drop");
      setTimeout(() => {
        this.tryAddChunk();
      }, 200);
      return;
    }

    if (this.mediaElement === undefined) {
      console.debug("Media element not set, skipping add chunk.");
      return;
    }

    const currentTime = this.mediaElement.currentTime;

    if (buffered.start(0) < currentTime - this.bufferMeasureSeconds) {
      console.debug("Dropping from buffer start", buffered.start(0));
      this.outputBuffer.remove(buffered.start(0), currentTime - 2);
    }
  }

  async tryAddChunk() {
    if (this.mediaElement === undefined) {
      console.debug("Media element not set, skipping add chunk.");
      return;
    }

    if (this.outputBuffer === undefined) {
      console.debug("Output buffer not set, skipping update.");
      return;
    }
    if (this.outputBuffer.updating) {
      console.debug("Output buffer is currently updating, skipping update.");
      return;
    }

    const buffered = this.outputBuffer.buffered;
    const currentTime = this.mediaElement.currentTime;

    // We add data if there is nothing in the buffer or we see room
    const shouldAddChunk =
      buffered.length == 0 ||
      buffered.end(buffered.length - 1) - currentTime <
        this.bufferMeasureSeconds;
    console.debug(
      `Should add chunk: ${shouldAddChunk}, currentTime: ${currentTime}, buffered ${buffered.start(0)} - ${buffered.end(buffered.length - 1)} (${buffered.length})`,
    );

    if (shouldAddChunk) {
      console.log(
        `Adding to already buffered ${buffered.start(0)} - ${buffered.end(buffered.length - 1)}`,
      );
      const nextChunk = await this.inputStream.read();

      if (nextChunk.done) {
        console.log("No more data to read, ending source buffer.");
        this.mediaSource.endOfStream();
        return;
      }

      console.log("Got bytes", nextChunk.value?.length);

      try {
        this.outputBuffer.appendBuffer(nextChunk.value);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "QuotaExceededError"
        ) {
          console.error("QuotaExceededError, sorry failed to play");
          alert("QuotaExceededError, sorry failed to play");
        }
      }
    }
  }
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
  const bufferLoader = new VideoBufferLoader(bigFileStreamReader, mediaSource);
  mediaSource.addEventListener("sourceopen", (sourceOpenEvent) => {
    console.log("MediaSource sourceopen:", sourceOpenEvent);
    // Add source buffers and begin adding media data.
    const sourceBuffer = mediaSource.addSourceBuffer(videoMimetype);
    if (sourceBuffer.mode == "segments") {
      console.log("Setting buffer mode to sequence");
      sourceBuffer.mode = "sequence";
    }

    sourceBuffer.addEventListener("abort", (abortEvent) => {
      console.log("SourceBuffer abort:", abortEvent);
    });
    sourceBuffer.addEventListener("error", (errorEvent) => {
      console.error("SourceBuffer error:", errorEvent);
    });
    sourceBuffer.addEventListener("updateend", () => {
      bufferLoader.dropOldBuffer();
    });
    sourceBuffer.appendBuffer(firstChunk.value);
    bufferLoader.outputBuffer = sourceBuffer;
  });

  mediaSource.addEventListener("sourceended", () => {
    URL.revokeObjectURL(videoSrc);
  });

  // console.log(nextChunk);
  return {
    title: title,
    videoSrc: videoSrc,
    ipfsUrl: ipfsUrl,
    onVideoTimeUpdate: (onTimeUpdateEvent: Event) => {
      bufferLoader.mediaElement = onTimeUpdateEvent.target as HTMLMediaElement;
      bufferLoader.tryAddChunk();
    },
  };
};
