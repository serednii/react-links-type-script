import React from "react";

interface IInput {
  type: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  callbackFunction: (event: string) => void;
  className?: string; // Опціональний клас
  [key: string]: any; // Для інших параметрів
}

const MyInput: React.FC<IInput> = ({
  type,
  value,
  placeholder,
  disabled,
  callbackFunction,
  className,
  ...rest // Решта параметрів
}) => {
  console.log("MyInput");
  return (
    <input
      className={`form-control ${className ? className : ""}`}
      value={value}
      onChange={(event) => callbackFunction(event.target.value)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      {...rest} // Розподіляємо інші параметри
    />
  );
};

export default MyInput;
