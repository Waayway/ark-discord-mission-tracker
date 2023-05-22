<script lang="ts">
	import { layout_props } from 'lib/stores';
	import '../app.css';
	layout_props.subscribe((n) => {});
</script>

<svelte:head>
	<title>Ark mission tracker</title>
</svelte:head>

<div class="bg-base w-screen min-h-screen">
	<slot />
</div>
