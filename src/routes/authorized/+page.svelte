<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	back_url.set('');
</script>

<main class="grid grid-cols-2 place-items-center text-text mt-16 gap-4">
	{#each data.page_data ?? [] as map}
		<a href="/authorized/{map.name}/" class="bg-surface2 text-2xl p-8 w-fit rounded-2xl">
			{map.name}
		</a>
	{/each}
</main>
