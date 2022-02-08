<script type="ts">
	import { onMount } from "svelte";
	import { auth } from "../providers/login";
	import { getJWT } from "../util/utils";
	import { UserStore } from "../store/user";

	onMount(async () => {
		try {
			//  zkusime auth pro uzivatele
			const jwt = getJWT();

			if (jwt) {
				const authData = await auth(jwt);

				if (authData.logged) {
					UserStore.update(userData => Object.assign(userData, {
						email: authData.user.email,
					}));
				}
			}
		} catch (ex) {
			/* eslint-disable no-console */
			console.error(ex);
		}
	});
</script>

<div class="mainContent">
	<slot></slot>
</div>;

<style>
	.mainContent {
		margin: 0 auto;
		margin-top: 50px;
		max-width: 960px;
		border: 1px solid black;
	}
</style>
