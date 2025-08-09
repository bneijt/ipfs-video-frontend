import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { verifiedFetch } from "@helia/verified-fetch";

export const ssr = false;

function getFileNameFromPath(path: string): string {
  // Try to extract the last non-empty segment as filename
  const parts = path.split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "download";
}

export const load: PageLoad = async ({ params }) => {
  if (!params.rest) {
    error(404, "Not found");
  }

  const pathElements = params.rest.split("/");
  const protocol = pathElements[0];
  const path = pathElements.slice(1).join("/");
  const ipfsUrl = `${protocol}://${path}`;
  if (!["ipfs", "ipns"].includes(protocol)) {
    error(
      400,
      `Invalid protocol '${protocol}', only 'ipfs' and 'ipns' are supported`,
    );
  }

  // Fetch HEAD to get content-type and content-disposition if available
  let fileName = getFileNameFromPath(path);
  let mimeType = "application/octet-stream";
  try {
    const headResp = await verifiedFetch(ipfsUrl, { method: "HEAD" });
    if (headResp.ok) {
      const contentDisposition = headResp.headers.get("content-disposition");
      if (contentDisposition) {
        const match = /filename="?([^\"]+)"?/.exec(contentDisposition);
        if (match) {
          fileName = match[1];
        }
      }
      const ct = headResp.headers.get("content-type");
      if (ct) {
        mimeType = ct;
      }
    }
  } catch (e) {
    // HEAD may not be supported, fallback to GET
  }

  // We'll use GET for the actual download in the browser
  return {
    title: `Download ${fileName}`,
    ipfsUrl,
    fileName,
    mimeType,
  };
};
