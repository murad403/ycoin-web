'use client'

import React, { useState, useRef, useEffect, use } from 'react'
import { FiChevronDown, FiCpu, FiUser, FiArrowUp } from 'react-icons/fi'
import VoiceInput from '@/components/shared/VoiceInput'
import {
  useRetrieveMessagesQuery,
  useLazyRetrieveMessagesQuery,
} from '@/redux/features/chat/chat.api'
import { formatTimestamp } from '@/utils/formatter'
import { useChatSocket } from '@/hooks/useChatSocket'
import { TChatMessage } from '@/redux/features/chat/chat.type'

interface ChatPageProps {
  params: Promise<{ id: string }>
}

const extractCursor = (nextUrl: string | null): string | null => {
  if (!nextUrl) return null
  try {
    const queryString = nextUrl.includes('?') ? nextUrl.split('?')[1] : nextUrl
    const params = new URLSearchParams(queryString)
    return params.get('cursor')
  } catch {
    return null
  }
}

const Page = ({ params }: ChatPageProps) => {
  const { id } = use(params)
  const { data: initialData, isLoading: isApiLoading, isError } = useRetrieveMessagesQuery(id)
  const [fetchOlderMessages] = useLazyRetrieveMessagesQuery()

  const [displayedMessages, setDisplayedMessages] = useState<TChatMessage[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [isFetchingOlder, setIsFetchingOlder] = useState(false)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const prevIdRef = useRef(id)
  const isInitialLoadRef = useRef(true)

  // Reset when switching to a different chat
  useEffect(() => {
    if (prevIdRef.current !== id) {
      prevIdRef.current = id
      setDisplayedMessages([])
      setNextCursor(null)
      setIsStreaming(false)
      isInitialLoadRef.current = true
    }
  }, [id])

  // Sync initial API messages and update cursor
  useEffect(() => {
    if (!initialData) return

    const messageList = initialData.results || []
    const cursor = extractCursor(initialData.next)
    setNextCursor(cursor)

    if (
      !isStreaming &&
      (displayedMessages.length === 0 || messageList.length >= displayedMessages.length)
    ) {
      setDisplayedMessages(messageList)
    }
  }, [initialData, isStreaming, displayedMessages.length])

  // Auto-scroll to bottom on initial load/reload or when streaming
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      if (behavior === 'auto') {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior })
      }
    }
  }

  useEffect(() => {
    if (displayedMessages.length > 0) {
      if (isInitialLoadRef.current) {
        // Instant scroll to bottom on initial page load / reload
        requestAnimationFrame(() => {
          scrollToBottom('auto')
          setTimeout(() => scrollToBottom('auto'), 50)
          setTimeout(() => scrollToBottom('auto'), 200)
        })
        isInitialLoadRef.current = false
      } else if (isStreaming) {
        scrollToBottom('smooth')
      }
    }
  }, [displayedMessages, isStreaming])

  // Infinite Scroll Up handler
  const handleScroll = async () => {
    const container = scrollContainerRef.current
    if (!container || isFetchingOlder || !nextCursor || isStreaming) return

    // Trigger when scrolled near the top
    if (container.scrollTop < 60) {
      setIsFetchingOlder(true)

      const oldScrollHeight = container.scrollHeight
      const oldScrollTop = container.scrollTop

      try {
        const res = await fetchOlderMessages({ id, cursor: nextCursor }).unwrap()
        const olderMessages = res.results || []
        const newCursor = extractCursor(res.next)

        setNextCursor(newCursor)

        if (olderMessages.length > 0) {
          setDisplayedMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id))
            const uniqueOlder = olderMessages.filter((m) => !existingIds.has(m.id))
            return [...uniqueOlder, ...prev]
          })

          // Maintain scroll position seamlessly after prepending items
          requestAnimationFrame(() => {
            if (scrollContainerRef.current) {
              const newScrollHeight = scrollContainerRef.current.scrollHeight
              scrollContainerRef.current.scrollTop =
                newScrollHeight - oldScrollHeight + oldScrollTop
            }
          })
        }
      } catch (err) {
        console.error('Error loading older messages:', err)
      } finally {
        setIsFetchingOlder(false)
      }
    }
  }

  // Real-time WebSocket setup
  const { sendQuery } = useChatSocket({
    onToken: (data) => {
      setDisplayedMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.role === 'assistant'
            ? { ...msg, content: msg.content + data.content }
            : msg
        )
      )
    },
    onCompleted: () => {
      setIsStreaming(false)
    },
    onError: () => {
      setIsStreaming(false)
    },
  })

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    const userPrompt = input.trim()
    setInput('')
    setIsStreaming(true)

    const userMsg: TChatMessage = {
      id: Date.now().toString(),
      conversation: id,
      role: 'user',
      content: userPrompt,
      created_at: new Date().toISOString(),
    }

    const assistantMsg: TChatMessage = {
      id: (Date.now() + 1).toString(),
      conversation: id,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
    }

    setDisplayedMessages((prev) => [...prev, userMsg, assistantMsg])
    setTimeout(scrollToBottom, 50)

    const success = await sendQuery(userPrompt, id)
    if (!success) {
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full no-scrollbar"
      >
        {/* Loading Older Messages Spinner */}
        {/* {isFetchingOlder && (
          <div className="flex justify-center py-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#090D14] border border-border-color rounded-full text-xs text-description shadow-md">
              <span className="w-2 h-2 rounded-full bg-button-color animate-ping" />
              <span>Loading older messages...</span>
            </div>
          </div>
        )} */}

        {isApiLoading && displayedMessages.length === 0 ? (
          <div className="flex flex-col gap-6 py-4">
            {/* Skeleton 1: User message (Right) */}
            <div className="flex items-start gap-3 justify-end">
              <div className="w-48 sm:w-64 h-14 bg-button-color/20 border border-button-color/30 rounded-2xl rounded-tr-none animate-pulse" />
              <div className="w-8 h-8 rounded-xl bg-zinc-800/80 border border-zinc-700/50 animate-pulse shrink-0" />
            </div>

            {/* Skeleton 2: Assistant message (Left) */}
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 animate-pulse shrink-0" />
              <div className="w-64 sm:w-96 h-28 bg-[#090D14] border border-border-color rounded-2xl rounded-tl-none animate-pulse" />
            </div>

            {/* Skeleton 3: User message (Right) */}
            <div className="flex items-start gap-3 justify-end">
              <div className="w-40 sm:w-56 h-12 bg-button-color/20 border border-button-color/30 rounded-2xl rounded-tr-none animate-pulse" />
              <div className="w-8 h-8 rounded-xl bg-zinc-800/80 border border-zinc-700/50 animate-pulse shrink-0" />
            </div>

            {/* Skeleton 4: Assistant message (Left) */}
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 animate-pulse shrink-0" />
              <div className="w-72 sm:w-md h-36 bg-[#090D14] border border-border-color rounded-2xl rounded-tl-none animate-pulse" />
            </div>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-[#020813] border border-border-color rounded-2xl my-auto">
            <p className="text-red-400 text-sm font-semibold mb-1">Failed to load conversation messages</p>
            <p className="text-description text-xs">Please check your network connection or try selecting another chat.</p>
          </div>
        ) : displayedMessages && displayedMessages.length > 0 ? (
          displayedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar for Assistant */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-button-color/20 border border-button-color/40 flex items-center justify-center text-button-color shrink-0 mt-0.5 shadow-[0_0_15px_var(--color-dropshadow-color)]">
                  <FiCpu className="w-4 h-4" />
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-button-color text-white rounded-tr-none font-medium'
                    : 'bg-[#090D14] border border-border-color text-zinc-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap wrap-break-word">
                  {msg.content || (isStreaming && msg.role === 'assistant' ? '...' : '')}
                </p>
                <span
                  className={`text-[10px] block mt-2 text-right ${
                    msg.role === 'user' ? 'text-blue-200' : 'text-description'
                  }`}
                >
                  {formatTimestamp(msg.created_at)}
                </span>
              </div>

              {/* User Avatar for User */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <FiUser className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto select-none">
            <p className="text-description text-sm">No messages found in this conversation.</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Prompt Input Bar (Fixed/Sticky at Bottom) */}
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
                disabled={!input.trim() || isStreaming}
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

export default Page