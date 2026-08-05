'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FiSearch, FiPlus, FiBell, FiGrid, FiFileText, FiInfo, FiMessageSquare, FiChevronUp, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi'

const ChatSidebar = () => {
    const [isChatsOpen, setIsChatsOpen] = useState(true)

    const menuItems = [
        { label: 'Alerts', icon: FiBell, href: '/new-chat' },
        { label: 'Discover', icon: FiGrid, href: '/discover' },
        { label: 'Terms Of Conditions', icon: FiFileText, href: '/termsof-conditions' },
        { label: 'Privacy Policy', icon: FiInfo, href: '/policy-policy' },
    ]

    const chatHistory = [
        'BTC price for 24h',
        'Smart money inflow',
        'ETH price for last 7 days',
        'The best Pumpfun tokens',
        'Scan Solana runners',
        'Track smart money',
        'Find tokens under 20K MC',
    ]

    return (
        <aside className="w-64 md:w-72 bg-black h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col p-4 shrink-0 overflow-y-auto">
            {/* Search Input */}
            <div className="relative flex items-center bg-[#020813] border border-border-color rounded-xl px-3 py-3 mb-4 focus-within:border-button-color transition-colors">
                <FiSearch className="w-4 h-4 text-description mr-2 shrink-0" />
                <input
                    type="text"
                    placeholder="Search chats..."
                    className="bg-transparent text-xs text-white placeholder-title focus:outline-none w-full"
                />
            </div>

            {/* New Chat Button */}
            <Link
                href="/new-chat"
                className="w-full flex items-center gap-2.5 text-button-color font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-button-color/20 bg-button-color/5 hover:bg-button-color/15 transition-all select-none mb-5"
            >
                <FiPlus className="w-4 h-4 text-button-color" />
                <span>New Chat</span>
            </Link>

            {/* Main Menu List */}
            <div className="flex flex-col gap-1 mb-6">
                {menuItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-3 text-description hover:text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-zinc-900/60 transition-colors select-none"
                        >
                            <Icon className="w-4 h-4 text-description" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            {/* Chats Section Accordion */}
            <div className="flex flex-col gap-1 mb-6 grow">
                <button
                    onClick={() => setIsChatsOpen(!isChatsOpen)}
                    className="flex items-center justify-between w-full text-description hover:text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors select-none cursor-pointer"
                >
                    <div className="flex items-center gap-2.5">
                        <FiMessageSquare className="w-4 h-4 text-description" />
                        <span>Chats</span>
                    </div>
                    {isChatsOpen ? (
                        <FiChevronUp className="w-3.5 h-3.5 text-description" />
                    ) : (
                        <FiChevronDown className="w-3.5 h-3.5 text-description" />
                    )}
                </button>

                {isChatsOpen && (
                    <div className="flex flex-col gap-1 pl-4 mt-1">
                        {chatHistory.map((chat, idx) => (
                            <Link
                                key={idx}
                                href="/new-chat"
                                className="text-description hover:text-white text-xs font-medium py-1.5 px-3 hover:bg-zinc-900/40 rounded-lg cursor-pointer truncate transition-colors select-none"
                            >
                                {chat}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Profile Box */}
            <div className="mt-auto bg-[#020813] border border-border-color rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color">
                        <FiUser className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-white text-xs font-bold font-mono tracking-tight">
                            Zxcv...4x5y
                        </span>
                        <span className="text-description text-[10px] font-medium">
                            Free
                        </span>
                    </div>
                </div>

                <button
                    title="Logout / Exit"
                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer select-none"
                >
                    <FiLogOut className="w-3.5 h-3.5" />
                </button>
            </div>

        </aside>
    )
}

export default ChatSidebar