'use client'

import React from 'react'
import { FiTerminal, FiCode, FiZap, FiBookOpen } from 'react-icons/fi'

type TCultureCard = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const Culture = () => {
  const cards: TCultureCard[] = [
    {
      icon: FiTerminal,
      title: "Don't Trust, Verify",
      description: "Every AI inference proof is mathematically verifiable on the Bitcoin ledger."
    },
    {
      icon: FiCode,
      title: "Permissionless Creation",
      description: "Anyone, anywhere can deploy autonomous AI agents on the YCOIN matrix."
    },
    {
      icon: FiZap,
      title: "Long-Term Maximalism",
      description: "We measure progress in centuries, anchored by Bitcoin's 21-million hard cap."
    }
  ]

  return (
    <section id="culture" className="w-full relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-button-color/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-4 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
          <FiBookOpen className="w-3 h-3 text-heading" />
          <span className="text-[10px] font-mono tracking-wider text-heading uppercase font-bold">
            Project Ethos
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
          Culture
        </h2>
        <p className="text-description text-base sm:text-lg leading-relaxed max-w-xl mb-12">
          Built by cypherpunks, driven by code, dedicated to human freedom.
        </p>

        {/* Main Quote Card */}
        <div className="w-full max-w-5xl bg-[#030712] border border-zinc-850 rounded-2xl p-8 md:p-12 text-left relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] mb-8">
          
          {/* Watermark Y Logo */}
          <span className="text-zinc-850/20 font-sans font-black text-[220px] md:text-[280px] absolute right-4 md:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none tracking-tighter">
            Y
          </span>

          {/* Card Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-6 select-none">
            <span className="text-[9px] font-mono tracking-wider text-[#0071E3] uppercase font-bold">
              The Cypherpunk Manifesto
            </span>
          </div>

          {/* Quote Text */}
          <p className="text-white text-base md:text-xl md:leading-relaxed font-medium mb-8 max-w-3xl relative z-10">
            "YCOIN is not an enterprise product; it is a movement. Born from the cypherpunk ethos that birthed Bitcoin, we believe that artificial intelligence must remain free, open, and decentralized. We operate without centralized headquarters or regulatory compromise — only cryptographic truth and open sovereign code."
          </p>

          {/* Card Footer tags */}
          <div className="flex items-center gap-2 text-heading font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none relative z-10">
            <span className="w-2 h-2 rounded-full bg-button-color animate-pulse" />
            <span>YCOIN Decentralized Core Collective • NO HQ • Open Source</span>
          </div>

        </div>

        {/* Bottom Three Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div 
                key={idx} 
                className="bg-[#090D14] border hover:border-border-color rounded-2xl p-6 md:p-8 flex flex-col items-start text-left shadow-[0_4px_25px_rgba(0,0,0,0.4)] transition-all duration-200"
              >
                <div className="size-12 rounded-xl bg-button-color/10 border border-button-color/20 flex items-center justify-center text-button-color mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-bold tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-description text-xs sm:text-sm leading-relaxed grow">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Culture