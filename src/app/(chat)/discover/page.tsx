'use client'
import React, { useState } from 'react'
import { FiCompass, FiCpu, FiGrid, FiTrendingUp, FiZap, FiArrowRight } from 'react-icons/fi'

type TTool = {
  id: string
  category: 'Sovereign AI' | 'Bitcoin L2' | 'Smart Money' | 'PoW Mining AI'
  badgeText: string
  statusText: string
  isOnline?: boolean
  title: string
  description: string
  buttonText: string
  isActive?: boolean
  icon: React.ComponentType<{ className?: string }>
}

const TOOLS_DATA: TTool[] = [
  {
    id: '1',
    category: 'Sovereign AI',
    badgeText: 'Sovereign AI Agent',
    statusText: 'Online • 99.8% Accuracy',
    isOnline: true,
    title: 'Satoshi Nakamoto Oracle AI',
    description:
      "Autonomous PoW intelligence modeled on Satoshi's whitepaper, analyzing block emission decay, node consensus, and monetary policy.",
    buttonText: 'Launch Agent Chat',
    isActive: true,
    icon: FiCpu,
  },
  {
    id: '2',
    category: 'Bitcoin L2',
    badgeText: 'Bitcoin L2',
    statusText: 'BitVM Bridge',
    title: 'BitVM ZK-SNARK Validator',
    description:
      'Verifies optimistic state proofs and zero-knowledge rollups grounded on Bitcoin L1 settlement guarantees.',
    buttonText: 'Verify State Proofs',
    icon: FiGrid,
  },
  {
    id: '3',
    category: 'Smart Money',
    badgeText: 'Smart Money',
    statusText: '500+ Wallets Tracked',
    title: 'Whale Inflow & DEX Monitor',
    description:
      'Detects institutional accumulation, DEX liquidity migration, and wallet cluster movements across BTC, Solana, and EVM chains.',
    buttonText: 'Scan Whale Movements',
    icon: FiTrendingUp,
  },
  {
    id: '4',
    category: 'PoW Mining AI',
    badgeText: 'PoW Mining AI',
    statusText: 'Live Difficulty Engine',
    title: 'YCOIN Mining Yield Predictor',
    description:
      'Forecasts ASIC hash rate efficiency, difficulty adjustment epochs, and block reward yield curves in real-time.',
    buttonText: 'Run Mining Forecast',
    icon: FiZap,
  },
]

const Page = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Sovereign AI' | 'Bitcoin L2' | 'Smart Money'>('All')

  const tabs: ('All' | 'Sovereign AI' | 'Bitcoin L2' | 'Smart Money')[] = [
    'All',
    'Sovereign AI',
    'Bitcoin L2',
    'Smart Money',
  ]

  const filteredTools = TOOLS_DATA.filter((tool) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Sovereign AI') {
      return tool.category === 'Sovereign AI' || tool.category === 'PoW Mining AI'
    }
    return tool.category === activeTab
  })

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
        <div className="max-w-4xl mx-auto w-full space-y-6 pb-12">
          {/* Header Title Section */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#020813] border border-border-color rounded-2xl flex items-center justify-center text-button-color shadow-[0_0_20px_rgba(0,113,227,0.15)] shrink-0">
              <FiCompass className="w-6 h-6 text-button-color" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Discover Sovereign AI & Bitcoin L2 Tools
              </h1>
              <p className="text-xs md:text-sm text-description mt-1 font-medium">
                Explore autonomous agent protocols, smart money profilers, and Bitcoin PoW tools.
              </p>
            </div>
          </div>

          <div className="border-b border-border-color/60" />

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all select-none cursor-pointer ${isSelected
                    ? 'bg-button-color text-white font-bold shadow-md shadow-button-color/20'
                    : 'bg-[#041020] border border-border-color text-description hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Tools Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {filteredTools.map((tool) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.id}
                  className="rounded-2xl border border-border-color p-5 flex flex-col justify-between h-full bg-[#080D17] transition-all duration-300 hover:border-border-color hover:shadow-[0_0_30px_rgba(0,113,227,0.08)]"
                >
                  {/* Top Meta Details Row */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="bg-heading/10 border border-heading/35 text-heading text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">
                      {tool.badgeText}
                    </span>

                    <span className="text-[10px] sm:text-xs text-description font-medium flex items-center gap-1.5">
                      {tool.isOnline && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                      {tool.statusText}
                    </span>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-2.5 mt-4">
                    <Icon className="w-5 h-5 text-button-color shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {tool.title}
                    </h3>
                  </div>

                  {/* Description Box */}
                  <p className="text-xs sm:text-sm text-description mt-3 leading-relaxed font-medium grow">
                    {tool.description}
                  </p>

                  {/* Launch button */}
                  {tool.isActive ? (
                    <button className="w-full mt-6 py-2.5 bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-button-color/15">
                      <span>{tool.buttonText}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="w-full mt-6 py-2.5 border border-border-color bg-transparent hover:bg-button-color/5 text-button-color hover:text-white hover:border-button-color font-bold text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer">
                      <span>{tool.buttonText}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page