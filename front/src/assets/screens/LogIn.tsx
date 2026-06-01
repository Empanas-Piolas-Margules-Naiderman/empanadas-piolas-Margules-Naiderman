import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser, type User } from "../../services/supabaseApi";

type LoginProps = {
  onLogin: (user: User) => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = name.trim() !== "" && password !== "" && !isLoading;

  async function iniciarSesion() {
    if (!canSubmit) return;

    try {
      setIsLoading(true);
      setError("");

      const user = await loginUser(name, password);

      if (!user) {
        setError("Nombre o contrasena incorrectos");
        return;
      }

      onLogin(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesion");
    } finally {
      setIsLoading(false);
    }
  }

  async function crearCuenta() {
    if (!canSubmit) return;

    try {
      setIsLoading(true);
      setError("");

      const user = await createUser(name, password);
      onLogin(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Login
        </h1>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Contrasena"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") void iniciarSesion();
          }}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={iniciarSesion}
          disabled={!canSubmit}
          className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Cargando..." : "Iniciar sesion"}
        </button>

        <button
          type="button"
          onClick={crearCuenta}
          disabled={!canSubmit}
          className="border border-orange-500 text-orange-500 p-3 rounded hover:bg-orange-50 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          Crear cuenta
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-orange-500"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Login;
