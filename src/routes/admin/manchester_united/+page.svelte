<script>
	const name = 'Data Manchester United';
	let { data } = $props();

	function handleRemove() {
		// Menampilkan dialog konfirmasi
		const confirmed = window.confirm('Apakah kamu yakin ingin menghapus item ini?');

		// Jika pengguna mengkonfirmasi, lakukan tindakan penghapusan
		if (confirmed) {
			// Logika untuk menghapus item, bisa memanggil API atau update state
			console.log('Item dihapus!');
		} else {
			console.log('Penghapusan dibatalkan');
		}
	}
</script>

<main>
	<div class="mt-5 mr-4 mb-5 ml-4 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-red-500">{name}</h1>
		<button
			class="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none"
			type="submit"
		>
			Add Player
		</button>
	</div>

	<ul class="space-y-4">
		{#each data.players as player}
			<li
				class="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-xl"
			>
				<div class="flex items-center gap-4">
					<img
						src={player.image}
						alt={player.name}
						class="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
					/>
					<span class="text-lg font-semibold">{player.name}</span>
				</div>
				<div class="flex gap-4">
					<a href="/admin/manchester_united/edit/{player.id}"
						><button
							class="rounded bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700 focus:outline-none"
							>Edit</button
						></a
					>

					<button
						class="rounded bg-red-600 px-4 py-2 text-white transition-all hover:bg-red-300 focus:outline-none"
						on:click={handleRemove}>Remove</button
					>
				</div>
			</li>
		{/each}
	</ul>
</main>
