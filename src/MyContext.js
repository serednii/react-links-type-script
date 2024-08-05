import React, { createContext, useState, useRef } from 'react';

// Создаем контекст
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [listLinkData, setListLinkData] = useState({});
    const [sluice, setSluice] = useState({});
    const value =
    {
        listLinkData,
        setListLinkData,
        sluice,
        setSluice,
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
