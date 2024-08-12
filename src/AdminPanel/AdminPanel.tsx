import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import adminStore from "../mobx/adminStore";
import Table from "react-bootstrap/Table";
import authStore from "../mobx/AuthStoreFile";
import UserService from "../AuthUser/services/UserService";
import { useEffect, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import InputChecked from "./InputChecked";
import SelectRole from "./SelectRole";

import "./AdminPanel.scss";
import InputText from "./InputText";

const AdminPanel: React.FC = () => {
  console.log("users", authStore.users);
  const isAdmin = authStore?.user?.roles?.includes("admin");
  const isUser = authStore?.user?.roles?.includes("user");
  const idUser = authStore?.user?.id;

  console.log("++++++++++++++++++++++++++++++++");
  console.log("userName", authStore.user.userName);
  console.log("lastUserName", authStore.user.lastUserName);
  console.log("isBlocked", authStore.user.isBlocked);
  console.log("isAddedContent", authStore.user.isAddedContent);
  console.log("users", authStore.user.roles);
  console.log("user email", authStore.user.email);
  console.log("user id", authStore.user.id);
  console.log("user isActivated", authStore.user.isActivated);
  console.log("++++++++++++++++++++++++++++++++");

  const handelSaveChange = (event: FormEvent) => {
    event.preventDefault();
    console.log("save change");
    authStore.users.forEach((user) => {
      if (user.isMutation) {
        //send user save to server
        console.log("++++++++++++++++++++++++++++++++");
        console.log("userName", user.userName);
        console.log("lastUserName", user.lastUserName);
        console.log("isBlocked", user.isBlocked);
        console.log("isAddedContent", user.isAddedContent);
        console.log("users", user.roles);
        console.log("user email", user.email);
        console.log("user id", user._id);
        console.log("user isActivated", user.isActivated);
        console.log("++++++++++++++++++++++++++++++++");
        user.id = user._id;
        authStore.updateUser(user);
      }
    });
  };
  console.log(authStore.users.length);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
        console.log(response.data);
        authStore.setUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    authStore.users.length === 0 && getUsers();
  }, [authStore.users]);

  if (authStore.users.length > 0) {
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  {!isUser && <th>roles</th>}
                  {!isUser && <th>isAddedContent</th>}
                  {!isUser && <th>isBlocked</th>}
                  {!isUser && <th>isActivated</th>}
                </tr>
              </thead>

              <tbody>
                {authStore.users.map((user, id) => {
                  console.log(user._id);
                  console.log(idUser);

                  if (isAdmin || user._id === idUser) {
                    return (
                      <tr key={user._id}>
                        <td>{id + 1}</td>
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
                            <InputChecked
                              user={user}
                              nameAction="isActivated"
                            />
                          </td>
                        )}
                      </tr>
                    );
                  }
                })}
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
            <Button
              variant="primary"
              onClick={(event) => handelSaveChange(event)}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default observer(AdminPanel);
