import React from "react";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ open, title, children, onClose }: Props) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-orange-500 text-2xl"
          onClick={onClose}
          aria-label="Fechar modal"
          type="button"
        >
          <span className="material-icons">close</span>
        </button>
        <div className="font-bold text-lg mb-2">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
