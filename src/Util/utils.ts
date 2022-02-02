const LS_JWT_KEY = "strankyJWT";
const LS_LANG_KEY = "strankyLang";

export function getJWT() {
	return localStorage.getItem(LS_JWT_KEY) || "";
}

export function setJWT(jwt: string) {
	if (jwt) {
		localStorage.setItem(LS_JWT_KEY, jwt || "");
	} else {
		localStorage.removeItem(LS_JWT_KEY);
	}
}

export function getLang() {
	return localStorage.getItem(LS_LANG_KEY) || "";
}

export function setLang(lang: string) {
	if (lang) {
		localStorage.setItem(LS_LANG_KEY, lang || "");
	} else {
		localStorage.removeItem(LS_LANG_KEY);
	}
}
