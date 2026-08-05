import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type TSignInInput = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type TSignUpInput = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
})

export type TForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'Verification code must be exactly 6 digits').regex(/^\d+$/, 'Verification code must only contain numbers'),
})

export type TVerifyOtpInput = z.infer<typeof verifyOtpSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type TResetPasswordInput = z.infer<typeof resetPasswordSchema>
