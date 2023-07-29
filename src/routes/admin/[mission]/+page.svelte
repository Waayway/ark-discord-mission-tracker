<script lang="ts">
	import { back_url } from 'lib/stores';
	import type { PageData } from './$types';
	import MissionIcon from 'components/MissionIcon.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';
	import { isValidIcon } from 'lib/types';
	import { goto } from '$app/navigation';

	back_url.set('/admin');

	export let data: PageData;
	let cur_place = data.mission.placeId;
	let mission = {
		title: data.mission.title,
		explanation: data.mission.explanation
	};
	const commit_changes = async () => {
		let res = await fetch(`/admin/${data.mission.title}/edit`, {
			method: 'POST',
			body: JSON.stringify({
				title: mission.title,
				explanation: mission.explanation,
				place_id: cur_place
			})
		});
		if (res.status == 200) {
			goto('/admin');
		} else {
			console.log(await res.json());
		}
	};
	const delete_mission = async () => {
		let res = await fetch(`/admin/${data.mission.title}/delete`, {
			method: 'DELETE'
		});
		if (res.status == 200) {
			goto('/admin');
		} else {
			console.log(await res.json());
		}
	};
</script>

<main class="grid place-items-center">
	<div class="text-text m-4 bg-surface1 p-4 rounded-2xl gap-4">
		<div class="flex items-center">
			<MissionIcon icon={isValidIcon(data.mission.icon)} />
			<div>
				<h1 class="text-2xl" contenteditable bind:innerText={mission.title} />
				<div>
					<span>Current Place: </span>
					<select bind:value={cur_place} class="bg-surface2 p-1 rounded-xl">
						{#each data.places as place}
							<option value={place.id}>
								{place.name}
							</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="w-16 flex flex-col justify-between">
				<button class="text-red" on:click={delete_mission}>
					<MdDelete />
				</button>
				<button class="text-green" on:click={commit_changes}>
					<MdSave />
				</button>
			</div>
		</div>
		<p class="w-96" contenteditable bind:innerText={data.mission.explanation} />
	</div>
</main>
