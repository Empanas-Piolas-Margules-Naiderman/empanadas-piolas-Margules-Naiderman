OLI TENES QUE LEER ESTO NO LO DE ABAJO (Yo te digo cuando)

Una vez que descargas el repo, te vas a dar cuenta que estas en la branch "Main" o "Margu" o "Development". Tenes que abrir el menú y poner "new branch" o "nueva rama" si lo tenés en español. Ahí vas a commitear todos tus cambios y yo despues me encargo de juntar las ramas, aunque como nuestro tabajo es bastante separado no creo que sea muy dificil.

Para que no te mueras ordenando el codigo te recomiendo una extension (Pagina de extensiones a la izquierda en vscode), se llama prettier (de la empresa prettier) y una vez que la instalas tenes que ir a settings del vscode y buscas "formatter" y uno que dice code formatter o de los primeros que tiene una opcion de menu desplegable de seleccione. Lo abris y uno de los primeros elementos es prettier y lo pones. Cada vez que se savea se formatea el codigo y queda lindo.

Lo que tiene de piola react es que vos inicializas la pagina local y despues solo guardando tus cambios se actualiza (no hace falta recargar la pagina) y se abre asi la pag:

1. Abris terminal (si no descargaste node modules ni tailwind haces primero: "npm i" y despues "npm install tailwindcss @tailwindcss/vite" y ya esta todo)
2. Pones en la terminal "npm run dev"
3. Entras al link que te tira (Localhost:5741) <--- algo así y esta en azul
4. Vas a la pagina y deberia funcionar (podes fijarte poniendo un div que ponga hola o algo asi)

Vos solo vas a trabajar en App.tsx, adentro del return() pones literal elementos de html sumado a los elementos "especiales" (en 2 parrafos te explico). Afuera del return() pero adentro de la funcion "App()" no vas a hacer nada. Afuera de la funcion "App()" podes definir funciones (yo ya hice una) mas que todo para probar que funcionen los botones y otros componentes a futuro.

Ahora mismo solo hice 2 componentes (elementos especiales): un boton reutilizable (ReusableButton.tsx) y un input reutilizable (ReusableInput.tsx) lo unico que tenes que saber es:

```tsx
//Esto de aca abajo (abajo del <div>) es un elemento html "especial" (por que se tienen que importar de otro archivo)
<div>
  <ReusableButton //<---- Esto es el nombre que podes encontrar en la carpeta componentes (de ahí se importa)
    text="Botón reutilizable" //<---- Esto es la propiedad "texto" y como ves en la pagina es lo que te muestra
    openFunction={Botonear} //<---- Esto es otra propiedad "openFunction" que hace que llame a la función que vos te pinte (En este caso botonear que es una funcion que creé yo y hace un console.log, pero podes poner lo que quieras en alguna otra funcion o dejarme un texto diciendo lo que queres que haga)
    styles="bg-red-500" //<---- Estos son los estilos que usan tailwind. Para fijarte que usa, anda a la pag oficial de tailwid y anda para abajo en la cosa vertical (te vas a dar cuenta) y te van a aparecer todo tipo de ediciones, como hacerlas y ejemplos (cualquier cosa chat)
  />
</div> //<---- Creo que los componentes especiales solo pueden ser encerrados en cosas que no tengan funcion (Divs, Span, Lista tal vez. Asi que fijate que componenetes "contenedores" necesitas y supongo que te las vas a arreglar)
```

Cabe recalcar que hay algunas propiedades que no son obligatorias, las que si te va a tirar un error para que las completes, las que no no te va a tirar nada, asi que te marco las props q tiene y si son obligatorias en App.tsx

LISTO TE DEJO DE JODER, LABURAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA :3

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
