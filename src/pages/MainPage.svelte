<script type="ts">
	import { _ } from 'svelte-intl';
	let count = 0;

	function wait(ms: number) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({});
			}, ms);
		});
	}

	async function main() {
		/* eslint-disable no-magic-numbers */
		for (let ind = 0; ind < 5; ind++) {
			/* eslint-disable no-await-in-loop */
			await wait(1000);
			count++;
		}
	}

	main().then(() => {}, () => {});
</script>

<div id="home">
	<h1>{$_("mainPage.title")}</h1>
	<p>{$_("mainPage.desc")}</p>
	<p>{$_("mainPage.plural", {
		count,
	})}</p>
</div>
