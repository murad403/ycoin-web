'use client'
import { FiCheck, FiClock, FiCompass } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'

const Roadmap = () => {
    const { t } = useLanguage()

    const steps = [
        {
            quarter: t.roadmap.steps[0].quarter,
            status: t.roadmap.statusCompleted,
            isActive: true,
            isCompleted: true,
            title: t.roadmap.steps[0].title,
            description: t.roadmap.steps[0].description,
            position: 'right'
        },
        {
            quarter: t.roadmap.steps[1].quarter,
            status: t.roadmap.statusInProgress,
            isActive: true,
            isCompleted: false,
            title: t.roadmap.steps[1].title,
            description: t.roadmap.steps[1].description,
            position: 'left'
        },
        {
            quarter: t.roadmap.steps[2].quarter,
            status: t.roadmap.statusUpcoming,
            isActive: false,
            isCompleted: false,
            title: t.roadmap.steps[2].title,
            description: t.roadmap.steps[2].description,
            position: 'right'
        },
        {
            quarter: t.roadmap.steps[3].quarter,
            status: t.roadmap.statusVision,
            isActive: false,
            isCompleted: false,
            title: t.roadmap.steps[3].title,
            description: t.roadmap.steps[3].description,
            position: 'left'
        }
    ]

    return (
        <section id="roadmap" className="w-full relative overflow-hidden py-16 md:py-24">

            {/* Background glow */}
            <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-button-color/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Badge Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-4 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
                    <FiCompass className="w-3 h-3 text-heading" />
                    <span className="text-[10px] font-mono tracking-wider text-heading uppercase font-bold">
                        {t.roadmap.badge}
                    </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {t.roadmap.title}
                </h2>
                <p className="text-description text-base sm:text-lg leading-relaxed max-w-xl mb-14">
                    {t.roadmap.subtitle}
                </p>

                {/* Timeline Container */}
                <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-10 md:gap-0">

                    {/* Vertical central line (hidden on mobile, left-aligned on tablet, centered on desktop) */}
                    <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-zinc-850 -translate-x-1/2 md:-translate-x-px z-0">
                        {/* Active filled line for progress */}
                        <div className="absolute top-0 left-0 right-0 h-full bg-[#0071E3]" />
                    </div>

                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full min-h-40 ${step.position === 'left' ? 'md:text-right' : 'md:text-left'
                                }`}
                        >

                            {/* Timeline Center Dot (Absolute position referencing central line) */}
                            <div className="absolute left-4 md:left-1/2 size-11 rounded-full border border-button-color bg-[#030712] flex items-center justify-center -translate-x-1/2 z-20">
                                {step.isCompleted ? (
                                    <div className="size-6 rounded-full bg-[#0071E3] flex items-center justify-center text-white">
                                        <FiCheck className="size-4 font-bold" />
                                    </div>
                                ) : (
                                    <div className="size-7 rounded-full border-2 border-[#0071E3] bg-[#030712] flex items-center justify-center text-[#0071E3]">
                                        <FiClock className="size-4 animate-pulse" />
                                    </div>
                                )}
                            </div>

                            {/* Card wrapper (aligned dynamically left or right of center) */}
                            <div className={`pl-12 md:pl-0 w-full flex ${step.position === 'right'
                                ? 'md:col-start-2 justify-start'
                                : 'md:col-start-1 justify-end md:order-first'
                                }`}>

                                {/* Timeline Card */}
                                <div className="w-full max-w-105 bg-[#090D14] border border-zinc-850 border-border-color rounded-2xl p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.4)] text-left flex flex-col gap-4 transition-all duration-200 hover:border-button-color">

                                    {/* Card Header Row */}
                                    <div className="flex justify-between items-center w-full">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-heading border bg-[#0E1420] border-border-color px-2.5 py-1 select-none rounded-lg">
                                            {step.quarter}
                                        </span>
                                        <span className={`text-[10px] font-mono tracking-wider font-bold uppercase px-2.5 py-1 rounded-full select-none ${step.isCompleted
                                            ? 'bg-[#0071E3] text-white font-bold'
                                            : step.isActive
                                                ? 'bg-[#0071E3]/15 text-[#0071E3] border border-[#0071E3]/35 shadow-[0_0_10px_rgba(0,113,227,0.1)]'
                                                : 'bg-zinc-900 text-zinc-500 border border-zinc-850'
                                            }`}>
                                            {step.status}
                                        </span>
                                    </div>

                                    {/* Title & Body */}
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="text-white text-lg md:text-xl font-bold tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-description text-xs sm:text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    )
}

export default Roadmap