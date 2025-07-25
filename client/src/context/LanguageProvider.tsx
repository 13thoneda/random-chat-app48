import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Simple translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'AjnabiCam',
    'welcome': 'Welcome',
    'loading': 'Loading...',
  },
  hi: {
    'app.name': 'अजनबी कैम',
    'welcome': 'स्वागत है',
    'loading': 'लोड हो रहा है...',
  }
};

// Export languages list for components that need it
export const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिंदी (Hindi)' },
];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
