import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-500 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/auth/login"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
          >
            Voltar ao Login
          </Link>

          <div className="text-sm text-gray-400">
            <Link
              to="/clients/list"
              className="hover:text-orange-500 transition-colors"
            >
              Ir para Clientes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
