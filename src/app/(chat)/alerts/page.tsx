'use client'
import React, { useState, useRef } from 'react'
import { FiBell, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'

type TAlert = {
    id: string
    name: string
    status: 'active' | 'paused'
    condition: string
    notify: string
    triggersCount: number
    lastTrigger: string
}

type TLog = {
    id: string
    time: string
    text: string
    meta: string
}

// Initial default alerts from screenshot
const INITIAL_ALERTS: TAlert[] = [
    {
        id: '1',
        name: 'Bitcoin (BTC)',
        status: 'active',
        condition: 'Price > $70,000.00',
        notify: 'Telegram & Web',
        triggersCount: 12,
        lastTrigger: '10m ago',
    },
    {
        id: '2',
        name: 'YCOIN Matrix',
        status: 'active',
        condition: 'PoW Hashrate Spike > 15%',
        notify: 'Terminal Audio',
        triggersCount: 4,
        lastTrigger: '1h ago',
    },
    {
        id: '3',
        name: 'SolBtc (SBTX)',
        status: 'paused',
        condition: 'Smart Money Inflow > $100K',
        notify: 'Push Notification',
        triggersCount: 28,
        lastTrigger: '3h ago',
    },
    {
        id: '4',
        name: 'Ethereum (ETH)',
        status: 'active',
        condition: 'Gas Fee < 15 Gwei',
        notify: 'Web Alert',
        triggersCount: 2,
        lastTrigger: '1d ago',
    },
]

// Initial logs from screenshot
const INITIAL_LOGS: TLog[] = [
    {
        id: 'l1',
        time: '10:42 AM',
        text: 'BTC Price crossed $70,000 threshold',
        meta: 'Verified via PoW Node #882',
    },
    {
        id: 'l2',
        time: '09:15 AM',
        text: 'YCOIN Matrix Hashrate jumped +18.4%',
        meta: 'L2 Difficulty Rebalanced',
    },
    {
        id: 'l3',
        time: '08:00 AM',
        text: 'SolBtc Smart Money Accumulation Detected',
        meta: 'Whale Wallet 0x8f...2a',
    },
]

const Page = () => {
    const [alerts, setAlerts] = useState<TAlert[]>(INITIAL_ALERTS)
    const [logs, setLogs] = useState<TLog[]>(INITIAL_LOGS)
    const [input, setInput] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleToggleStatus = (id: string) => {
        setAlerts((prev) =>
            prev.map((alert) => {
                if (alert.id === id) {
                    return {
                        ...alert,
                        status: alert.status === 'active' ? 'paused' : 'active',
                    }
                }
                return alert
            })
        )
    }

    const handleDeleteAlert = (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    }

    const handleAskAI = (alertName: string) => {
        setInput(`Explain recent status metrics and active triggers for ${alertName}`)
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
                <div className="max-w-4xl mx-auto w-full space-y-6 pb-12">
                    {/* Header Title Section */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#020813] border border-border-color rounded-2xl flex items-center justify-center text-button-color shadow-[0_0_20px_rgba(0,113,227,0.15)] shrink-0">
                            <FiBell className="w-6 h-6 text-button-color" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                Sovereign Alerts Engine
                            </h1>
                            <p className="text-xs md:text-sm text-description mt-1 font-medium">
                                Real-time price thresholds, PoW difficulty triggers, and whale inflow monitoring.
                            </p>
                        </div>
                    </div>

                    <div className="border-b border-border-color/60" />

                    {/* Configured Sovereign Triggers */}
                    <div className="space-y-4">
                        <h2 className="text-[10px] sm:text-xs font-bold text-description tracking-widest uppercase">
                            Configured Sovereign Triggers ({alerts.length})
                        </h2>

                        {alerts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border-color/60 rounded-2xl bg-[#020813]/20">
                                <FiBell className="w-10 h-10 text-description mb-3" />
                                <h3 className="text-sm font-semibold text-white">No triggers left</h3>
                                <p className="text-xs text-description mt-1 text-center max-w-xs font-medium">
                                    You have deleted all configured triggers. Click the button below to restore them.
                                </p>
                                <button
                                    onClick={() => setAlerts(INITIAL_ALERTS)}
                                    className="mt-4 px-4 py-2 bg-button-color hover:bg-button-color/90 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                                >
                                    Restore Default Triggers
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {alerts.map((alert) => {
                                    const isActive = alert.status === 'active'
                                    return (
                                        <div
                                            key={alert.id}
                                            className={`relative overflow-hidden rounded-2xl border bg-[#020813]/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 ${isActive
                                                    ? 'border-border-color hover:border-button-color/40 hover:bg-[#020813]/80'
                                                    : 'border-zinc-900/80 opacity-70 hover:opacity-100 hover:border-zinc-800'
                                                }`}
                                        >
                                            {/* Left: Info */}
                                            <div className="flex items-start gap-4">
                                                {/* Icon Box */}
                                                <div
                                                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-colors ${isActive
                                                            ? 'border-heading/20 bg-heading/5 text-heading'
                                                            : 'border-zinc-800/80 bg-zinc-900/10 text-zinc-600'
                                                        }`}
                                                >
                                                    <FiBell className="w-5 h-5" />
                                                </div>

                                                {/* Text Details */}
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="text-sm sm:text-base font-bold text-white leading-none">
                                                            {alert.name}
                                                        </span>
                                                        {/* Status Badge */}
                                                        <span
                                                            className={`px-2 py-0.5 text-[9px] font-bold rounded-md tracking-wider uppercase ${isActive
                                                                    ? 'bg-heading/10 border border-heading/35 text-heading'
                                                                    : 'bg-zinc-800/40 border border-zinc-700/60 text-zinc-400'
                                                                }`}
                                                        >
                                                            {alert.status}
                                                        </span>
                                                    </div>

                                                    <div className="text-sm sm:text-base font-semibold text-white mt-1.5 leading-tight">
                                                        {alert.condition}
                                                    </div>

                                                    {/* Footer Meta */}
                                                    <div className="text-[10px] sm:text-xs text-description flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 font-medium">
                                                        <span>Notify: {alert.notify}</span>
                                                        <span className="hidden sm:inline text-zinc-800">•</span>
                                                        <span>Triggers: {alert.triggersCount} times</span>
                                                        <span className="hidden sm:inline text-zinc-800">•</span>
                                                        <span>Last: {alert.lastTrigger}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Actions */}
                                            <div className="flex items-center gap-2 sm:self-center self-end mt-2 sm:mt-0">
                                                {/* Ask AI Button */}
                                                <button
                                                    onClick={() => handleAskAI(alert.name)}
                                                    className="px-3.5 py-1.5 rounded-xl border border-button-color/30 bg-button-color/5 hover:bg-button-color/15 text-button-color text-xs font-bold transition-all duration-150 cursor-pointer"
                                                >
                                                    Ask AI
                                                </button>

                                                {/* Toggle Button */}
                                                <button
                                                    onClick={() => handleToggleStatus(alert.id)}
                                                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${isActive
                                                            ? 'border-button-color/20 bg-button-color/5 hover:bg-button-color/15 text-button-color'
                                                            : 'border-zinc-800/80 bg-zinc-900/10 hover:bg-zinc-900/20 text-zinc-500'
                                                        }`}
                                                    title={isActive ? 'Pause Trigger' : 'Resume Trigger'}
                                                >
                                                    {isActive ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDeleteAlert(alert.id)}
                                                    className="w-9 h-9 rounded-xl border border-zinc-800/80 bg-transparent hover:bg-red-500/10 hover:border-red-500/35 text-description hover:text-red-400 flex items-center justify-center transition-all duration-150 cursor-pointer"
                                                    title="Delete Trigger"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="border-b border-border-color/60" />

                    {/* Recent Trigger History Log */}
                    <div className="space-y-4">
                        <h2 className="text-[10px] sm:text-xs font-bold text-description tracking-widest uppercase">
                            Recent Trigger History Log
                        </h2>

                        <div className="border border-border-color/80 rounded-2xl bg-[#020813]/30 overflow-hidden shadow-lg">
                            {logs.length === 0 ? (
                                <div className="py-8 px-4 text-center text-xs text-description font-medium">
                                    No log history available.
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    {logs.map((log) => (
                                        <div
                                            key={log.id}
                                            className="flex items-center justify-between p-3.5 sm:p-4 border-b border-border-color/30 last:border-b-0 hover:bg-zinc-900/15 transition-colors"
                                        >
                                            {/* Left: Message */}
                                            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-[#38BDF8]">
                                                <span className="text-[#F59E0B]">⚡</span>
                                                <span>
                                                    [{log.time}] {log.text}
                                                </span>
                                            </div>

                                            {/* Right: Meta */}
                                            <div className="text-[10px] sm:text-xs text-description font-medium shrink-0 ml-4">
                                                {log.meta}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page