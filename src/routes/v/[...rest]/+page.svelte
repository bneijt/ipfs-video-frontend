<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<h1>{data.title}</h1>
<div>
    <video src={data.videoSrc} autoplay muted controls>
        <track kind="captions" />
    </video>
</div>
