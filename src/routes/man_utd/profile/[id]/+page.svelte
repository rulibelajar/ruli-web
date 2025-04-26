<script lang="ts">
	import { calculateAge } from '$lib/utils/age.js';
	export let data;
</script>

<main class="mx-auto min-h-screen w-full max-w-3xl bg-gray-950 p-4">
	<h1 class="mb-6 text-center text-4xl font-extrabold text-red-700">Profile</h1>

	<section class="flex flex-col items-center space-y-4 rounded-2xl bg-gray-900 p-6 shadow-md">
		<img
			src={data.player.image}
			alt={`Photo of ${data.player.name}`}
			class="h-48 w-48 object-cover"
		/>

		<div class="space-y-2 text-center text-white">
			<p class="text-3xl font-semibold"><span class="font-normal">{data.player.name}</span></p>
			<p class="text-xl font-semibold">
				<span class="font-normal">{data.player.position}</span>
			</p>
			<p class="text-xl font-semibold">
				Number: <span class="font-normal">#{data.player.number}</span>
			</p>
			<p class="text-xl font-semibold">
				Height: <span class="font-normal">{data.player.height}</span>
			</p>
			<p class="text-xl font-semibold">
				Nationality: <span class="font-normal">{data.player.nationality}</span>
			</p>
			<p class="text-xl font-semibold">
				Age: <span class="font-normal">{data.player.age} ({calculateAge(data.player.age)})</span>
			</p>
		</div>
	</section>
</main>
