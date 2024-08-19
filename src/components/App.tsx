import { useEffect } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";
import menuStore from "../mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "../mobx/dataStore/DataStore";

import authStore from "../mobx/AuthStore";
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

  console.log("+++++++++++++++APP RENDER+++++++++++++++++");

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
        await menuStore.getMenu(authStore.user.id);
        console.log(dataStore.dataMain);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        dispatch(
          setError("Sorry! We encountered an error, please try again later.")
        );
      }
    };

    authStore?.user?.id && fetchData();
  }, [updateDataMain, authStore.user.id]);

  // if (authStore.isLoading) {
  //   return <div>Downloading...</div>;
  // }

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        <Header />
        {isLoading && <h1>Loading...</h1>}
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
