import { Button as AntdButton, type ButtonProps } from "antd";
import type { ReactNode } from "react";

type AntdButtonProps = ButtonProps & {
  onClick?: () => void;
  isModalOpen?: boolean;
  handleOk?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
};

export const Button = ({ children, onClick, ...props }: AntdButtonProps) => {
  return (
    <AntdButton onClick={onClick} {...props}>
      {children}
    </AntdButton>
  );
};
