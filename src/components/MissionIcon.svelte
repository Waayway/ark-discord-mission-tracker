<script lang="ts">
	import type { Icons } from 'lib/types';
	import Basketball from 'assets/Basketball.png';
	import Escort from 'assets/Escort.png';
	import Fishing from 'assets/Fishing.png';
	import Gather from 'assets/Gather.png';
	import Gauntlet from 'assets/Gauntlet.png';
	import Hunt from 'assets/Hunt.png';
	import Race from 'assets/Race.png';
	import Retrieval from 'assets/Retrieval.png';
	import InactiveMission from 'assets/InactiveMission.png';

	export let icon: Icons;
	export let size: String = '32';

	let icon_src = '';
	switch (icon) {
		case 'basketball':
			icon_src = Basketball;
			break;
		case 'escort':
			icon_src = Escort;
			break;
		case 'fishing':
			icon_src = Fishing;
			break;
		case 'gather':
			icon_src = Gather;
			break;
		case 'gauntlet':
			icon_src = Gauntlet;
			break;
		case 'hunt':
			icon_src = Hunt;
			break;
		case 'race':
			icon_src = Race;
			break;
		case 'retrieval':
			icon_src = Retrieval;
			break;
		case 'other':
			icon_src = InactiveMission;
			break;
		default:
			break;
	}
</script>

{#if icon}
	<img src={icon_src} alt="" class="w-{size} h-{size}" />
{/if}
