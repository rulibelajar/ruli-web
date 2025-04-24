<script>
	export let form;
</script>

<form method="POST" action="?/login">
	<input name="username" />
	<input name="password" type="password" />
	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}
	<button type="submit">Login Here</button>
</form>
