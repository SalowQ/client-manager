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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={<div>Carregando UI...</div>}>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white rounded-md shadow-sm p-8 flex flex-col items-center"
        >
          <h1 className="text-xl font-semibold mb-6 text-center">
            Olá, seja bem-vindo!
          </h1>

          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o seu nome:"
          />

          {error && (
            <p className="text-red-500 text-sm mt-1 mb-2 w-full text-left">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" className="mt-4">
            Entrar
          </Button>
        </form>
      </Suspense>
    </div>
  );
};

export default Login;
