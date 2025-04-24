<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let file: File | null = null;
	let message = '';
	let uploading = false;

	// Data pemain
	let name = '';
	let position = '';
	let number: number;
	let nationality = '';
	let age: number;

	async function handleSubmit() {
		message = '';
		uploading = true;

		let imageUrl = '';

		// Upload gambar dulu
		if (file) {
			const fileExt = file.name.split('.').pop();
			const fileName = `${Date.now()}.${fileExt}`;
			const filePath = `uploads/${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from('ruli') // Ganti dengan nama bucket
				.upload(filePath, file);

			if (uploadError) {
				message = `Upload gagal: ${uploadError.message}`;
				uploading = false;
				return;
			}

			const { data: publicData } = supabase.storage.from('ruli').getPublicUrl(filePath);
			imageUrl = publicData.publicUrl;
		}

		// Insert data ke tabel players
		const { error: insertError } = await supabase.from('players').insert({
			name,
			position,
			number,
			nationality,
			age,
			image: imageUrl
		});

		if (insertError) {
			message = `Insert gagal: ${insertError.message}`;
		} else {
			message = 'Data pemain berhasil ditambahkan!';
			// Reset form
			name = '';
			position = '';
			number = 0;
			nationality = '';
			age = 0;
			file = null;
		}

		uploading = false;
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="mt-4 flex flex-col">
	<input bind:value={name} placeholder="Nama" required />
	<input bind:value={position} placeholder="Posisi" required />
	<input type="number" bind:value={number} placeholder="Nomor" required />
	<input bind:value={nationality} placeholder="Kebangsaan" required />
	<input type="date" bind:value={age} placeholder="Umur" required />

	<input
		type="file"
		accept="image/*"
		on:change={(e) => {
			const target = e.target as HTMLInputElement;
			file = target?.files?.[0] ?? null;
		}}
	/>

	<button type="submit" class="mt-4 rounded bg-blue-500 p-2 text-white" disabled={uploading}>
		{uploading ? 'Mengunggah...' : 'Kirim Data Pemain'}
	</button>

	{#if message}
		<p>{message}</p>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 300px;
		padding: 1rem;
		background-color: bisque;
		border-radius: 8px;
	}
	input,
	button {
		padding: 0.5rem;
	}
</style>
