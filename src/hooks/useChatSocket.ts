'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { useAppDispatch } from '@/redux/hooks'
import baseApi from '@/redux/api/api'
import { toast } from 'sonner'
import { TWsReceiveMessage, TWsSendPayload } from '@/redux/features/chat/chat.type'

export type TSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseChatSocketOptions {
  onToken?: (data: { conversation_id: string; message_id: string; content: string }) => void
  onCompleted?: (data: { conversation_id: string; message_id: string }) => void
  onError?: (error: string) => void
  onStatusChange?: (statusMessage: string) => void
}

export function useChatSocket(options?: UseChatSocketOptions) {
  const [status, setStatus] = useState<TSocketStatus>('disconnected')
  const wsRef = useRef<WebSocket | null>(null)
  const dispatch = useAppDispatch()
  
  // Keep options ref updated so event listeners always use latest callbacks without reconnecting
  const optionsRef = useRef(options)
  optionsRef.current = options

  const connect = useCallback(async () => {
    try {
      const { access } = await getCurrentUser()
      if (!access) {
        setStatus('error')
        return
      }

      const wsBase = process.env.NEXT_PUBLIC_WS_URL || 'wss://lch52pq0-8000.inc1.devtunnels.ms/ws/chat/'
      const cleanBase = wsBase.endsWith('/') ? wsBase : `${wsBase}/`
      const wsUrl = `${cleanBase}?token=${encodeURIComponent(access)}`

      // If already connected or connecting, skip reconnect
      if (
        wsRef.current &&
        (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)
      ) {
        return
      }

      setStatus('connecting')
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        setStatus('connected')
      }

      ws.onmessage = (event) => {
        try {
          const data: TWsReceiveMessage = JSON.parse(event.data)

          if (data.type === 'chat.token') {
            optionsRef.current?.onToken?.(data)
          } else if (data.type === 'chat.completed') {
            dispatch(baseApi.util.invalidateTags(['Chat']))
            optionsRef.current?.onCompleted?.(data)
          } else if (data.type === 'chat.status') {
            const statusText = data.status || data.message || ''
            if (statusText) {
              optionsRef.current?.onStatusChange?.(statusText)
            }
          } else if (data.type === 'chat.error') {
            const errMsg = data.error || data.detail || data.message || 'An error occurred during chat'
            toast.error(errMsg)
            optionsRef.current?.onError?.(errMsg)
          }
        } catch (e) {
          console.error('WebSocket payload parsing error:', e)
        }
      }

      ws.onerror = (err) => {
        console.error('WebSocket error:', err)
        setStatus('error')
      }

      ws.onclose = () => {
        setStatus('disconnected')
      }
    } catch (err) {
      console.error('WebSocket connection initialization error:', err)
      setStatus('error')
    }
  }, [dispatch])

  useEffect(() => {
    connect()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [connect])

  const sendQuery = useCallback(
    async (userQuery: string, conversationId?: string): Promise<boolean> => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        await connect()
        let attempts = 0
        while (wsRef.current?.readyState !== WebSocket.OPEN && attempts < 15) {
          await new Promise((res) => setTimeout(res, 200))
          attempts++
        }
      }

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const payload: TWsSendPayload = {
          type: 'chat.message',
          user_query: userQuery,
        }
        if (conversationId) {
          payload.conversation_id = conversationId
        }

        wsRef.current.send(JSON.stringify(payload))
        return true
      } else {
        toast.error('Unable to establish real-time chat connection. Please refresh and try again.')
        return false
      }
    },
    [connect]
  )

  return {
    status,
    sendQuery,
    reconnect: connect,
  }
}
