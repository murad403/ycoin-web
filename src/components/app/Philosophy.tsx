'use client'

import React from 'react'
import { FiKey, FiLock, FiCpu, FiCheckCircle } from 'react-icons/fi'

type TPhilosophyCard = {
    icon: React.ComponentType<{ className?: string }>
    tag: string
    title: string
    description: string
}

const Philosophy = () => {
    const cards: TPhilosophyCard[] = [
        {
            icon: FiKey,
            tag: 'SOVEREIGN IDENTITY',
            title: 'Individual Sovereignty',
            description: 'True freedom requires control over your capital and your intelligence. YCOIN returns complete ownership of data, memory, and value back to the individual without corporate gatekeepers.'
        },
        {
            icon: FiLock,
            tag: 'PROOF-OF-WORK',
            title: 'Proof-of-Work Foundation',
            description: "Bitcoin is the ultimate anchor of truth in the digital universe. YCOIN leverages Bitcoin's unmatched energy-backed security to validate and seal autonomous AI state execution."
        },
        {
            icon: FiCpu,
            tag: 'AUTONOMOUS CODE',
            title: 'Autonomous Code Supremacy',
            description: 'Human consensus is fragile and prone to censorship. By delegating complex coordination to cryptographic AI models, we establish immutable governance driven by logic and code.'
        }
    ]

    return (
        <section id="philosophy" className="w-full relative overflow-hidden py-16 md:py-24">

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-100 h-100 bg-button-color/5 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Badge Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-4 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
                    <FiCpu className="w-3 h-3 text-heading" />
                    <span className="text-[10px] font-mono tracking-wider text-heading uppercase font-bold">
                        Core Principles
                    </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                    Philosophy
                </h2>
                <p className="text-description text-base sm:text-lg leading-relaxed max-w-xl mb-14">
                    Uncompromising decentralization meets self-sovereign intelligence.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {cards.map((card, idx) => {
                        const Icon = card.icon
                        return (
                            <div
                                key={idx}
                                className="bg-[#090D14] border border-border-color hover:border-button-color rounded-2xl p-6 md:p-8 flex flex-col items-start text-left shadow-[0_4px_25px_rgba(0,0,0,0.4)] transition-all duration-200"
                            >
                                {/* Top row with icon & pill */}
                                <div className="flex justify-between items-center w-full mb-6">
                                    <div className="size-12 rounded-xl bg-button-color/10 border border-button-color/20 flex items-center justify-center text-button-color">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold tracking-wider text-description border border-border-color bg-[#0E1420] rounded-full px-2.5 py-1">
                                        {card.tag}
                                    </span>
                                </div>

                                {/* Title & Body */}
                                <h3 className="text-white text-lg md:text-xl font-bold tracking-tight mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-description text-xs sm:text-sm leading-relaxed mb-6 grow">
                                    {card.description}
                                </p>

                                {/* Divider line & verified tag */}
                                <div className="w-full border-t border-zinc-900 pt-4 flex items-center gap-1.5 text-heading font-mono text-[10px] font-bold tracking-wider select-none uppercase">
                                    <FiCheckCircle className="w-3.5 h-3.5" />
                                    <span>Verified by Bitcoin L1</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default Philosophy