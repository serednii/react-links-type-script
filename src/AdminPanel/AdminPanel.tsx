import React, { useEffect, FormEvent, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import adminStore from "../mobx/adminStore";
import authStore from "../mobx/AuthStore";
import DataStore from "../mobx/store";

import InputChecked from "./InputChecked";
import SelectRole from "./SelectRole";
import InputText from "./InputText";
import { svgDeleted } from "../icon";
import { setError } from "../redux/uiSlice";

import "./AdminPanel.scss";

const testUsers = [
  {
    email: "serednii@gmail.com",
    password: "mdcvsww8097",
    userName: "mykola",
    lastUserName: "serednii",
  },
  {
    email: "ivanov@gmail.com",
    password: "mdcvsww8097",
    userName: "ivan",
    lastUserName: "ivanov",
  },
  {
    email: "petrenko@gmail.com",
    password: "mdcvsww8097",
    userName: "petro",
    lastUserName: "petrenko",
  },
  {
    email: "shevchenko@gmail.com",
    password: "mdcvsww8097",
    userName: "taras",
    lastUserName: "shevchenko",
  },
  // {
  //   email: "kobzar@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "oles",
  //   lastUserName: "kobzar",
  // },
  // {
  //   email: "bondarenko@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "andrii",
  //   lastUserName: "bondarenko",
  // },
  // {
  //   email: "zhuravlyova@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "olena",
  //   lastUserName: "zhuravlyova",
  // },
  // {
  //   email: "melnyk@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "oleh",
  //   lastUserName: "melnyk",
  // },
  // {
  //   email: "sokolov@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "serhiy",
  //   lastUserName: "sokolov",
  // },
  // {
  //   email: "poltava@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "artem",
  //   lastUserName: "poltava",
  // },
  // {
  //   email: "dovzhenko@gmail.com",
  //   password: "mdcvsww8097",
  //   userName: "oleksandr",
  //   lastUserName: "dovzhenko",
  // },
];

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState(true);
  const tempUpdateUser = useRef(false);
  const isAdmin = authStore?.user?.roles?.includes("admin");
  const isUser = authStore?.user?.roles?.includes("user");
  const idUser = authStore?.user?.id;

  const generateUsers = async () => {
    for (const { email, password, userName, lastUserName } of testUsers) {
      try {
        await authStore.createUser(email, password, userName, lastUserName);
      } catch (e) {
        console.error(`Error creating user:`, e);
      }
    }

    try {
      await authStore.getUsers();
      setUpdateUser((prev) => !prev);
    } catch (e) {
      console.error("Error fetching updated users:", e);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        await authStore.getUsers();
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };

    // if (tempUpdateUser.current !== updateUser) {
    getUsers();
    // }

    // tempUpdateUser.current = updateUser;
  }, []);

  const handelSaveChange = async (event: FormEvent) => {
    event.preventDefault();
    const usersToUpdate = authStore.users.filter((user) => user.isMutation);

    for (const user of usersToUpdate) {
      user.id = user._id;
      try {
        await authStore.updateUser(user);
      } catch (e) {
        console.error(`Error updating user with ID ${user._id}:`, e);
      }
    }
    try {
      await authStore.getUsers();
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };

  const handleDeleteUser = async (event: FormEvent) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-id");
    if (!id) return;
    if (id === "66bcd8a5ac0fbc3a862aee33") {
      dispatch(setError("you cannot remove an admin"));
      return;
    }

    const userName = event.currentTarget.getAttribute("data-user-name");
    const resultAsk = prompt(
      `Do you really want to delete the user ${userName}? Input user name`
    );
    console.log("iduser", id);
    if (resultAsk === userName) {
      try {
        await authStore.deleteUser(id);
        await authStore.getUsers();
        await DataStore.deleteMenu(id);
      } catch (e) {
        console.error(`Error deleting user with ID ${id}:`, e);
      }
    } else {
      dispatch(setError("You have entered an incorrect Name"));
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        className="admin-panel"
        show={adminStore.openAdmin}
        onHide={() => adminStore.setOpenAdmin(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Administration panel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Actions</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {!isUser && <th>Roles</th>}
                {!isUser && <th>isAddedContent</th>}
                {!isUser && <th>isBlocked</th>}
                {!isUser && <th>isActivated</th>}
              </tr>
            </thead>
            <tbody>
              {authStore.users.map(
                (user, id) =>
                  (isAdmin || user._id === idUser) && (
                    <tr key={user._id}>
                      <td>{id + 1}</td>
                      <td>
                        <button
                          data-id={user._id}
                          data-user-name={user.userName}
                          onClick={handleDeleteUser}
                        >
                          {svgDeleted}
                        </button>
                      </td>
                      <td>
                        <InputText user={user} nameAction="userName" />
                      </td>
                      <td>
                        <InputText user={user} nameAction="lastUserName" />
                      </td>
                      <td>
                        <InputText user={user} nameAction="email" />
                      </td>
                      {!isUser && (
                        <td>
                          <SelectRole user={user} />
                        </td>
                      )}
                      {!isUser && (
                        <td>
                          <InputChecked
                            user={user}
                            nameAction="isAddedContent"
                          />
                        </td>
                      )}
                      {!isUser && (
                        <td>
                          <InputChecked user={user} nameAction="isBlocked" />
                        </td>
                      )}
                      {!isUser && (
                        <td>
                          <InputChecked user={user} nameAction="isActivated" />
                        </td>
                      )}
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => adminStore.setOpenAdmin(false)}
          >
            Close
          </Button>
          <Button variant="secondary" onClick={generateUsers}>
            Generate users
          </Button>

          <Button variant="primary" onClick={handelSaveChange}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default observer(AdminPanel);
