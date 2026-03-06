import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, className, border = false, ...props }, ref) => {
    const baseBtn = `inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg  font-medium shadow-sm transition-colors transition-transform duration-150 ease-out`;

    const activeBtn =
      "hover:to-[var(--color-primary-strong-hover)] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white hover:from-[var(--color-primary-hover)]   active:translate-y-[1px] active:scale-95";
    const disabledBtn =
      "bg-gradient-to-b from-[var(--color-primary-disabled)] to-[var(--color-primary-strong-disabled)] text-white/60 border border-white/20 cursor-not-allowed shadow-none";

    return (
      <button ref={ref} {...props} className={`${baseBtn} ${props.disabled ? disabledBtn : activeBtn} ${className || ""}`}>
        {icon} {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
