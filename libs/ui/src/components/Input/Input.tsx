import { type InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", ...rest },
  ref
) {
  const isInvalid =
    rest["aria-invalid"] === true || rest["aria-invalid"] === "true";

  const errorMessageId = rest["aria-describedby"];

  return (
    <div className="w-full">
      <input
        ref={ref}
        {...rest}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
          isInvalid ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {isInvalid && errorMessageId && (
        <p
          id={errorMessageId}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {rest["aria-describedby"]}
        </p>
      )}
    </div>
  );
});

export default Input;
