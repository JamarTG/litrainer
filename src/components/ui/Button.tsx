import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  level: "primary" | "secondary";
  size: "sm" | "lg";
}

const Button: React.FC<ButtonProps> = ({ children, level, size, ...props }) => {

  const levelStyles =
    level === "primary"
      ? `w-${
          size == "sm" ? 26 : 36
        } text-white bg-gray-900/50 border border-2 border-indigo-800/30 hover:border-indigo-800`
      : `w-${
          size == "sm" ? 26 : 36
        } text-white border border-2  border-gray-600  focus-visible:outline-indigo-200 `;

  return (
    <button
      className={`flex justify-center items-center gap-7 rounded-lg px-3 py-2 text-md font-semibold shadow-sm ${levelStyles} transition-transform transform active:scale-95 active:shadow-lg active:translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
