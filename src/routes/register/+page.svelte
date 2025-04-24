<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let email = '';
	let name = '';
	let password = '';
	let message = '';

	// Ambil token dari URL hash jika ada
	onMount(async () => {
		const token = new URLSearchParams(window.location.hash.slice(1)).get('access_token');

		if (token) {
			// Set session dengan access token saja
			// Supabase akan otomatis menangani refresh token dan lainnya di belakang layar
			await supabase.auth.setSession({ access_token: token, refresh_token: '' });
			console.log('Token diterima, session berhasil di-set.');

			// Hilangkan token dari URL agar tidak terlihat
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	});

	const handleSignup = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name }
			}
		});

		if (error) {
			message = `❌ ${error.message}`;
		} else {
			message = `✅ Cek email untuk verifikasi`;
		}
	};
</script>

<h1>Daftar</h1>

<form on:submit|preventDefault={handleSignup}>
	<label>
		Nama: <input type="text" bind:value={name} required />
	</label><br />
	<label>
		Email: <input type="email" bind:value={email} required />
	</label><br />
	<label>
		Password: <input type="password" bind:value={password} required />
	</label><br />
	<button type="submit">Daftar</button>
</form>

{#if message}
	<p>{message}</p>
{/if}
