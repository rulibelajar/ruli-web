<script lang="ts">
	let title = '';
	let description = '';
	export let form;

	type Task = {
		id: number;
		title: string;
		description: string;
	};

	export let data: {
		tasks: Task[];
	};
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-200 p-4">
	<div class="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-2xl font-semibold text-gray-800">Add New Task</h1>
		<form method="POST" class="space-y-4">
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700" for="title">Title</label>
				<input
					id="title"
					type="text"
					name="title"
					bind:value={title}
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700" for="description"
					>Description</label
				>
				<textarea
					id="description"
					name="description"
					bind:value={description}
					rows="4"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				></textarea>
			</div>

			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
			>
				Add Task
			</button>

			{#if form?.success}
				<p class="mt-4 text-sm text-green-600">✅ Task created successfully!</p>
			{/if}
		</form>

		{#if data.tasks.length > 0}
			<div class="mt-8">
				<h2 class="mb-2 text-lg font-semibold text-gray-800">Task List</h2>
				<ul class="divide-y divide-gray-200">
					{#each data.tasks as task}
						<li class="py-4">
							<p class="font-medium text-gray-900">{task.title}</p>
							<p class="text-sm text-gray-600">{task.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</main>
