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

EDIT: DEV OPS

Tareas de cada integrante:

Olivia Naiderman: Hacer el workflow (Dejar un historial de las cosas que se van haciendo)

Joaquín Margules: Hacer los tests (Dejar un historial de las cosas que se van haciendo)

Instalamos estas dependencias para el TP:

- npm install -D jest @jest/globals
- npm install -D playwright
- npx playwright install

Instalamos las dependencias necesarias para que los test puedan correr correctamente:

- Jest para el "backend" porque trae mocks ya hechos para supabase, osea configuraciones para que funcionen los test de supabase y así se ahorran recursos.

- playwright para el E2E porque lo vi en muchas fuentes que funciona bien con nuestra arquitectura.

Test a evaluar:

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

- Probar el flujo desde login hasta crear un pedido.
