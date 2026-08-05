'use client'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiGithub, FiTwitter } from 'react-icons/fi'
import { FaDiscord, FaTelegram } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="w-full bg-[#030712] border-t border-zinc-900 text-description">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-10 border-b border-zinc-900">

          {/* Logo & Description Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex gap-3 mb-5">
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
            <p className="text-xs leading-relaxed max-w-sm text-description">
              The first Bitcoin-native autonomous AI platform. Decoupled from central control, secured by Bitcoin's Proof-of-Work ledger.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <Link href="https://x.com" target="_blank" className="hover:text-white transition-all duration-200">
                <FiTwitter className="w-4 h-4" />
              </Link>
              <Link href="https://discord.com" target="_blank" className="hover:text-white transition-all duration-200">
                <FaDiscord className="w-4.5 h-4.5" />
              </Link>
              <Link href="https://telegram.org" target="_blank" className="hover:text-white transition-all duration-200">
                <FaTelegram className="w-4 h-4" />
              </Link>
              <Link href="https://github.com" target="_blank" className="hover:text-white transition-all duration-200">
                <FiGithub className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Platform Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold font-mono tracking-widest uppercase">
              Platform
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <Link href="#overview" className="hover:text-white transition-all duration-150">
                Overview
              </Link>
              <Link href="#roadmap" className="hover:text-white transition-all duration-150">
                Roadmap
              </Link>
              <Link href="#culture" className="hover:text-white transition-all duration-150">
                Culture
              </Link>
            </div>
          </div>

          {/* Resources Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold font-mono tracking-widest uppercase">
              Resources
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <Link href="#whitepaper" className="hover:text-white transition-all duration-150">
                Whitepaper
              </Link>
              <Link href="#docs" className="hover:text-white transition-all duration-150">
                Docs
              </Link>
              <Link href="https://github.com" target="_blank" className="hover:text-white transition-all duration-150">
                GitHub
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[10px] sm:text-xs text-description gap-4">
          <span>
            © 2026 YCOIN AI. All rights reserved. Bitcoin-native sovereign intelligence.
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/5 border border-green-500/25 text-green-500 rounded-full font-mono text-[10px] tracking-wider select-none uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Network Online
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer