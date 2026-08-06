'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiMenu, FiX, FiGlobe, FiMessageSquare, FiChevronRight, FiChevronDown, FiCheck } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'
import { Language } from '@/i18n/translations'

type TNavlink = {
  href: string;
  label: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsLangOpen(false)
  }

  const navlinks: TNavlink[] = [
    {
      href: "#philosophy",
      label: t.nav.philosophy
    },
    {
      href: "#roadmap",
      label: t.nav.roadmap
    },
    {
      href: "#culture",
      label: t.nav.culture
    }
  ]

  return (
    <nav className="w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-1 bg-[#020813] border border-zinc-800/80 rounded-2xl shadow-[0_0_15px_var(--color-dropshadow-color)] flex items-center justify-center">
              <Image
                src={logoImg}
                alt="Ycoin Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-heading flex items-center select-none">
              Ycoin AI
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {
              navlinks.map((item: TNavlink, index: number) =>
                <Link key={index} href={item.href} className="text-description hover:text-white text-sm font-semibold transition-all duration-200 select-none">
                  {item.label}
                </Link>
              )
            }
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="border border-zinc-800 bg-[#020813]/60 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-zinc-300 font-bold select-none cursor-pointer hover:border-zinc-700 transition-colors focus:outline-none"
              >
                <FiGlobe className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>{language.toUpperCase()}</span>
                <FiChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Floating Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#030712] border border-zinc-800 rounded-2xl shadow-xl py-2 z-50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => handleSelectLanguage('en')}
                    className="w-full px-4 py-2.5 text-xs text-left text-zinc-300 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between font-semibold transition-colors cursor-pointer"
                  >
                    <span>{t.nav.english}</span>
                    {language === 'en' && <FiCheck className="w-4 h-4 text-[#0071E3]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectLanguage('zh')}
                    className="w-full px-4 py-2.5 text-xs text-left text-zinc-300 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between font-semibold transition-colors cursor-pointer"
                  >
                    <span>{t.nav.chinese}</span>
                    {language === 'zh' && <FiCheck className="w-4 h-4 text-[#0071E3]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Talk to AI Button */}
            <Link
              href="/new-chat"
              className="bg-button-color hover:bg-button-color/90 text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_var(--color-dropshadow-color)] transition-all duration-200 select-none active:scale-[0.98]"
            >
              <FiMessageSquare className="w-3.5 h-3.5" />
              <span>{t.nav.talkToAi}</span>
              <FiChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-1.5 rounded-lg border border-zinc-800 bg-zinc-950/45"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-black/95 backdrop-blur-lg absolute left-0 right-0 px-4 pt-4 pb-6 flex flex-col gap-4 shadow-xl">
          <Link
            href="#philosophy"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            {t.nav.philosophy}
          </Link>
          <Link
            href="#roadmap"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            {t.nav.roadmap}
          </Link>
          <Link
            href="#culture"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            {t.nav.culture}
          </Link>
          <div className="h-px bg-zinc-900 my-2" />
          
          {/* Mobile Language Switcher */}
          <div className="px-3 flex flex-col gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t.nav.selectLanguage}</span>
            <div className="grid grid-cols-2 gap-2 bg-[#020813] border border-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 text-xs font-bold rounded-lg transition-colors ${language === 'en' ? 'bg-button-color text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('zh')}
                className={`py-2 text-xs font-bold rounded-lg transition-colors ${language === 'zh' ? 'bg-button-color text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                简体中文 (ZH)
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-3 mt-2">
            <Link
              href="/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="bg-button-color text-white text-center font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 shadow-[0_0_15px_var(--color-dropshadow-color)] transition-all duration-150"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span>{t.nav.talkToAi}</span>
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar