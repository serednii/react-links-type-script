import React from "react";

interface IInput {
  type: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  callbackFunction: (event: string) => void;
}

const MyInput: React.FC<IInput> = ({
  type,
  value,
  placeholder,
  disabled,
  callbackFunction,
}) => {
  return (
    <input
      className="add-category__text-code form-control"
      value={value}
      onChange={(event) => callbackFunction(event.target.value)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default MyInput;
