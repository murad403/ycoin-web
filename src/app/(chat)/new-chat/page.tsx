'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logoImg from '@/assets/images/logo.png'
import chatshowcaseImg from '@/assets/images/chatshowcase.png'
import { FiChevronDown, FiCpu, FiUser, FiArrowUp } from 'react-icons/fi'
import VoiceInput from '@/components/shared/VoiceInput'
import { useChatSocket } from '@/hooks/useChatSocket'
import { formatTimestamp } from '@/utils/formatter'

type TMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const NewChatPage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<TMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const newConversationIdRef = useRef<string | null>(null)

  const { sendQuery, status: socketStatus } = useChatSocket({
    onToken: (data) => {
      if (data.conversation_id) {
        newConversationIdRef.current = data.conversation_id
      }
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.role === 'assistant'
            ? {
                ...msg,
                id: data.message_id || msg.id,
                content: msg.content + data.content,
              }
            : msg
        )
      )
    },
    onCompleted: (data) => {
      setIsLoading(false)
      const convId = data.conversation_id || newConversationIdRef.current
      if (convId) {
        router.push(`/chat/${convId}`)
      }
    },
    onError: () => {
      setIsLoading(false)
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userPrompt = input.trim()
    setInput('')
    setIsLoading(true)

    const userMessage: TMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userPrompt,
      timestamp: formatTimestamp(new Date().toISOString()),
    }

    const assistantMessage: TMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: formatTimestamp(new Date().toISOString()),
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])

    const success = await sendQuery(userPrompt)
    if (!success) {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
      {/* 1. Empty State: Show Logo + chatshowcase.png Image */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto no-scrollbar">
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
            <div className="relative w-full overflow-hidden shadow-[0_0_50px_rgba(0,113,227,0.15)] bg-[#020813]">
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Bot Avatar for Assistant */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0 mt-0.5 shadow-[0_0_15px_var(--color-dropshadow-color)]">
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
                {msg.content ? (
                  <p className="whitespace-pre-wrap wrap-break-word">{msg.content}</p>
                ) : msg.role === 'assistant' && isLoading ? (
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-button-color animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-button-color animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-button-color animate-bounce" />
                  </div>
                ) : null}
                <span
                  className={`text-[10px] block mt-2 text-right ${
                    msg.role === 'user' ? 'text-blue-200' : 'text-description'
                  }`}
                >
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

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* 3. Bottom Prompt Input Bar (Fixed/Sticky at Bottom) */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2 shrink-0">
        <form
          onSubmit={handleSend}
          className="bg-[#020813] border border-border-color focus-within:border-button-color rounded-2xl p-3.5 shadow-[0_0_35px_rgba(0,0,0,0.7)] flex flex-col gap-3 transition-all duration-200"
        >
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