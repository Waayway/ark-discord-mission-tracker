<script lang="ts">
	import MissionPopup from 'components/MissionPopup.svelte';
	import type { PageData } from './$types';
	import MissionIcon from 'components/MissionIcon.svelte';
	import { isValidIcon } from 'lib/types';
	import { back_url } from 'lib/stores';

	back_url.set('');

	export let data: PageData;
	let new_map = {
		enabled: false,
		disable: false,
		name: ''
	};
	const create_new_map = async () => {
		new_map.disable = true;
		new_map.name = '';
		let res = await fetch('/admin/api/new_map', {
			method: 'POST',
			body: new_map.name
		});
		let data = await res.json();
	};
	let new_place = {
		enabled: false,
		name: '',
		map_id: -1
	};
	const create_new_place = async () => {
		new_place.enabled = false;
		new_place.name = '';
		new_place.map_id = -1;
	};
	const select_new_place = (map_id: number) => {
		if (new_place.enabled && new_place.map_id == map_id) return;
		new_place.enabled = true;
		new_place.name = '';
		new_place.map_id = map_id;
	};
	let new_mission = {
		enabled: false,
		name: '',
		explanation: '',
		icon: '',
		place_id: -1,
		error: ''
	};
	const open_new_mission_popup = (place_id: number) => {
		new_mission = {
			enabled: true,
			name: '',
			explanation: '',
			icon: '',
			place_id: place_id,
			error: ''
		};
	};
	const close_new_mission_popup = async () => {
		new_mission.enabled = false;
	};
	let submit_mission_err = false;
	const set_mission_err = (reason: string) => {
		new_mission.error = reason;
		submit_mission_err = true;
	};
	const submit_new_mission = async () => {
		submit_mission_err = false;
		if (!new_mission.icon) set_mission_err('No icon is selected');
		if (!new_mission.name) set_mission_err('No name present');
		if (!new_mission.explanation) set_mission_err('No explanation Present');
		if (!submit_mission_err) {
			new_mission.error = '';
		} else {
			return;
		}

		let res = await fetch('/admin/api/new_mission', {
			method: 'POST',
			body: JSON.stringify({
				name: new_mission.name,
				explanation: new_mission.explanation,
				icon: new_mission.icon,
				place_id: new_mission.place_id
			})
		});
		let dat = await res.json();
		if (dat['error'] == undefined) {
			location.reload();
		}
	};
</script>

<main class="text-text mt-16 gap-4 flex flex-col items-center">
	<h1 class="col-span-2 text-5xl">Details</h1>
	{#each data.maps ?? [] as map}
		<h3 class="text-2xl w-fit rounded-2xl">
			{map.name}
		</h3>
		<ul class="text-center">
			{#each map.Places as place}
				<li>
					<h3 class="text-xl">{place.name}</h3>
					<ul>
						{#each place.Mission as mission}
							<li>
								<a href="/admin/{mission.title}">
									<div class="flex items-center gap-2">
										<MissionIcon icon={isValidIcon(mission.icon)} size="12" />
										<h3>{mission.title}</h3>
									</div>
									<p class="w-64 text-left">{mission.explanation}</p>
								</a>
							</li>
						{/each}
						<li>
							<button
								class="text-xl text-green"
								on:click={() => {
									open_new_mission_popup(place.id);
								}}>Create New Mission</button
							>
						</li>
					</ul>
				</li>
			{/each}
			<li>
				{#if !(new_place.enabled && new_place.map_id == map.id)}
					<button
						class="text-xl text-blue"
						on:click={() => {
							select_new_place(map.id);
						}}>Create New Place</button
					>
				{:else}
					<div class="grid grid-cols-2 gap-4 mt-2">
						<input
							type="text"
							bind:value={new_map.name}
							class="bg-overlay1 p-2 rounded-lg col-span-2"
						/>
						<button
							on:click={() => {
								new_place.enabled = false;
							}}
							class="bg-red p-2 rounded-lg text-white">Cancel</button
						>
						<button on:click={create_new_map} class="bg-blue p-2 rounded-lg text-white"
							>Submit</button
						>
					</div>
				{/if}
			</li>
		</ul>
	{/each}
	<button
		class="text-2xl w-fit rounded-2xl col-span-2 text-red"
		on:click={() => {
			new_map.enabled = !new_map.disable;
			new_map.disable = false;
		}}
	>
		{#if !new_map.enabled}
			New Map
		{:else}
			<div class="grid grid-cols-2 gap-4">
				<input
					type="text"
					bind:value={new_map.name}
					class="bg-overlay1 p-2 rounded-lg col-span-2"
				/>
				<button
					on:click={() => {
						new_map.disable = true;
						new_map.name = '';
					}}
					class="bg-red p-2 rounded-lg text-white">Cancel</button
				>
				<button on:click={create_new_map} class="bg-blue p-2 rounded-lg text-white">Submit</button>
			</div>
			submit_new_mission
		{/if}
	</button>
	{#if new_mission.enabled}
		<MissionPopup
			bind:name={new_mission.name}
			bind:explanation={new_mission.explanation}
			bind:cur_icon={new_mission.icon}
			cancel_callback={close_new_mission_popup}
			submit_callback={submit_new_mission}
			error={new_mission.error}
		/>
	{/if}
</main>
