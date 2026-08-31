import baseApi from "@/redux/api/api";
import {
  TSignUpRequest,
  TSignUpResponse,
  TSignUpVerifyEmailRequest,
  TSignUpVerifyEmailResponse,
  TSignInRequest,
  TSignInResponse,
  TForgotPasswordRequest,
  TForgotPasswordResponse,
  TForgotPasswordVerifyOtpRequest,
  TForgotPasswordVerifyOtpResponse,
  TResetPasswordRequest,
  TResetPasswordResponse,
} from "./auth.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<TSignUpResponse, FormData | TSignUpRequest>({
      query: (data) => ({
        url: `/auth/register/`,
        method: "POST",
        body: data,
      }),
    }),
    signUpVerifyEmail: builder.mutation<TSignUpVerifyEmailResponse, TSignUpVerifyEmailRequest>({
      query: (data) => ({
        url: `/auth/register/verify-email/`,
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation<TSignInResponse, TSignInRequest>({
      query: (data) => ({
        url: `/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
      query: (data) => ({
        url: `/auth/password-reset/request-otp/`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordVerifyOtp: builder.mutation<TForgotPasswordVerifyOtpResponse, TForgotPasswordVerifyOtpRequest>({
      query: (data) => ({
        url: `/auth/password-reset/verify-otp/`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
      query: (data) => ({
        url: `/auth/password-reset/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignUpVerifyEmailMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useForgotPasswordVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;