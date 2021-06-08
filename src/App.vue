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
          <a href="/gw/QmaNhV3gWt9TuDpWakUsBDSZw3CuNjur1YXqHV7zxzZrAZ"
            >Blender Half full</a
          >, the
          <a href="/ipfs/QmSTzsKPwsbyQQ8xQ92G34mmnjDNs7LGk88UGcKDPTZExh"
            >demo video</a
          > from
          <a href="https://ipfstube.erindachtler.me/"
            >ipfstube.erindachtler.me</a
          >, a
          <a href="/gw/QmawxGDUERBSJpyosS4KqiDCHSBwPihoGuDLw8bYrE2u6f"
            >talk by Alan Kay</a
          >, the free movie
          <a href="/gw/Qmey31a4QZrBtSUApGexRLdvN8zQXCajqxjDCBrKj4LBk5"
            >Sita sings the blues</a
          >,
          <a href="/gw/QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP"
            >Big Buck Bunny</a
          >, <a href="http://www.caminandes.com/">Caminandes</a>
          <a href="/gw/QmQn4Wih8PYHBzrkq55y4gnrhe2z9SYtYnsLrJHGenNTXC">1</a>,
          <a href="/gw/QmWherR5qe1eyTpLrVQTLm67RR8jx7QhD4JbFY4CDBvzsh">2</a>,
          <a href="/gw/Qmf9AjaGDrAStj55mU2bkpa7jHMyD6tbDp5CZZfLsa6GgV">3</a> or
          simply a
          <a href="/gw/QmTYqoPYf7DiVebTnvwwFdTgsYXg2RnuPrt8uddjfW2kHS"
            >monkey video</a
          >
          downloaded from Pexels.
        </p>
        <p>
          Finaly
          <a href="https://www.reddit.com/r/IPFS_Hashes">reddit IPFS_Hashes</a>
          might have some IPFS video hashes as well.
        </p>
        <h2>IPFS directly vs gateway</h2>
        <p>IPFS directly is the coolest option, it uses ipfs-js in the browser to stream the video. However, there is <strong>only support for VP8 video with opus audio in a webm container</strong>. Meanwhile the gateway uses ipfs.io to directly download the video and allows for all content that is currently supported by your browsers video element. 
        </p>
        <p>If you want to host a video directly from IPFS, make sure you recode it first. For example, to recode a file called <code>monkey.avi</code> you could use <code>ffmpeg</code> with the following commandline:
        <pre>
          <code>
          </code>
        </pre>
        </p>
        <h2>Submit issues</h2>
        <p>
          This project is open source and you are invited to submit issues and bugs at <a href="https://github.com/bneijt/ipfs-video-frontend">the Github project page</a>.
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
            >Pinata</a>: a simple web interface to easily manage and pin content on IPFS.
        </p>
        <p>
          A project to help you host your own IPFS pinning gateway easily:<a
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
