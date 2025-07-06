import type { ReactNode } from "react";
import { useEffect } from "react";

export type SidebarItem = {
  label: string;
  url?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  items: SidebarItem[];
  title?: ReactNode;
  onNavigate?: (url: string) => void;
};

const getActive = (url?: string) => {
  if (!url) return false;
  return window.location.pathname === url;
};

const Sidebar = ({ open, onClose, items, title, onNavigate }: SidebarProps) => {
  useEffect(() => {
    const linkId = "material-icons-link";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${
          open
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-1/5 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header com logo centralizada */}
        <div className="h-20 bg-zinc-800 flex items-center justify-center rounded-tr-2xl">
          {title || (
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 object-contain transform scale-200"
            />
          )}
        </div>

        {/* Lista de itens */}
        <nav className="flex-1 bg-white h-full">
          <ul className="py-4 space-y-2">
            {items.map((item, idx) => {
              const active = getActive(item.url);
              return (
                <li
                  key={item.label + idx}
                  className={`flex items-center text-xs gap-2 py-2 ps-6 cursor-pointer transition-colors ${
                    active
                      ? "text-orange-500 font-semibold border-e-2 border-orange-500"
                      : "text-black hover:text-orange-400"
                  }`}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.url && onNavigate) {
                      onNavigate(item.url);
                    } else if (item.url) {
                      window.location.href = item.url;
                    }
                    onClose();
                  }}
                >
                  {item.icon && (
                    <span className="text-lg flex items-center justify-center h-6">
                      {item.icon}
                    </span>
                  )}

                  <span className="text-base">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Rodapé */}
        <div className="h-8 w-full" />
      </aside>
    </>
  );
};

export default Sidebar;
