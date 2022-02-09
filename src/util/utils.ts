const LS_JWT_KEY = "strankyJWT";
const LS_LANG_KEY = "strankyLang";

export function getJWT(): string {
	return localStorage.getItem(LS_JWT_KEY) || "";
}

export function setJWT(jwt: string): void {
	if (jwt) {
		localStorage.setItem(LS_JWT_KEY, jwt || "");
	} else {
		localStorage.removeItem(LS_JWT_KEY);
	}
}

export function getLang(): string {
	return localStorage.getItem(LS_LANG_KEY) || "";
}

export function setLang(lang: string): void {
	if (lang) {
		localStorage.setItem(LS_LANG_KEY, lang || "");
	} else {
		localStorage.removeItem(LS_LANG_KEY);
	}
}

export async function fetchJSON(path: string): Promise<JSON> {
	const response = await fetch(path, {
		headers: {
			Accept: 'application/json',
		},
		credentials: 'include',
	});
	const json = await response.json() as JSON;

	return json;
}
