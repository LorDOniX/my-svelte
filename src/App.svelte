<script lang="ts">
	import { Router, Route } from "svelte-routing";

	import MainPage from "./pages/MainPage.svelte";
	import DetailPage from "./pages/DetailPage.svelte";
	import LoginPage from "./pages/LoginPage.svelte";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import UserPage from "./pages/UserPage.svelte";

	import MainContent from "./components/MainContent.svelte";
	import Menu from "./components/Menu.svelte";
	import Content from "./components/Content.svelte";

	import Heart from "./assets/heart.svg";

	export let url = "";

	console.log(import.meta.env.VITE_LOGIN_URL);
	console.log(import.meta.env.VITE_AUTH_URL);
</script>

<Router url="{url}">
	<MainContent>
		<Menu />
		<div>
			<img src={Heart} alt="" />
		</div>
		<Content>
			<Route path="/detail/:id" let:params>
				<DetailPage {params} />
			</Route>
			<Route path="/login" component="{LoginPage}" />
			<Route path="/register" component="{RegisterPage}" />
			<Route path="/user" component="{UserPage}" />
			<Route path="/" component="{MainPage}" />
		</Content>
	</MainContent>
</Router>
