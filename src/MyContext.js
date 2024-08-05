import React, { createContext, useState, useRef } from 'react';

// Создаем контекст
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const value =
    {

    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
