import React from "react";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ open, title, children }: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px]">
        <div className="font-bold text-lg mb-2">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
