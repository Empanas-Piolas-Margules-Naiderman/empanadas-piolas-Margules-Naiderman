import ReusableButton from "./assets/components/reusableButton";
import ReusableInput from "./assets/components/ReusableInput";

const App = () => {

  function Botonear(): void {
    console.log("lal");
  }

  const scrollToMenu = (): void => {
    const section = document.getElementById("menu");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 bg-orange-500 text-white">

        <div className="flex gap-4 items-center">
          <a href="#menu">Menú</a>
        </div>

        <div> 
          <ReusableButton
            text="Login"
            openFunction={Botonear}
            styles="bg-white text-orange-500 px-3 py-1 rounded"
          />
        </div> 

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">Empanadas Piolas</h1> 

      </nav>

      {/* HERO */}
      <section className="h-[80vh] flex flex-col justify-center items-center bg-[url('/empanadas.jpg')] bg-cover bg-center text-white">
        <h2 className="text-4xl font-bold mb-4">Las mejores empanadas</h2>
        <p className="mb-6">Caseras, recién salidas del horno</p>

      </section>

      {/* MENÚ */}
      <section id="menu" className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestro menú</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-4 rounded">
            <img src="/carne.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Carne</h3>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <img src="/pollo.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Pollo</h3>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <img src="/jamon.jpg" className="rounded mb-2" />
            <h3 className="font-bold">Jamón y queso</h3>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section
        id="nosotros"
        className="p-10 bg-gray-100 flex flex-col md:flex-row gap-10 items-center"
      >
        <img src="/local.jpg" className="w-full md:w-1/2 rounded" />

        <div>
          <h2 className="text-3xl font-bold mb-4">Quiénes somos</h2>
          <p>
            Somos un emprendimiento familiar que hace empanadas caseras
            con ingredientes de calidad.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Contacto</h2>
        <p>📍 Buenos Aires</p>
        <p>📞 11-1234-5678</p>
      </section>

    </div>
  );
};

export default App;