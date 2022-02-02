const path = require('path');
const fs = require('fs');

// defaultni jazyk cs nepiseme
const LANGS = ["en"];
const FOLDER_PATH = "./src";
const EXTENSIONS = [".svelte", ".js", ".tsx"];
const TRANS_REGEX = /trans\([^)]+\)/g;
const TRANS_PL_REGEX = /transPl\([^)]+\)/g;
const STRING_QUOTE_BRACKET_REGEX = /\(\s*(['"`])/;
const STRING_QUOTE_REGEX = /\s*(['"`])/;
const SKIP_FILES = ["trans.js"];

function getFilesFromDirectory(startPath, exts, output) {
	if (!output) {
		output = [];
	}

	if (!fs.existsSync(startPath)){
		console.log("no dir ", startPath);
		return output;
	}

	const files = fs.readdirSync(startPath);
	files.forEach(file => {
		const fileName = path.join(startPath, file);
		const stat = fs.lstatSync(fileName);

		if (stat.isDirectory()) {
			getFilesFromDirectory(fileName, exts, output);
		}
		else if (exts.filter(item => fileName.indexOf(item) != -1).length) {
			output.push(fileName);
		}
	});

	return output;
}

function readFile(file) {
	try {
		return fs.readFileSync(file, 'utf8');
	} catch (ex) {
		return "";
	}
}

function getStringFromQuote(string, quote) {
	const stringMatch = string.match(new RegExp(`[${quote}]([^${quote}]+)[${quote}]`, "u"));

	return stringMatch ? stringMatch[1] : "";
}

function getValueFromQuotes(string) {
	const quote = string.match(STRING_QUOTE_REGEX);

	return quote ? getStringFromQuote(string, quote[1]) : "";
}

function buildJSON(files) {
	files = files.filter(i => {
		let add = true;

		for (let skipFile of SKIP_FILES) {
			if (i.indexOf(skipFile) != -1) {
				add = false;
				break;
			}
		}

		return add;
	});
	let json = {};

	for (let file of files) {
		const fileData = readFile(file);
		const transMatches = fileData.match(TRANS_REGEX);
		const transPlMatches = fileData.match(TRANS_PL_REGEX);

		if (transMatches) {
			for (let match of transMatches) {
				const quote = match.match(STRING_QUOTE_BRACKET_REGEX);

				if (quote) {
					const transText = getStringFromQuote(match, quote[1]);

					if (transText) {
						json[transText] = "";
					}
				}
			}
		}

		if (transPlMatches) {
			for (let match of transPlMatches) {
				const parts = match.split(",");

				if (parts.length === 4) {
					let keyValues = [];

					for (let ind = 1; ind < 4; ind++) {
						const partValue = getValueFromQuotes(parts[ind]);

						if (partValue) {
							keyValues.push(partValue);
						}
					}

					if (keyValues.length === 3) {
						const transText = keyValues.join("/");
						json[transText] = "";
					}
				}
			}
		}
	}

	return json;
}

function getI18nSrcFile(langKey) {
	return `./i18n/${langKey}.json`;
}

function getI18nOutputFile(langKey) {
	return `./public/build/lang-${langKey}.js`;
}

function main() {
	const srcFiles = getFilesFromDirectory(FOLDER_PATH, EXTENSIONS);
	const srcJson = buildJSON(srcFiles);
	const srcKeys = Object.keys(srcJson);

	// mame json data, nacteme preklady z i18n
	for (let lang of LANGS) {
		const srcFileName = getI18nSrcFile(lang);
		const outputFileName = getI18nOutputFile(lang);
		let srcFileJSON = {};

		try {
			srcFileJSON = require(srcFileName);
		} catch (ex) {
		}

		// mame vstupni data, porovname s nactenyma
		let newFileJSON = {};

		for (let srcKey of srcKeys) {
			newFileJSON[srcKey] = srcFileJSON[srcKey] || srcJson[srcKey];
		}

		// prepiseme vstupni json
		console.log(`Overriding ${srcFileName}`);
		fs.writeFileSync(srcFileName, JSON.stringify(newFileJSON, null, "\t"), "utf-8");

		// vygenerujeme jazyk
		const langData = JSON.stringify(newFileJSON, null, "\t").replace("{", `export default {`);
		console.log(`Generating lang file ${outputFileName}`);
		fs.writeFileSync(outputFileName, langData, "utf-8");
	}
}

main();
