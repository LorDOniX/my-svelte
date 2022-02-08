<script>
	import { trans, transPl } from '../util/trans';
	const count = 1;
</script>

<div id="home">
	<h1>{trans("Hlavní stránka")}</h1>
	<p>{trans("Popis hlavní stránky")}</p>
	<p>{trans("Bylo tam {count} {item} XXX{sdsdsd}YYYY", {
		count,
		item: transPl(count, "položka", "položky", "položek"),
	})}</p>
</div>

<style>
</style>
