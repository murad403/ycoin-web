'use client'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/images/logo.png'
import { FiGithub, FiGlobe } from 'react-icons/fi'
import { FaDiscord, FaXTwitter } from 'react-icons/fa6'
import { useLanguage } from '@/i18n/LanguageContext'

type TSocialLink = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  target?: string
}

const Footer = () => {
  const { t } = useLanguage()

  const socialLinks: TSocialLink[] = [
    {
      href: "https://x.com",
      icon: FaXTwitter,
      target: "_blank"
    },
    {
      href: "https://discord.com",
      icon: FaDiscord,
      target: "_blank"
    },
    {
      href: "https://github.com",
      icon: FiGithub,
      target: "_blank"
    },
    {
      href: "#nodes",
      icon: FiGlobe
    }
  ]

  return (
    <footer className="w-full bg-[#030712] border-t border-zinc-900 text-description">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-zinc-900">

          {/* Left Column: Brand & Network Status */}
          <div className="md:col-span-5 flex flex-col gap-5 items-start">
            <div className="flex gap-3">
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
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-300">
              {t.footer.tagline}
            </p>
            {/* Network Status Pill */}
            <div className="inline-flex items-center gap-2 border border-[#0071E3]/20 bg-[#020813] text-[#0071E3] font-sans text-xs px-4.5 py-2 rounded-full select-none font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />
              <span>{t.footer.networkStatus}</span>
            </div>
          </div>

          {/* Center Column: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-4 items-start">
            <h4 className="text-heading text-xs font-bold font-mono tracking-widest uppercase select-none">
              {t.footer.navigation}
            </h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm font-medium text-left">
              <Link href="/auth/sign-in" className="text-description hover:text-white transition-colors duration-150">
                {t.nav.talkToAi}
              </Link>
              <Link href="#philosophy" className="text-description hover:text-white transition-colors duration-150">
                {t.nav.philosophy}
              </Link>
              <Link href="#roadmap" className="text-description hover:text-white transition-colors duration-150">
                {t.nav.roadmap}
              </Link>
              <Link href="#culture" className="text-description hover:text-white transition-colors duration-150">
                {t.nav.culture}
              </Link>
            </div>
          </div>

          {/* Right Column: Community & Code */}
          <div className="md:col-span-4 flex flex-col gap-4 items-start text-left">
            <h4 className="text-heading text-xs font-bold font-mono tracking-widest uppercase select-none">
              {t.footer.communityHeader}
            </h4>
            <p className="text-description text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footer.communityDesc}
            </p>
            {/* Boxed Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    target={link.target}
                    className="w-10 h-10 rounded-xl border border-border-color bg-[#020813] flex items-center justify-center text-description hover:text-white hover:border-border-color hover:scale-105 active:scale-[0.98] transition-all duration-150"
                  >
                    <Icon className="w-4.5 h-4.5 text-heading" />
                  </Link>
                )
              })}
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar & Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-description gap-6">
          <div className="flex flex-col gap-1.5 text-left w-full md:w-auto">
            <span className="text-input-label font-medium">
              {t.footer.copyright}
            </span>
            <span className="text-description text-[10px] sm:text-xs">
              {t.footer.disclaimer}
            </span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="border border-border-color hover:border-button-color text-description hover:text-white text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors select-none cursor-pointer font-medium active:scale-[0.98] w-fit shrink-0"
          >
            <span>{t.footer.backToTop}</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer