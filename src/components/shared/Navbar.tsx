'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiMenu, FiX, FiGlobe, FiMessageSquare, FiChevronRight } from 'react-icons/fi'

type TNavlink = {
  href: string;
  label: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navlinks: TNavlink[] = [
    {
      href: "#philosophy",
      label: "Philosophy"
    },
    {
      href: "#roadmap",
      label: "Roadmap"
    },
    {
      href: "#culture",
      label: "Culture"
    }
  ]
  return (
    <nav className="w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
          <div className="flex items-center justify-center gap-3">
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
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-heading flex items-center select-none">
              Ycoin AI
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {
              navlinks.map((item: TNavlink, index: number) =>
                <Link key={index} href={item.href} className="text-description hover:text-white text-sm font-semibold transition-all duration-200 select-none">
                  {item.label}
                </Link>
              )
            }
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="border border-zinc-800 bg-[#020813]/60 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-zinc-300 font-bold select-none cursor-pointer hover:border-zinc-700 transition-colors">
              <FiGlobe className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>EN</span>
            </div>
            {/* Talk to AI Button */}
            <Link
              href="/new-chat"
              className="bg-button-color hover:bg-button-color/90 text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_var(--color-dropshadow-color)] transition-all duration-200 select-none active:scale-[0.98]"
            >
              <FiMessageSquare className="w-3.5 h-3.5" />
              <span>Talk to AI</span>
              <FiChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-1.5 rounded-lg border border-zinc-800 bg-zinc-950/45"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-black/95 backdrop-blur-lg absolute left-0 right-0 px-4 pt-4 pb-6 flex flex-col gap-4 shadow-xl">
          <Link
            href="#philosophy"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            Philosophy
          </Link>
          <Link
            href="#roadmap"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            Roadmap
          </Link>
          <Link
            href="#culture"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white text-base font-semibold py-2 px-3 hover:bg-zinc-900/40 rounded-lg transition-all duration-150"
          >
            Culture
          </Link>
          <div className="h-px bg-zinc-900 my-2" />
          <div className="flex flex-col gap-3 px-3">
            <Link
              href="/auth/sign-in"
              onClick={() => setIsOpen(false)}
              className="bg-button-color text-white text-center font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 shadow-[0_0_15px_var(--color-dropshadow-color)] transition-all duration-150"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span>Talk to AI</span>
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar