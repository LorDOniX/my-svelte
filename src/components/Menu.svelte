<script type="ts">
	import { onDestroy } from 'svelte';
	import { Link, navigate } from "svelte-routing";
	import { setLang, getLang, setJWT } from '../util/utils';
	import { _ } from 'svelte-intl';
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
			<li>{$_("menu.home")}</li>
		</Link>
		<Link to="/detail/10">
			<li>{$_("menu.detail")}</li>
		</Link>
		{#if user.email }
			<Link to="/user">
				<li>{$_("menu.userSection")}</li>
			</Link>
			<li>
				<a href="/" on:click={logout}>{$_("menu.logout")}</a>
			</li>
		{:else}
			<Link to="/login">
				<li>{$_("loginPage.title")}</li>
			</Link>
		{/if}
	</ul>
	<div>
		<p>{$_("menu.languages")}</p>
		<div>
			<a href="/" on:click={setCzech}>{$_("menu.czech")}</a>
			<a href="/" on:click={setEnglish}>{$_("menu.english")}</a>
		</div>
	</div>
</div>

<style lang="scss">
	.menu {
		border: 1px solid black;
	}
</style>
