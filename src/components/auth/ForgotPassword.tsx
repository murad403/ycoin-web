'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { forgotPasswordSchema, TForgotPasswordInput } from '@/validation/auth.validation'
import { useRouter } from 'next/navigation'
import StepIndicator from '../shared/StepIndicator'
import { useLanguage } from '@/i18n/LanguageContext'

const ForgotPassword = () => {
    const router = useRouter();
    const { t } = useLanguage()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async (data: TForgotPasswordInput) => {
        console.log('Forgot Password Data:', data)
        router.push("/auth/verify-otp")
    }

    return (
        <AuthWrapper title={t.auth.forgotPasswordTitle} description={t.auth.forgotPasswordDesc}>
            {/* Steps Indicator */}
            <StepIndicator step={1} />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Email Field */}
                <Input
                    {...register('email')}
                    label={t.auth.emailLabel}
                    type="email"
                    placeholder={t.auth.emailPlaceholder}
                    icon={FiMail}
                    error={errors.email?.message}
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.sendOtpBtn} <FiArrowRight className="w-4 h-4" />
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

export default ForgotPassword