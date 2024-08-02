import React, { createContext, useState, useRef } from 'react';

// Создаем контекст
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const URL_SERVER = "http://smm.zzz.com.ua/api/api.php";
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonPlus, setIsButtonPlus] = useState(false);
    const [isChangeLinks, setIsChangeLinks] = useState(false);
    const [isAddCategoryOther, setIsAddCategoryOther] = useState(false);
    const [isChangeLink, setIsChangeLink] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [dataMain, setDataMain] = useState({});
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [listLinkData, setListLinkData] = useState({});
    const [sluice, setSluice] = useState({});
    const sluiceLinks = useRef({});
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)
    const password = "text code"
    const value =
    {
        info,
        password,
        setInfo,
        error,
        setError,
        URL_SERVER,
        isLoading,
        setIsLoading,
        dataMain,
        setDataMain,
        openAddCategory,
        setOpenAddCategory,
        listLinkData,
        setListLinkData,
        isAddCategoryOther,
        setIsAddCategoryOther,
        isButtonPlus,
        setIsButtonPlus,
        sluice,
        setSluice,
        sluiceLinks,
        isChangeLink,
        setIsChangeLink,
        isChangeLinks,
        setIsChangeLinks,
        isModal,
        setIsModal,
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
