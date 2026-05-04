import { useState } from "react";
import ReusableButton from "./assets/components/reusableButton";
import ReusableInput from "./assets/components/ReusableInput";

const App = () => {

  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState<string[]>([]);

  function Botonear(): void {
    console.log("Click");
  }

  const scrollToMenu = (): void => {
    const section = document.getElementById("menu");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  function agregar(empanada: string) {
    setPedido([...pedido, empanada]);
  }

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 bg-orange-500 text-white relative">

        {/* HAMBURGUESA */}
        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>

        {/* TITULO */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">
          Empanadas Piolas
        </h1>

        {/* LOGIN */}
        <ReusableButton
          text="Login"
          openFunction={Botonear}
          styles="bg-white text-orange-500 px-3 py-1 rounded"
        />

      </nav>

      {/* SIDEBAR */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50">
          <p className="mb-4 font-bold">MENÚ</p>
          <p className="mb-2 cursor-pointer" onClick={scrollToMenu}>Pedir</p>
          <p className="mb-2 cursor-pointer">Locales</p>
          <p className="mb-2 cursor-pointer">Nosotros</p>
        </div>
      )}

      {/* HERO */}
      <section className="h-[80vh] flex flex-col justify-center items-center bg-[url('/empanadas.jpg')] bg-cover bg-center text-white">
        <h2 className="text-5xl font-bold mb-4">Las mejores empanadas</h2>

        <button
          onClick={scrollToMenu}
          className="bg-orange-500 px-6 py-2 rounded mt-4"
        >
          Ver menú
        </button>
      </section>

      {/* MENÚ */}
      <section id="menu" className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestro menú</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div onClick={() => agregar("Carne")} className="bg-white shadow p-4 rounded cursor-pointer">
            <img src="/carne.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Carne</h3>
          </div>

          <div onClick={() => agregar("Pollo")} className="bg-white shadow p-4 rounded cursor-pointer">
            <img src="/pollo.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Pollo</h3>
          </div>

          <div onClick={() => agregar("Jamón y queso")} className="bg-white shadow p-4 rounded cursor-pointer">
            <img src="/jamon.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Jamón y queso</h3>
          </div>

        </div>
      </section>

      {/* PEDIDO (lo que elegiste) */}
      <section className="p-10 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu pedido</h2>

        {pedido.length === 0 ? (
          <p>No agregaste nada todavía</p>
        ) : (
          <ul>
            {pedido.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      {/* FORM */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">Hacer pedido</h2>

        <div className="max-w-md mx-auto flex flex-col gap-4">
          <ReusableInput placeHolder="¿Qué vas a pedir?" />
          <ReusableInput placeHolder="¿Cómo pagás?" />
          <ReusableInput placeHolder="Retiro o delivery?" />

          <ReusableButton
            text="Enviar pedido"
            openFunction={Botonear}
            styles="bg-orange-500 text-white p-2 rounded"
          />
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="p-10 bg-gray-100 flex flex-col md:flex-row gap-10 items-center">
        <img src="/local.jpg" className="w-full md:w-1/2 rounded" />

        <div>
          <h2 className="text-3xl font-bold mb-4">Quiénes somos</h2>
          <p>
            Somos un emprendimiento familiar que hace empanadas caseras
            con ingredientes de calidad.
          </p>
        </div>
      </section>

      {/* MAPA */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Dónde estamos</h2>

        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          <p>MAPA</p>
        </div>
      </section>

    </div>
  );
};

export default App;