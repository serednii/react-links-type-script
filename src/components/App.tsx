import { useRef, useEffect, useContext } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { MyContext } from "../MyContext";
import {
  getDataGraphQLMenu,
  getDataGraphQLLink,
  addDataGraphQLLink,
  addDataGraphQLArticle,
} from "../functions/requestHelpersGraphQL";
import { Footer } from "./Footer/Footer";
import "../App.css";
import Errors from "./Errors/Errors";
// import { useTransition } from "react-spring";
import { useSpring, animated } from "@react-spring/web";
import InfoModal from "./InfoModal/InfoModal";

const App: React.FC = () => {
  const {
    isLoading,
    setDataMain,
    dataMain,
    isAddCategoryOther,
    isChangeLinks,
    error,
    setError,
    info,
  } = useContext(MyContext);
  const tempDataRef = useRef<{ test: string } | null>(null);
  const animation = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? "translateY(0)" : "translateY(-100%)",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataGraphQLMenu();
        console.log(data);
        setDataMain(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setError("Error fetching menu data:");
      }
    };

    fetchData();
  }, []);

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

export default App;
