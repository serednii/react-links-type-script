import { useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import UsefulLinks from "./components/UsefulLinks/UsefulLinks";
import { observer } from "mobx-react-lite";
import menuStore from "./mobx/asyncDataStore/AsyncMenuStore";
import authStore from "./mobx/AuthStore";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import adminStore from "./mobx/adminStore";
import Portal from "./Portal/Portal";
import logicStore from "./mobx/LogicStore";
import "./App.css";

const App: React.FC = () => {
  const userId = authStore?.user?.id;
  console.log("APP RENDER");
  // const isAdmin = authStore?.user?.roles?.includes("admin");

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
      } catch (error) {
        console.error("Error fetching menu data:", error);
        logicStore.setError(
          "Sorry! We encountered an error, please try again later."
        );
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
        {authStore.user.isBlocked && (
          <h1>
            You are blocked, please contact the administrator
            userullinks@gmail.com
          </h1>
        )}
        {authStore.isAuth && !authStore.user.isBlocked && <UsefulLinks />}
      </main>
      <Portal />
      {adminStore.openAdmin && <AdminPanel />}
    </div>
  );
};

export default observer(App);
