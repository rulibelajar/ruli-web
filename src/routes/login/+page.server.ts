import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	login: async ({ request, cookies }) => {
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

		// simpan session ke cookie
		cookies.set(
			'session',
			JSON.stringify({
				id: data.id,
				username: data.username
			}),
			{
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false, // ubah ke true kalo production pakai https
				maxAge: 60 * 60 * 24 // 1 day
			}
		);

		throw redirect(303, '/admin');
	}
};
