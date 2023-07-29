<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	back_url.set('/authorized/');
</script>

<main class="grid grid-cols-2 place-items-center text-text mt-16 gap-4">
	{#each data.map.Places as biome}
		<a
			href="/authorized/{data.map.name}/{biome.name}/"
			class="bg-surface2 p-8 text-2xl w-fit rounded-2xl"
		>
			<h3>{biome.name}</h3>
			<ul>
				<li>
					Total missions (including all difficulties): {data.place_stats[biome.name].tot_missions}
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
			</ul>
		</a>
	{/each}
</main>
