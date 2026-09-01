'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  FiSearch,
  FiPlus,
  FiBell,
  FiGrid,
  FiFileText,
  FiInfo,
  FiChevronUp,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiChevronsLeft,
  FiChevronsRight,
  FiX,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi'
import { MessageCircle } from 'lucide-react'
import { removeToken } from '@/lib/auth'
import { useGetProfileQuery } from '@/redux/features/auth/auth.api'
import {
  useRetrieveConversationsListQuery,
  useLazyRetrieveConversationsListQuery,
  useRenameTitleMutation,
  useDeleteConversationMutation,
} from '@/redux/features/chat/chat.api'
import { TConversation } from '@/redux/features/chat/chat.type'
import { useLanguage } from '@/i18n/LanguageContext'
import { toast } from 'sonner'

interface ChatSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
  onOpenProfile?: () => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenProfile,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isChatsOpen, setIsChatsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [allConversations, setAllConversations] = useState<TConversation[]>([])

  const chatsContainerRef = useRef<HTMLDivElement>(null)

  const { t } = useLanguage()
  const { data: profileData } = useGetProfileQuery()

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch Page 1 or search results
  const { data: initialData, isLoading: isConversationsLoading } = useRetrieveConversationsListQuery({
    search: debouncedSearch,
    page: 1,
  })
  const [fetchMoreConversations] = useLazyRetrieveConversationsListQuery()

  // Sync initial and search result data
  useEffect(() => {
    if (initialData) {
      setAllConversations(initialData.results || [])
      setHasNextPage(!!initialData.next)
      setPage(1)
    }
  }, [initialData])

  const [renameTitleApi, { isLoading: isRenaming }] = useRenameTitleMutation()
  const [deleteConversationApi, { isLoading: isDeleting }] = useDeleteConversationMutation()

  // Modal State
  const [activeModalChat, setActiveModalChat] = useState<TConversation | null>(null)
  const [modalView, setModalView] = useState<'menu' | 'rename' | 'delete' | null>(null)
  const [newTitleInput, setNewTitleInput] = useState('')

  // Infinite Scroll Down handler for Sidebar Conversations
  const handleSidebarScroll = async () => {
    const container = chatsContainerRef.current
    if (!container || isFetchingMore || !hasNextPage) return

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 30) {
      setIsFetchingMore(true)
      try {
        const nextPage = page + 1
        const res = await fetchMoreConversations({
          search: debouncedSearch,
          page: nextPage,
        }).unwrap()

        const newResults = res.results || []
        setHasNextPage(!!res.next)
        setPage(nextPage)

        if (newResults.length > 0) {
          setAllConversations((prev) => {
            const existingIds = new Set(prev.map((c) => c.id))
            const uniqueNew = newResults.filter((c) => !existingIds.has(c.id))
            return [...prev, ...uniqueNew]
          })
        }
      } catch (err) {
        console.error('Error fetching more conversations:', err)
      } finally {
        setIsFetchingMore(false)
      }
    }
  }

  const menuItems = [
    { label: t.chat.alerts, icon: FiBell, href: '/alerts' },
    { label: t.chat.discover, icon: FiGrid, href: '/discover' },
    { label: t.chat.termsOfConditions, icon: FiFileText, href: '/terms-of-conditions' },
    { label: t.chat.privacyPolicy, icon: FiInfo, href: '/privacy-policy' },
  ]

  const handleLogout = async () => {
    await removeToken()
    router.push('/')
    router.refresh()
  }

  const handleOpenOptions = (e: React.MouseEvent, chat: TConversation) => {
    e.stopPropagation()
    e.preventDefault()
    setActiveModalChat(chat)
    setModalView('menu')
    setNewTitleInput(chat.title || '')
  }

  const handleCloseModal = () => {
    setActiveModalChat(null)
    setModalView(null)
    setNewTitleInput('')
  }

  const handleSaveRename = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeModalChat || !newTitleInput.trim()) return

    try {
      await renameTitleApi({ id: activeModalChat.id, title: newTitleInput.trim() }).unwrap()
      toast.success('Title renamed successfully')
      handleCloseModal()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to rename title')
    }
  }

  const handleDeleteChat = async () => {
    if (!activeModalChat) return

    try {
      await deleteConversationApi(activeModalChat.id).unwrap()
      toast.success('Conversation deleted')
      if (pathname === `/chat/${activeModalChat.id}`) {
        router.push('/new-chat')
      }
      handleCloseModal()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete conversation')
    }
  }

  return (
    <>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                className={`flex items-center gap-3 text-sm font-semibold py-2 px-3 rounded-lg transition-colors select-none ${
                  isActive
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
                className={`flex items-center justify-center py-3 rounded-lg transition-colors select-none ${
                  isActive
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
              <div
                ref={chatsContainerRef}
                onScroll={handleSidebarScroll}
                className="flex flex-col gap-1 pl-4 mt-1 overflow-y-auto no-scrollbar"
              >
                {isConversationsLoading ? (
                  <div className="flex flex-col gap-3 py-1 pr-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="h-6 w-full rounded-lg bg-zinc-900/80 border border-zinc-800/50 animate-pulse"
                      />
                    ))}
                  </div>
                ) : allConversations && allConversations.length > 0 ? (
                  <>
                    {allConversations.map((chat) => {
                      const isActive = pathname === `/chat/${chat.id}`
                      return (
                        <div
                          key={chat.id}
                          className={`group relative flex items-center justify-between py-1.5 px-3 rounded-lg transition-colors select-none shrink-0 ${
                            isActive
                              ? 'text-white bg-button-color/10 font-semibold border-l-2 border-button-color'
                              : 'text-description hover:text-white hover:bg-zinc-900/40'
                          }`}
                        >
                          <Link
                            href={`/chat/${chat.id}`}
                            onClick={onCloseMobile}
                            className="truncate flex-1 text-[13px] font-medium pr-2"
                            title={chat.title}
                          >
                            {chat.title || 'Untitled Chat'}
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => handleOpenOptions(e, chat)}
                            className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-md text-description hover:text-white hover:bg-zinc-800 transition-all cursor-pointer shrink-0"
                            title="Options"
                          >
                            <FiMoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )
                    })}

                    {isFetchingMore && (
                      <div className="h-6 w-full rounded-lg bg-zinc-900/80 border border-zinc-800/50 animate-pulse my-1" />
                    )}
                  </>
                ) : (
                  <div className="text-description/60 text-xs py-2 px-3">No conversations found</div>
                )}
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
                  <span className="text-description text-[10px] font-medium">Free</span>
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
                title="Profile"
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

      {/* Options & Action Modal */}
      {activeModalChat && modalView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#020813] border border-border-color rounded-2xl w-full max-w-md p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-border-color/40 text-description hover:text-white hover:border-border-color transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* 1. MENU VIEW */}
            {modalView === 'menu' && (
              <>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Conversation Options</h3>
                  <p className="text-xs text-description truncate">{activeModalChat.title || 'Untitled Chat'}</p>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    onClick={() => setModalView('rename')}
                    className="flex items-center gap-3 w-full p-3.5 rounded-xl border border-border-color/50 bg-[#090D14] hover:border-button-color hover:bg-button-color/10 text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    <FiEdit2 className="w-4 h-4 text-button-color" />
                    <span>Rename Title</span>
                  </button>

                  <button
                    onClick={() => setModalView('delete')}
                    className="flex items-center gap-3 w-full p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 text-sm font-semibold transition-all cursor-pointer"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-400" />
                    <span>Delete Conversation</span>
                  </button>
                </div>
              </>
            )}

            {/* 2. RENAME VIEW */}
            {modalView === 'rename' && (
              <form onSubmit={handleSaveRename} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Rename Title</h3>
                  <p className="text-xs text-description">Enter a new title for this conversation.</p>
                </div>

                <div className="relative flex items-center bg-[#090D14] border border-border-color focus-within:border-button-color rounded-xl px-3 py-2.5">
                  <input
                    type="text"
                    value={newTitleInput}
                    onChange={(e) => setNewTitleInput(e.target.value)}
                    placeholder="Enter title..."
                    autoFocus
                    className="bg-transparent text-sm text-white focus:outline-none w-full"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalView('menu')}
                    className="px-4 py-2 rounded-xl border border-border-color text-xs font-semibold text-description hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isRenaming || !newTitleInput.trim()}
                    className="px-5 py-2 rounded-xl bg-button-color hover:bg-button-color/90 text-xs font-bold text-white transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {isRenaming ? 'Saving...' : 'Save Title'}
                  </button>
                </div>
              </form>
            )}

            {/* 3. DELETE VIEW */}
            {modalView === 'delete' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-red-400 mb-1">Delete Conversation</h3>
                  <p className="text-xs text-description leading-relaxed">
                    Are you sure you want to delete <span className="text-white font-semibold">&quot;{activeModalChat.title}&quot;</span>? This action cannot be undone.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalView('menu')}
                    className="px-4 py-2 rounded-xl border border-border-color text-xs font-semibold text-description hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteChat}
                    disabled={isDeleting}
                    className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatSidebar