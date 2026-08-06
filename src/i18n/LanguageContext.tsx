'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language, TranslationSchema } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationSchema
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('ycoin_language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('ycoin_language', lang)
  }

  const t = translations[language] || translations['en']

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
