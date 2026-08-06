'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'

const TabSwitcher = () => {
    const pathname = usePathname()
    const { t } = useLanguage()
    const isSignIn = pathname === '/auth/sign-in'

    return (
        <div className="grid grid-cols-2 bg-[#020813] border border-border-color rounded-lg p-1 w-full">
            <Link
                href="/auth/sign-in"
                className={`${
                    isSignIn
                        ? 'bg-button-color text-white font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white font-semibold'
                } text-sm py-2.5 px-4 rounded-md transition-all duration-200 flex items-center justify-center select-none`}
            >
                {t.auth.signInTab}
            </Link>
            <Link
                href="/auth/sign-up"
                className={`${
                    !isSignIn
                        ? 'bg-button-color text-white font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white font-semibold'
                } text-sm py-2.5 px-4 rounded-md transition-all duration-200 flex items-center justify-center select-none`}
            >
                {t.auth.signUpTab}
            </Link>
        </div>
    )
}

export default TabSwitcher