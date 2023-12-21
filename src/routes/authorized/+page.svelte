<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';
	import Gen1Art from 'assets/Gen_01_Art.jpg';
	import Gen2Art from 'assets/Gen_02_Art.jpg';

	export let data: PageData;
	back_url.set('');
</script>

<main class="grid grid-cols-2 place-items-center text-text p-4 gap-4 md:mx-32 lg:mx-48 xl:mx-64 2xl:mx-96">
	{#each data.page_data ?? [] as map}
		<a href="/authorized/{map.name}/" class="bg-surface2 text-4xl p-8 w-full h-full text-center rounded-2xl flex flex-col gap-4">
			<span>{map.name}</span>
			<img src={map.name.includes('1') ? Gen1Art : Gen2Art} alt="Art" class="rounded-xl">
		</a>
	{/each}
</main>
