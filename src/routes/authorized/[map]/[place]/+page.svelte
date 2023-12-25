<script lang="ts">
	import MissionIcon from 'components/MissionIcon.svelte';
	import type { PageData } from './$types';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdDoNotDisturb from 'svelte-icons/md/MdDoNotDisturb.svelte';
	import type { Icons } from 'lib/types';
	import { back_url } from 'lib/stores';
	export let data: PageData;
	const isValidIcon = (icon: string): Icons => {
		return icon as Icons;
	};
	back_url.set(`/authorized/${data.map}/`);
</script>

<main class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center text-text gap-4 p-4">
	{#each data.data?.Mission ?? [] as mis}
		<div class="grid grid-cols-2 w-full h-full justify-between p-8 bg-surface2 rounded-2xl">
			<div>
				<h1 class="text-2xl">
					<MissionIcon icon={isValidIcon(mis.icon)} />{mis.title}
				</h1>
				<p>{mis.explanation}</p>
			</div>
			<div class="flex flex-col justify-between">
				{#if !mis.single}
				<ul class="text-right flex flex-col gap-2">
					<li class="flex items-center gap-4 justify-between">
						<span class="text-red">Alpha: </span>
						<div class="h-10 flex items-center gap-2">
							{#if mis.userAlphaId}<p>{mis.completedAlpha?.username}</p>
								<img class="h-10 rounded-full" src={mis.completedAlpha?.img} alt="" /><MdCheck
								/>{:else}<MdDoNotDisturb />{/if}
						</div>
					</li>
					<li class="flex items-center gap-4 justify-between">
						<span class="text-blue">Beta: </span>
						<div class="h-10 flex items-center gap-2">
							{#if mis.userBetaId}<p>{mis.completedBeta?.username}</p>
								<img class="h-10 rounded-full" src={mis.completedBeta?.img} alt="" /><MdCheck
								/>{:else}<MdDoNotDisturb />{/if}
						</div>
					</li>
					<li class="flex items-center gap-4 justify-between">
						<span class="text-green">Gamma: </span>
						<div class="h-10 flex items-center gap-2">
							{#if mis.userGammaId}<p>{mis.completedGamma?.username}</p>
								<img class="h-10 rounded-full" src={mis.completedGamma?.img} alt="" /><MdCheck
								/>{:else}<MdDoNotDisturb />{/if}
						</div>
					</li>
				</ul>
				{:else}
				<ul class="text-right flex flex-col gap-2">
					<li class="flex items-center gap-4 justify-between">
						<span class="text-pink">Completed: </span>
						<div class="h-10 flex items-center gap-2">
							{#if mis.userAlphaId}<p>{mis.completedAlpha?.username}</p>
								<img class="h-10 rounded-full" src={mis.completedAlpha?.img} alt="" /><MdCheck
								/>{:else}<MdDoNotDisturb />{/if}
						</div>
					</li>
				</ul>
				{/if}
				<a
					href="/authorized/{data.map}/{data.place}/{mis.title}"
					class="px-8 py-2 self-end bg-maroon text-base font-semibold rounded-2xl">Complete</a
				>
			</div>
		</div>
	{/each}
</main>
