<main class="min-h-screen bg-gray-100 p-6">
	<div class="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow-md">
		<header class="flex items-center justify-between">
			<h1 class="text-3xl font-bold text-amber-700">Dashboard Admin</h1>
			<form action="/logout" method="get">
				<button
					type="submit"
					class="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
				>
					Logout
				</button>
			</form>
		</header>

		<nav class="mt-4">
			<ul class="space-y-2">
				<li>
					<a
						href="/dir/man_utd"
						class="block w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600"
					>
						🔗 Ke Data Manchester United
					</a>
				</li>
			</ul>
		</nav>
	</div>
</main>
