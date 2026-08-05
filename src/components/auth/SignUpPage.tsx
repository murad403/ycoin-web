'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signUpSchema, TSignUpInput } from '@/validation/auth.validation'
import TabSwitcher from '../shared/TabSwitcher'

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TSignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: TSignUpInput) => {
        // Simulate API call
        console.log('Sign Up Data:', data)
        await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    return (
        <AuthWrapper
            title="Create Sovereign Account"
            description="Bitcoin Native Sovereign AI Platform Authentication"
        >
            {/* Tab Switcher */}
            <TabSwitcher/>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Display Name Field */}
                <Input
                    {...register('displayName')}
                    label="Display Name"
                    type="text"
                    placeholder="Satoshi Nakamoto"
                    icon={FiUser}
                    error={errors.displayName?.message}
                />

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
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
                    Verify Email & Sign Up <FiArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default SignUpPage