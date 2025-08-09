<script lang="ts">
    export let ipfsUrl: string;

    //Parse url to extract the IPFS path
    const url = new URL(ipfsUrl);

    console.log("url", url);
    // Gateway URLs
    const urls = {
        localhost: "",
        ipfsIo: "",
        gw: "",
        video: "",
    };
    if (url.protocol.startsWith("ipfs")) {
        urls["localhost"] =
            `http://localhost:8080/ipfs/${url.hostname}${url.pathname}`;
        urls["ipfsIo"] = `https://ipfs.io/ipfs/${url.hostname}${url.pathname}`;
        urls["gw"] = `/gw/${url.hostname}${url.pathname}`;
        urls["video"] = `/gw/${url.hostname}${url.pathname}`;
    }
</script>

<div>
    <p>
        <b>Links</b>:

        {#if urls.localhost}
            <a href={urls.localhost}>localhost:8080</a>
        {/if}
        {#if urls.ipfsIo}
            <a href={urls.ipfsIo}>ipfs.io</a>
        {/if}
        {#if urls.gw}
            <a href={urls.gw}>gw</a>
        {/if}
        {#if urls.video}
            <a href={urls.video}>helia in browser</a>
        {/if}
    </p>
</div>
