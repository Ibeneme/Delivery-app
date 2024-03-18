import React, { createContext, useContext, useState } from 'react';
import i18n from './i18n';

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    i18n.locale = newLocale;
  };

  return (
    <LocalizationContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  return useContext(LocalizationContext);
};
