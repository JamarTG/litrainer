import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, className, border = false, ...props }, ref) => {
    const baseBtn = `${border ? "border-2" : "border"} flex items-center justify-center px-5 py-1 rounded-lg font-semibold transition-colors duration-150 gap-2`;

    const activeBtn =
      "border-[var(--color-border)] text-[var(--color-fg)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)]";
    const disabledBtn = "border-[var(--color-border)] text-[var(--color-muted)] cursor-not-allowed shadow-none";

    return (
      <button ref={ref} {...props} className={`${baseBtn} ${props.disabled ? disabledBtn : activeBtn} ${className || ""}`}>
        {icon} {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
