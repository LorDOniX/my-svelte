<script>
	import { onDestroy } from 'svelte';
	import { UserStore } from "../store/user";
	import { _ } from 'svelte-intl';

	let user = { email: "" };

	const unsubscribe = UserStore.subscribe(userData => {
		user = userData;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="userPage">
	{#if user.email}
		<h1>{$_("userPage.title", { email: user.email })}</h1>
	{:else}
		<h1>{$_("userPage.unauthorized")}</h1>
	{/if}
</div>
