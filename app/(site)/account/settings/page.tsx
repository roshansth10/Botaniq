'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AccountSidebar } from '@/components/account-sidebar'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, updateProfile } = useAuthStore()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: '',
    },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const onProfileSubmit = async (data: ProfileForm) => {
    setIsSavingProfile(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateProfile({ name: data.name, email: data.email })
    setIsSavingProfile(false)
    toast.success('Profile updated successfully')
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    setIsSavingPassword(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSavingPassword(false)
    passwordForm.reset()
    toast.success('Password updated successfully')
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1">
            <h1 className="text-3xl font-light tracking-tight">Settings</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your account settings and preferences
            </p>

            <div className="mt-8 space-y-8">
              {/* Profile Picture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Profile Picture</h2>
                <div className="mt-4 flex items-center gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-full bg-secondary">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Upload New Photo
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Profile Information</h2>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="mt-4 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        className="mt-1"
                        {...profileForm.register('name')}
                      />
                      {profileForm.formState.errors.name && (
                        <p className="mt-1 text-sm text-destructive">
                          {profileForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="mt-1"
                        {...profileForm.register('email')}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-destructive">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-1"
                      {...profileForm.register('phone')}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSavingProfile}
                    className="rounded-full"
                  >
                    {isSavingProfile ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </motion.div>

              {/* Change Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Change Password</h2>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="mt-1"
                      {...passwordForm.register('currentPassword')}
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1 text-sm text-destructive">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="mt-1"
                        {...passwordForm.register('newPassword')}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="mt-1 text-sm text-destructive">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="mt-1"
                        {...passwordForm.register('confirmPassword')}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-destructive">
                          {passwordForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSavingPassword}
                    className="rounded-full"
                  >
                    {isSavingPassword ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
