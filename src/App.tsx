import ReusableButton from "./assets/components/reusableButton";
import ReusableInput from "./assets/components/ReusableInput";

const App = () => {
  return (
    <div>
      <div className="[300px] h-[300px] bg-blue-500">
        <ReusableInput
          text="podes escribir en este input reutilizable"
          styles="border-xl"
        />
      </div>
    </div>
  );
};

function Botonear() {
  console.log("lal");
}

export default App;
