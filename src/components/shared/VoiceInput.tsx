'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  className?: string
}

// Declare SpeechRecognition for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className = '' }) => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = language === 'zh' ? 'zh-CN' : 'en-US'

    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          finalTranscript += transcript
        }
      }
      if (finalTranscript) {
        onTranscript(finalTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [language, onTranscript])

  const toggleListening = () => {
    if (!isSupported) {
      alert(language === 'zh' ? '您的浏览器不支持语音识别功能，请使用 Chrome 或 Edge 浏览器。' : 'Voice recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = language === 'zh' ? 'zh-CN' : 'en-US'
          recognitionRef.current.start()
          setIsListening(true)
        }
      } catch (err) {
        console.error('Failed to start speech recognition:', err)
      }
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        className={`relative p-2 rounded-xl transition-all duration-200 select-none cursor-pointer ${
          isListening
            ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
            : 'text-description hover:text-white hover:bg-zinc-900/60'
        } ${className}`}
        title={
          isListening
            ? language === 'zh' ? '停止语音输入' : 'Stop Listening'
            : language === 'zh' ? '开始语音输入' : 'Voice Input'
        }
      >
        {isListening ? (
          <>
            <FiMicOff className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          </>
        ) : (
          <FiMic className="w-4 h-4" />
        )}
      </button>

      {/* Listening Status Badge Overlay */}
      {isListening && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-950/90 border border-red-500/40 text-red-200 text-[10px] font-mono font-bold rounded-lg whitespace-nowrap shadow-lg flex items-center gap-1.5 animate-in fade-in duration-150 z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>{language === 'zh' ? '正在聆听...' : 'Listening...'}</span>
        </div>
      )}
    </div>
  )
}

export default VoiceInput