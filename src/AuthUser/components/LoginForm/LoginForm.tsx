import React, { useState, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../../mobx/AuthStoreFile";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./LoginForm.scss";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [lastUserName, setLastUserName] = useState<string>("");

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    authStore.login(email, password);
  };

  const handleRegistration = (event: FormEvent) => {
    event.preventDefault();
    authStore.registration(email, password, userName, lastUserName);
  };

  return (
    <div className="login-form">
      <div className="login-form__inner">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          // className="mb-3"
          fill
        >
          <Tab eventKey="Log in" title="Log in">
            <Form className="login-form__login">
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
            </Form>
          </Tab>
          <Tab eventKey="Sign in" title="Sign in">
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
                onClick={(event) => handleRegistration(event)}
              >
                Registration
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default observer(LoginForm);
