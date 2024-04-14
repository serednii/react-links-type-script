import { useRef, useState, useEffect } from 'react';
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryMain from "./AddCategoryMain/AddCategoryMain";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { Button } from 'react-bootstrap';

import Context from "../Context";
import '../App.css';

import { DATA_MENU, DATA_LINKS } from '../State';
import { TGetData, TOutDataServer, IRequestOptions } from './types/data';
export const URL_SERVER = 'http://smm.zzz.com.ua/api/api.php';


const getData: TGetData = async (url, setIsLoading) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(String(error));
  } finally {
    setIsLoading(false);
  }
}



const outDataServer: TOutDataServer = (url, method, newData) => {
  const requestOptions: IRequestOptions = {
    method: method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // Дополнительные заголовки, если необходимо
    },
    body: JSON.stringify(newData),
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data updated successfully:', data);
      // Обработка успешного обновления данных
    })
    .catch(error => {
      console.error('There was an error updating data:', error);
      // Обработка ошибки
    });
}

const App: React.FC = () => {
  const [dataMain, setDataMain] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const tempDataRef = useRef<{ test: string; } | null>(null);
  const [isButtonPlus, setIsButtonPlus] = useState(false);
  const [isChangeLinks, setIsChangeLinks] = useState(false);
  const [isAddCategoryMain, setIsAddCategoryMain] = useState(false);
  const [isAddCategoryOther, setIsAddCategoryOther] = useState(false);
  const [isChangeLink, setIsChangeLink] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [isModal, setIsModal] = useState(false);


  const [listLinkData, setListLinkData] = useState<any[]>([]);
  const [sluice, setSluice] = useState({});
  const sluiceLinks = useRef({});

  const value = {
    DATA_LINKS,
    dataMain,
    setDataMain,
    // dataMenu: DATA_MENU,
    openAddCategory,
    setOpenAddCategory,
    listLinkData,
    setListLinkData,
    isAddCategoryMain,
    setIsAddCategoryMain,
    isAddCategoryOther,
    setIsAddCategoryOther,
    isButtonPlus,
    setIsButtonPlus,
    sluice,
    setSluice,
    outDataServer,
    isChangeLink,
    setIsChangeLink,
    isChangeLinks,
    setIsChangeLinks,
    sluiceLinks,
    isModal,
    setIsModal
  }

  const handlerGetDate = (): void => {
    getData(URL_SERVER, setIsLoading)
      .then((data: any) => {
        tempDataRef.current = data;
        console.log(tempDataRef.current);
      })
      .catch((error: Error) => {
        console.error('Error fetching data:', error);
        // throw new Error(String(error));
      });
  }

  function handlerPostDate() {

    tempDataRef.current = {
      ...tempDataRef.current,
      test: '123'
    }

    console.log(tempDataRef.current)
    outDataServer(URL_SERVER, 'PUT', tempDataRef.current);
  }

  useEffect(() => {
    console.log('render')
    getData(URL_SERVER, setIsLoading)
      .then((data: any) => {
        setDataMain(data);
      })
      .catch((error: Error) => {
        console.error('Error fetching data:', error);
        // throw new Error(String(error));
      });
  }, []);

  return (
    <Context.Provider value={value} >
      <div className="App">
        {isLoading && <h1>Loading...</h1>}
        <Header />
        <UsefulLinks />
        {isAddCategoryMain && <AddCategoryMain />}
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}
        {/* <Button onClick={handlerGetDate}>Get Data</Button>
        <Button onClick={handlerPostDate}>Put Data</Button> */}
      </div>
    </Context.Provider>
  );
}

export default App;
