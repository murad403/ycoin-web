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
import { useLanguage } from '@/i18n/LanguageContext'
import { useSignInMutation } from '@/redux/features/auth/auth.api'
import { saveToken } from '@/lib/auth'
import { toast } from 'sonner'

const SignInPage = () => {
    const router = useRouter();
    const { t } = useLanguage()
    const [signIn, { isLoading }] = useSignInMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<TSignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: TSignInInput) => {
        try {
            const res = await signIn({
                email: data.email,
                password: data.password,
            }).unwrap();

            if (res.access && res.refresh) {
                await saveToken(res.access, res.refresh);
            }

            toast.success(res.message || "Login successful.");
            router.push("/new-chat");
        } catch (err: any) {
            const errorMsg = err?.data?.message || err?.data?.detail || "Invalid email or password.";
            toast.error(errorMsg);
        }
    }

    return (
        <AuthWrapper
            title={t.auth.signInTitle}
            description={t.auth.signInDesc}
        >
            {/* Tab Switcher */}
           <TabSwitcher/>

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

                {/* Password Field */}
                <Input
                    {...register('password')}
                    label={t.auth.passwordLabel}
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    icon={FiLock}
                    error={errors.password?.message}
                    rightElement={
                        <Link
                            href="/auth/forgot-password"
                            className="text-heading hover:underline font-semibold text-[11px] tracking-wide"
                        >
                            {t.auth.forgotPassword}
                        </Link>
                    }
                />

                {/* Submit Button */}
                <Button type="submit" loading={isLoading} className="mt-2 flex items-center justify-center gap-2">
                    {t.auth.signInBtn} <FiArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default SignInPage