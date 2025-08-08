<script lang="ts">
    import type { PageProps } from "./$types";
    import IpfsLinks from "$lib/components/IpfsLinks.svelte";

    let { data }: PageProps = $props();
</script>

<h1>{data.title}</h1>
<div>
    <video
        src={data.videoSrc}
        ontimeupdate={data.videoOnTimeupdate}
        onabort={data.videoOnAbort}
        onerror={data.videoOnError}
        autoplay
        muted
        controls
    >
        <track kind="captions" />
    </video>
</div>
<div>
    <p>IPFS URL: {data.ipfsUrl}</p>
    <p>Alternatives:</p>
    <IpfsLinks ipfsUrl={data.ipfsUrl} />
</div>
