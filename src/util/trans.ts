/* eslint-disable no-magic-numbers */
import LANG_EN_DATA from "../langs/en";
import { LANG_CS, LANG_EN } from "../constants";

const ALL_LANGS = [LANG_CS, LANG_EN];
const DEFAULT_LANG = LANG_CS;
const PL_SEPARATOR = "/";

type tplotOptions = {
	[key: string]: string;
}

let transData: tplotOptions = {};
let appLang = "";

export function loadTrans(lang: string) {
	if (ALL_LANGS.indexOf(lang) !== -1 && lang !== appLang) {
		appLang = lang;

		if (lang === LANG_EN) {
			transData = LANG_EN_DATA;
		}
	}
}

export function trans(key: string, arg: tplotOptions = {}) : string {
	let output = key;

	if (appLang !== DEFAULT_LANG && transData[key]) {
		output = transData[key];
	}

	const matches = output.match(/[{][^}]+[}]/gu);

	if (matches && matches.length) {
		matches.sort((aItem, bItem) => bItem.length - aItem.length);
		matches.forEach(match => {
			const mKey = match.replace(/[{}]/gu, "").trim();

			output = output.replace(new RegExp(match.replace("{", "[{]").replace("}", "[}]"), "gu"), mKey in arg ? arg[mKey] : "");
		});
	}

	return output;
}

export function transPl(count: number, one: string, few: string, other: string) : string {
	let oneTrans = one;
	let fewTrans = few;
	let otherTrans = other;

	if (appLang !== DEFAULT_LANG) {
		const key = [one, few, other].join(PL_SEPARATOR);

		if (transData[key]) {
			const parts = transData[key].split(PL_SEPARATOR);

			if (parts.length === 3) {
				oneTrans = parts[0];
				fewTrans = parts[1];
				otherTrans = parts[2];
			}
		}
	}

	if (count === 1) {
		return oneTrans;
	} else if (count > 1 && count <= 4) {
		return fewTrans;
	}

	return otherTrans;
}
