'use client'

import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { forgotPasswordSchema, TForgotPasswordInput } from '@/validation/auth.validation'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: TForgotPasswordInput) => {
    console.log('Forgot Password Data:', data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // In real app, we would redirect to verify-otp page
  }

  return (
    <AuthWrapper title="Reset Password">
      {/* Steps Indicator */}
      <div className="flex items-center justify-between w-full text-[9px] font-mono tracking-wider mb-6 px-1">
        {/* Step 1 */}
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-[#0071E3] text-white">
            1
          </span>
          <span className="text-[#0071E3] font-bold">Enter Email</span>
        </div>

        {/* Line 1 */}
        <div className="flex-1 h-px mx-2 bg-zinc-800" />

        {/* Step 2 */}
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold bg-zinc-900 text-zinc-400 border border-zinc-800">
            2
          </span>
          <span className="text-zinc-400">Enter Code</span>
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
        {/* Email Field */}
        <Input
          {...register('email')}
          label="Email Address"
          type="email"
          placeholder="your.email@domain.com"
          icon={FiMail}
          error={errors.email?.message}
        />

        {/* Submit Button */}
        <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
          Send Verification Code <FiArrowRight className="w-4 h-4" />
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

export default ForgotPassword