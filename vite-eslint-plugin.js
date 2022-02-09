const { ESLint } = require("eslint");
const SRC_PATH = "src";
const TESTS_PATH = "__tests__";
const EXTENSIONS = [".svelte", ".ts"];

export default (production) => {
	const eslint = new ESLint();

	async function lintFiles(files) {
		const results = await eslint.lintFiles(files);
		const formatter = await eslint.loadFormatter("stylish");
		return formatter.format(results);
	}

	function testExtension(path, extensions) {
		for (let ind = 0, max = extensions.length; ind < max; ind++) {
			if (path.indexOf(extensions[ind]) != -1) return true;
		}

		return false;
	}

	return {
		name: 'eslintPlugin',

		buildStart() {
			if (production) return;

			setTimeout(async() => {
				const resultText = await lintFiles([`./${SRC_PATH}`]);

				console.log(resultText || "Main build no-errors");
			}, 1000);
		},

		handleHotUpdate(ctx) {
			if (production) return;

			const fileName = ctx.file;
			const srcPath = `${__dirname}/${SRC_PATH}/`;

			if (fileName.indexOf(srcPath) == -1 || fileName.indexOf(TESTS_PATH) != -1 || !testExtension(fileName, EXTENSIONS)) return;

			setTimeout(async() => {
				const resultText = await lintFiles([fileName]);

				console.log(resultText || `${fileName} no-errors`);
			}, 100);
		},
	};
}
