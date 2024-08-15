import React, { useState, FormEvent, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../../../mobx/AuthStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setError } from "../../../../redux/uiSlice";
import "./SignInForm.scss";

const testUsers = [
  {
    email: "serednii@gmail.com",
    password: "mdcvsww8097",
    userName: "mykola",
    lastUserName: "serednii",
  },
];
const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [lastUserName, setLastUserName] = useState<string>("");

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault();

    if (userName.length < 3 || lastUserName.length < 3) {
      dispatch(setError("The text must have at least 3 characters"));
    } else if (!email) {
      dispatch(setError("Email is required"));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      dispatch(setError("Email address is invalid"));
    } else if (!password) {
      dispatch(setError("Password is required"));
    } else if (password.length < 6) {
      dispatch(setError("Password must be at least 6 characters"));
    } else {
      authStore.registration(email, password, userName, lastUserName);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__inner">
        <Form className="login-form__registration">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="input user name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input last user name"
              onChange={(e) => setLastUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show Password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </Form.Group>
          </Form.Group>

          <Button
            variant="secondary"
            type="button"
            onClick={(event) => handleSignIn(event)}
          >
            Registration
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default observer(SignInForm);
