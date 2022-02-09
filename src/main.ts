import App from './App.svelte';
import { getLang, fetchJSON } from "./util/utils";
import { locale, translations } from 'svelte-intl';

/* eslint-disable */
(async function main() {
	const langCode = getLang();
	const langData = await fetchJSON(`/langs/${langCode}.json`);

	translations.update({
		[langCode]: langData
	});
	locale.set(langCode);

	new App({
		target: document.getElementById("app") || document.body,
	});
})();
