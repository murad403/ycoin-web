'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiSearch, FiPlus, FiBell, FiGrid, FiFileText, FiInfo, FiChevronUp, FiChevronDown, FiUser, FiLogOut, FiChevronsLeft, FiChevronsRight, FiX } from 'react-icons/fi'
import { MessageCircle } from 'lucide-react'
import { removeToken } from '@/lib/auth'
import { useGetProfileQuery } from '@/redux/features/auth/auth.api'
import { useLanguage } from '@/i18n/LanguageContext'

interface ChatSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
  onOpenProfile?: () => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile, onOpenProfile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const { t } = useLanguage();
  const { data: profileData } = useGetProfileQuery();

  const menuItems = [
    { label: t.chat.alerts, icon: FiBell, href: '/alerts' },
    { label: t.chat.discover, icon: FiGrid, href: '/discover' },
    { label: t.chat.termsOfConditions, icon: FiFileText, href: '/terms-of-conditions' },
    { label: t.chat.privacyPolicy, icon: FiInfo, href: '/privacy-policy' },
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

  const handleLogout = async () => {
    await removeToken();
    router.push('/');
    router.refresh();
  }

  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-50 md:z-auto
        bg-black h-screen md:h-full flex flex-col p-4 shrink-0 overflow-hidden border-r border-border-color/50 md:border-r-0
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20 md:w-20' : 'w-64 md:w-72'}
      `}
    >
      {/* Sidebar Header: Toggle Buttons (Fixed) */}
      <div className="flex items-center justify-center mb-4 border-b border-border-color/30 pb-3 shrink-0">
        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg border border-border-color hover:border-button-color text-description hover:text-white bg-[#020813] transition-colors cursor-pointer select-none"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <FiChevronsRight className="w-4 h-4" /> : <FiChevronsLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-lg border border-border-color hover:border-red-500/50 text-description hover:text-red-400 bg-[#020813] transition-colors cursor-pointer select-none"
          title="Close Sidebar"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Box (Fixed) */}
      <div className="shrink-0">
        {!isCollapsed ? (
          <div className="relative flex items-center bg-[#020813] border border-border-color rounded-xl px-3 py-3 mb-4 focus-within:border-button-color transition-colors">
            <FiSearch className="w-4 h-4 text-description mr-2 shrink-0" />
            <input
              type="text"
              placeholder={t.chat.searchPlaceholder}
              className="bg-transparent text-xs text-white placeholder-title focus:outline-none w-full"
            />
          </div>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center bg-[#020813] border border-border-color rounded-xl p-3 mb-4 hover:border-button-color text-description hover:text-white cursor-pointer transition-colors"
            title={t.chat.searchPlaceholder}
          >
            <FiSearch className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>

      {/* New Chat Button (Fixed) */}
      <div className="shrink-0">
        {!isCollapsed ? (
          <Link
            href="/new-chat"
            onClick={onCloseMobile}
            className="w-full flex items-center gap-2.5 text-button-color font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-button-color/20 bg-button-color/5 hover:bg-button-color/15 transition-all select-none mb-5"
          >
            <FiPlus className="w-4 h-4 text-button-color shrink-0" />
            <span>{t.chat.newChat}</span>
          </Link>
        ) : (
          <Link
            href="/new-chat"
            className="w-12 h-12 mx-auto flex items-center justify-center text-button-color rounded-xl border border-button-color/20 bg-button-color/5 hover:bg-button-color/15 transition-all select-none mb-5"
            title={t.chat.newChat}
          >
            <FiPlus className="w-4 h-4 text-button-color shrink-0" />
          </Link>
        )}
      </div>

      {/* Main Menu List (Fixed) */}
      <div className="flex flex-col gap-1 mb-6 shrink-0">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return !isCollapsed ? (
            <Link
              key={idx}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 text-sm font-semibold py-2 px-3 rounded-lg transition-colors select-none ${isActive
                ? 'text-white bg-button-color/10 border border-button-color/20'
                : 'text-description hover:text-white hover:bg-zinc-900/60'
                }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-button-color' : 'text-description'}`} />
              <span>{item.label}</span>
            </Link>
          ) : (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center justify-center py-3 rounded-lg transition-colors select-none ${isActive
                ? 'text-white bg-button-color/10 border border-button-color/20'
                : 'text-description hover:text-white hover:bg-zinc-900/60'
                }`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-button-color' : 'text-description'}`} />
            </Link>
          )
        })}
      </div>

      {/* Chats Section Accordion (Fixed Header, Scrollable Children List) */}
      {!isCollapsed ? (
        <div className="flex flex-col gap-1 mb-6 flex-1 overflow-hidden">
          <button
            onClick={() => setIsChatsOpen(!isChatsOpen)}
            className="flex items-center justify-between w-full text-description hover:text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors select-none cursor-pointer shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-description shrink-0" />
              <span>{t.chat.chats}</span>
            </div>
            {isChatsOpen ? (
              <FiChevronUp className="w-3.5 h-3.5 text-description shrink-0" />
            ) : (
              <FiChevronDown className="w-3.5 h-3.5 text-description shrink-0" />
            )}
          </button>

          {isChatsOpen && (
            <div className="flex flex-col gap-1 pl-4 mt-1">
              {chatHistory.map((chat, idx) => (
                <Link
                  key={idx}
                  href="/new-chat"
                  onClick={onCloseMobile}
                  className="text-description hover:text-white text-[13px] font-medium py-1.5 px-3 hover:bg-zinc-900/40 rounded-lg cursor-pointer truncate transition-colors select-none shrink-0"
                >
                  {chat}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 mb-6 flex-1 overflow-hidden">
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center p-3 rounded-lg text-description hover:text-white hover:bg-zinc-900/60 transition-colors select-none cursor-pointer shrink-0"
            title="Open Chats"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}

      {/* Sticky Bottom Profile Box (Fixed) */}
      <div className="mt-auto pt-4 shrink-0 border-t border-border-color/30 bg-black">
        {!isCollapsed ? (
          <div className="bg-[#020813] border border-border-color rounded-2xl p-3 flex items-center justify-between">
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              {profileData?.avatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-button-color/40 shrink-0">
                  <img src={profileData.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0 group-hover:bg-button-color/30 transition-colors">
                  <FiUser className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-white text-xs font-bold font-mono tracking-tight group-hover:text-button-color transition-colors truncate max-w-30">
                  {profileData?.profile_name || 'User'}
                </span>
                <span className="text-description text-[10px] font-medium">
                  Free
                </span>
              </div>
            </div>

            <button
              title={t.chat.logOut}
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer select-none"
            >
              <FiLogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            {/* Collapsed Profile Avatar */}
            <div
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0 cursor-pointer hover:bg-button-color/30 transition-colors"
              title="Profile (Zxcv...4x5y)"
            >
              <FiUser className="w-5 h-5" />
            </div>

            {/* Collapsed Logout */}
            <button
              onClick={handleLogout}
              title={t.chat.logOut}
              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer select-none"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default ChatSidebar