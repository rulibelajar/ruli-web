<script lang="ts">
	export let data;
</script>

<main class="scroll-smooth bg-gray-950 font-sans text-white">
	<!-- Navbar -->
	<nav class="sticky top-0 z-50 bg-gray-950/90 shadow-md backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="text-2xl font-extrabold text-red-600">Man Utd</a>
			<ul class="hidden gap-6 text-sm font-semibold text-gray-300 md:flex">
				<li><a href="#hero" class="hover:text-red-500">Home</a></li>
				<li><a href="#about" class="hover:text-red-500">About</a></li>
				<li><a href="#trophies" class="hover:text-red-500">Trophies</a></li>
				<li><a href="#stadium" class="hover:text-red-500">Stadium</a></li>
				<li><a href="#fans" class="hover:text-red-500">Fans</a></li>
				<li><a href="#players" class="hover:text-red-500">Players</a></li>
			</ul>
		</div>
	</nav>
	<!-- Hero Section -->
	<section
		id="hero"
		class="bg-[url('/images/old-trafford.jpg')] bg-cover bg-center py-32 text-center shadow-lg"
	>
		<div class="mx-auto max-w-3xl rounded-xl bg-black/60 p-6">
			<h1 class="text-5xl font-extrabold text-red-600">Manchester United FC</h1>
			<p class="mt-4 text-xl">The Theatre of Dreams</p>
			<a
				href="#players"
				class="mt-6 inline-block rounded-xl bg-red-700 px-6 py-2 text-white transition hover:bg-red-600"
			>
				View Players
			</a>
		</div>
	</section>

	<!-- Tentang Klub -->
	<section class="mx-auto max-w-4xl px-6 py-16 text-center" id="about">
		<h2 class="mb-4 text-3xl font-bold text-red-500">About the Club</h2>
		<p class="text-lg text-gray-300">
			Founded in 1878, Manchester United is one of the most successful and popular football clubs in
			the world. Based in Old Trafford, England, the Red Devils have a rich legacy of winning and
			inspiring generations of fans.
		</p>
		<p class="text-lg text-gray-300">
			Walaupun sedang terpuruk di tahun ini, Manchester United masih menjadi salah satu klub
			terbesar di Inggris. Dan untuk keikutsertaan di UEFA Cup, kami masih berada di semifinal.
			Masih percaya, kalo kata orang barat still belive kami bisa menang. Makanya saya buat web ini,
			ini menjadi pekan-pekan yang penting.
		</p>
	</section>

	<!-- Prestasi -->
	<section class="bg-gray-900 py-16" id="trophies">
		<div class="mx-auto max-w-5xl px-6 text-center">
			<h2 class="mb-8 text-3xl font-bold text-red-500">Trophies</h2>
			<div class="grid grid-cols-2 gap-6 text-gray-200 md:grid-cols-4">
				<div>
					<p class="text-5xl font-bold">20</p>
					<p>Premier League</p>
				</div>
				<div>
					<p class="text-5xl font-bold">12</p>
					<p>FA Cup</p>
				</div>
				<div>
					<p class="text-5xl font-bold">3</p>
					<p>Champions League</p>
				</div>
				<div>
					<p class="text-5xl font-bold">2</p>
					<p>Club World Cup</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Stadion -->
	<section class="mx-auto max-w-4xl px-6 py-16 text-center" id="stadium">
		<h2 class="mb-4 text-3xl font-bold text-red-500">Old Trafford</h2>
		<p class="text-lg text-gray-300">
			Home to Manchester United since 1910, Old Trafford is an iconic stadium known as "The Theatre
			of Dreams", with a capacity of over 74,000 seats and a legendary atmosphere.
		</p>
	</section>

	<!-- Dukungan Fans -->
	<section class="bg-gray-800 py-16" id="fans">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<blockquote class="mb-4 text-xl text-gray-400 italic">
				“Manchester United is not just a club, it's a way of life.”
			</blockquote>
			<p class="font-bold text-red-500">— A True Red Devil</p>
		</div>
	</section>

	<!-- Table Pemain -->
	<section id="players" class="mx-auto max-w-5xl px-6 py-16">
		<h2 class="mb-6 text-3xl font-bold text-red-500">First Team Squad</h2>

		<table
			class="w-full table-auto border-collapse overflow-hidden rounded-xl border border-gray-700 bg-gray-900 text-white shadow-md"
		>
			<thead class="bg-red-700 text-white">
				<tr>
					<th class="border-b px-4 py-2 text-left">Name</th>
					<th class="border-b px-4 py-2 text-left">Position</th>
				</tr>
			</thead>
			<tbody>
				{#each data.players as player}
					<tr class="transition hover:bg-gray-800">
						<td class="border-b px-4 py-2">
							<a href="man_utd/profile/{player.id}" class="text-red-400 hover:underline"
								>{player.name}</a
							>
						</td>
						<td class="border-b px-4 py-2">{player.position}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 py-6 text-center text-sm text-gray-500">
		<p>&copy; 2025 Ruli. All rights reserved.</p>
	</footer>
</main>
