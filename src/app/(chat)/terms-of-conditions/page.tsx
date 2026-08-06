'use client'
import { FiFileText } from 'react-icons/fi'

const Page = () => {
  const sections = [
    {
      id: 1,
      title: 'Protocol Acceptance & Decentralized Terms',
      content:
        'By connecting to or interacting with the YCOIN Sovereign AI Terminal and related decentralized Proof-of-Work (PoW) nodes, you agree to comply with these Terms of Service. If you do not agree to these terms, you must disconnect from the network immediately.',
    },
    {
      id: 2,
      title: 'AI Model Generation & Autonomous Execution',
      content:
        'The YCOIN Terminal utilizes decentralized neural network inference powered by Gemini and Bitcoin L2 state verifiers. AI outputs are provided for educational and analytical purposes only. Users are solely responsible for verifying smart contract code, transactions, or financial actions before executing them.',
    },
    {
      id: 3,
      title: 'Staking, Node Rewards & Gas Fees',
      content:
        'Staking $YCOIN unlocks priority AI inference compute tiers and daily node yield rewards. Staking yields are algorithmically determined by network Proof-of-Work difficulty curves and are subject to market fluctuations. Gas fees for on-chain verification are non-refundable.',
    },
    {
      id: 4,
      title: 'Prohibited Uses',
      content:
        'Users agree not to exploit the platform for malicious smart contract creation, automated denial-of-service (DoS) attacks on PoW validator nodes, or unauthorized data scraping of peer-to-peer telemetry feeds.',
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
              <FiFileText className="w-6 h-6 text-button-color" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Terms of Conditions
              </h1>
              <p className="text-xs md:text-sm text-description mt-1 font-medium">
                Effective Date: August 2026 • Sovereign Protocol Governance
              </p>
            </div>
          </div>

          <div className="border-b border-border-color/60" />

          {/* Terms of Service Document Card */}
          <div className="border border-border-color/80 rounded-2xl bg-[#041020] p-6 md:p-8 space-y-6 shadow-lg">
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    <span className="text-heading mr-1.5">{section.id}.</span> {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-description leading-relaxed pl-5">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border-color/30 pt-4 mt-6 flex justify-between items-center">
              <span className="text-xs text-description font-medium">
                Questions? Contact: <a href="mailto:legal@ycoin.ai" className="hover:text-button-color transition-colors underline decoration-dotted">legal@ycoin.ai</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page