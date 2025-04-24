<script lang="ts">
	import { onMount } from 'svelte';
	let currentTime: string = '';

	function updateTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString();
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="clock-container">
	<div class="clock">
		{currentTime}
	</div>
</div>

<style>
	.clock-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f8f9fa;
	}

	.clock {
		font-size: 6rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: bold;
		color: #333;
	}
</style>
