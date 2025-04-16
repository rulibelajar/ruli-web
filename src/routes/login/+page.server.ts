import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	login: async ({ request }) => {
		const form = await request.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;

		const { data, error } = await supabase
			.from('users')
			.select('*')
			.eq('username', username)
			.single();

		console.log('Supabase data:', data);
		console.log('Supabase error:', error);

		if (error || !data) {
			return fail(400, { message: 'Username tidak ditemukan.' });
		}

		if (data.password !== password) {
			return fail(401, { message: 'Password salah.' });
		}

		// Sukses login (nanti bisa tambah session/cookie)
		return { success: true, message: `Login berhasil, selamat datang ${data.username}!` };
	}
};
