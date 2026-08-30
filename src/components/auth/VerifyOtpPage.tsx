'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiKey, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Button } from '../ui/button'
import { verifyOtpSchema, TVerifyOtpInput } from '@/validation/auth.validation'
import StepIndicator from '../shared/StepIndicator'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'
import {
    useSignUpVerifyEmailMutation,
    useForgotPasswordVerifyOtpMutation,
    useForgotPasswordMutation
} from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

const VerifyOtpContent = () => {
    const [timer, setTimer] = useState(46);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage()

    const email = searchParams.get('email') || '';
    const type = searchParams.get('type') || 'signup';

    const [signUpVerifyEmail, { isLoading: isVerifyingSignUp }] = useSignUpVerifyEmailMutation();
    const [forgotPasswordVerifyOtp, { isLoading: isVerifyingForgot }] = useForgotPasswordVerifyOtpMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    const isLoading = isVerifyingSignUp || isVerifyingForgot;

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const { register, handleSubmit, formState: { errors } } = useForm<TVerifyOtpInput>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: '',
        },
    })

    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Email address is missing.");
            return;
        }
        try {
            await forgotPassword({ email }).unwrap();
            toast.success("OTP resent successfully.");
            setTimer(59);
        } catch (err: any) {
            toast.error(err?.data?.message || err?.data?.detail || "Failed to resend OTP.");
        }
    }

    const onSubmit = async (data: TVerifyOtpInput) => {
        if (!email) {
            toast.error("Email address is missing.");
            return;
        }

        if (type === 'forgot') {
            try {
                const res = await forgotPasswordVerifyOtp({
                    email,
                    otp: data.otp,
                }).unwrap();

                toast.success(res.detail || "Password reset OTP verified successfully.");
                router.push(`/auth/reset-password?token=${encodeURIComponent(res.reset_token)}`);
            } catch (err: any) {
                const errorMsg = err?.data?.message || err?.data?.detail || "OTP verification failed.";
                toast.error(errorMsg);
            }
        } else {
            try {
                const res = await signUpVerifyEmail({
                    email,
                    otp: data.otp,
                }).unwrap();

                toast.success(res.detail || "Email verified successfully.");
                router.push("/auth/sign-in");
            } catch (err: any) {
                const errorMsg = err?.data?.message || err?.data?.detail || "OTP verification failed.";
                toast.error(errorMsg);
            }
        }
    }

    return (
        <AuthWrapper
            title={t.auth.verifyOtpTitle}
            description={t.auth.verifyOtpDesc}
        >
            {/* Steps Indicator */}
            <StepIndicator step={2} />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* OTP Input with Timer */}
                <div className="w-full text-left">
                    <span className="text-[10px] font-mono tracking-widest text-description uppercase font-semibold block mb-1.5 px-1">
                        {t.auth.verifyOtpTitle}
                    </span>
                    <div className="flex gap-3 items-center w-full">
                        <div className="relative flex-1 flex items-center">
                            <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center justify-center">
                                <FiKey className="w-4 h-4" />
                            </div>
                            <input
                                {...register('otp')}
                                type="text"
                                placeholder={t.auth.verifyOtpTitle}
                                className={`w-full bg-[#020813] text-white border ${errors.otp ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-[#0071E3]'
                                    } rounded-lg pl-10 pr-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all duration-200`}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => timer === 0 && handleResendOtp()}
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
                <Button type="submit" loading={isLoading} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.verifyBtn} <FiArrowRight className="w-4 h-4" />
                </Button>

                {/* Back Link */}
                <Link
                    href="/auth/sign-in"
                    className="text-zinc-400 hover:text-white text-xs font-semibold mt-2 transition-all duration-200 select-none block text-center"
                >
                    {t.auth.signInTab}
                </Link>
            </form>
        </AuthWrapper>
    )
}

const VerifyOtpPage = () => {
    return (
        <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
            <VerifyOtpContent />
        </Suspense>
    )
}

export default VerifyOtpPage