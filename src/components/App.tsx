import { useEffect } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";
import todoStore from "../mobx/store";
import authStore from "../mobx/AuthStoreFile";
import { setError } from "../redux/uiSlice";

import "../App.css";
import Errors from "./Errors/Errors";
import InfoModal from "./InfoModal/InfoModal";
import AdminPanel from "../AdminPanel/AdminPanel";
import adminStore from "../mobx/adminStore";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { info, error, isChangeLinks, isLoading, isAddCategoryOther } =
    useSelector((state: RootState) => state.ui);
  const { updateDataMain } = useSelector((state: RootState) => state.data);

  // console.log("++++++++++++++++++++++++++++++++");
  // console.log("userName", authStore.user.userName);
  // console.log("lastUserName", authStore.user.lastUserName);
  // console.log("isBlocked", authStore.user.isBlocked);
  // console.log("isAddedContent", authStore.user.isAddedContent);
  // console.log("users", authStore.user.roles);
  // console.log("user email", authStore.user.email);
  // console.log("user id", authStore.user.id);
  // console.log("user isActivated", authStore.user.isActivated);

  // console.log("isAuth", authStore.isAuth);
  // console.log("isLoading", authStore.isLoading);
  // console.log("++++++++++++++++++++++++++++++++");

  const isAdmin = authStore?.user?.roles?.includes("admin");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(authStore.user.id);
      try {
        await todoStore.getMenu(authStore.user.id);
        console.log(todoStore.dataMain);
      } catch (error) {
        // console.error("Error fetching menu data:", error);
        dispatch(setError("Error fetching menu data:"));
      }
    };

    authStore?.user?.id && fetchData();
  }, [updateDataMain, authStore.user.id]);

  if (authStore.isLoading) {
    return <div>Downloading...</div>;
  }
  console.log("authStore.isAuth", authStore.isAuth);

  if (!authStore.isAuth) {
    if (authStore.users.length > 0) authStore.setUsers([]);
    // return (
    //   <div>
    //     <AuthForms />
    //     {error && <Errors />}
    //     {info && <InfoModal />}
    //   </div>
    // );
  }

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        {/* {isLoading && <h1>Loading...</h1>} */}
        <Header />
        {authStore.isAuth && <UsefulLinks />}
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}
      </main>
      {error && <Errors />}
      {info && <InfoModal />}
      {adminStore.openAdmin && <AdminPanel />}
    </div>
  );
};

export default observer(App);
