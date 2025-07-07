import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "ui/components";

type LoginFormData = {
  name: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      navigate("/clients/list");
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("userName", data.name);

      navigate("/clients/list");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Erro ao fazer login. Tente novamente.",
      });
    }
  };

  const handleInputChange = () => {
    if (errors.name) {
      clearErrors("name");
    }
    if (errors.root) {
      clearErrors("root");
    }
  };

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <Suspense fallback={<div>Carregando UI...</div>}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 md:w-[35%] rounded-lg flex flex-col items-center justify-center"
          noValidate
        >
          <h1 className="text-2xl md:text-4xl font-inter font-normal text-center text-zinc-800 mb-6">
            Olá, seja bem-vindo!
          </h1>

          <div className="w-full">
            <Input
              type="text"
              placeholder="Digite o seu nome:"
              className={`text-xl w-full ${
                errors.name
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              }`}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? errors.name.message : undefined}
              {...register("name", {
                required: "Por favor, insira seu nome.",
                minLength: {
                  value: 2,
                  message: "O nome deve ter pelo menos 2 caracteres.",
                },
                onChange: handleInputChange,
              })}
            />
          </div>

          {errors.root && (
            <p className="text-red-500 text-lg w-full text-center mt-2">
              {errors.root.message}
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
