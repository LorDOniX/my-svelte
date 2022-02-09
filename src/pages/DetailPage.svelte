<script type="ts">
	import { _ } from 'svelte-intl';
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
		<h1>{$_("detailPage.title")}</h1>
		<p>{$_("detailPage.desc")}</p>
		<p>{ id }</p>
	</div>
</div>
