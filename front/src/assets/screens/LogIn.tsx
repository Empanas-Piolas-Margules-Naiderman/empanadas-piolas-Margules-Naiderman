import { useState } from "react";

const Login = () => {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  function iniciarSesion() {
    console.log("Usuario:", usuario);
    console.log("Contraseña:", password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96 flex flex-col gap-4">

        <h1 className="text-3xl font-bold text-center text-orange-500">
          Login
        </h1>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded"
        />

        <button
          onClick={iniciarSesion}
          className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 transition"
        >
          Iniciar sesión
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="text-orange-500"
        >
          Volver
        </button>

      </div>

    </div>
  );
};

export default Login;