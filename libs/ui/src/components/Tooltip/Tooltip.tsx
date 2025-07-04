import React, { useState } from "react";

type Props = {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow z-10 whitespace-nowrap">
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
