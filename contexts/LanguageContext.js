import { createContext, useContext, useState } from 'react';
import en from '../translations/en';
import ar from '../translations/ar';

const translations = { en, ar };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    t: (key) => {
      const keys = key.split('.');
      let translation = translations[language];
      for (const k of keys) {
        translation = translation[k];
      }
      return translation || key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
