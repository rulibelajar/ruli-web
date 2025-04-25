<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let file: File | null = null;
	let message = '';
	let uploading = false;

	let name = '';
	let position = '';
	let number: number;
	let height: number;
	let nationality = '';
	let age: number;

	async function handleSubmit() {
		message = '';
		uploading = true;

		let imageUrl = '';

		if (file) {
			const fileExt = file.name.split('.').pop();
			const fileName = `${Date.now()}.${fileExt}`;
			const filePath = `uploads/${fileName}`;

			const { error: uploadError } = await supabase.storage.from('ruli').upload(filePath, file);

			if (uploadError) {
				message = `Upload gagal: ${uploadError.message}`;
				uploading = false;
				return;
			}

			const { data: publicData } = supabase.storage.from('ruli').getPublicUrl(filePath);
			imageUrl = publicData.publicUrl;
		}

		const { error: insertError } = await supabase.from('players').insert({
			name,
			position,
			number,
			height,
			nationality,
			age,
			image: imageUrl
		});

		if (insertError) {
			message = `Insert gagal: ${insertError.message}`;
		} else {
			message = '✅ Data pemain berhasil ditambahkan!';
			name = '';
			position = '';
			number = 0;
			nationality = '';
			age = 0;
			file = null;

			// Redirect to another page after successful insertion
			goto('/admin/manchester_united');
		}

		uploading = false;
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg"
	>
		<h2 class="text-center text-2xl font-bold text-gray-800">Tambah Data Pemain</h2>

		<input
			bind:value={name}
			placeholder="Nama"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<select
			bind:value={position}
			required
			class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="" disabled selected>Pilih Posisi</option>
			<option value="Goalkeeper">Goalkeeper</option>
			<option value="Defender">Defender</option>
			<option value="Midfielder">Midfielder</option>
			<option value="Forward">Forward</option>
		</select>

		<input
			type="number"
			bind:value={number}
			placeholder="Nomor"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<input
			type="number"
			bind:value={height}
			placeholder="Height"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<input
			bind:value={nationality}
			placeholder="Kebangsaan"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<input
			type="date"
			bind:value={age}
			placeholder="Umur"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<input
			type="file"
			accept="image/*"
			on:change={(e) => {
				const target = e.target as HTMLInputElement;
				file = target?.files?.[0] ?? null;
			}}
			class="w-full file:cursor-pointer file:rounded-xl file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white"
		/>

		<button
			type="submit"
			class="w-full rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
			disabled={uploading}
		>
			{uploading ? 'Mengunggah...' : 'Kirim Data Pemain'}
		</button>

		{#if message}
			<p class="mt-2 text-center text-sm text-green-600">{message}</p>
			goto('/admin/manchester_united')
		{/if}
	</form>
</div>
