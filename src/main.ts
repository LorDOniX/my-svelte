import App from './App.svelte';
import { getLang, fetchJSON } from "./util/utils";
import { locale, translations } from 'svelte-intl';
import { LANG_CS } from "./constants";

/* eslint-disable */
(async function main() {
	const langCode = getLang() || LANG_CS;
	const langData = await fetchJSON(`/langs/${langCode}.json`);

	translations.update({
		[langCode]: langData as any
	});
	locale.set(langCode);

	new App({
		target: document.getElementById("app") || document.body,
	});
})();
