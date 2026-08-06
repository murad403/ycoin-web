'use client'
import React, { useState } from 'react'
import { FiX,FiUser,FiLock,FiCamera,FiUpload,FiMail,FiCheckCircle,FiSave,FiKey } from 'react-icons/fi'

interface ProfileAndSecurityModalProps {
    isOpen: boolean
    onClose: () => void
}

const ProfileAndSecurityModal: React.FC<ProfileAndSecurityModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
    const [fullName, setFullName] = useState('Zxcv...4x5y')
    const [email, setEmail] = useState('sovereign.staker@ycoin.ai')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [statusMessage, setStatusMessage] = useState<string | null>(null)

    if (!isOpen) return null

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        setStatusMessage('Profile changes saved successfully!')
        setTimeout(() => setStatusMessage(null), 3000)
    }

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword && newPassword === confirmPassword) {
            setStatusMessage('Password updated successfully!')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setTimeout(() => setStatusMessage(null), 3000)
        } else if (newPassword !== confirmPassword) {
            setStatusMessage('Passwords do not match.')
            setTimeout(() => setStatusMessage(null), 3000)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Modal Card Box */}
            <div className="relative w-full max-w-lg bg-[#040B16] border border-border-color rounded-3xl p-6 shadow-2xl space-y-6 text-white overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-thin">
                {/* Top Header Row: User Info & Close Button */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        {/* Avatar Letter Badge */}
                        <div className="w-12 h-12 rounded-2xl bg-button-color text-white font-black text-xl flex items-center justify-center shadow-md shadow-button-color/30 shrink-0">
                            Z
                        </div>

                        {/* User Title Details */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-white leading-tight">
                                    {fullName}
                                </span>
                                <span className="bg-button-color/10 border border-button-color/30 text-button-color text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    FREE TIER
                                </span>
                            </div>
                            <span className="text-xs text-description font-medium mt-0.5">
                                {email}
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
                        <span>Profile Details & Photo</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('security')}
                        className={`text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer pb-1 -mb-3.5 ${activeTab === 'security'
                                ? 'text-button-color border-b-2 border-button-color'
                                : 'text-description hover:text-white'
                            }`}
                    >
                        <FiLock className="w-4 h-4" />
                        <span>Security & Password</span>
                    </button>
                </div>

                {/* Feedback Alert Toast */}
                {statusMessage && (
                    <div className="bg-button-color/10 border border-button-color/30 text-button-color text-xs font-semibold px-4 py-2.5 rounded-xl animate-in fade-in">
                        {statusMessage}
                    </div>
                )}

                {/* TAB 1: PROFILE DETAILS & PHOTO */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        {/* Image Upload Drag Zone */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiCamera className="w-3.5 h-3.5 text-button-color" />
                                <span>Profile Picture / Image Upload</span>
                            </div>

                            <div className="border border-dashed border-border-color hover:border-button-color/60 bg-[#020813] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-button-color/10 border border-button-color/30 flex items-center justify-center text-button-color mb-3 group-hover:scale-110 transition-transform">
                                    <FiUpload className="w-4 h-4" />
                                </div>
                                <span className="text-white text-xs font-bold">
                                    Click or Drag & Drop an image file
                                </span>
                                <span className="text-description text-[10px] mt-1 font-medium">
                                    PNG, JPG, WebP, GIF or SVG (max 5MB)
                                </span>
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiUser className="w-3.5 h-3.5 text-button-color" />
                                <span>Full Name</span>
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
                                    <span>Email Address</span>
                                </label>
                                <span className="text-[10px] font-bold text-button-color flex items-center gap-1">
                                    <FiCheckCircle className="w-3 h-3" /> Verified
                                </span>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors font-medium"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-button-color/20 active:scale-[0.99]"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>Save Profile Changes</span>
                        </button>
                    </form>
                )}

                {/* TAB 2: SECURITY & PASSWORD */}
                {activeTab === 'security' && (
                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                        {/* Current Password */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiKey className="w-3.5 h-3.5 text-button-color" />
                                <span>Current Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                            />
                        </div>

                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiLock className="w-3.5 h-3.5 text-button-color" />
                                <span>New Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-semibold text-description">
                                <FiLock className="w-3.5 h-3.5 text-button-color" />
                                <span>Confirm New Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-[#020813] border border-border-color focus:border-button-color text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-zinc-600 font-medium"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-button-color hover:bg-button-color/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-button-color/20 active:scale-[0.99]"
                        >
                            <FiLock className="w-4 h-4" />
                            <span>Update Password</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProfileAndSecurityModal