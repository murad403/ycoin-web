import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ComponentType<{ className?: string }>
  rightElement?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon: Icon, rightElement, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {(label || rightElement) && (
          <div className="flex justify-between items-center px-1">
            {label && (
              <span className="text-sm tracking-widest text-input-label uppercase font-semibold">
                {label}
              </span>
            )}
            {rightElement}
          </div>
        )}

        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#020813] text-white border ${error ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-border-color focus:border-[#0071E3] focus:ring-[#0071E3]/20'
              } rounded-lg ${Icon ? 'pl-10' : 'px-4'} ${rightIcon ? 'pr-10' : 'pr-4'} py-3 text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-200 ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-400 flex items-center justify-center z-10">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs text-red-500/90 mt-0.5 px-1 font-medium transition-all duration-150">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
