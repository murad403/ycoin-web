import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', loading, children, ...props }, ref) => {
    let baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-color focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer w-full py-3.5 px-4'
    
    let variantStyles = ''
    if (variant === 'primary') {
      variantStyles = 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white shadow-lg shadow-[#0071E3]/20 active:scale-[0.98]'
    } else if (variant === 'outline') {
      variantStyles = 'border border-zinc-800 bg-transparent text-white hover:bg-zinc-950 active:scale-[0.98]'
    } else if (variant === 'ghost') {
      variantStyles = 'text-[#0071E3] hover:text-[#0071E3]/85 bg-transparent p-0 w-auto'
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
