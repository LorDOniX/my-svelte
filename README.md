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

### Build assetů

Je možnost kromě přidání souborů do public složky, je taky přes `src/assets` přidat přímo v kódu např.

```
import Heart from "./assets/heart.svg";
<img src={Heart} alt="" />
```

Soubor se pak zbuildí jako asset se svým hashem.

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

Jednotlivé jazyky jsou definovány jako JSON ve `public/langs/*.json`. Jako formát pro množné čísla a nahrazení je použit formatjs.
Webovka si po spuštění šáhne do localStorage a podle toho nastaví jazyk nebo se použije defaultně čeština
