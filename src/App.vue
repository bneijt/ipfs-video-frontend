<template>
  <path-form />
  <div class="columns">
    <div class="column">
      <div class="content">
        <h2>Welcome to the IPFS video player</h2>
        <p>
          At the top, you can use the form to put in your custom
          <a href="https://docs.ipfs.io/guides/concepts/cid/"
            >IPFS content id or path</a
          >. If you have not found any good example to view yet, you can try
          <router-link to="/ipfs/QmQWM1qDPasxm5sXAQeVMfmhnECBzyYkLgfK23yPif1Ftx"
            >Blender Half full</router-link
          >, a
          <router-link to="/ipfs/QmcgsX3wy8tLUXpKwgwUQZnEgsU6LGJuuXyk4R7uGryefL"
            >talk by Alan Kay</router-link
          >,
          <router-link to="/ipfs/QmbGtJg23skhvFmu9mJiePVByhfzu5rwo74MEkVDYAmF5T">Big Buck Bunny</router-link>,
          or the Caminandes series
          <router-link to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/01_llama_drama_1080p.webm">1</router-link>,
          <router-link to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/02_gran_dillama_1080p.webm">2</router-link>,
          <router-link to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/03_caminandes_llamigos_1080p.webm">3</router-link>.
        </p>
        <h2>IPFS directly vs gateway</h2>
        <p>IPFS directly is the coolest option, it uses <a href="https://js.ipfs.io/">js-ipfs</a> in the browser to stream the video. 
        However, there is <em>only support for VP8 video with OPUS audio in a WEBM container</em>.
        </p>
        <p>
         The gateway uses <a href="https://ipfs.io/">ipfs.io</a> to access the video via an HTTP gateway. This supports all video content supported by your browser, but does not use cool technology. 
        </p>
        <p>If you want to host a video directly from IPFS, make sure you recode it first. For example, to recode a file called <code>monkey.avi</code> you could use <code>ffmpeg</code> with the following commandline:
        <pre>ffmpeg -i monkey.avi -c:v libvpx -crf 45 -b:v 10M -r 25 -c:a libopus -b:a 96K monkey.webm</pre>
        Host the resulting <code>monkey.webm</code> on IPFS and point this website to the CID or path. If you have bash available you can also download <a href="https://github.com/bneijt/ipfs-video-frontend/blob/main/recode_webm.sh">a recode script from github</a>.
        </p>
        <h2>Submit issues</h2>
        <p>
          This project is open source and you are invited to submit issues at <a href="https://github.com/bneijt/ipfs-video-frontend">the Github project page</a>.
        </p>
        <h2>See also</h2>
        <p>
          A <a href="https://kodi.tv/">Kodi</a> plugin under development that
          will complement this website, available at:<a
            href="https://github.com/bneijt/ipfs-video-kodi"
            >https://github.com/bneijt/ipfs-video-kodi</a
          >
        </p>
        <p>
          <a
            href="https://pinata.cloud/"
            >Pinata</a>: a simple web interface to easily manage and host/pin content on IPFS.
        </p>
        <p>          
          <a href="https://www.reddit.com/r/IPFS_Hashes">Reddit IPFS_Hashes</a>: a reddit page where people share IPFS hashes, some are video hashes as well.
        </p>
        <p>
          A project to help you host your own IPFS pinning gateway easily: <a
            href="https://github.com/bneijt/ipfs-video-gateway"
            >https://github.com/bneijt/ipfs-video-gateway</a
          >
        </p>
      </div>
    </div>
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
