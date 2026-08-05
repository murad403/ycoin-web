'use client'
import Image from 'next/image'
import instructionsImg from '@/assets/images/instructions.png'

const Instructions = () => {
    return (
        <section className="w-full bg-black relative overflow-hidden py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Glow background behind the showcase */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-87.5 blur-[120px] rounded-full -z-10" />

                {/* Dashboard Showcase Container */}
                <div className="w-full rounded-2xl border border-zinc-850 p-2 md:p-3 shadow-[0_0_60px_rgba(0,113,227,0.08)]">
                    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-800">
                        <Image
                            src={instructionsImg}
                            alt="Ycoin AI Dashboard Platform Showcase"
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Instructions