import { type InputHTMLAttributes, type ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  type: string | "file";
  register: UseFormRegister<any>;
  children?: ReactNode;
};

export const InputField = ({
  name,
  placeholder,
  type,
  register,
  children,
  ...props
}: InputFieldProps) => {
  if (type === "file") {
    return (
      <label>
        <input
          id={name}
          type={type}
          className="hidden"
          {...register(name, { required: "この項目は必須です。" })}
          {...props}
        />
        {children}
      </label>
    );
  }

  return (
    <input
      id={name}
      placeholder={placeholder}
      type={type}
      {...register(name, { required: "この項目は必須です。" })}
      {...props}
    />
  );
};
