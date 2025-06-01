import { FC, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = "primary", disabled, children, className = "", ...props }) => {
  const baseStyles =
    "rounded-lg text-sm text-cloudGray h-[32px] px-3 max-w-fit flex justify-center items-center cursor-pointer transition-all ease-in-out";

  const variantStyles =
    variant === "primary" ? "bg-[#ffffff12] hover:text-offWhite" : "bg-transparent hover:text-offWhite";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:text-cloudGray" : "";

  return (
    <button disabled={disabled} className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
