import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button: React.FC<ButtonProps> = ({ icon, children, className, border = false, ...props }) => {
  const baseBtn = `${border ? "border-2" : ""} flex items-center justify-center px-5 py-1 rounded-lg font-semibold transition-all duration-150 active:translate-y-1 gap-2`;

  const activeBtn = "dark:border-zinc-300 dark:text-zinc-300 text-zinc-600 border-zinc-500";
  const disabledBtn = "border-zinc-400 dark:border-zinc-600 text-zinc-400 cursor-not-allowed shadow-none";

  return (
    <button {...props} className={`${baseBtn} ${props.disabled ? disabledBtn : activeBtn} ${className || ""}`}>
      {icon} {children}
    </button>
  );
};

export default Button;
