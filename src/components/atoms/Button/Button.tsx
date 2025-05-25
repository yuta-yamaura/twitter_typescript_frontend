import type { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
};

export const Button = ({ children, onClick, type, ...props }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
