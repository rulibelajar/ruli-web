<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let file: File | null = null;
	let message = '';

	async function uploadImage() {
		if (!file) {
			message = 'Pilih gambar dulu!';
			return;
		}

		const fileExt = file.name.split('.').pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `uploads/${fileName}`;

		const { data, error } = await supabase.storage
			.from('ruli') // ganti dengan nama bucket kamu
			.upload(filePath, file);

		if (error) {
			message = `Upload gagal: ${error.message}`;
		} else {
			const { data: publicData } = supabase.storage.from('ruli').getPublicUrl(filePath);

			message = `Upload berhasil! Lihat gambar: ${publicData.publicUrl}`;
		}
	}
</script>

<form on:submit|preventDefault={uploadImage} class="mt-4 flex flex-col">
	<input
		type="file"
		accept="image/*"
		on:change={(e) => {
			const target = e.target as HTMLInputElement;
			file = target?.files?.[0] ?? null;
		}}
	/>

	<button type="submit" class="mt-4 rounded bg-blue-500 p-2 text-white">Upload Gambar</button>
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
		background-color: bisque;
	}
</style>
