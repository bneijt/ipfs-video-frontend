<template>
  <div class="content">
    <h1 class="title">Welcome to the IPFS video player</h1>
    <p>
      Below is a form where you can put in the
      <a href="https://docs.ipfs.io/guides/concepts/cid/"
        >IPFS content id or path</a
      >
      of the video you would like to see and choose to use either IPFS directly
      or a gateway.
    </p>
    <p>
      If you have not found any good example to view yet, you can try
      <router-link to="/ipfs/QmQWM1qDPasxm5sXAQeVMfmhnECBzyYkLgfK23yPif1Ftx"
        >Blender Half full</router-link
      >, a
      <router-link
        to="/ipfs/Qme4QjkyZQuFtN2SDhELfXVshMyAEec53jaFQ8kR4maLeV/Alan Kay at OOPSLA 1997 - The computer revolution hasnt happened yet.webm"
        >talk by Alan Kay</router-link
      >,
      <router-link to="/ipfs/Qmcd7D6TnnzZzsk12DBwCMRYx1a8TVX4tq4eemYqspL4Rv"
        >a 4K UHD chick</router-link
      >
      from
      <a
        href="https://www.pexels.com/video/close-up-video-of-a-person-holding-a-chick-5913245/"
        >Pexel videos</a
      >,
      <router-link to="/ipfs/QmbGtJg23skhvFmu9mJiePVByhfzu5rwo74MEkVDYAmF5T"
        >Big Buck Bunny</router-link
      >, or the
      <a href="https://cloud.blender.org/films/caminandes-2/">Caminandes</a>
      series
      <router-link
        to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/01_llama_drama_1080p.webm"
        >1</router-link
      >,
      <router-link
        to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/02_gran_dillama_1080p.webm"
        >2</router-link
      >,
      <router-link
        to="/ipfs/QmYHDhsgUgdKSAimguGC92MzQ8VNFHZw3yp6kAHwiXCFLm/03_caminandes_llamigos_1080p.webm"
        >3</router-link
      >.
    </p>
  </div>
  <div class="block">
    <path-form />
  </div>
  <div class="content">
    <h2>IPFS directly vs gateway</h2>
    <p>
      IPFS directly is the coolest option, it uses
      <a href="https://js.ipfs.io/">js-ipfs</a> in the browser to stream the
      video. However, there is
      <em>only support for VP8 video with OPUS audio in a WEBM container</em>.
    </p>
    <p>
      The gateway uses <a href="https://ipfs.io/">ipfs.io</a> to access the
      video via an HTTP gateway. This supports all video content supported by
      your browser, but does not use cool technology.
    </p>
    <p>
      If you want to host a video directly from IPFS, make sure you recode it
      first. For example, to recode a file called <code>monkey.avi</code> you
      could use <code>ffmpeg</code> with the following commandline:
    </p>
    <pre>
ffmpeg -i monkey.avi -c:v libvpx -crf 45 -b:v 10M -r 25 -c:a libopus -b:a 96K monkey.webm</pre
    >
    <p>
      Host the resulting <code>monkey.webm</code> on IPFS and point this website
      to the CID or path. If you have bash available, you can also download
      <a
        href="https://github.com/bneijt/ipfs-video-frontend/blob/main/recode_vp8_webm.sh"
        >a recode script from GitHub</a
      >.
    </p>
    <h2>Submit issues</h2>
    <p>
      This project is open source and you are invited to submit issues at
      <a href="https://github.com/bneijt/ipfs-video-frontend"
        >the Github project page</a
      >.
    </p>
    <h2>See also</h2>
    <p>
      <a href="https://ipfs-search.com/#/search?search=webm">ipfs-search</a>, which allows you to search for webm video's as well as all other content.
    </p>
    <p>
      A <a href="https://kodi.tv/">Kodi</a> plugin under development that will
      complement this website, available at:<a
        href="https://github.com/bneijt/ipfs-video-kodi"
        >https://github.com/bneijt/ipfs-video-kodi</a
      >
    </p>
    <p>
      <a href="https://ipfstube.erindachtler.me/">IPFSTube</a>: same idea, but
      different implementation. Has a great
      <a
        href="https://ipfstube.erindachtler.me/v/QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC"
        >demo video</a
      >.
    </p>
    <p>
      <a href="https://pinata.cloud/">Pinata</a>: a simple web interface to
      easily manage and host/pin content on IPFS.
    </p>
    <p>
      <a href="https://www.reddit.com/r/IPFS_Hashes">Reddit IPFS_Hashes</a>: a
      reddit page where people share IPFS hashes, some are video hashes as well.
    </p>
    <p>
      A project to help you host your own IPFS pinning gateway easily:
      <a href="https://github.com/bneijt/ipfs-video-gateway"
        >https://github.com/bneijt/ipfs-video-gateway</a
      >
    </p>
  </div>
</template>

<script>
export default {};
</script>
