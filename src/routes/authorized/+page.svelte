<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';
	import Gen1Art from 'assets/Gen_01_Art.jpg';
	import Gen2Art from 'assets/Gen_02_Art.jpg';

	export let data: PageData;
	back_url.set('');
</script>

<main
	class="grid grid-cols-2 place-items-center text-text p-4 gap-4 md:mx-32 lg:mx-48 xl:mx-64 2xl:mx-96"
>
	{#each data.page_data ?? [] as map}
		<a
			href="/authorized/{map.name}/"
			class="bg-surface2 text-4xl p-8 w-full h-full text-center rounded-2xl flex flex-col gap-4"
		>
			<span>{map.name}</span>
			<img src={map.name.includes('1') ? Gen1Art : Gen2Art} alt="Art" class="rounded-xl" />
			<ul class="text-lg text-left">
				<li>
					<span class="font-bold">Total missions</span> (including all difficulties): {map.total_missions + map.total_singles}
				</li>
				<li>
					<span class="text-red">Alpha</span> missions Done: {map.alpha}/{map.total_missions / 3}
				</li>
				<li>
					<span class="text-blue">Beta</span> missions Done: {map.beta}/{map.total_missions / 3}
				</li>
				<li>
					<span class="text-green">Gamma</span> missions Done: {map.gamma}/{map.total_missions / 3}
				</li>
				
				<li>
					<span class="text-pink">Glitch</span> missions Done: {map.singles}/{map.total_singles}
				</li>
			</ul>
		</a>
	{/each}
</main>
