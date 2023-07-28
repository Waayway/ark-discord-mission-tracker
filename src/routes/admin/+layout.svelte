<script lang="ts">
	import Nav from "components/Nav.svelte";
	import type { PageData } from "./$types";
    export let data: PageData;
</script>
<Nav userData={data.session?.user} />
<slot />