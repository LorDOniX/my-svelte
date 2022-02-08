<script type="ts">
	import { trans } from '../util/trans';
	interface IDetail {
		id: string
	}
	export let params: IDetail = {
		id: "",
	};
	const id = params.id;
</script>

<div id="detail">
	<div class="detailPage">
		<h1>{trans("Stránka s detailem")}</h1>
		<p>{trans("Popis hlavní stránky")}</p>
		<p>{ id }</p>
	</div>
</div>

<style>
</style>
