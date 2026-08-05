import React from 'react'
import Image from 'next/image'
import logoImg from '@/assets/images/logo.png'
import { FiKey } from 'react-icons/fi'
import { Shield } from 'lucide-react'

type TProps = {
    children: React.ReactNode
    title: string
    description?: string
}

const AuthWrapper = ({ children, title, description }: TProps) => {
    return (
        <div className="relative w-full max-w-110 px-4 md:px-0">
            {/* Glow background behind the card */}
            <div className="absolute inset-0 bg-[#0071E3]/10 blur-[80px] rounded-3xl -z-10" />

            {/* Main Auth Card Container */}
            <div className="w-full bg-[#030712] border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-[0_0_25px_var(--color-dropshadow-color)] text-center flex flex-col items-center">
                {/* Brand Header */}
                <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="p-1 bg-[#020813] border border-zinc-800/80 rounded-2xl shadow-[0_0_15px_var(--color-dropshadow-color)] flex items-center justify-center">
                        <Image
                            src={logoImg}
                            alt="Ycoin Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-heading flex items-center">
                        Ycoin AI
                    </h1>
                </div>

                {/* Security Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071E3]/5 border border-[#0071E3]/35 rounded-full mb-5 select-none shadow-[0_0_15px_rgba(0,113,227,0.05)]">
                    <Shield className="text-[#0071E3]" size={17} />
                    <span className="text-xs font-mono tracking-wider text-[#0071E3] uppercase font-bold">
                        YCOIN Sovereign User Auth
                    </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight mb-1.5">
                    {title}
                </h2>
                {description && (
                    <p className="text-description text-sm leading-relaxed max-w-[320px] mx-auto mb-6">
                        {description}
                    </p>
                )}

                {/* Form/Children Content */}
                <div className="w-full flex flex-col gap-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper