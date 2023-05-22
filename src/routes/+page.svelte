<script lang="ts">
	import FaDiscord from 'svelte-icons/fa/FaDiscord.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<main class="grid place-items-center h-screen">
	<button
		on:click={() => signIn('discord')}
		class="text-text bg-surface0 p-10 rounded-2xl hover:bg-surface1 transition-all"
		><FaDiscord />
		<h1 class="text-2xl">Login with discord</h1></button
	>
</main>
