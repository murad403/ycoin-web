'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiKey, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Button } from '../ui/button'
import { verifyOtpSchema, TVerifyOtpInput } from '@/validation/auth.validation'

const VerifyOtpPage = () => {
  const [timer, setTimer] = useState(46)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TVerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: TVerifyOtpInput) => {
    console.log('OTP Verification Data:', data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // In real app, redirect to reset-password page
  }

  return (
    <AuthWrapper 
      title="Reset Password"
      description="A 6-digit code was sent to haqueahsan1325@gmail.com. Please enter it below."
    >
      {/* Steps Indicator */}
      <div className="flex items-center justify-between w-full text-[9px] font-mono tracking-wider mb-6 px-1">
        {/* Step 1 */}
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-zinc-900 text-zinc-400 border border-zinc-800">
            1
          </span>
          <span className="text-zinc-400">Enter Email</span>
        </div>

        {/* Line 1 */}
        <div className="flex-1 h-px mx-2 bg-zinc-800" />

        {/* Step 2 */}
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-[#0071E3] text-white">
            2
          </span>
          <span className="text-[#0071E3] font-bold">Enter Code</span>
        </div>

        {/* Line 2 */}
        <div className="flex-1 h-px mx-2 bg-zinc-800" />

        {/* Step 3 */}
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-zinc-900 text-zinc-400 border border-zinc-800">
            3
          </span>
          <span className="text-zinc-400">New Password</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        {/* OTP Input with Timer */}
        <div className="w-full text-left">
          <span className="text-[10px] font-mono tracking-widest text-description uppercase font-semibold block mb-1.5 px-1">
            6-Digit Email Verification Code (OTP)
          </span>
          <div className="flex gap-3 items-center w-full">
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center justify-center">
                <FiKey className="w-4 h-4" />
              </div>
              <input
                {...register('otp')}
                type="text"
                placeholder="Enter 6-digit code"
                className={`w-full bg-[#020813] text-white border ${
                  errors.otp ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-[#0071E3]'
                } rounded-lg pl-10 pr-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all duration-200`}
              />
            </div>
            <button 
              type="button" 
              onClick={() => timer === 0 && setTimer(59)}
              disabled={timer > 0}
              className={`h-11.5 w-15 border border-zinc-800 bg-[#020813] text-[#0071E3] font-mono text-xs font-bold rounded-lg flex items-center justify-center shrink-0 ${timer === 0 ? 'cursor-pointer hover:border-[#0071E3]/50' : 'cursor-default'}`}
            >
              {timer > 0 ? `${timer}s` : 'Resend'}
            </button>
          </div>
          {errors.otp && (
            <span className="text-xs text-red-500/90 mt-1.5 px-1 font-medium block">
              {errors.otp.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
          Verify & Set Password <FiArrowRight className="w-4 h-4" />
        </Button>

        {/* Back Link */}
        <Link
          href="/auth/sign-in"
          className="text-zinc-400 hover:text-white text-xs font-semibold mt-2 transition-all duration-200 select-none block text-center"
        >
          Back to Sign In
        </Link>
      </form>
    </AuthWrapper>
  )
}

export default VerifyOtpPage