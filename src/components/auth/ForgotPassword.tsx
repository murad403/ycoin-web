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

const ForgotPassword = () => {
    const router = useRouter();
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
        <AuthWrapper title="Reset Password">
            {/* Steps Indicator */}
            <StepIndicator step={1} />

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