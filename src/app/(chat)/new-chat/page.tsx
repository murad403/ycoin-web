'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import logoImg from '@/assets/images/logo.png'
import chatshowcaseImg from '@/assets/images/chatshowcase.png'
import { FiSend, FiChevronDown, FiCpu, FiUser, FiArrowUp } from 'react-icons/fi'
import VoiceInput from '@/components/shared/VoiceInput'

type TMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const NewChatPage = () => {
  const [messages, setMessages] = useState<TMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: TMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMessage])
    const currentPrompt = input
    setInput('')
    setIsLoading(true)

    // Simulate AI Response
    setTimeout(() => {
      const assistantMessage: TMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Analysis complete for: "${currentPrompt}". YCOIN AI node matrix indicates positive volume indicators anchored by Bitcoin Layer-1 hash consensus.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
      
      {/* 1. Empty State: Show Logo + chatshowcase.png Image */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto scrollbar-thin">
          
          {/* Centered Brand Header */}
          <div className="flex items-center gap-3 mb-6 select-none">
            <div className="p-1.5 bg-[#020813] border border-border-color rounded-2xl shadow-[0_0_20px_var(--color-dropshadow-color)] flex items-center justify-center">
              <Image 
                src={logoImg} 
                alt="Ycoin AI Logo" 
                width={36} 
                height={36} 
                className="object-contain" 
                priority
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-heading flex items-center">
              Ycoin AI
            </h1>
          </div>

          {/* Centered Showcase Image */}
          <div className="w-full max-w-4xl flex justify-center items-center my-2">
            <div className="relative w-full rounded-2xl border border-border-color/80 overflow-hidden shadow-[0_0_50px_rgba(0,113,227,0.15)] bg-[#020813]">
              <Image 
                src={chatshowcaseImg} 
                alt="Ycoin AI Terminal Dashboard Showcase" 
                className="w-full h-auto object-cover max-h-[58vh] rounded-2xl"
                priority
              />
            </div>
          </div>

        </div>
      ) : (
        /* 2. Chat Conversation View: Replaces Showcase when messages exist */
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Bot Avatar for Assistant */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0 mt-0.5">
                  <FiCpu className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-button-color text-white rounded-tr-none font-medium'
                    : 'bg-[#090D14] border border-border-color text-zinc-200 rounded-tl-none'
                }`}
              >
                <p>{msg.content}</p>
                <span className={`text-[10px] block mt-2 text-right ${
                  msg.role === 'user' ? 'text-blue-200' : 'text-description'
                }`}>
                  {msg.timestamp}
                </span>
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <FiUser className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0">
                <FiCpu className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-[#090D14] border border-border-color px-4 py-3 rounded-2xl rounded-tl-none text-xs text-description flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-button-color animate-ping" />
                <span>YCOIN AI is processing quantum state...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* 3. Bottom Prompt Input Bar (Fixed/Sticky at Bottom) */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2 shrink-0">
        <form onSubmit={handleSend} className="bg-[#020813] border border-border-color focus-within:border-button-color rounded-2xl p-3.5 shadow-[0_0_35px_rgba(0,0,0,0.7)] flex flex-col gap-3 transition-all duration-200">
          
          {/* Prompt Textarea Input */}
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(e)
              }
            }}
            placeholder="Ask AI..." 
            rows={2}
            className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-description focus:outline-none resize-none leading-relaxed px-1"
          />

          {/* Input Controls Footer */}
          <div className="flex items-center justify-between border-t border-zinc-900/80 pt-2.5">
            
            {/* Model Selector Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-color bg-[#090D14] hover:bg-zinc-900 text-zinc-300 rounded-xl text-xs font-semibold select-none cursor-pointer transition-colors">
              <span>Claude Sonnet 4.5 • 5 Free Left</span>
              <FiChevronDown className="w-3.5 h-3.5 text-description" />
            </div>

            {/* Right Action Icons: Mic & Send */}
            <div className="flex items-center gap-2">
              <VoiceInput
                onTranscript={(transcript) => {
                  setInput(transcript)
                }}
              />

              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-button-color hover:bg-button-color/90 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all active:scale-[0.95] cursor-pointer shadow-md shadow-button-color/20"
                title="Send Message"
              >
                <FiArrowUp className="w-4 h-4 font-bold" />
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}

export default NewChatPage