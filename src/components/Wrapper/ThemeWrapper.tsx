import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const { theme } = useContext(ThemeContext);

  const wrapperStyles: React.CSSProperties = {
    backgroundColor: theme === "light" ? "#ffffff" : "#363434",
    color: theme === "light" ? "#4d4d4d" : "white",
    ...style, 
  };

  return (
    <div style={wrapperStyles} className={className}>
      {children}
    </div>
  );
};

export default ThemeWrapper;