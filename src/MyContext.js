import React, { createContext, useState, useRef } from 'react';

// Создаем контекст
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [isChangeLink, setIsChangeLink] = useState(false);
    const [dataMain, setDataMain] = useState({});
    const [listLinkData, setListLinkData] = useState({});
    const [sluice, setSluice] = useState({});
    const sluiceLinks = useRef({});
    const password = "text code"
    const value =
    {
        password,
        dataMain,
        setDataMain,
        listLinkData,
        setListLinkData,
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
