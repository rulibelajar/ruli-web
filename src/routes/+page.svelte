<script>
	let headlines = [
		'Full Stack Developer',
		'Tutorials Wacther',
		'Asking Too Many Questions to ChatGPT'
	];
	let current = 0;

	const rotateHeadlines = () => {
		setInterval(() => {
			current = (current + 1) % headlines.length;
		}, 3000);
	};

	$: rotateHeadlines();

	// Kirim Pesan dari Contact

	import { supabase } from '$lib/supabaseClient';

	let name = '';
	let email = '';
	let message = '';
	let success = false;
	let error = '';

	const handleSubmit = async () => {
		error = '';
		const { data, error: insertError } = await supabase.from('messages').insert({
			name,
			email,
			message
		});

		if (insertError) {
			console.log('Insert Error: ', insertError.message);
			error = insertError.message;
		} else {
			console.log('Insert Success', data);
			success = true;
			name = email = message = '';
		}
	};
</script>

<!-- Navbar -->
<header class="sticky top-0 z-50 bg-gray-900 text-white">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-4 md:flex-row">
		<h1 class="mb-4 text-2xl font-bold md:mb-0">Ruli</h1>
		<nav class="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
			<a href="/" class="hover:text-yellow-400">Home</a>
			<a href="#about" class="hover:text-yellow-400">About</a>
			<a href="#projects" class="hover:text-yellow-400">Projects</a>
			<a href="#contact" class="hover:text-yellow-400">Contact</a>
			<a href="/admin" class="hover:text-yellow-400">Admin</a>
		</nav>
	</div>
</header>

<!-- Hero Section -->
<section
	id="home"
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 px-4 text-white"
>
	<div class="max-w-2xl text-center">
		<h2 class="mb-4 text-4xl font-bold md:text-5xl">Hi, I'm Ruli</h2>
		<h3 class="mb-4 text-2xl font-semibold text-yellow-400 transition duration-500 md:text-3xl">
			{headlines[current]}
		</h3>
		<p class="mb-6 text-lg text-gray-300 md:text-xl">
			I build modern websites, apps, and everything in between.
		</p>
		<a
			href="#projects"
			class="rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
		>
			View My Work
		</a>
	</div>
</section>

<!-- About Section -->
<section id="about" class="bg-gray-900 px-6 py-20 text-white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
		<p class="text-lg leading-relaxed text-gray-300">
			I'm a passionate Full Stack Developer who loves building beautiful, scalable, and efficient
			web applications. I spend my days coding, watching tutorials, and occasionally asking ChatGPT
			too many questions 😄. I believe in continuous learning and sharing knowledge with the
			community.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href="#projects"
				class="rounded-md bg-yellow-400 px-5 py-2 font-semibold text-gray-900 transition hover:bg-yellow-300"
			>
				See My Projects
			</a>
			<a
				href="#contact"
				class="rounded-md border border-yellow-400 px-5 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-300 hover:text-gray-900"
			>
				Get in Touch
			</a>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="bg-gray-900 px-6 py-20 text-white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-3xl font-bold md:text-4xl">Projects</h2>
		<p class="text-lg leading-relaxed text-gray-300">
			I am currently trying to learn, pay attention to, and understand how web technologies actually
			work. I am motivated to master SvelteKit. Below is a small project that I have created, feel
			free to take a look.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href="/man_utd"
				class="rounded-md bg-yellow-400 px-5 py-2 font-semibold text-gray-900 transition hover:bg-yellow-300"
			>
				Manchester United Web
			</a>
			<a
				href="#contact"
				class="rounded-md border border-yellow-400 px-5 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-300 hover:text-gray-900"
			>
				Get in Touch
			</a>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-gray-900 px-6 py-20 text-white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-6 text-3xl font-bold md:text-4xl">Contact Me</h2>
		<p class="mb-8 text-lg text-gray-300">
			Have a project or just want to say hi? Feel free to drop a message!
		</p>

		<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
			<input
				bind:value={name}
				type="text"
				placeholder="Your Name"
				class="w-full rounded-md bg-gray-700 px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
			/>
			<input
				bind:value={email}
				type="email"
				placeholder="Your Email"
				class="w-full rounded-md bg-gray-700 px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
			/>
			<textarea
				bind:value={message}
				placeholder="Your Message"
				rows="5"
				class="w-full rounded-md bg-gray-700 px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
			></textarea>

			<button
				type="submit"
				class="w-full rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
			>
				Send Message
			</button>
		</form>

		{#if success}
			<p class="mt-6 text-lg text-green-400">Your message was sent successfully!</p>
		{:else if error}
			<p class="mt-6 text-lg text-red-400">Error: {error}</p>
		{/if}
	</div>
</section>
