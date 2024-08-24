import { useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import UsefulLinks from "./components/UsefulLinks/UsefulLinks";
import AddCategoryOther from "./components/AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./components/ChangeLinks/ChangeLinks";
import { observer } from "mobx-react-lite";
import menuStore from "./mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "./mobx/DataStore";

import authStore from "./mobx/AuthStore";

import "./App.css";
import Errors from "./components/Errors/Errors";
import InfoModal from "./components/InfoModal/InfoModal";
import AdminPanel from "./AdminPanel/AdminPanel";
import adminStore from "./mobx/adminStore";
import Portal from "./Portal/Portal";
import logicStore from "./mobx/LogicStore";

const App: React.FC = () => {
  // const dispatch = useDispatch();
  const userId = authStore?.user?.id;
  console.log("APP RENDER");

  // const isAdmin = authStore?.user?.roles?.includes("admin");
  const arrayKeysRef = useRef<string | undefined>(userId);

  useEffect(() => {
    arrayKeysRef.current = userId; // Оновлення ref при зміні userId
  }, [userId]); // Залежність масиву забезпечує його запуск при зміні userId

  console.log(userId); // Повинно вивести поточний userId
  console.log(arrayKeysRef.current); // Повинно вивести те ж саме, що й userId

  const activesMenuRef = useRef(logicStore.updateDataMain);
  setTimeout(() => {
    console.log(logicStore.updateDataMain);
    console.log(activesMenuRef.current === logicStore.updateDataMain);
    console.log(arrayKeysRef.current === userId);
  }, 200);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId);
      try {
        await menuStore.getMenu(userId);
        // console.log(dataStore.dataMain);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        // dispatch(
        //   setError("Sorry! We encountered an error, please try again later.")
        // );
      }
    };

    userId && fetchData();
  }, [logicStore.updateDataMain, userId]);

  // if (authStore.isLoading) {
  //   return <div>Downloading...</div>;
  // }

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        <Header />
        {/* {isLoading && <h1>Loading...</h1>} */}
        {authStore.isAuth && <UsefulLinks />}
        {/* {isAddCategoryOther && <AddCategoryOther />} */}
        {/* {logicStore.isChangeLinks && <h1>Modal</h1>} */}
      </main>
      <Portal />
      {/* {error && <Errors />}
      {info && <InfoModal />} */}
      {adminStore.openAdmin && <AdminPanel />}
    </div>
  );
};

export default observer(App);
