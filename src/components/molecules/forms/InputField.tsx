import type { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  name: string;
  placeholder?: string;
  type: string;
  register: UseFormRegister<any>;
};

export const InputField = ({
  name,
  placeholder,
  type,
  register,
}: InputFieldProps) => {
  return (
    <input
      id={name}
      placeholder={placeholder}
      type={type}
      {...register(name, { required: "この項目は必須です。" })}
    />
  );
};
