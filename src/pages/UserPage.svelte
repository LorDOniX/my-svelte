<script>
	import { onDestroy } from 'svelte';
	import { UserStore } from "../store/user";
	import { trans } from "../util/trans";

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
		<h1>{trans("Uživatelská sekce pro {email}", { email: user.email })}</h1>
	{:else}
		<h1>{trans("Neautorizovaný přístup!")}</h1>
	{/if}
</div>
