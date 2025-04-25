<!-- src/routes/man_utd/+page.svelte -->
<script lang="ts">
	export let data;
</script>

<!-- HERO SECTION -->
<section class="hero">
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bruno_Fernandes_2021.jpg/440px-Bruno_Fernandes_2021.jpg"
		alt="Captain Bruno Fernandes"
	/>
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Erik_ten_Hag_2023.jpg"
		alt="Coach Erik ten Hag"
	/>
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Old_Trafford_inside_20060726_1.jpg/800px-Old_Trafford_inside_20060726_1.jpg"
		alt="Old Trafford Stadium"
	/>
</section>

<!-- SQUAD SECTION -->
<section class="section">
	<div class="title">Manchester United Squad</div>
	<div class="player-grid">
		{#each data.players as player}
			<div class="player-card">
				<img src={player.image} alt={player.name} />
				<h3>{player.name}</h3>
				<p>{player.position}</p>
				<p>#{player.number} - {player.nationality}</p>
				<p>Height: {player.height} cm</p>
			</div>
		{/each}
	</div>
</section>

<!-- COACH SECTION -->
<section class="section coach-section">
	<div class="title">Meet the Coach: Erik ten Hag</div>
	<p>
		Erik ten Hag joined Manchester United in 2022 after a successful spell at Ajax, where he won
		three Eredivisie titles and took the club to the UEFA Champions League semifinal in 2019. His
		tactical acumen and player development skills made him the ideal candidate to rebuild Manchester
		United.
	</p>
	<p>
		Ten Hag signed a 3-year contract worth approximately £27 million, with an option for an
		additional year. His ambition is to restore Manchester United's dominance in English and
		European football.
	</p>
	<p>
		Known for his structured, high-pressing style of play, Ten Hag promotes youth and believes in
		attacking football with tactical discipline. His mission is to create a united squad that plays
		with purpose and pride.
	</p>
</section>

<!-- CURRENT STATUS SECTION -->
<section class="section current-section">
	<div class="title">Season Overview</div>
	<p>
		Manchester United is currently struggling in the Premier League, sitting in the lower half of
		the table due to inconsistency and injury concerns. However, the Red Devils have shown
		resilience and are still alive in the UEFA Europa League, making it to the semifinals with a
		real shot at a European trophy.
	</p>
</section>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
		background-color: #0d0d0d;
		color: white;
	}
	.section {
		padding: 4rem 2rem;
	}
	.hero {
		display: flex;
		gap: 1rem;
		justify-content: center;
		background: #900;
		padding: 3rem 1rem;
	}
	.hero img {
		border-radius: 12px;
		max-height: 250px;
		object-fit: cover;
	}
	.title {
		text-align: center;
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #ff0000;
	}
	.player-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
	}
	.player-card {
		background: #1a1a1a;
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
		border: 1px solid #444;
	}
	.player-card img {
		width: 100%;
		border-radius: 6px;
		height: 200px;
		object-fit: cover;
	}
	.coach-section,
	.current-section {
		background: #111;
		border-top: 1px solid #333;
	}
</style>
