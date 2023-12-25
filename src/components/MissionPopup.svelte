<script lang="ts">
	import { IconsList } from 'lib/types';
	import MissionIcon from './MissionIcon.svelte';
	import { capitalizeFirstCharacter } from 'lib/utils';

	export let name: String;
	export let explanation: String;
	export let cur_icon: String;
	export let submit_callback: () => Promise<void>;
	export let cancel_callback: () => Promise<void>;
	export let error: String;
	export let single: boolean;
</script>

<div
	class="w-screen h-screen fixed inset-0 z-50 bg-opacity-80 bg-slate-500 grid place-items-center"
>
	{#if error}
		<h1 class="bg-red w-3/4 p-4 text-center text-3xl text-white rounded-2xl">{error}</h1>
	{/if}

	<div class=" bg-overlay2 p-4 rounded-xl flex gap-2">
		<div class="h-full">
			<ul class="flex flex-col gap-2">
				{#each IconsList as icon}
					<li>
						<button
							class="p-1 rounded-lg transition-colors text-white"
							class:bg-green={icon == cur_icon}
							class:text-black={icon == cur_icon}
							on:click={() => {
								cur_icon = icon;
							}}
						>
							<MissionIcon {icon} size="16" />
							<p>{capitalizeFirstCharacter(icon)}</p>
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<div class="grid grid-cols-2 grid-rows-6 gap-4 text-white h-full">
				<input
					type="text"
					bind:value={name}
					class="bg-overlay1 p-2 rounded-lg col-span-2 text-2xl"
					placeholder="Name"
				/>
				<div class="col-span-2 row-span-5 flex flex-col">
					<h3>Explanation</h3>
					<textarea class="bg-overlay1 p-2 rounded-lg w-96 h-full" bind:value={explanation} />
					<div class="flex justify-center items-center gap-4 text-lg">
						<label for="single-mission">Is 1 difficulty?</label>
						<input type="checkbox" bind:checked={single} class="w-8 h-8" id="single-mission" />
					</div>
				</div>
				<button on:click={cancel_callback} class="bg-red p-2 rounded-lg">Cancel</button>
				<button on:click={submit_callback} class="bg-blue p-2 rounded-lg">Submit</button>
			</div>
		</div>
	</div>
</div>
