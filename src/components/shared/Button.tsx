import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button: React.FC<ButtonProps> = ({ icon, children, className, border = false, ...props }) => {
  const baseBtn = `${border ? "border-2" : ""} flex items-center justify-center px-5 py-1 rounded-lg font-semibold transition-all duration-150 active:translate-y-1 gap-2`;

  const activeBtn =
    "border-[var(--color-border-strong)] text-[var(--color-fg)] bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]";
  const disabledBtn = "border-[var(--color-border)] text-[var(--color-muted)] cursor-not-allowed shadow-none";

  return (
    <button {...props} className={`${baseBtn} ${props.disabled ? disabledBtn : activeBtn} ${className || ""}`}>
      {icon} {children}
    </button>
  );
};

export default Button;
