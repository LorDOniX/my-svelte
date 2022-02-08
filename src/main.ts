import App from './App.svelte';
import { getLang } from "./util/utils";
import { loadTrans } from "./util/trans";

loadTrans(getLang());

const app = new App({
	target: document.getElementById("app") || document.body,
});

export default app;
