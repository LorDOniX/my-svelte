<script lang="ts">
	import { Router, Link, Route, navigate } from "svelte-routing";
	import { loadTrans } from "./Util/trans";
	import { getLang, setLang } from "./Util/utils";

	import Home from "./Routes/Home.svelte";
	import Login from "./Routes/Login.svelte";
	import Detail from "./Routes/Detail.svelte";

	export let url = "";

	function setLangValue(event: MouseEvent, langKey: string) {
		event.preventDefault();

		if (langKey === getLang()) {
			return;
		}

		setLang(langKey);
		location.reload();
	}

	function setCzech(event: MouseEvent) {
		setLangValue(event, "cs");
	}

	function setEnglish(event: MouseEvent) {
		setLangValue(event, "en");
	}
</script>

{#await loadTrans(getLang()) then}
	<Router url="{url}">
		<div id="container">
			<div id="menu">
				<Link to="/">Home</Link>
				<Link to="/detail/aaa">Detail</Link>
				<Link to="/login">Login</Link>
			</div>
			<div>
				<a href="/" on:click={setCzech}>Čeština</a>
				<a href="/" on:click={setEnglish}>English</a>
			</div>
			<div id="page">
				<Route path="/detail/:id" component="{Detail}" />
				<Route path="/login" component="{Login}" />
				<Route path="/" component="{Home}" />
			</div>
			<div>
				<button type="button" on:click={() => navigate("/login")}>AAAA</button>
			</div>
		</div>
	</Router>
{/await}

<style>
	#container {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>
