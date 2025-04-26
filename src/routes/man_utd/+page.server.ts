import { supabase } from '$lib/supabaseClient';

const positionOrder = {
	Goalkeeper: 1,
	Defender: 2,
	Midfielder: 3,
	Forward: 4
};

type Position = keyof typeof positionOrder;

export type Player = {
	id: string;
	name: string;
	number: number;
	position: string;
	image: string;
	height: number;
	nationality: string;
};

export async function load() {
	const { data, error } = await supabase.from('players').select();

	if (error) {
		console.error(error);
		return { players: [] };
	}

	const sorted = (data as Player[]).sort((a, b) => {
		const posA = positionOrder[a.position as Position] ?? 999;
		const posB = positionOrder[b.position as Position] ?? 999;
		return posA - posB || a.number - b.number;
	});

	return {
		players: sorted
	};
}
