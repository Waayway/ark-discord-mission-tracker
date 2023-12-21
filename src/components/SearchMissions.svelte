<script lang="ts">
	import { IconsList, type Icons } from "lib/types";
	import MissionIcon from "./MissionIcon.svelte";

    export let missions: {
        title: string;
        icon: string;
        place: {
            name: string;
        }
    }[] = [];
    export let map: string = '';

    let search = '';

    const filter_missions = () => {
        filtered = missions.filter(mission => {
            return mission.title.toLowerCase().includes(search.toLowerCase()) && (!cur_icon || mission.icon == cur_icon);
        }).slice(0, 20);
    }
    
    let filtered = missions.filter(mission => {
        return mission.title.toLowerCase().includes(search.toLowerCase());
    }).slice(0, 20);

	let cur_icon: Icons = undefined;
</script>

<div class="flex flex-col mx-8 text-xl w-1/4">
    <h2 class="text-2xl mb-4">Search Missions</h2>

    <input type="text" bind:value={search} on:keyup={filter_missions} class="mb-4 bg-mantle px-4 py-3 w-full outline-none text-text rounded-xl text-xl" placeholder="Search...">

    <div class="flex flex-wrap my-2">
        {#each IconsList as icon}
        <button
            class:bg-green={icon == cur_icon}
            class:text-black={icon == cur_icon}
            on:click={() => {
                if (cur_icon == icon)
                    cur_icon = undefined;
                else
                    cur_icon = icon;
                filter_missions();
            }}
            class="p-1 rounded-lg transition-colors text-white"
        >
            <MissionIcon icon={icon} size="12" />
        </button>
        {/each}
    </div>

    {#each filtered as mission}
        <a href="/authorized/{map}/{mission.place.name}/{mission.title}">{mission.title}</a>
    {/each}
</div>