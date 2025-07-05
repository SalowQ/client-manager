const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/teddy-logo.png"
            alt="Teddy Logo"
            className="h-16 mx-auto mb-4"
          />
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>

        {/* Texto de loading */}
        <div className="mt-4 text-orange-500 font-medium">Carregando...</div>
      </div>
    </div>
  );
};

export default Loading;
