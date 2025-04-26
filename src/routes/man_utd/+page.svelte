<script lang="ts">
	export let data;
</script>

<main class="p-4">
	<h1 class="mb-4 text-3xl font-bold">Manchester United</h1>

	<table class="w-full table-auto border-collapse border border-gray-300">
		<thead>
			<tr>
				<th class="border-b px-4 py-2 text-left">Name</th>
				<th class="border-b px-4 py-2 text-left">Position</th>
			</tr>
		</thead>
		<tbody>
			{#each data.players as player}
				<tr>
					<td class="border-b px-4 py-2">
						<a href="man_utd/profile/{player.id}">{player.name}</a>
					</td>
					<td class="border-b px-4 py-2">{player.position}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
