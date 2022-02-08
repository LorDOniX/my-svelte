# Svelte boilerplate

A startovací šablona pro [Svelte](https://svelte.dev) s [Vite](https://vitejs.dev/),
TypeScript, SCSS, Autoprefixer, a HMR.
---

## Instalace

```bash
npm install
```
## Lokální vývoj

Parametr `dev` spustí lokální vývoj s hot module replacement (HMR). Výstupem je webovka na `http://localhost:5000/`:

```bash
npm run dev
```

## Build pro produkci

Parametr `build` vytvoří build pro nasazení do produkce. Výstupní složka pro assety je vytvořena v `/dist/assets/` a složka `dist` obsahuje veškeré potřebné věci pro nasazení.

```bash
npm run build
```

## Env prostředí

Soubor `.env` je pro lokální vývoj a soubor `.env.production` se použije pro produkční build. Je potřeba, aby každý klíč začínal prefixem `VITE_`.
Pro typescript je pak potřeba definovat, které klíče může očekávat v `src/env.d.ts`. Použití klíčů je vidět v `App.svelte` přes console.log.


## Eslint

Spouští se při vytvoření serveru, poté pro každý změněný soubor. Manuálně se dá spustit pomocí příkazu:

```bash
npm run eslint
```

Pro vývoj a sledování změn jsem musel vytvořit vlastní plugin pro vite v souboru - `vite-eslint-plugin.js`.
Ten funguje tak, že při eventu změny souboru zavolá eslint pro daný soubor a výstup se loguje do konzole.
V případě chyby to ovšem neumí odstavit server.

## Testování

Testy jsou ve složce `src/__tests__` a testuje se pomocí nástroje `jest`. Testy se spustí před buildem pro produkci.
Manuálně se dají spustit pomocí příkazu:

```bash
npm run test
npm run test:watch
```

## Překlady

### Použití v projektu

Každý soubor, který importuje:
```
import { trans, transPl } from '../util/trans';
```
volá překlady pomocí:
```
<p>{trans("Bylo tam {count} {item} XXX{sdsdsd}YYYY", {
	count,
	item: transPl(count, "položka", "položky", "položek"),
})}</p>
```
Kde pomocí `trans(překlad, { parametry pro nahrazení })` se nahradí překlady volitelným objektem s parametry.
Pro použití překladů u pádů se dá použít `transPl(počet, "překlad pro 1 položku", "překlad pro 2-4 položek", "překlad pro 0 a 5+ položek")`.
Defaultní jazyk je čeština.

### Zdrojové data

Volání skriptu:

```
node i18n.js
```

Funguje tak, že projde všechny zdrojové soubory, vytáhne jejich klíče a z nich se vygeneruje nový jazykový soubor ve složce `i18n`.
Pokud už soubor existuje, tak se při změně klíčů - přidání/odebrání vezme aktuální json s překlady, a pokud už dříve překlady existovaly, tak se použijí.
Výstupem je pak soubor ve složce `src/langs/`. Jazyky jsou součástí balíčku a nejsou lazy loadované.
