import { Suspense, useState } from "react";
import { Button, Input } from "ui/components";

const Login = () => {
  const [name, setName] = useState("");
  const [error, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErro("Por favor, insira seu nome.");
      return;
    }

    // Simula login simples
    localStorage.setItem("userName", name);
    window.location.href = "/clients";
  };
  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <Suspense fallback={<div>Carregando UI...</div>}>
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg shadow-md flex flex-col items-center justify-center space-y-6"
          style={{ width: "80%", maxWidth: "500px" }}
        >
          <h1 className="text-2xl font-semibold text-center text-zinc-800">
            Olá, seja bem-vindo!
          </h1>

          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o seu nome:"
            className="mb-2"
          />

          {error && (
            <p className="text-red-500 text-sm w-full text-center">{error}</p>
          )}

          <Button type="submit" variant="primary">
            Entrar
          </Button>
        </form>
      </Suspense>
    </div>
  );
};

export default Login;
