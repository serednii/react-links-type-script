import React, { createContext, useState, useRef } from 'react';

// Создаем контекст
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [isAddCategoryOther, setIsAddCategoryOther] = useState(false);
    const [isChangeLink, setIsChangeLink] = useState(false);
    const [dataMain, setDataMain] = useState({});
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [listLinkData, setListLinkData] = useState({});
    const [sluice, setSluice] = useState({});
    const sluiceLinks = useRef({});
    const [idArticle, setIdArticle] = useState("")
    const [update, setUpdate] = useState(false)
    const password = "text code"
    const value =
    {
        update,
        setUpdate,
        idArticle,
        setIdArticle,
        password,
        dataMain,
        setDataMain,
        openAddCategory,
        setOpenAddCategory,
        listLinkData,
        setListLinkData,
        isAddCategoryOther,
        setIsAddCategoryOther,
        sluice,
        setSluice,
        sluiceLinks,
        isChangeLink,
        setIsChangeLink,
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
