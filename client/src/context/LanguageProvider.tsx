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
    'onboarding.welcome': 'Welcome to AjnabiCam',
    'onboarding.subtitle': 'Set up your profile to get started',
    'onboarding.language': 'Language',
    'onboarding.username': 'Username',
    'onboarding.username.placeholder': 'Enter your username',
    'onboarding.gender': 'Gender',
    'onboarding.gender.male': 'Male',
    'onboarding.gender.female': 'Female',
    'onboarding.continue': 'Continue',
    'onboarding.skip': 'Skip for now',
  },
  hi: {
    'app.name': 'अजनबी कैम',
    'welcome': 'स्वागत है',
    'loading': 'लोड हो रहा है...',
    'onboarding.welcome': 'अजनबी कैम में आपका स्वागत है',
    'onboarding.subtitle': 'शुरू करने के लिए अपनी प्रोफ़ाइल सेट करें',
    'onboarding.language': 'भाषा',
    'onboarding.username': 'उपयोगकर्ता नाम',
    'onboarding.username.placeholder': 'अपना उपयोगकर्ता नाम दर्ज करें',
    'onboarding.gender': 'लिंग',
    'onboarding.gender.male': 'पुरुष',
    'onboarding.gender.female': 'महिला',
    'onboarding.continue': 'जारी रखें',
    'onboarding.skip': 'अभी के लिए छोड़ें',
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
