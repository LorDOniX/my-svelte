const { ESLint } = require("eslint");

export default () => {
	const eslint = new ESLint();

	async function lintFiles(files) {
		const results = await eslint.lintFiles(files);
		const formatter = await eslint.loadFormatter("stylish");
		return formatter.format(results);
	}

	return {
		name: 'eslintPlugin',

		async buildStart() {
			const resultText = await lintFiles(["./src"]);

			setTimeout(() => {
				console.log(resultText || "Main build no-errors");
			}, 1000);
		},

		async handleHotUpdate(ctx) {
			if ([".svelte", ".ts"].indexOf(ctx.file) == -1) return;

			const resultText = await lintFiles([ctx.file]);

			setTimeout(() => {
				console.log(resultText || `${ctx.file} no-errors`);
			}, 100);
		},
	};
}
