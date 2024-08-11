import React, { useState, useEffect, memo } from "react";
import Form from "react-bootstrap/Form";
import { IUser } from "../AuthUser/models/IUser";

interface IInputChecked {
  user: IUser;
  nameAction: keyof IUser; // Уточнюємо, що nameAction це ключ з IUser
}

const InputChecked: React.FC<IInputChecked> = ({ user, nameAction }) => {
  const [state, setState] = useState<boolean>(
    (user[nameAction] as boolean) || false
  );

  useEffect(() => {
    setState((user[nameAction] as boolean) || false);
  }, [user, nameAction]);

  const handleChange = (checked: boolean) => {
    setState(checked);
    console.log(checked);
    user.isMutation = true;
    console.log("user.isMutation", user.isMutation);
    switch (nameAction as string) {
      case "isAddedContent":
        user.isAddedContent = checked;
        break;
      case "isBlocked":
        user.isBlocked = checked;
        break;
      case "isActivated":
        user.isActivated = checked;
        break;
      default:
        console.log(`Sorry, we are out of ${nameAction}.`);
    }

    // Тут можна додати додаткову логіку для обробки змін стану
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check
        checked={state}
        type="checkbox"
        label={nameAction}
        onChange={(e) => handleChange(e.target.checked)}
      />
    </Form.Group>
  );
};

export default memo(InputChecked);
