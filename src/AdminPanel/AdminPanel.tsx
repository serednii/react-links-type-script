import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import adminStore from "../mobx/adminStore";
import Table from "react-bootstrap/Table";
import authStore from "../mobx/AuthStoreFile";
import UserService from "../AuthUser/services/UserService";
import { useEffect, FormEvent } from "react";
import "./AdminPanel.scss";
import { observer } from "mobx-react-lite";
import InputChecked from "./InputChecked";
import SelectRole from "./SelectRole";
import { IUser } from "../AuthUser/models/IUser";

const AdminPanel: React.FC = () => {
  console.log("users", authStore.users);

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
        // const newUser = {
        //   userName: user.userName,
        //   lastUserName: user.lastUserName,
        //   email: user.email,
        //   id: user._id,
        //   roles: user.roles,
        //   isAddedContent: user.isAddedContent,
        //   isBlocked: user.isBlocked,
        //   isActivated: user.isActivated,
        // };
        user.id = user._id;
        // authStore.updateUser(newUser as IUser);
        authStore.updateUser(user);
      }
    });
  };
  console.log(authStore.users.length);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await UserService.fetchUsers();
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
        className="modal show "
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
                  <th>roles</th>
                  <th>isAddedContent</th>
                  <th>isBlocked</th>
                  <th>isActivated</th>
                </tr>
              </thead>
              <tbody>
                {authStore.users.map((user, id) => {
                  console.log("55555555555555555555555555555555555");
                  return (
                    <tr key={user._id}>
                      <td>{id}</td>
                      <td>{user.userName}</td>
                      <td>{user.lastUserName}</td>
                      <td>{user.email}</td>
                      <td>
                        <SelectRole user={user} />
                      </td>
                      <td>
                        <InputChecked user={user} nameAction="isAddedContent" />
                      </td>
                      <td>
                        <InputChecked user={user} nameAction="isBlocked" />
                      </td>
                      <td>
                        <InputChecked user={user} nameAction="isActivated" />
                      </td>
                    </tr>
                  );
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
