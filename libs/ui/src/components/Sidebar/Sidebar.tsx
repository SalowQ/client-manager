const Sidebar = () => (
  <aside className="w-64 bg-gray-900 text-white h-full flex flex-col p-4">
    <div className="mb-8 text-2xl font-bold">Logo</div>
    <nav className="flex-1">
      <ul className="space-y-4">
        <li className="hover:text-orange-400 cursor-pointer">Home</li>
        <li className="hover:text-orange-400 cursor-pointer">Clientes</li>
        <li className="hover:text-orange-400 cursor-pointer">Chamados</li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
