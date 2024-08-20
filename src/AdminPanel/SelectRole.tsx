import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { IUser } from "../AuthUser/models/IUser";

interface ISelectRole {
  user: IUser;
}

const roles: string[] = ["admin", "editor", "user", "other"];

const SelectRole: React.FC<ISelectRole> = ({ user }) => {
  // Конвертуємо user.role в масив, якщо це не масив
  const initialRoles = Array.isArray(user.roles) ? user.roles : [user.roles];
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);
  console.log("SelectRole");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    user.isMutation = true;
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedRoles(selectedOptions); // Оновлюємо стан вибраних ролей
    user.roles = selectedOptions || user.roles;
  };

  return (
    <Form.Select
      aria-label="Select roles"
      multiple
      value={selectedRoles} // Передаємо вибрані ролі в компонент
      onChange={handleChange} // Обробник зміни вибору
    >
      {roles.map((role, index) => (
        <option key={index} value={role}>
          {role}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectRole;
