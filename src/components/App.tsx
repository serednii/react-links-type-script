import { useRef, useEffect } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";
import todoStore from "../mobx/store";
import { setError } from "../redux/uiSlice";
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

  // const tempDataRef = useRef<{ test: string } | null>(null);
  // const animation = useSpring({
  //   opacity: error ? 1 : 0,
  //   transform: error ? "translateY(0)" : "translateY(-100%)",
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todoStore.getMenu();
        console.log(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        dispatch(setError("Error fetching menu data:"));
      }
    };

    fetchData();
  }, [updateDataMain]);

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        {isLoading && <h1>Loading...</h1>}
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
