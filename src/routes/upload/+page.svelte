<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let name = '';
	let imageFile: File | null = null;
	let message = '';

	async function handleSubmit() {
		if (!imageFile) {
			message = 'Pilih file dulu';
			return;
		}

		// Nama file unik
		const filename = `${Date.now()}_${imageFile.name}`;

		// 1. Upload ke storage
		const { data: storageData, error: storageError } = await supabase.storage
			.from('car-images') // nama bucket
			.upload(filename, imageFile);

		if (storageError) {
			message = `Upload gagal: ${storageError.message}`;
			console.log(message);
			return;
		}

		// 2. Ambil URL publik
		const { data: publicUrl } = supabase.storage.from('car-images').getPublicUrl(filename);

		console.log(publicUrl);

		// 3. Simpan ke DB
		const { error: dbError } = await supabase
			.from('players')
			.insert([{ name: name, image_url: publicUrl.publicUrl }]);

		if (dbError) {
			message = `Gagal simpan ke DB: ${dbError.message}`;
			return;
		}

		message = 'Berhasil upload dan simpan!';
		name = '';
		imageFile = null;
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" placeholder="Nama" bind:value={name} required />

	<!-- Versi aman untuk on:change -->
	<input
		type="file"
		accept="image/*"
		on:change={(e) => {
			const target = e.currentTarget as HTMLInputElement;
			const file = target?.files?.[0];
			if (file) {
				imageFile = file;
			}
		}}
	/>

	<button type="submit">Upload</button>
</form>

<p>{message}</p>
