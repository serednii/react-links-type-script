import React, { useState, useEffect, memo } from "react";
import Form from "react-bootstrap/Form";
import { IUser } from "../AuthUser/models/IUser";
import authStore from "../mobx/AuthStore";

interface IInputChecked {
  user: IUser;
  nameAction: keyof IUser; // Уточнюємо, що nameAction це ключ з IUser
}

const InputChecked: React.FC<IInputChecked> = ({ user, nameAction }) => {
  const [state, setState] = useState<boolean>(
    (user[nameAction] as boolean) || false
  );

  // console.log("++++++++++++++++++++++++++++++++");
  // console.log("userName", authStore.user.userName);
  // console.log("lastUserName", authStore.user.lastUserName);
  // console.log("isBlocked", authStore.user.isBlocked);
  // console.log("isAddedContent", authStore.user.isAddedContent);
  // console.log("users", authStore.user.roles);
  // console.log("user email", authStore.user.email);
  // console.log("user id", authStore.user.id);
  // console.log("user isActivated", authStore.user.isActivated);
  // console.log("++++++++++++++++++++++++++++++++");

  // useEffect(() => {
  // setState((user[nameAction] as boolean) || false);
  // }, []);

  const handleChange = (checked: boolean) => {
    setState(checked);
    console.log(checked);
    user.isMutation = true;
    console.log("user.isMutation", user.isMutation);

    switch (nameAction as string) {
      case "isAddedContent":
        user.isAddedContent = checked;
        console.log(user.isAddedContent);
        break;
      case "isBlocked":
        user.isBlocked = checked;
        console.log(user.isBlocked);
        break;
      case "isActivated":
        user.isActivated = checked;
        console.log(user.isActivated);
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
