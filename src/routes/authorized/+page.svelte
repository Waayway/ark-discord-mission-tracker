<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;
    console.log(data);
</script>

<main class="grid grid-cols-2 place-items-center text-text mt-16">
    {#each data.page_data ?? [] as map}
    <a href="/authorized/{map.name}/" class="bg-surface2  text-2xl p-8 w-fit rounded-2xl">
        {map.name}
    </a>
    {/each}
</main>
