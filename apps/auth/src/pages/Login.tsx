import { Suspense, useState } from "react";
import { Button, Input } from "ui/components";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, insira seu nome.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("userName", formData.name);
      window.location.href = "/clients";
    } catch (error) {
      setErrors({ submit: "Erro ao fazer login. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <Suspense fallback={<div>Carregando UI...</div>}>
        <form
          onSubmit={handleSubmit}
          className="w-4/5 md:w-[35%] rounded-lg flex flex-col items-center justify-center"
          noValidate
        >
          <h1 className="text-2xl md:text-4xl font-inter font-normal text-center text-zinc-800 mb-6">
            Olá, seja bem-vindo!
          </h1>

          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite o seu nome:"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errors.name : undefined}
            className={`text-xl w-full ${
              errors.name
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />

          {errors.submit && (
            <p className="text-red-500 text-lg w-full text-center">
              {errors.submit}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="text-xl mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Suspense>
    </div>
  );
};

export default Login;
