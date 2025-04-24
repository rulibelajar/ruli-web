<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let name = '';
	let email = '';
	let password = '';
	let message = '';

	const handleSignup = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name }
			}
		});

		if (error) {
			message = `Gagal: ${error.message}`;
		} else {
			message = 'Berhasil daftar! Cek email untuk verifikasi.';
		}
	};
</script>

<form on:submit|preventDefault={handleSignup}>
	<label>
		Nama:
		<input type="text" bind:value={name} required />
	</label><br />
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label><br />
	<label>
		Password:
		<input type="password" bind:value={password} required />
	</label><br />
	<button type="submit">Daftar</button>
</form>

{#if message}
	<p>{message}</p>
{/if}
