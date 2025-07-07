type MenuItem = {
  label: string;
  url?: string;
  onClick?: () => void;
};

export type TopbarProps = {
  userName?: string;
  menuItems?: MenuItem[];
  onMenuClick?: () => void;
  onNavigate?: (url: string) => void;
};

const Topbar = ({
  userName = "Usuário",
  menuItems = [],
  onMenuClick,
  onNavigate,
}: TopbarProps) => {
  return (
    <header className="w-full bg-white shadow px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
      {/* Botão hamburguer à esquerda */}
      <div className="w-[48px] flex items-center justify-start">
        <button
          data-testid="menu-button"
          className="p-2 rounded hover:bg-gray-100 focus:outline-none"
          aria-label="Abrir menu"
          type="button"
          onClick={onMenuClick}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Grupo central com largura máxima e espaçamento equilibrado */}
      <div className="flex-1 mx-auto max-w-8xl w-full flex items-center justify-between">
        {/* Logo */}
        <div className="min-w-[110px]">
          <img src="/teddy-logo.png" alt="teddy logo" className="h-10 w-auto" />
        </div>

        {/* Menu dinâmico - escondido em telas pequenas */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems
            .filter((item) => item.label !== "Home")
            .map((item, idx) => {
              const isActive =
                item.url && window.location.pathname === item.url;
              const className = `font-medium cursor-pointer text-gray-700 hover:text-orange-500 ${
                isActive ? "text-orange-500 underline" : ""
              }`;

              const handleClick = () => {
                if (item.onClick) {
                  item.onClick();
                } else if (item.url && onNavigate) {
                  onNavigate(item.url);
                } else if (item.url) {
                  window.location.href = item.url;
                }
              };

              return (
                <span
                  key={item.label + idx}
                  onClick={handleClick}
                  className={className}
                >
                  {item.label}
                </span>
              );
            })}
        </nav>

        {/* Saudação */}
        <div className="text-gray-600 text-sm min-w-[120px] text-right">
          Olá, <b>{userName}!</b>
        </div>
      </div>

      {/* Espaço espelhado do botão hamburguer */}
      <div className="w-[48px]" />
    </header>
  );
};

export default Topbar;
