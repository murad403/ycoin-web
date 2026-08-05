'use client'
import React from 'react'
import Image from 'next/image'
import heroImg from '@/assets/images/hero.png'
import { FiBell, FiSend, FiShield } from 'react-icons/fi'
import { FaBitcoin, FaXmark } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()
    const handleGetStarted = (e: React.FormEvent) => {
        e.preventDefault()
        router.push('/auth/sign-up')
    }

    return (
        <section id="overview" className="w-full bg-black py-20 md:py-28 relative overflow-hidden">

            {/* Background radial glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-button-color/10 blur-[130px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Content Column */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">

                        {/* Discover Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-border-color rounded-full mb-6 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
                            <span className="text-[11px] font-mono tracking-wider text-heading uppercase font-bold">
                                Discover More
                            </span>
                            <FiBell className="w-3 h-3 text-[#0071E3]" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] select-none">
                            Super Chatbot AI <br />
                            <span className="text-heading">Automation</span>
                        </h1>

                        {/* Description */}
                        <p className="text-description text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                            Cost-Effective Solution To Generate Text In Seconds Increasing Your Conversion Rate. Anchored by Bitcoin's Proof-of-Work sovereign network.
                        </p>

                        {/* Input Bar */}
                        <form onSubmit={handleGetStarted} className="w-full max-w-lg flex bg-[#020813] border border-border-color rounded-xl p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.6)] mb-12 focus-within:border-[#0071E3] transition-all duration-200">
                            <input
                                type="text"
                                placeholder="Solution To Generate Text / Ask Satoshi AI..."
                                className="flex-1 bg-transparent text-white px-4 py-3 text-xs sm:text-sm placeholder-zinc-600 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg flex items-center gap-2 select-none active:scale-[0.98] transition-all shrink-0 cursor-pointer"
                            >
                                <FiSend className="w-3.5 h-3.5" />
                                Get Started
                            </button>
                        </form>

                        {/* Trusted By */}
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono tracking-widest text-description uppercase font-bold">
                                Trusted by leading crypto ecosystems
                            </span>
                            <div className="flex flex-wrap items-center gap-6 md:gap-8">
                                {/* Exodus */}
                                <div className="flex items-center gap-2 text-zinc-300 font-bold tracking-wider text-xs uppercase select-none">
                                    <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                                        <FaXmark className="w-2.5 h-2.5 text-blue-400" />
                                    </div>
                                    <span>Exodus</span>
                                </div>
                                {/* Trust Wallet */}
                                <div className="flex items-center gap-2 text-zinc-300 font-bold tracking-wider text-xs uppercase select-none">
                                    <FiShield className="w-4 h-4 text-blue-400" />
                                    <span>Trust Wallet</span>
                                </div>
                                {/* MetaMask */}
                                <div className="flex items-center gap-2 text-zinc-300 font-bold tracking-wider text-xs uppercase select-none">
                                    <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    </div>
                                    <span>MetaMask</span>
                                </div>
                                {/* Bitcoin L1 */}
                                <div className="flex items-center gap-2 text-zinc-300 font-bold tracking-wider text-xs uppercase select-none">
                                    <FaBitcoin className="w-4.5 h-4.5 text-orange-400" />
                                    <span>Bitcoin L1</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Visual Card Column */}
                    <div className="lg:col-span-5 flex justify-center items-center relative">
                        <div className="w-full max-w-97.5 bg-[#030712] border border-zinc-800/80 rounded-3xl p-2.5 shadow-[0_0_35px_var(--color-dropshadow-color)] flex items-center justify-center overflow-hidden">
                            <Image
                                src={heroImg}
                                alt="Ycoin AI Chatbot"
                                className="w-full h-auto rounded-2xl object-cover"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero