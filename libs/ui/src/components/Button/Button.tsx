import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const base = "w-full py-2 px-4 font-semibold rounded text-white transition";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    />
  );
};

export default Button;
