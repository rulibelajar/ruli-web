import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const id = params.id;

	const { data, error } = await supabase.from('players').select('*').eq('id', id).single();

	if (error) {
		console.error('Supabase error:', error.message);
	}

	return {
		player: data ?? null
	};
}
