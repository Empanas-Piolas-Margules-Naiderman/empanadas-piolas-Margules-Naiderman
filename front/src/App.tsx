import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./assets/screens/LogIn";
import ReusableButton from "./assets/components/reusableButton";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState<{ nombre: string; cantidad: number }[]>(
    [],
  );
  const [pago, setPago] = useState("");
  const [envio, setEnvio] = useState("");

  function Botonear(): void {
    console.log("Click");
  }

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // agregar
  function agregar(nombre: string) {
    const existe = pedido.find((p) => p.nombre === nombre);

    if (existe) {
      setPedido(
        pedido.map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + 1 } : p,
        ),
      );
    } else {
      setPedido([...pedido, { nombre, cantidad: 1 }]);
    }
  }

  // restar
  function restar(nombre: string) {
    setPedido(
      pedido
        .map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p,
        )
        .filter((p) => p.cantidad > 0),
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="font-sans pt-24">
              {/* NAVBAR */}
              <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-orange-500 text-white">
                <button onClick={() => setOpen(!open)} className="text-2xl">
                  ☰
                </button>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">
                  Empanadas Piolas
                </h1>

                <ReusableButton
                  text="Login"
                  openFunction={() => (window.location.href = "/login")}
                  styles="bg-white text-orange-500 px-3 py-1 rounded"
                />
              </nav>

              {/* SIDEBAR */}
              {open && (
                <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-xl"
                  >
                    ✕
                  </button>

                  <p className="mb-4 font-bold">INDICE</p>
                  <p className="mb-2 cursor-pointer" onClick={() => scrollToSection("nosotros")}>Nosotros</p>
                  <p className="mb-2 cursor-pointer" onClick={() => scrollToSection("mapa")}>Locales</p>
                  <p className="mb-2 cursor-pointer" onClick={() => scrollToSection("menu")}>
                    Menú
                  </p>
                  <p className="mb-2 cursor-pointer" onClick={() => scrollToSection("pedido")}>Pedir</p>
                  
                  
                </div>
              )}

              {/* NOSOTROS */}
              <section id = "nosotros" className="p-10 bg-gray-100 flex flex-col md:flex-row gap-10 items-center">
                <img src="/flia.webp" className="w-full md:w-1/2 rounded" />

                <div>
                  <h2 className="text-3xl font-bold mb-4">Quiénes somos</h2>
                  <p>
                    Somos un emprendimiento familiar que hace empanadas caseras
                    con ingredientes de calidad.
                  </p>
                </div>
              </section>

              {/* MAPA */}
              <section id="mapa" className="p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Dónde estamos</h2>

                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <p>MAPA</p>
                </div>
              </section>

              {/* MENÚ */}
              <section id="menu" className="p-10 text-center">
                <h2 className="text-3xl font-bold mb-6">Nuestro menú</h2>

                <div className="flex flex-wrap justify-center gap-6">
                  <div
                    onClick={() => agregar("Carne")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadasDeCarne.avif"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">Carne</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>

                  <div
                    onClick={() => agregar("Pollo")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadasDePollo.webp"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">Pollo</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>

                  <div
                    onClick={() => agregar("Jamón y queso")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadasDeJYQ.webp"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">Jamón y queso</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>

                  <div
                    onClick={() => agregar("Humita")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadasHumita.webp"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">Humita</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>

                  <div
                    onClick={() => agregar("4 Quesos")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadas4Quesos.webp"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">4 Quesos</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>

                  <div
                    onClick={() => agregar("Caprese")}
                    className="bg-white shadow p-4 rounded cursor-pointer w-40"
                  >
                    <img
                      src="/empanadasCaprece1.webp"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold">Caprese</h3>
                    <h3 className="font-bold">$100000</h3>
                  </div>
                </div>
              </section>

              {/* PEDIDO NUEVO */}
              <section id="pedido" className="p-10 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Tu pedido
                </h2>

                {pedido.length === 0 ? (
                  <p className="text-center">No agregaste nada todavía</p>
                ) : (
                  <div className="max-w-md mx-auto flex flex-col gap-4">
                    {pedido.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-white p-4 rounded shadow"
                      >
                        <p className="font-semibold">{item.nombre}</p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => restar(item.nombre)}
                            className="bg-gray-200 px-3 py-1 rounded"
                          >
                            -
                          </button>

                          <span>{item.cantidad}</span>

                          <button
                            onClick={() => agregar(item.nombre)}
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

              {/* FORM */}
              <section className="p-10 bg-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Hacer pedido
                </h2>

                <div className="max-w-md mx-auto flex flex-col gap-8">

                  {/* MÉTODO DE PAGO */}
                  <div>
                    <p className="font-bold mb-3">Método de pago</p>

                    <div className="flex gap-4">

                      <button
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

                  {/* ENVÍO */}
                  <div>
                    <p className="font-bold mb-3">Tipo de entrega</p>

                    <div className="flex gap-4">

                      <button
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

                  {/* BOTÓN FINAL */}
                  <ReusableButton
                    text="Enviar pedido"
                    openFunction={() => {
                      console.log("Pedido:", pedido);
                      console.log("Pago:", pago);
                      console.log("Envío:", envio);
                    }}
                    styles="bg-orange-500 text-white p-3 rounded"
                  />

                </div>
              </section>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
