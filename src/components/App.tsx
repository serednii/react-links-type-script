import { useRef, useEffect, useState } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";
import todoStore from "../mobx/store";
import authStore from "../mobx/AuthStore";
import { setError } from "../redux/uiSlice";
import LoginForm from "../AuthUser/components/LoginForm/LoginForm";

import "../App.css";
import Errors from "./Errors/Errors";
// import { useTransition } from "react-spring";
import { useSpring, animated } from "@react-spring/web";
import InfoModal from "./InfoModal/InfoModal";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { info, error, isChangeLinks, isLoading, isAddCategoryOther } =
    useSelector((state: RootState) => state.ui);
  const { updateDataMain } = useSelector((state: RootState) => state.data);

  console.log("++++++++++++++++++++++++++++++++");
  console.log("users", authStore.user.roles);
  console.log("user email", authStore.user.email);
  console.log("user id", authStore.user.id);
  console.log("user isActivated", authStore.user.isActivated);

  console.log("isAuth", authStore.isAuth);
  console.log("isLoading", authStore.isLoading);
  console.log("++++++++++++++++++++++++++++++++");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(authStore.user.id);
      try {
        const data = await todoStore.getMenu(authStore.user.id);
        console.log(data);
      } catch (error) {
        // console.error("Error fetching menu data:", error);
        dispatch(setError("Error fetching menu data:"));
      }
    };

    authStore.user.id && fetchData();
  }, [updateDataMain, authStore.user.id]);

  if (authStore.isLoading) {
    return <div>Downloading...</div>;
  }

  if (!authStore.isAuth) {
    if (authStore.users.length > 0) authStore.setUsers([]);
    return (
      <div>
        <LoginForm />
        {error && <Errors />}
        {info && <InfoModal />}
        {/* <button onClick={authStore.getUsers}>Получить пользователей</button> */}
      </div>
    );
  }
  // const tempDataRef = useRef<{ test: string } | null>(null);
  // const animation = useSpring({
  //   opacity: error ? 1 : 0,
  //   transform: error ? "translateY(0)" : "translateY(-100%)",
  // });

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        {isLoading && <h1>Loading...</h1>}
        {/* {!authStore.isAuth && <LoginForm />} */}
        <Header />
        <UsefulLinks />
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}
      </main>
      {error && <Errors />}
      {info && <InfoModal />}
    </div>
  );
};

export default observer(App);
