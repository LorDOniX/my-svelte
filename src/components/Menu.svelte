<script type="ts">
	import { onDestroy } from 'svelte';
	import { Link, navigate } from "svelte-routing";
	import { setLang, getLang, setJWT } from '../util/utils';
	import { trans } from "../util/trans";
	import { UserStore } from "../store/user";

	let user = {
		email: "",
	};

	const unsubscribe = UserStore.subscribe(userData => {
		user = userData;
	});

	onDestroy(() => {
		unsubscribe();
	});

	function setLangValue(event: MouseEvent, langKey: string) {
		event.preventDefault();

		if (langKey === getLang()) {
			return;
		}

		setLang(langKey);
		location.reload();
	}

	function logout(event: MouseEvent) {
		event.preventDefault();
		setJWT("");
		UserStore.update(userData => Object.assign(userData, {
			email: "",
		}));
		navigate("/login");
	}

	function setCzech(event: MouseEvent) {
		setLangValue(event, "cs");
	}

	function setEnglish(event: MouseEvent) {
		setLangValue(event, "en");
	}
</script>

<div class="menu">
	<ul>
		<Link to="/">
			<li>{trans("Domů")}</li>
		</Link>
		<Link to="/detail/10">
			<li>{trans("Detail")}</li>
		</Link>
		{#if user.email }
			<Link to="/user">
				<li>{trans("Uživatelská sekce")}</li>
			</Link>
			<li>
				<a href="/" on:click={logout}>{trans("Odhlásit")}</a>
			</li>
		{:else}
			<Link to="/login">
				<li>{trans("Přihlásit")}</li>
			</Link>
		{/if}
	</ul>
	<div>
		<p>{trans("Jazyky")}</p>
		<div>
			<a href="/" on:click={setCzech}>{trans("Čeština")}</a>
			<a href="/" on:click={setEnglish}>{trans("English")}</a>
		</div>
	</div>
</div>

<style>
	.menu {
		border: 1px solid black;
	}
</style>
