const ClientCard = () => (
  <div className="bg-white rounded shadow p-4 flex flex-col gap-2 min-w-[200px]">
    <div className="font-bold text-lg">Eduardo</div>
    <div className="text-sm text-gray-500">Status: Ativo</div>
    <div className="text-xs text-gray-400">Telefone: (99) 99999-9999</div>
    <div className="text-xs text-gray-400">Valor: R$ 150,00</div>
    <div className="flex gap-2 mt-2">
      <button className="text-blue-500 hover:underline text-xs">Editar</button>
      <button className="text-red-500 hover:underline text-xs">Excluir</button>
    </div>
  </div>
);

export default ClientCard;
