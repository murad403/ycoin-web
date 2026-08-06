'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiBell, FiMenu, FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'
import { Language } from '@/i18n/translations'

interface ChatTopbarProps {
    onToggleMobileSidebar: () => void
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({ onToggleMobileSidebar }) => {
    const { t, language, setLanguage } = useLanguage()
    const [isLangOpen, setIsLangOpen] = useState(false)
    const langDropdownRef = useRef<HTMLDivElement>(null)

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

    return (
        <header className="w-full h-16 md:h-20 bg-black px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">

            {/* Left side: Logo & Header Links */}
            <div className="flex items-center gap-4 md:gap-10">
                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={onToggleMobileSidebar}
                    className="md:hidden p-2 text-zinc-300 hover:text-white rounded-xl border border-border-color bg-[#020813] hover:bg-zinc-900 transition-all cursor-pointer"
                    title="Open Sidebar"
                >
                    <FiMenu className="w-5 h-5" />
                </button>

                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-1 bg-[#020813] border border-border-color rounded-xl shadow-[0_0_12px_var(--color-dropshadow-color)] flex items-center justify-center">
                        <Image
                            src={logoImg}
                            alt="Ycoin AI Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-lg md:text-xl font-bold tracking-tight text-heading flex items-center select-none">
                        Ycoin AI
                    </h1>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6">
                    <Link href="/#philosophy" className="text-description hover:text-title text-xs md:text-sm font-semibold transition-colors select-none">
                        {t.nav.philosophy}
                    </Link>
                    <Link href="/#roadmap" className="text-description hover:text-title text-xs md:text-sm font-semibold transition-colors select-none">
                        {t.nav.roadmap}
                    </Link>
                    <Link href="/#culture" className="text-description hover:text-title text-xs md:text-sm font-semibold transition-colors select-none">
                        {t.nav.culture}
                    </Link>
                </nav>
            </div>

            {/* Right side: Language, Search, Notifications & Exit Terminal */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Language Selector Dropdown */}
                <div className="relative" ref={langDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="border border-border-color bg-[#020813] px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs text-zinc-300 font-bold select-none cursor-pointer hover:border-zinc-700 transition-colors focus:outline-none"
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

                {/* Notification Bell with Badge */}
                <button className="relative p-2.5 text-zinc-300 hover:text-title rounded-xl border border-border-color bg-[#020813] hover:bg-zinc-900/60 transition-colors cursor-pointer select-none">
                    <FiBell className="w-4 h-4" />
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-title font-bold font-mono text-[9px] min-w-4.5 h-4 rounded-full flex items-center justify-center px-1 border border-black shadow">
                        23
                    </span>
                </button>

                {/* Exit Terminal Button */}
                <Link
                    href="/"
                    className="border border-border-color hover:border-button-color bg-[#020813] hover:bg-button-color/10 text-title text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 select-none active:scale-[0.98] shrink-0"
                >
                    {t.chat.exitTerminal}
                </Link>
            </div>

        </header>
    )
}

export default ChatTopbar