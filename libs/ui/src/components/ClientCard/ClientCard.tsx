type ClientCardProps = {
  name: string;
  salary: string;
  company: string;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const iconClass = "w-6 h-6 cursor-pointer";

const ClientCard = ({
  name,
  salary,
  company,
  onAdd,
  onEdit,
  onDelete,
}: ClientCardProps) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center min-w-[200px] w-full mx-auto">
    <div className="font-bold text-lg text-center mb-2">{name}</div>
    <div className="text-sm text-gray-800 text-center">Salário: {salary}</div>
    <div className="text-sm text-gray-800 text-center mb-4">
      Empresa: {company}
    </div>
    <div className="flex w-full justify-between items-center mt-auto pt-2">
      {/* Botão de adicionar */}
      <button onClick={onAdd} aria-label="Adicionar">
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {/* Botão de editar */}
      <button onClick={onEdit} aria-label="Editar">
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
          />
        </svg>
      </button>
      {/* Botão de deletar */}
      <button onClick={onDelete} aria-label="Excluir">
        <svg
          className={iconClass + " text-red-500"}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default ClientCard;
