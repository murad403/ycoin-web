'use client'
import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { resetPasswordSchema, TResetPasswordInput } from '@/validation/auth.validation'
import StepIndicator from '../shared/StepIndicator'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

const ResetPasswordContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const token = searchParams.get('token') || '';

    const { register, handleSubmit, formState: { errors } } = useForm<TResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: TResetPasswordInput) => {
        if (!token) {
            toast.error("Reset token is missing or invalid.");
            return;
        }

        try {
            const res = await resetPassword({
                reset_token: token,
                new_password: data.password,
            }).unwrap();

            toast.success(res.detail || "Password reset successfully.");
            router.push("/auth/sign-in");
        } catch (err: any) {
            const errorMsg = err?.data?.message || err?.data?.detail || "Password reset failed.";
            toast.error(errorMsg);
        }
    }

    return (
        <AuthWrapper
            title={t.auth.resetPasswordTitle}
            description={t.auth.resetPasswordDesc}
        >
            {/* Steps Indicator */}
            <StepIndicator step={3} />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Password Field */}
                <Input
                    {...register('password')}
                    label={t.auth.passwordLabel}
                    type={showPassword ? "text" : "password"}
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.password?.message}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                        >
                            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    }
                />

                {/* Confirm Password Field */}
                <Input
                    {...register('confirmPassword')}
                    label={t.auth.confirmPasswordLabel}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.confirmPassword?.message}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                        >
                            {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    }
                />

                {/* Submit Button */}
                <Button type="submit" loading={isLoading} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.resetBtn} <FiArrowRight className="w-4 h-4" />
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

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}

export default ResetPasswordPage