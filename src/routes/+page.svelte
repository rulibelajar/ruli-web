<script>
	// @ts-nocheck

	let { data } = $props();
</script>

<main>
	<ul>
		{#each data.instruments as instrument}
			<li>{instrument.name}</li>
		{/each}
	</ul>

	<h1>Ini halaman Home</h1>
</main>
