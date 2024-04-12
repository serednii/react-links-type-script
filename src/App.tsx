import { useEffect, useRef, useState } from 'react';
import Context from "./Context";
import './App.css';

import { DATA_LINKS } from './State';
import { SetLoading } from './components/types/data';
export const URL_SERVER = 'http://smm.zzz.com.ua/api/api.php';


async function getData(url: string, setIsLoading: SetLoading) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setIsLoading(false);
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const tempDataRef = useRef();
  const value = {
    DATA_LINKS,
    // dataMain,
    // setDataMain,
    // dataMenu: DATA_MENU,
    // listLinkData,
    // openAddCategory,
    // setOpenAddCategory,
    // setListLinkData,
    // isAddCategoryMain,
    // setIsAddCategoryMain,
    // isAddCategoryOther,
    // setIsAddCategoryOther,
    // isButtonPlus,
    // setIsButtonPlus,
    // sluice,
    // setSluice,
    // outDataServer,
    // isChangeLink,
    // setIsChangeLink,
    // isChangeLinks,
    // seIsChangeLinks,
    // sluiceLinks,
  }

  function handlerGetDate() {
    getData(URL_SERVER, setIsLoading)
      .then(data => {
        tempDataRef.current = data;
        console.log(tempDataRef.current);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    console.log(DATA_LINKS)
  }

  return (
    <Context.Provider value={value} >
      <div className="App">
        {/* {isLoading && <h1>Loading...</h1>} */}
        {/* <Header />
        <UsefulLinks />
        {isAddCategoryMain && <AddCategoryMain />}
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}*/}
        <button onClick={handlerGetDate}>Get Data</button>
        {/* <button onClick={handlerPostDate}>Put Data</button> */}
      </div>
    </Context.Provider>
  );
}

export default App;
