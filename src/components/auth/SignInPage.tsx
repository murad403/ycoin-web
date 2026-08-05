'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signInSchema, TSignInInput } from '@/validation/auth.validation'
import TabSwitcher from '../shared/TabSwitcher'
import { useRouter } from 'next/navigation'

const SignInPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TSignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: TSignInInput) => {
        console.log('Sign In Data:', data)
        router.push("/")
    }

    return (
        <AuthWrapper
            title="Sign In to YCOIN"
            description="Bitcoin Native Sovereign AI Platform Authentication"
        >
            {/* Tab Switcher */}
           <TabSwitcher/>

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

                {/* Password Field */}
                <Input
                    {...register('password')}
                    label="Password"
                    type="password"
                    placeholder="..........."
                    icon={FiLock}
                    error={errors.password?.message}
                    rightElement={
                        <Link
                            href="/auth/forgot-password"
                            className="text-heading hover:underline font-semibold text-[11px] tracking-wide"
                        >
                            Forgot Password?
                        </Link>
                    }
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
                    Sign In <FiArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default SignInPage