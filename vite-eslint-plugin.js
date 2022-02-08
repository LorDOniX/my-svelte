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
			const fileName = ctx.file;

			if ([".svelte", ".ts"].indexOf(fileName) == -1 && fileName.indexOf("__tests__") != -1) return;

			const resultText = await lintFiles([fileName]);

			setTimeout(() => {
				console.log(resultText || `${fileName} no-errors`);
			}, 100);
		},
	};
}
