'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import logoImg from '@/assets/images/logo.png'
import { Shield } from 'lucide-react'
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'
import { Language } from '@/i18n/translations'

type TProps = {
    children: React.ReactNode
    title: string
    description?: string
}

const AuthWrapper = ({ children, title, description }: TProps) => {
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
        <div className="relative w-full max-w-110 px-4 md:px-0">
            {/* Glow background behind the card */}
            <div className="absolute inset-0 bg-[#0071E3]/10 blur-[80px] rounded-3xl -z-10" />

            {/* Main Auth Card Container */}
            <div className="relative w-full bg-[#030712] border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-[0_0_25px_var(--color-dropshadow-color)] text-center flex flex-col items-center">

                {/* Top Right Language Selector */}
                <div className="absolute top-4 right-4 z-20" ref={langDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="border border-zinc-800 bg-[#020813]/80 px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] text-zinc-300 font-bold select-none cursor-pointer hover:border-zinc-700 transition-colors focus:outline-none"
                    >
                        <FiGlobe className="w-3 h-3 text-[#0071E3]" />
                        <span>{language.toUpperCase()}</span>
                        <FiChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Floating Dropdown Menu */}
                    {isLangOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-[#030712] border border-zinc-800 rounded-2xl shadow-xl py-2 z-50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                            <button
                                type="button"
                                onClick={() => handleSelectLanguage('en')}
                                className="w-full px-3.5 py-2 text-xs text-left text-zinc-300 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between font-semibold transition-colors cursor-pointer"
                            >
                                <span>{t.nav.english}</span>
                                {language === 'en' && <FiCheck className="w-3.5 h-3.5 text-[#0071E3]" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectLanguage('zh')}
                                className="w-full px-3.5 py-2 text-xs text-left text-zinc-300 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between font-semibold transition-colors cursor-pointer"
                            >
                                <span>{t.nav.chinese}</span>
                                {language === 'zh' && <FiCheck className="w-3.5 h-3.5 text-[#0071E3]" />}
                            </button>
                        </div>
                    )}
                </div>

                {/* Brand Header */}
                <div className="flex items-center justify-center gap-3 mb-5">
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
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-heading flex items-center">
                        Ycoin AI
                    </h1>
                </div>

                {/* Security Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-5 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
                    <Shield className="text-[#0071E3]" size={17} />
                    <span className="text-xs font-mono tracking-wider text-[#0071E3] uppercase font-bold">
                        {t.auth.authBadge}
                    </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight mb-1.5">
                    {title}
                </h2>
                {description && (
                    <p className="text-description text-sm leading-relaxed max-w-[320px] mx-auto mb-6">
                        {description}
                    </p>
                )}

                {/* Form/Children Content */}
                <div className="w-full flex flex-col gap-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper