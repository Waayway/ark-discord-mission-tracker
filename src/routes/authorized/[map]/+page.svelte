<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';
	import SearchMissions from 'components/SearchMissions.svelte';

	export let data: PageData;
	back_url.set('/authorized/');
</script>

<main class="text-text p-4 flex">
	<div class="col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-min w-3/4">
		{#each data.map.Places as biome}
		<a
		href="/authorized/{data.map.name}/{biome.name}/"
		class="bg-surface2 p-8 text-2xl rounded-2xl w-full"
		>
		<h3>{biome.name}</h3>
		<ul>
			<li>
				Total missions (including all difficulties): {data.place_stats[biome.name].tot_missions + data.place_stats[biome.name].tot_singles}
			</li>
			<li>
				<span class="text-red">Alpha</span> missions Done: {data.place_stats[biome.name]
						.alpha_missions_done}/{data.place_stats[biome.name].tot_missions / 3}
				</li>
				<li>
					<span class="text-blue">Beta</span> missions Done: {data.place_stats[biome.name]
						.beta_missions_done}/{data.place_stats[biome.name].tot_missions / 3}
				</li>
				<li>
					<span class="text-green">Gamma</span> missions Done: {data.place_stats[biome.name]
						.gamma_missions_done}/{data.place_stats[biome.name].tot_missions / 3}
				</li>
				<li>
					<span class="text-pink">Glitch</span> missions Done: {data.place_stats[biome.name]
						.singles_missions_done}/{data.place_stats[biome.name].tot_singles}
				</li>
			</ul>
		</a>
		{/each}
	</div>
	<SearchMissions missions={data.missions} map={data.map.name} />
</main>