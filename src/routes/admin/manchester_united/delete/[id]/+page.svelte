<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // To access URL params

	// Define the type for the player data
	type Player = {
		id: number;
		created_at: string;
		name: string;
		position: string;
		number: number;
		nationality: string;
		age: string;
		image: string;
		height: number;
	};

	let player: Player | null = null;
	let loading: boolean = true;

	// Fetch player data on component mount
	onMount(async () => {
		const { id } = $page.params; // Access the ID from the URL params

		const { data, error } = await supabase.from('players').select('*').eq('id', id).single();

		if (error) {
			console.error('Supabase error:', error.message);
		} else {
			player = data;
		}

		loading = false;
	});

	// Delete function
	async function deletePlayer() {
		if (!player) return;
		const { error } = await supabase.from('players').delete().eq('id', player.id);

		if (error) {
			console.error('Error deleting player:', error.message);
		} else {
			console.log('Player deleted successfully');
			// Optionally redirect to another page after deletion
			window.location.href = '/admin/manchester_united';
		}
	}
</script>

{#if loading}
	<p>Loading player data...</p>
{:else if player}
	<div class="flex min-h-screen items-center justify-center">
		<img
			class="mt-4 ml-4 h-32 w-32 rounded-full object-cover"
			src={player.image}
			alt={player.name}
		/>
		<div class="px-6 py-4">
			<div class="mb-2 text-xl font-bold">{player.name}</div>
			<p class="text-base text-gray-700">
				<strong>Position:</strong>
				{player.position}<br />
				<strong>Number:</strong>
				{player.number}<br />
				<strong>Nationality:</strong>
				{player.nationality}<br />
				<strong>Age:</strong>
				{new Date().getFullYear() - new Date(player.age).getFullYear()} years<br />
				<strong>Height:</strong>
				{player.height} cm
			</p>
		</div>
		<div class="flex items-center justify-between px-6 py-4">
			<button
				class="rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
				on:click={deletePlayer}
			>
				Hapus
			</button>
		</div>
	</div>
{:else}
	<p>Player data not found.</p>
{/if}
