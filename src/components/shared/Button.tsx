import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  border?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, className, border = false, ...props }, ref) => {
    const baseBtn = `${
      border ? "border border-white/40" : "border border-transparent"
    } inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg active:shadow-inner transition-colors transition-shadow transition-transform duration-150 ease-out`;

    const activeBtn =
      "bg-gradient-to-b from-[#1CB0F6] to-[#0F8DD1] text-white hover:from-[#35B9F8] hover:to-[#127CB6] active:translate-y-[1px] active:scale-95";
    const disabledBtn =
      "bg-gradient-to-b from-[#1CB0F6]/30 to-[#0F8DD1]/30 text-white/60 border border-white/20 cursor-not-allowed shadow-none";

    return (
      <button ref={ref} {...props} className={`${baseBtn} ${props.disabled ? disabledBtn : activeBtn} ${className || ""}`}>
        {icon} {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
