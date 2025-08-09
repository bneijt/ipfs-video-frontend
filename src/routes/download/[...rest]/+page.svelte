<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let downloading = false;
  let errorMsg: string | null = null;
  let progress = 0;
  let fileUrl: string | null = null;
  let fileName: string = data.fileName ?? "downloaded-file";

  async function downloadFile() {
    downloading = true;
    errorMsg = null;
    progress = 0;
    fileUrl = null;

    try {
      // Fetch the file as a stream from the IPFS URL
      const response = await fetch(data.ipfsUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      // Try to get filename from headers if not provided
      const contentDisposition = response.headers.get("content-disposition");
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^\"]+)"?/);
        if (match) {
          fileName = match[1];
        }
      }

      const contentLength = response.headers.get("content-length");
      const total = contentLength ? parseInt(contentLength) : null;

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream reader available");

      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          received += value.length;
          if (total) {
            progress = Math.round((received / total) * 100);
          }
        }
      }

      // Combine chunks into a single Blob
      const blob = new Blob(chunks, { type: data.mimeType ?? "application/octet-stream" });
      fileUrl = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up after a short delay
      setTimeout(() => {
        if (fileUrl) URL.revokeObjectURL(fileUrl);
      }, 10000);

    } catch (err: any) {
      errorMsg = err.message || "Unknown error";
    } finally {
      downloading = false;
    }
  }

  onMount(() => {
    downloadFile();
  });
</script>

<h1>Download from IPFS</h1>

{#if errorMsg}
  <div class="notification is-danger">
    Error: {errorMsg}
  </div>
{:else if downloading}
  <div class="notification is-info">
    Downloading... {progress ? `${progress}%` : ""}
  </div>
{:else}
  <div class="notification is-success">
    Download should start automatically.<br>
    If not, <button class="button is-link" on:click={downloadFile}>click here</button>.<br>
    <small>File: <code>{fileName}</code></small>
  </div>
{/if}
