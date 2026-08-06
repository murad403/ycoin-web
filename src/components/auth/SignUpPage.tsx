'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import AuthWrapper from '../wrapper/AuthWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signUpSchema, TSignUpInput } from '@/validation/auth.validation'
import TabSwitcher from '../shared/TabSwitcher'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext'

const SignUpPage = () => {
    const router = useRouter();
    const { t } = useLanguage()
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
        router.push("/auth/verify-otp")
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
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.password?.message}
                />

                {/* Submit Button */}
                <Button type="submit" loading={isSubmitting} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.signUpBtn} <FiArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default SignUpPage