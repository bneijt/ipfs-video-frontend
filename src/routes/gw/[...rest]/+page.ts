import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  // If there is a slash in the rest, we take the last part as the title
  if (!params.rest) {
    error(404, "Not found");
  }
  let title = params.rest.trim();
  if (title.includes("/")) {
    const parts = title.split("/");
    title = parts[parts.length - 1];
  }

  return {
    title: title,
    videoSrc: `https://ipfs.io/ipfs/${params.rest}`,
  };
};
