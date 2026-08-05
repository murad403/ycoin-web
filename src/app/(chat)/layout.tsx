'use client'

import React from 'react'
import ChatTopbar from '@/components/shared/ChatTopbar'
import ChatSidebar from '@/components/shared/ChatSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <ChatTopbar />

      {/* Main Content Area: Sidebar + Chat Window */}
      <div className="flex flex-1 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden">
        {/* Left Sidebar */}
        <ChatSidebar />

        {/* Dynamic Chat Page View */}
        <main className="flex-1 flex flex-col bg-black relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout