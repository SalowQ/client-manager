const ClientForm = () => (
  <form className="flex flex-col gap-3 bg-gray-50 p-4 rounded shadow max-w-xs">
    <label className="flex flex-col text-sm">
      Nome
      <input
        className="border rounded px-2 py-1 mt-1"
        type="text"
        placeholder="Nome do cliente"
      />
    </label>
    <label className="flex flex-col text-sm">
      Telefone
      <input
        className="border rounded px-2 py-1 mt-1"
        type="text"
        placeholder="(99) 99999-9999"
      />
    </label>
    <label className="flex flex-col text-sm">
      Valor
      <input
        className="border rounded px-2 py-1 mt-1"
        type="number"
        placeholder="R$ 0,00"
      />
    </label>
    <button
      type="submit"
      className="bg-orange-500 text-white rounded px-4 py-2 mt-2 hover:bg-orange-600"
    >
      Salvar
    </button>
  </form>
);

export default ClientForm;
