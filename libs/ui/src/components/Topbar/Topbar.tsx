const Topbar = () => (
  <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
    <div className="font-bold text-xl text-orange-500">teddy</div>
    <nav className="flex space-x-6">
      <span className="text-gray-700 hover:text-orange-500 cursor-pointer">
        Clientes
      </span>
      <span className="text-gray-700 hover:text-orange-500 cursor-pointer">
        Chamados
      </span>
      <span className="text-gray-700 hover:text-orange-500 cursor-pointer">
        Sair
      </span>
    </nav>
    <div className="text-gray-600">Olá, Usuário</div>
  </header>
);

export default Topbar;
