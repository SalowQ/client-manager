declare module "ui/UiApp" {
  const UiApp: React.ComponentType;
  export default UiApp;
}

declare module "ui/components" {
  import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
  export const Button: React.FC<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary";
    }
  >;
  export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>>;
}
