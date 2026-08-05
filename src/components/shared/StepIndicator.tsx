
type TProps = {
    step: 1 | 2 | 3
}

const StepIndicator = ({ step }: TProps) => {
    return (
        <div className="flex items-center justify-between w-full text-xs font-mono tracking-wider mb-6 px-1 select-none">
            {/* Step 1 */}
            <div className={`flex items-center gap-1.5 ${step !== 1 ? 'opacity-60' : ''}`}>
                <span className={`size-6 flex items-center justify-center rounded-full text-sm font-bold ${
                    step === 1 ? 'bg-button-color text-white' : 'bg-zinc-900 text-description border border-zinc-800'
                }`}>
                    1
                </span>
                <span className={step === 1 ? 'text-heading font-bold' : 'text-description font-semibold'}>
                    Enter Email
                </span>
            </div>

            {/* Line 1 */}
            <div className="flex-1 h-px mx-2 bg-zinc-800" />

            {/* Step 2 */}
            <div className={`flex items-center gap-1.5 ${step !== 2 ? 'opacity-60' : ''}`}>
                <span className={`size-6 flex items-center justify-center rounded-full text-sm font-bold ${
                    step === 2 ? 'bg-button-color text-white' : 'bg-zinc-900 text-description border border-zinc-800'
                }`}>
                    2
                </span>
                <span className={step === 2 ? 'text-heading font-bold' : 'text-description font-semibold'}>
                    Enter Code
                </span>
            </div>

            {/* Line 2 */}
            <div className="flex-1 h-px mx-2 bg-zinc-800" />

            {/* Step 3 */}
            <div className={`flex items-center gap-1.5 ${step !== 3 ? 'opacity-60' : ''}`}>
                <span className={`size-6 flex items-center justify-center rounded-full text-sm font-bold ${
                    step === 3 ? 'bg-button-color text-white' : 'bg-zinc-900 text-description border border-zinc-800'
                }`}>
                    3
                </span>
                <span className={step === 3 ? 'text-heading font-bold' : 'text-description font-semibold'}>
                    New Password
                </span>
            </div>
        </div>
    )
}

export default StepIndicator