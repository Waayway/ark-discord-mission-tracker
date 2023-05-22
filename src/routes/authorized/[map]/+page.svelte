<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main class="grid grid-cols-2 place-items-center text-text mt-16 gap-4">
    {#each data.map.Places as biome}
        <a href="/authorized/{data.map.name}/{biome.name}/" class="bg-surface2 p-8 text-2xl w-fit rounded-2xl">
            {biome.name}
        </a>
    {/each}
</main>