<script lang="ts">
	import { back_url } from 'lib/stores';
	import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
	export let userData:
		| {
				name?: string | null | undefined;
				email?: string | null | undefined;
				image?: string | null | undefined;
		  }
		| undefined;
</script>

<nav class="w-full bg-sapphire flex justify-between py-8 px-4">
	<div class="text-2xl flex items-center">
		{#if $back_url}
			<a href={$back_url} class="flex h-12 whitespace-nowrap items-center"><MdArrowBack /> Back</a>
		{/if}
	</div>
	<div class="flex items-center gap-4">
		<h3 class="text-2xl">{userData?.name}</h3>
		<img src={userData?.image} alt="" class="rounded-full bg-green h-16" />
	</div>
</nav>
