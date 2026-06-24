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

- src/authService.js loginUser(): probar que el login te devuelva correctamente un token.
- src/orderService.js getOrderByUserId: probar que segun el id de un usuario logueado te de todos sus pedidos.

E2E test:

- Probar el flujo desde login hasta crear un pedido.
