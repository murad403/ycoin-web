'use client'
import { FiFileText } from 'react-icons/fi'
import { useRetrieveTermsAndConditionsQuery } from '@/redux/features/legal/legal.api'
import { formatDate } from '@/utils/formatter'
import DocumentSkeleton from '@/components/shared/DocumentSkeleton'



const Page = () => {
  const { data, isLoading, isError } = useRetrieveTermsAndConditionsQuery();
  const formattedDate = formatDate(data?.updated_at);

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
            {isLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-7 w-48 bg-zinc-800/80 rounded-lg"></div>
                <div className="h-4 w-64 bg-zinc-800/50 rounded-md"></div>
              </div>
            ) : (
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  {data?.document_type_display || 'Terms & Conditions'}
                </h1>
                <p className="text-xs md:text-sm text-description mt-1 font-medium">
                  {formattedDate ? `Effective Date: ${formattedDate} • ` : ''}Sovereign Protocol Governance
                </p>
              </div>
            )}
          </div>

          <div className="border-b border-border-color/60" />

          {/* Terms of Service Document Card */}
          <div className="border border-border-color/80 rounded-2xl bg-[#041020] p-6 md:p-8 space-y-6 shadow-lg">
            {isLoading ? (
              <DocumentSkeleton />
            ) : isError ? (
              <div className="py-12 text-center text-red-400 text-sm font-medium">Failed to load Terms & Conditions.</div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-description leading-relaxed whitespace-pre-wrap">
                  {data?.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page