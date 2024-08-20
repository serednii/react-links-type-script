import React, { useState, useEffect, memo } from "react";
import Form from "react-bootstrap/Form";
import { IUser } from "../AuthUser/models/IUser";

interface IInputChecked {
  user: IUser;
  nameAction: keyof IUser; // Уточнюємо, що nameAction це ключ з IUser
}

const InputButton: React.FC<IInputChecked> = ({ user, nameAction }) => {

  const [state, setState] = useState<string>(
    (user[nameAction] as string) || ""
  );
  console.log('InputButton')
  
  let nameType = "";
  let nameLabel = "";
  switch (nameAction as string) {
    case "userName":
      nameType = "text";
      nameLabel = "Enter name";
      break;
    case "lastUserName":
      nameType = "text";
      nameLabel = "Enter last name";
      break;
    case "email":
      nameType = "email";
      nameLabel = "Enter email";
      break;
    case "password":
      nameType = "password";
      nameLabel = "Enter password";
      break;
    default:
      nameType = "text";
  }

  // useEffect(() => {
  //   setState((user[nameAction] as string) || "");
  // }, [user, nameAction]);

  const handleChange = (value: string) => {
    setState(value);
    console.log(value);
    user.isMutation = true;
    console.log("user.isMutation", user.isMutation);
    switch (nameAction as string) {
      case "userName":
        user.userName = value;
        break;
      case "lastUserName":
        user.lastUserName = value;
        break;
      case "email":
        user.email = value;
        break;
      case "password":
        user.password = value;
        break;
      default:
        console.log(`Sorry, we are out of ${nameAction}.`);
    }

    // Тут можна додати додаткову логіку для обробки змін стану
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control
        value={state}
        type={nameType}
        placeholder={nameLabel}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
    </Form.Group>
  );
};

export default memo(InputButton);
