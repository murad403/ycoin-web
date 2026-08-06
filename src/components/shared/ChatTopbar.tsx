'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi'

interface ChatTopbarProps {
    onToggleMobileSidebar: () => void
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({ onToggleMobileSidebar }) => {
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
                        Philosophy
                    </Link>
                    <Link href="/#roadmap" className="text-description hover:text-title text-xs md:text-sm font-semibold transition-colors select-none">
                        Roadmap
                    </Link>
                    <Link href="/#culture" className="text-description hover:text-title text-xs md:text-sm font-semibold transition-colors select-none">
                        Culture
                    </Link>
                </nav>
            </div>

            {/* Right side: Search, Notifications & Exit Terminal */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Search Input Bar */}
                <div className="hidden sm:flex items-center bg-[#020813] border border-border-color rounded-xl px-3.5 py-2 w-60 lg:w-72 focus-within:border-button-color transition-all">
                    <FiSearch className="w-4 h-4 text-description mr-2.5 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by token or CA..."
                        className="bg-transparent text-xs text-white placeholder-description focus:outline-none w-full"
                    />
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
                    Exit Terminal
                </Link>
            </div>

        </header>
    )
}

export default ChatTopbar