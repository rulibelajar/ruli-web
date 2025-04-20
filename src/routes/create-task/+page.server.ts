import { supabase } from '$lib/supabaseClient';
import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;

		const { error } = await supabase.from('tasks').insert([{ title, description }]);

		if (error) {
			console.error('Supabase Insert Error:', error.message);
			return { success: false };
		}

		// Optional: redirect after create
		// throw redirect(303, '/success-page');

		return { success: true };
	}
};

export async function load() {
	const { data } = await supabase.from('tasks').select('*');
	return {
		tasks: data ?? []
	};
}
