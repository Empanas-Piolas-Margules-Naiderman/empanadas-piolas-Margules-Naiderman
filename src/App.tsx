import ReusableButton from "./assets/components/reusableButton";
import ReusableInput from "./assets/components/ReusableInput";

const App = () => {
  return (
    <div>
      <div className="flex items-center">
        <ReusableInput
          placeHolder="Podes escribir en este input reutilizable" //Lo mismo que text pero para input. No obligatorio
          className="bg-blue-300 min-w-75" //Estilos. Obligatorio
        />
      </div>
      <div className="flex items-center">
        <ReusableButton
          text="Botón reutilizable" //Texto del boton. No obligaorio
          openFunction={Botonear} //Funcion que se ejecuta cuando se toca. Obligaorio
          className="bg-red-500" //Estilos. Obligatorio
          // image="/Link de la imagen.formato" <---- Esa es la sintaxis. Tenés que poner la imagen en la carpeta public para que funcione. No obligatorio
        />
      </div>
    </div>
  );
};

function Botonear() {
  console.log("lal");
}

export default App;
