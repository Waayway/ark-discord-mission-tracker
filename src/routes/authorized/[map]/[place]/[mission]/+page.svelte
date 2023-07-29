<script lang="ts">
	import MissionIcon from 'components/MissionIcon.svelte';
	import { routeToPage } from 'lib/routing';
	import type { Icons } from 'lib/types';
	import { capitalizeFirstCharacter } from 'lib/utils';
	import type { PageData } from './$types';
	import { back_url } from 'lib/stores';

	export let data: PageData;
	back_url.set(`/authorized/${data.map}/${data.place}/`);
	let difficulties = ['alpha', 'beta', 'gamma'];
	let diff_to_color = {
		alpha: 'red',
		beta: 'blue',
		gamma: 'green'
	};
	let get_color = (diff: string) => {
		return diff_to_color[diff as keyof typeof diff_to_color];
	};
	let checkIfDiffHasBeenCompleted = (diff: string): boolean => {
		if (diff == 'alpha') {
			return data.data?.userAlphaId != null;
		} else if (diff == 'beta') {
			return data.data?.userBetaId != null;
		} else if (diff == 'gamma') {
			return data.data?.userGammaId != null;
		}
		return false;
	};
	const isValidIcon = (icon: string | undefined): Icons | undefined => {
		if (!icon) {
			return;
		}
		return icon as Icons;
	};
	const complete_difficulty = async (diff: string) => {
		let res = await fetch(`/authorized/${data.map}/${data.place}/${data.mission}/complete`, {
			method: 'POST',
			body: diff
		});
		if (res.status == 200) {
			console.log(res);
			routeToPage(`/authorized/`);
		}
	};
	const generateTextForDiff = (diff: string) => {
		if (checkIfDiffHasBeenCompleted(diff)) {
			return capitalizeFirstCharacter(diff) + ', click to reset';
		}
		return capitalizeFirstCharacter(diff);
	};
</script>

<main>
	<div class="bg-surface2 text-text max-w-screen-lg mx-auto mt-8 p-4 rounded-2xl">
		<h1 class="text-4xl mb-2 flex items-center">
			<MissionIcon icon={isValidIcon(data.data?.icon)} />{data.data?.title}
		</h1>
		<p>{data.data?.explanation}</p>
		<h1 class="text-4xl my-2 text-center">Click on the difficulty below to complete</h1>
		<ul class="flex justify-around mt-8">
			{#each difficulties as diff}
				<li>
					<button
						on:click={async () => {
							await complete_difficulty(diff);
						}}
						class="text-xl text-{get_color(diff)}"
						class:text-text={checkIfDiffHasBeenCompleted(diff)}>{generateTextForDiff(diff)}</button
					>
				</li>
			{/each}
		</ul>
	</div>
</main>
