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
      className="border rounded w-full shadow py-3 px-4 text-gray-700 leading-tight"
      {...register(name, { required: "この項目は必須です。" })}
    />
  );
};
