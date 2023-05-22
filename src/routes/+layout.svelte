<script lang="ts">
	import { layout_props } from 'lib/stores';
	import '../app.css';
	layout_props.subscribe((n) => {});
</script>

<div class="bg-base w-screen h-screen">
	<slot />
</div>
