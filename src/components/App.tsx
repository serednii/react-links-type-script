import { useRef, useState, useEffect, useContext } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { MyContext } from "../MyContext";
import { getData, outDataServer } from "../functions/requestHelpers";
import { Footer } from "./Footer/Footer";
import { MyProvider } from "../MyContext";
import "../App.css";

const App: React.FC = () => {
  const {
    URL_SERVER,
    isLoading,
    setIsLoading,
    setDataMain,
    isAddCategoryOther,
    isChangeLinks,
  } = useContext(MyContext);

  const tempDataRef = useRef<{ test: string } | null>(null);

  const handlerGetDate = (): void => {
    getData(URL_SERVER, setIsLoading)
      .then((data: any) => {
        tempDataRef.current = data;
        console.log(tempDataRef.current);
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
        // throw new Error(String(error));
      });
  };

  function handlerPostDate() {
    tempDataRef.current = {
      ...tempDataRef.current,
      test: "123",
    };

    console.log(tempDataRef.current);
    outDataServer(URL_SERVER, "PUT", tempDataRef.current);
  }

  useEffect(() => {
    console.log("render");
    getData(URL_SERVER, setIsLoading)
      .then((data: any) => {
        setDataMain(data);
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
        // throw new Error(String(error));
      });
  }, []);

  return (
    <MyProvider>
      <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
        <main className="flex-grow-1 d-flex flex-column">
          {isLoading && <h1>Loading...</h1>}
          <Header />
          <UsefulLinks />
          {isAddCategoryOther && <AddCategoryOther />}
          {isChangeLinks && <ChangeLinks />}
          {/* <Button onClick={handlerGetDate}>Get Data</Button>
        <Button onClick={handlerPostDate}>Put Data</Button> */}
        </main>
        <Footer></Footer>
      </div>
    </MyProvider>
  );
};

export default App;
