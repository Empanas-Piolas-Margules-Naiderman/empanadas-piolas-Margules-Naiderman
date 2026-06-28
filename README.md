Link a la web desplegada: empanadaspiolasmn.netlify.app

Hecho por Joaquín Margules y Olivia Naiderman

Para iniciarlo en el localhost hay que instalar
En front:

- npm i
- npm i react-router-dom
- npm i tailwindcss @tailwindcss/vite

En back:

- npm i supabase --save-dev

y bueno haces npm run dev en la carpeta front y deberia andar.

EDIT: DEV OPS (Aca empieza CALIDAD.md)

Tareas de cada integrante:

Olivia Naiderman: Hacer el workflow (Dejar un historial de las cosas que se van haciendo)

Joaquín Margules: Hacer los tests (Dejar un historial de las cosas que se van haciendo)

Instalamos estas dependencias para el TP:

- npm install -D jest @jest/globals
- npm install -D @playwright/test
- npx playwright install

Para correr los tests:

- Unit: npm run test
- E2E: npm run e2etest

todo adentro de \back

Instalamos las dependencias necesarias para que los test puedan correr correctamente:

- Jest para el "backend" porque trae mocks ya hechos para supabase, osea configuraciones para que funcionen los test de supabase y así se ahorran recursos.

- playwright para el E2E porque lo vi en muchas fuentes que funciona bien con nuestra arquitectura.

Tests a evaluar:

Unit test:

src/authService.js loginUser(): probar que el login te devuelva correctamente un token.
Historial:

- Creo el archivo
- No entiendo nada
- Busco documentacion
- Escribo codigo
- Me tira un error: Test suite failed to run

      TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')

        1 | import { createClient } from "@supabase/supabase-js";
        2 |
      > 3 | const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          |                                     ^
        4 | const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        5 |
        6 | if (!supabaseUrl || !supabaseKey) {

        at VITE_SUPABASE_URL (supabase.js:3:37)

  Dice que el problema estaba en el import, se lo tire a chatGPT y me dijo que era porque estaba haciendo mal el import ya que al crear un mock de supabase y tener el type:"module" se rompia porque primero se llamaba a supabase real haciendo que el mock quede obsoleto.

- Arregle el error cambiando la estructura del import de esto:

```javascript
import { supabase } from "../../supabase.js";
```

a esto:

```javascript
const { supabase } = await import("../../supabase.js");
```

- Ahi ese test pasó.

src/orderService.js getOrderByUserId: probar que segun el id de un usuario logueado te de todos sus pedidos.
Historial:

- Creo el archivo
- Ahora si entiendo algo porque ya habia hecho un test.
- No hubo errores importantes aunque tambien hubo ayuda de chat en temas de sintaxis.
- Test Pasó.

E2E test:

Flujo entero de el test:

1. Por la configuracion (playwright.config.js) la base de la URL es en localhost:5173, basicamente el test spawnea ahi.
2. Busca "/" y verifica que exista
3. Busca el botón (link) que te lleva a la página de "/login", le hace click y verifica que "/login" exista
4. En los inputs llena el nombre con "Codis" y en la contraseña con "codis123" y toca el botón de iniciar sesión.
5. Como el boton de iniciar sesión te lleva directo a "/" vuelve a verificar que "/" exista.
6. Busca el boton que dice carne y le hace click sobre ella.
7. Busca la seccion de pedido y se lo asigna a una variable.
8. Verifica que en la seccion de pedido el componente que dice carne sea visible
9. Busca el botón + (por area-label) y le hace click
10. Busca el botón que tiene nombre Efectivo y le hace click
11. Busca el botón que tiene nombre Retiro en el local
12. Busca el botón que se llama Enviar pedido
13. verifica que haya aparecido en la pagina un componente que se llame "Pedido guardado correctamente"
14. Busca la sección historial, lo asigna a una variable, despues busca el primer articulo que aparezca y tambien lo asigna a una variable.
15. En el ultimo pedido verifica que exista un componente que diga carne, verifica que el x2 sea visible (porque pidió una empanada y le agrego otra del mismo gusto), verfica que exista un texto que diga Pago: Efectivo y verifica que exista un texto que diga Entrega: Retiro.

Historial:

- Primero instalamos playwright mal y nos dimos cuenta de que nos habiamos confundido de nombre asi que instalamos playwright/test.
- No entendia nada de playwright asi que le pedi a chatGPT que vayamos haciendo el test linea por linea bien explicado todo.
- Para poder hacer bien algunas partes del testeo tuvimos que agregar algunos area-label a algunos botones.




oli: 
finalmente logre instalar toda esta mierda 
cree la carpeta github y el archivo ci.yml
cree los on (que dice cuand se activa el workflow) --> cuando se pushea y se pullea en las branches develop y main respectivamente
arme el job (arma una computadora virtual en ubuntu y corre todo para chequearlo)


1. Descargar el proyecto
2. Instalar Node
3. Instalar dependencias
4. Ejecutar lint
5. Ejecutar tests
6. Ejecutar build
7. Deploy


✔ Checkout
✔ Setup Node
✔ Install Front
✔ Lint
✔ Install Back
✔ Unit Tests
✔ Install Playwright
✔ Start Frontend
✔ E2E Tests
✔ Build