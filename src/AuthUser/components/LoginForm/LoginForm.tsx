import React, { useState, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../../mobx/AuthStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginForm.scss";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    authStore.login(email, password);
  };

  const handleRegistration = (event: FormEvent) => {
    event.preventDefault();
    authStore.registration(email, password);
  };

  return (
    <>
      <Form className="login-form">
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
          variant="primary"
          type="submit"
          onClick={(event) => handleLogin(event)}
        >
          Login
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={(event) => handleRegistration(event)}
        >
          Registration
        </Button>
      </Form>
    </>
  );
};

export default observer(LoginForm);
