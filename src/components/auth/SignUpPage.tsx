'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signUpSchema, TSignUpInput } from '@/validation/auth.validation'
import TabSwitcher from '../shared/TabSwitcher'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'
import { useSignUpMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

const SignUpPage = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false)
    const [signUp, { isLoading }] = useSignUpMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<TSignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: TSignUpInput) => {
        try {
            const formData = new FormData();
            formData.append('profile_name', data.displayName);
            formData.append('email', data.email);
            formData.append('password', data.password);

            const res = await signUp(formData).unwrap();

            toast.success(res.message || "Registration successful. Please verify your email.");
            router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}&type=signup`);
        } catch (err: any) {
            const errorMsg = err?.data?.message || err?.data?.detail || "Registration failed. Please try again.";
            toast.error(errorMsg);
        }
    }

    return (
        <AuthWrapper
            title={t.auth.signUpTitle}
            description={t.auth.signUpDesc}
        >
            {/* Tab Switcher */}
            <TabSwitcher/>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Display Name Field */}
                <Input
                    {...register('displayName')}
                    label={t.auth.fullNameLabel}
                    type="text"
                    placeholder={t.auth.fullNamePlaceholder}
                    icon={FiUser}
                    error={errors.displayName?.message}
                />

                {/* Email Field */}
                <Input
                    {...register('email')}
                    label={t.auth.emailLabel}
                    type="email"
                    placeholder={t.auth.emailPlaceholder}
                    icon={FiMail}
                    error={errors.email?.message}
                />

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

                {/* Submit Button */}
                <Button type="submit" loading={isLoading} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.signUpBtn} <FiArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default SignUpPage