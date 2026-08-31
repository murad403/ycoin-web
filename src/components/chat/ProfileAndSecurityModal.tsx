'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FiX, FiUser, FiLock, FiCamera, FiUpload, FiMail, FiCheckCircle, FiSave, FiKey, FiEye, FiEyeOff } from 'react-icons/fi'
import { useLanguage } from '@/i18n/LanguageContext'
import { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from '@/redux/features/auth/auth.api'
import { toast } from 'sonner'

interface ProfileAndSecurityModalProps {
    isOpen: boolean
    onClose: () => void
}

const ProfileAndSecurityModal: React.FC<ProfileAndSecurityModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

    // Profile state
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    // Password state & visibility toggles
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // API hooks
    const { data: profileData } = useGetProfileQuery(undefined, { skip: !isOpen })
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()

    useEffect(() => {
        if (profileData) {
            setFullName(profileData.profile_name || '')
            setEmail(profileData.email || '')
            if (profileData.avatar) {
                setAvatarPreview(profileData.avatar)
            }
        }
    }, [profileData])

    if (!isOpen) return null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('profile_name', fullName)
            if (selectedFile) {
                formData.append('avatar', selectedFile)
            }

            await updateProfile(formData).unwrap();
            toast.success("Profile updated successfully!");
            onClose();
        } catch (err: any) {
            const errorMsg = err?.data?.message || err?.data?.detail || "Failed to update profile."
            toast.error(errorMsg)
        }
    }

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentPassword) {
            toast.error("Please enter your current password.")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.")
            return
        }

        try {
            const res = await changePassword({
                current_password: currentPassword,
                new_password: newPassword,
            }).unwrap()

            toast.success(res.detail || "Your password has been changed successfully.")
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            onClose();
        } catch (err: any) {
            let errorMsg = err?.data?.message || err?.data?.detail
            if (err?.data?.errors?.new_password) {
                const passErrors = err.data.errors.new_password
                errorMsg = Array.isArray(passErrors) ? passErrors.join(' ') : passErrors
            } else if (err?.data?.errors?.current_password) {
                const currErrors = err.data.errors.current_password
                errorMsg = Array.isArray(currErrors) ? currErrors.join(' ') : currErrors
            }
            toast.error(errorMsg || "Failed to change password.")
        }
    }

    const initialLetter = fullName ? fullName.charAt(0).toUpperCase() : (profileData?.profile_name?.charAt(0).toUpperCase() || 'U')

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Modal Card Box */}
            <div className="relative w-full max-w-lg bg-[#040B16] border border-border-color rounded-3xl p-6 shadow-2xl space-y-6 text-white overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-thin">
                {/* Top Header Row: User Info & Close Button */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        {/* Avatar Image / Letter Badge */}
                        {avatarPreview ? (
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-button-color/40 shadow-md shrink-0 relative">
                                <img
                                    src={avatarPreview}
                                    alt="Profile Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-2xl bg-button-color text-white font-black text-xl flex items-center justify-center shadow-md shadow-button-color/30 shrink-0">
                                {initialLetter}
                            </div>
                        )}

                        {/* User Title Details */}
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-white leading-tight">
                                    {fullName || profileData?.profile_name || 'User'}
                                </span>
                                <span className="bg-button-color/10 border border-button-color/30 text-button-color text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    {t.profileModal.freeTier}
                                </span>
                            </div>
                            <span className="text-xs text-description font-medium mt-0.5">
                                {email || profileData?.email || ''}
                            </span>
                        </div>
                    </div>

                    {/* Close Modal Button */}
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        title="Close Modal"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Tab Selection Row */}
                <div className="flex items-center gap-6 border-b border-border-color pb-3">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer pb-1 -mb-3.5 ${activeTab === 'profile'
                            ? 'text-button-color border-b-2 border-button-color'
                            : 'text-description hover:text-white'
                            }`}
                    >
                        <FiUser className="w-4 h-4" />
                        <span>{t.profileModal.tabProfile}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('security')}
                        className={`text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer pb-1 -mb-3.5 ${activeTab === 'security'
                            ? 'text-button-color border-b-2 border-button-color'
                            : 'text-description hover:text-white'
                            }`}
                    >
                        <FiLock className="w-4 h-4" />
                        <span>{t.profileModal.tabSecurity}</span>
                    </button>
                </div>

                {/* TAB 1: PROFILE DETAILS & PHOTO */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Image Upload Drag Zone */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiCamera className="w-3.5 h-3.5 text-button-color" />
                                <span>{t.profileModal.uploadTitle}</span>
                            </div>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border border-dashed border-border-color hover:border-button-color/60 bg-[#020813] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-button-color/10 border border-button-color/30 flex items-center justify-center text-button-color mb-3 group-hover:scale-110 transition-transform">
                                    <FiUpload className="w-4 h-4" />
                                </div>
                                <span className="text-white text-xs font-bold">
                                    {selectedFile ? selectedFile.name : t.profileModal.uploadPrompt}
                                </span>
                                <span className="text-description text-[10px] mt-1 font-medium">
                                    {t.profileModal.uploadSpecs}
                                </span>
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiUser className="w-3.5 h-3.5 text-button-color" />
                                <span>{t.profileModal.fullName}</span>
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors font-medium"
                            />
                        </div>

                        {/* Email Address Input */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                    <FiMail className="w-3.5 h-3.5 text-button-color" />
                                    <span>{t.profileModal.emailAddress}</span>
                                </label>
                                <span className="text-[10px] font-bold text-button-color flex items-center gap-1">
                                    <FiCheckCircle className="w-3 h-3" /> {t.profileModal.verified}
                                </span>
                            </div>
                            <input
                                type="email"
                                value={email}
                                disabled
                                readOnly
                                className="w-full bg-[#020813]/60 border border-border-color/50 text-zinc-400 cursor-not-allowed text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none font-medium"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isUpdatingProfile}
                            className="w-full py-3 bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-button-color/20 active:scale-[0.99] disabled:opacity-50"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>{isUpdatingProfile ? "Saving..." : t.profileModal.saveProfile}</span>
                        </button>
                    </form>
                )}

                {/* TAB 2: SECURITY & PASSWORD */}
                {activeTab === 'security' && (
                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                        {/* Current Password */}
                        <div className="space-y-1.5 text-left">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiKey className="w-3.5 h-3.5 text-button-color" />
                                <span>{t.profileModal.currentPassword}</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder={t.profileModal.currentPassword}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showCurrentPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-1.5 text-left">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiLock className="w-3.5 h-3.5 text-button-color" />
                                <span>{t.profileModal.newPassword}</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder={t.profileModal.newPassword}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-1.5 text-left">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiLock className="w-3.5 h-3.5 text-button-color" />
                                <span>{t.profileModal.confirmPassword}</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t.profileModal.confirmPassword}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isChangingPassword}
                            className="w-full py-3 bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-button-color/20 active:scale-[0.99] disabled:opacity-50"
                        >
                            <FiLock className="w-4 h-4" />
                            <span>{isChangingPassword ? "Updating..." : t.profileModal.updatePassword}</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProfileAndSecurityModal