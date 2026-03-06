import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, className, border = false, ...props }, ref) => {
    const baseBtn =
      "inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg font-medium shadow-sm transition-colors transition-transform duration-150 ease-out";

    const primaryBtn =
      "bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] active:translate-y-[1px] active:scale-95";

    const primaryDisabledBtn =
      "bg-gradient-to-b from-[var(--color-primary-disabled)] to-[var(--color-primary-strong-disabled)] text-white/60 border border-white/20 cursor-not-allowed shadow-none";

    const secondaryBtn =
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] disabled:opacity-60 disabled:cursor-not-allowed";

    const isDisabled = props.disabled;

    const variantClass = border
      ? secondaryBtn
      : isDisabled
      ? primaryDisabledBtn
      : primaryBtn;

    return (
      <button
        ref={ref}
        {...props}
        className={`${baseBtn} ${variantClass} ${className || ""}`}
      >
        {icon} {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
