'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiLock, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { resetPasswordSchema, TResetPasswordInput } from '@/validation/auth.validation'
import StepIndicator from '../shared/StepIndicator'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'


const ResetPasswordPage = () => {
    const router = useRouter();
    const { t } = useLanguage()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: TResetPasswordInput) => {
        console.log('Reset Password Data:', data)
        router.push("/auth/sign-in");
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
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.password?.message}
                />

                {/* Confirm Password Field */}
                <Input
                    {...register('confirmPassword')}
                    label={t.auth.confirmPasswordLabel}
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.confirmPassword?.message}
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
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

export default ResetPasswordPage