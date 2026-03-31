import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, config } from './data';

type LanguageCode = 'en' | 'nl';
type LanguagePreference = 'en' | 'nl' | 'system';

interface LanguageContextType {
    language: LanguageCode;
    preference: LanguagePreference;
    setPreference: (pref: LanguagePreference) => void;
    t: typeof translations.en;
    config: typeof config;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getSystemLanguage = (): LanguageCode => {
    return navigator.language.split('-')[0] === 'nl' ? 'nl' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [preference, setPreferenceState] = useState<LanguagePreference>(() => {
        const saved = localStorage.getItem('preferred-language');
        if (saved === 'en' || saved === 'nl' || saved === 'system') return saved as LanguagePreference;
        return 'system';
    });

    const [language, setLanguage] = useState<LanguageCode>(() => {
        if (preference === 'system') return getSystemLanguage();
        return preference as LanguageCode;
    });

    useEffect(() => {
        if (preference === 'system') {
            setLanguage(getSystemLanguage());
        } else {
            setLanguage(preference as LanguageCode);
        }
    }, [preference]);

    const setPreference = (pref: LanguagePreference) => {
        setPreferenceState(pref);
        localStorage.setItem('preferred-language', pref);
    };

    const value = {
        language,
        preference,
        setPreference,
        t: translations[language],
        config
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
