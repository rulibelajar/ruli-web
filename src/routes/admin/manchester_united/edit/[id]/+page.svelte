<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	export let data;
	import { goto } from '$app/navigation';

	let player = data.player;

	let file: File | null = null;
	let message = '';
	let uploading = false;

	// Pre-fill data dari Supabase
	let name = player?.name ?? '';
	let position = player?.position ?? '';
	let number = player?.number ?? 0;
	let nationality = player?.nationality ?? '';
	let age = player?.age ?? '';
	let image = player?.image ?? '';

	async function handleSubmit() {
		message = '';
		uploading = true;

		let imageUrl = image;

		if (file) {
			const fileExt = file.name.split('.').pop();
			const fileName = `${Date.now()}.${fileExt}`;
			const filePath = `uploads/${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from('ruli')
				.upload(filePath, file, { contentType: file.type });

			if (uploadError) {
				message = `Upload gagal: ${uploadError.message}`;
				uploading = false;
				return;
			}

			const { data: publicData } = supabase.storage.from('ruli').getPublicUrl(filePath);
			imageUrl = publicData.publicUrl;
		}

		const { error: updateError } = await supabase
			.from('players')
			.update({
				name,
				position,
				number,
				nationality,
				age,
				image: imageUrl
			})
			.eq('id', player.id);

		uploading = false;

		if (updateError) {
			message = `Update gagal: ${updateError.message}`;
		} else {
			// ✅ Langsung redirect kalau sukses
			goto('/admin/manchester_united');
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg"
	>
		<h2 class="text-center text-2xl font-bold text-gray-800">Edit Data Pemain</h2>

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
			bind:value={nationality}
			placeholder="Kebangsaan"
			required
			class="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<input
			type="date"
			bind:value={age}
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
			{uploading ? 'Mengunggah...' : 'Simpan Perubahan'}
		</button>
	</form>
</div>
