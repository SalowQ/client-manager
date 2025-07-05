import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const base = "w-full py-2 px-4 font-semibold rounded transition";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    outline:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    />
  );
};

export default Button;
