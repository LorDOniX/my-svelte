<script>
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-intl';
	import { setJWT } from '../util/utils';
	import { Link } from "svelte-routing";
	import { login } from "../providers/login";
	import { UserStore } from "../store/user";
	import { DEFAULT_USER } from "../constants";

	let user = {
		email: "",
	};
	let error = "";
	let email = DEFAULT_USER.email;
	let password = DEFAULT_USER.password;

	const unsubscribe = UserStore.subscribe(userData => {
		user = userData;
	});

	onDestroy(() => {
		unsubscribe();
	});

	async function onClick() {
		try {
			const data = await login(email, password);

			// nastavime data a chyby
			error = data.error;

			// po loginu nastavime jwt
			if (data.user.email) {
				setJWT(data.jwt);
				UserStore.update(userData => Object.assign(userData, {
					email: data.user.email,
				}));
			}
		} catch (ex) {
			/* eslint-disable no-console */
			console.error(ex);
		}
	}
</script>

<div class="loginPage">
	{#if user.email }
		<h1>{$_("loginPage.emailLogged", { email: user.email })}</h1>
	{:else}
		<h1>{$_("loginPage.title")}</h1>
		<p>{$_("loginPage.loginOffer")}
			<Link to="/register">{$_("loginPage.register")}</Link>
		</p>
		<div>
			<input type="text" placeholder={$_("loginPage.email")} bind:value={email} />
		</div>
		<div>
			<input type="password" placeholder={$_("loginPage.password")} bind:value={password} />
		</div>
		<div>
			<button type="button" on:click={onClick}>{$_("loginPage.title")}</button>
		</div>
		<p>{ error }</p>
	{/if}
</div>
