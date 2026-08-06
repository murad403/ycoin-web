'use client'
import { FiShield } from 'react-icons/fi'

const Page = () => {
  const sections = [
    {
      id: 1,
      title: 'Sovereign Zero-Knowledge Architecture',
      content:
        'YCOIN Sovereign AI is built on privacy-first principles. We do not sell, license, or monetize your personal information or chat queries to third-party advertisers. All terminal interactions are processed through cryptographic node tunnels.',
    },
    {
      id: 2,
      title: 'Data Collection & Local Storage',
      content:
        "Your profile settings, custom avatars, and alert triggers are stored locally in your browser's encrypted state and verified with zero-knowledge token headers when interacting with authenticated API endpoints.",
    },
    {
      id: 3,
      title: 'Image & Asset Privacy',
      content:
        'Images uploaded via the Image Upload Studio or Profile Avatar editor are stored locally or via encrypted Base64 state. They are never indexed publicly or shared with external analytics trackers.',
    },
    {
      id: 4,
      title: 'Your Security Controls',
      content:
        'You retain full sovereign ownership over your account data. You can clear your session cookies, delete profile images, or disconnect your wallet address at any time with one click.',
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden justify-between">
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
        <div className="max-w-4xl mx-auto w-full space-y-6 pb-12">
          {/* Header Title Section */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#020813] border border-border-color rounded-2xl flex items-center justify-center text-button-color shadow-[0_0_20px_rgba(0,113,227,0.15)] shrink-0">
              <FiShield className="w-6 h-6 text-button-color" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Privacy Policy
              </h1>
              <p className="text-xs md:text-sm text-description mt-1 font-medium">
                Zero-Knowledge Data Policy • Last Updated: August 2026
              </p>
            </div>
          </div>

          <div className="border-b border-border-color/60" />

          {/* Privacy Policy Document Card */}
          <div className="border border-border-color/80 rounded-2xl bg-[#041020] p-6 md:p-8 space-y-6 shadow-lg">
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <FiShield className="w-4 h-4 text-button-color shrink-0" />
                    <span className="text-heading">{section.id}.</span> {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-description leading-relaxed pl-6">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border-color/30 pt-4 mt-6 flex justify-between items-center">
              <span className="text-[11px] sm:text-xs font-mono text-description font-medium">
                Encrypted Hash: 0x9f83...bc01
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page