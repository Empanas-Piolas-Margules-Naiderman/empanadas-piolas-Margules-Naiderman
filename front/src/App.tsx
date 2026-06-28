import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./assets/screens/LogIn";
import ReusableButton from "./assets/components/reusableButton";
import {
  createPedido,
  getPedidosByUser,
  type Pedido,
  type PedidoItem,
  type User,
} from "./services/supabaseApi";

const USER_STORAGE_KEY = "empanadasPiolasUser";

const menu = [
  { nombre: "Carne", precio: 100000, imagen: "/empanadasDeCarne.jfif" },
  { nombre: "Pollo", precio: 100000, imagen: "/empanadasDePollo.jfif" },
  { nombre: "Jamon y queso", precio: 100000, imagen: "/empanadasDeJYQ.jfif" },
  { nombre: "Humita", precio: 100000, imagen: "/empanadasDeHumita.jfif" },
  { nombre: "4 Quesos", precio: 100000, imagen: "/empanadas4Quesos.jfif" },
  { nombre: "Caprese", precio: 100000, imagen: "/empanadasDeCaprese.jfif" },
];

function getStoredUser() {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!storedUser) return null;

  try {
    const parsedUser = JSON.parse(storedUser) as User & { nombre?: string };

    if (!parsedUser.name && parsedUser.nombre) {
      return { id: parsedUser.id, name: parsedUser.nombre };
    }

    return parsedUser;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function getPedidoItems(pedido: Pedido): PedidoItem[] {
  if (Array.isArray(pedido.empanadas)) {
    return pedido.empanadas;
  }

  return pedido.empanadas.items ?? [];
}

function getPedidoInfo(pedido: Pedido) {
  if (Array.isArray(pedido.empanadas)) {
    return { pago: "", envio: "", createdAt: "" };
  }

  return pedido.empanadas;
}

function formatDate(value?: string) {
  if (!value) return "Sin fecha";

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

const App = () => {
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState<PedidoItem[]>([]);
  const [historial, setHistorial] = useState<Pedido[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStoredUser(),
  );
  const [pago, setPago] = useState("");
  const [envio, setEnvio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isSavingPedido, setIsSavingPedido] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setHistorial([]);
      return;
    }

    const userId = currentUser.id;

    async function cargarHistorial() {
      try {
        const pedidos = await getPedidosByUser(userId);
        setHistorial(pedidos);
      } catch (error) {
        setMensaje(
          error instanceof Error
            ? error.message
            : "No se pudo cargar el historial",
        );
      }
    }

    void cargarHistorial();
  }, [currentUser]);

  function handleLogin(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setMensaje("");
  }

  function cerrarSesion() {
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentUser(null);
    setPedido([]);
    setPago("");
    setEnvio("");
    setMensaje("Sesion cerrada");
  }

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  function agregar(nombre: string) {
    const existe = pedido.find((p) => p.nombre === nombre);

    if (existe) {
      setPedido(
        pedido.map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + 1 } : p,
        ),
      );
      return;
    }

    setPedido([...pedido, { nombre, cantidad: 1 }]);
  }

  function restar(nombre: string) {
    setPedido(
      pedido
        .map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p,
        )
        .filter((p) => p.cantidad > 0),
    );
  }

  async function enviarPedido() {
    if (!currentUser) {
      setMensaje("Tenes que iniciar sesion para guardar un pedido");
      return;
    }

    if (pedido.length === 0) {
      setMensaje("Agrega al menos una empanada al pedido");
      return;
    }

    if (!pago || !envio) {
      setMensaje("Elegi metodo de pago y tipo de entrega");
      return;
    }

    try {
      setIsSavingPedido(true);
      setMensaje("");

      const savedPedido = await createPedido(currentUser.id, {
        items: pedido,
        pago,
        envio,
        createdAt: new Date().toISOString(),
      });

      setHistorial((prevHistorial) => [savedPedido, ...prevHistorial]);
      setPedido([]);
      setPago("");
      setEnvio("");
      setMensaje("Pedido guardado correctamente");
      scrollToSection("historial");
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo guardar el pedido",
      );
    } finally {
      setIsSavingPedido(false);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-sans pt-24">
              <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center gap-4 p-6 bg-orange-500 text-white">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="text-2xl"
                  aria-label="Abrir menu"
                >
                  ☰
                </button>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold">
                  Empanadas Piolas
                </h1>

                <div className="flex items-center gap-3">
                  {currentUser ? (
                    <>
                      <span className="hidden md:inline font-semibold">
                        Hola, {currentUser.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => scrollToSection("historial")}
                        className="bg-white text-orange-500 px-3 py-1 rounded"
                      >
                        Historial
                      </button>
                      <button
                        type="button"
                        onClick={cerrarSesion}
                        className="bg-orange-700 text-white px-3 py-1 rounded"
                      >
                        Salir
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-white text-orange-500 px-3 py-1 rounded"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </nav>

              {open && (
                <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-xl"
                    aria-label="Cerrar menu"
                  >
                    ×
                  </button>

                  <p className="mb-4 font-bold">INDICE</p>
                  <button
                    className="block mb-2"
                    onClick={() => scrollToSection("nosotros")}
                  >
                    Nosotros
                  </button>
                  <button
                    className="block mb-2"
                    onClick={() => scrollToSection("mapa")}
                  >
                    Locales
                  </button>
                  <button
                    className="block mb-2"
                    onClick={() => scrollToSection("menu")}
                  >
                    Menu
                  </button>
                  <button
                    className="block mb-2"
                    onClick={() => scrollToSection("pedido")}
                  >
                    Pedir
                  </button>
                  <button
                    className="block mb-2"
                    onClick={() => scrollToSection("historial")}
                  >
                    Historial
                  </button>
                </div>
              )}

              <section
                id="nosotros"
                className="p-10 bg-gray-100 flex flex-col md:flex-row gap-10 items-center"
              >
                <img
                  src="/flia.jpg"
                  alt="Familia preparando empanadas"
                  className="w-full md:w-1/2 rounded"
                />

                <div>
                  <h2 className="text-3xl font-bold mb-4">Quienes somos</h2>
                  <p>
                    En **Empanadas Piolas** creemos que una buena empanada puede
                    mejorar cualquier día. Nacimos con una idea simple: preparar
                    empanadas abundantes, sabrosas y hechas con ingredientes de
                    calidad, para que cada bocado se sienta como casero. Nos
                    gusta innovar sin perder las recetas de siempre, ofreciendo
                    desde los sabores clásicos que nunca fallan hasta
                    combinaciones originales para los más curiosos. Ya sea para
                    compartir con amigos, disfrutar en familia o darte un gusto
                    después de un día largo, siempre hay una empanada piola
                    esperándote. Porque para nosotros no se trata solo de
                    comer... se trata de disfrutar un buen momento. ¡Bienvenido
                    a Empanadas Piolas, donde el sabor es cosa seria, pero la
                    buena onda nunca falta!
                  </p>
                </div>
              </section>

              <section id="mapa" className="p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Donde estamos</h2>

                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <p>NO ESTAMOS</p>
                </div>
              </section>

              <section id="menu" className="p-10 text-center">
                <h2 className="text-3xl font-bold mb-6">Nuestro menu</h2>

                <div className="flex flex-wrap justify-center gap-6">
                  {menu.map((item) => (
                    <button
                      key={item.nombre}
                      type="button"
                      onClick={() => agregar(item.nombre)}
                      className="bg-white shadow p-4 rounded cursor-pointer w-40 text-left"
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h3 className="font-bold">{item.nombre}</h3>
                      <p className="font-bold">${item.precio}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section id="pedido" className="p-10 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Tu pedido
                </h2>

                {pedido.length === 0 ? (
                  <p className="text-center">No agregaste nada todavia</p>
                ) : (
                  <div className="max-w-md mx-auto flex flex-col gap-4">
                    {pedido.map((item) => (
                      <div
                        key={item.nombre}
                        className="flex justify-between items-center bg-white p-4 rounded shadow"
                      >
                        <p className="font-semibold">{item.nombre}</p>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => restar(item.nombre)}
                            aria-label={`Restar ${item.nombre}`}
                            className="bg-gray-200 px-3 py-1 rounded"
                          >
                            -
                          </button>

                          <span>{item.cantidad}</span>

                          <button
                            type="button"
                            onClick={() => agregar(item.nombre)}
                            aria-label={`Agregar ${item.nombre}`}
                            className="bg-orange-500 text-white px-3 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="p-10 bg-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Hacer pedido
                </h2>

                <div className="max-w-md mx-auto flex flex-col gap-8">
                  <div>
                    <p className="font-bold mb-3">Metodo de pago</p>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setPago("Efectivo")}
                        className={`flex-1 p-3 rounded transition ${
                          pago === "Efectivo"
                            ? "bg-orange-500 text-white"
                            : "bg-white border"
                        }`}
                      >
                        Efectivo
                      </button>

                      <button
                        type="button"
                        onClick={() => setPago("Mercado Pago")}
                        className={`flex-1 p-3 rounded transition ${
                          pago === "Mercado Pago"
                            ? "bg-blue-500 text-white"
                            : "bg-white border"
                        }`}
                      >
                        Mercado Pago
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold mb-3">Tipo de entrega</p>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setEnvio("Retiro")}
                        className={`flex-1 p-3 rounded transition ${
                          envio === "Retiro"
                            ? "bg-green-500 text-white"
                            : "bg-white border"
                        }`}
                      >
                        Retiro en local
                      </button>

                      <button
                        type="button"
                        onClick={() => setEnvio("Delivery")}
                        className={`flex-1 p-3 rounded transition ${
                          envio === "Delivery"
                            ? "bg-purple-500 text-white"
                            : "bg-white border"
                        }`}
                      >
                        Delivery
                      </button>
                    </div>
                  </div>

                  {mensaje && (
                    <p className="rounded bg-white p-3 text-center text-sm shadow">
                      {mensaje}
                    </p>
                  )}

                  <ReusableButton
                    text={isSavingPedido ? "Guardando..." : "Enviar pedido"}
                    openFunction={() => void enviarPedido()}
                    styles="bg-orange-500 text-white p-3 rounded disabled:opacity-60"
                  />
                </div>
              </section>

              <section id="historial" className="p-10 bg-white">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Historial de pedidos
                </h2>

                {!currentUser ? (
                  <p className="text-center">
                    Inicia sesion para ver tus pedidos guardados.
                  </p>
                ) : historial.length === 0 ? (
                  <p className="text-center">
                    Todavia no tenes pedidos guardados.
                  </p>
                ) : (
                  <div className="max-w-2xl mx-auto flex flex-col gap-4">
                    {historial.map((item, index) => (
                      <article
                        key={item.id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                          <h3 className="font-bold">
                            Pedido #{historial.length - index}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(getPedidoInfo(item).createdAt)}
                          </p>
                        </div>

                        <ul className="mt-3">
                          {getPedidoItems(item).map((empanada) => (
                            <li
                              key={empanada.nombre}
                              className="flex justify-between"
                            >
                              <span>{empanada.nombre}</span>
                              <span>x{empanada.cantidad}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-3 flex flex-wrap gap-2 text-sm">
                          {getPedidoInfo(item).pago && (
                            <span className="rounded bg-orange-100 px-2 py-1">
                              Pago: {getPedidoInfo(item).pago}
                            </span>
                          )}
                          {getPedidoInfo(item).envio && (
                            <span className="rounded bg-green-100 px-2 py-1">
                              Entrega: {getPedidoInfo(item).envio}
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
