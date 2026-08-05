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


const ResetPasswordPage = () => {
    const router = useRouter();
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
            title="Reset Password"
            description="Code verified! Please enter your new account password below."
        >
            {/* Steps Indicator */}
            <StepIndicator step={3} />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Password Field */}
                <Input
                    {...register('password')}
                    label="Password"
                    type="password"
                    placeholder="..........."
                    icon={FiLock}
                    error={errors.password?.message}
                />

                {/* Confirm Password Field */}
                <Input
                    {...register('confirmPassword')}
                    label="Confirm Password"
                    type="password"
                    placeholder="..........."
                    icon={FiLock}
                    error={errors.confirmPassword?.message}
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
                    Verify & Reset Password <FiArrowRight className="w-4 h-4" />
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

export default ResetPasswordPage