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
    URL_SERVER,
    isLoading,
    setIsLoading,
    setDataMain,
    dataMain,
    isAddCategoryOther,
    isChangeLinks,
    error,
    setError,
    info,
    setInfo,
  } = useContext(MyContext);
  const tempDataRef = useRef<{ test: string } | null>(null);
  const animation = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? "translateY(0)" : "translateY(-100%)",
  });
  // const handlerGetDate = (): void => {
  //   getData(URL_SERVER, setIsLoading)
  //     .then((data: any) => {
  //       tempDataRef.current = data;
  //       console.log(tempDataRef.current);
  //     })
  //     .catch((error: Error) => {
  //       console.error("Error fetching data:", error);
  //       // throw new Error(String(error));
  //     });
  // };
  console.log(error);
  useEffect(() => {
    addDataGraphQLArticle(
      "kjdhseirhfdsfgsdfgbsdfbgf df sdf f f ff fgdfgseoigshei"
    )
      .then((res) => {
        console.log("link ", res);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setError("Error fetching menu data:");
      });
  }, []);

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
  // useEffect(() => {
  //   getData(URL_SERVER, setIsLoading)
  //     .then((data: any) => {
  //       // data = { data: { menu: [{ menu: data }] } };
  //       console.log("REST -- ", data);
  //       const pole = "Typscript";

  //       // console.log(`-----${pole}------ `, data[pole]);
  //       // setDataMain(data);
  //       // makeRequest(mutationMenu(data))
  //       //   // makeRequest(mutationMenu({ [pole]: data[pole] }))
  //       //   .then((_data) => console.log("Query result:", _data))
  //       //   .catch((error) => console.error("Query error:", error));
  //     })
  //     .catch((error: Error) => {
  //       console.error("Error fetching data:", error);
  //       // throw new Error(String(error));
  //     });
  // }, []);

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
