'use client'
import React, { useState } from 'react'
import ChatTopbar from '@/components/shared/ChatTopbar'
import ChatSidebar from '@/components/shared/ChatSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <ChatTopbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Main Content Area: Sidebar + Chat Window */}
      <div className="flex flex-1 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden relative">
        {/* Left Sidebar */}
        <ChatSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Mobile Sidebar Backdrop Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Dynamic Chat Page View */}
        <main className="flex-1 flex flex-col bg-black relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout