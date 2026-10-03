
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useCartStore, useAuthStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import { toast } from 'sonner'

const checkoutSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().optional(),
    shippingMethod: z.enum(['standard', 'express', 'overnight']),

    paymentMethod: z.enum(['card', 'esewa', 'khalti', 'bank']),

    // Card
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
    cardName: z.string().optional(),

    // eSewa
    esewaId: z.string().optional(),

    // Khalti
    khaltiId: z.string().optional(),

    // Bank transfer
    bankName: z.string().optional(),
    bankTransactionId: z.string().optional(),

    saveAddress: z.boolean().optional(),
    sameAsBilling: z.boolean().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.paymentMethod === 'card') {
      if (!val.cardNumber || val.cardNumber.trim().length < 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardNumber'],
          message: 'Invalid card number',
        })
      }
      if (!val.cardExpiry || val.cardExpiry.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardExpiry'],
          message: 'Invalid expiry date',
        })
      }
      if (!val.cardCvc || val.cardCvc.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardCvc'],
          message: 'Invalid CVC',
        })
      }
      if (!val.cardName || val.cardName.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardName'],
          message: 'Name on card is required',
        })
      }
    }

    if (val.paymentMethod === 'esewa') {
      if (!val.esewaId || val.esewaId.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['esewaId'],
          message: 'Enter eSewa ID (demo)',
        })
      }
    }

    if (val.paymentMethod === 'khalti') {
      if (!val.khaltiId || val.khaltiId.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['khaltiId'],
          message: 'Enter Khalti phone/ID',
        })
      }
    }

    if (val.paymentMethod === 'bank') {
      if (!val.bankName || val.bankName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['bankName'],
          message: 'Enter your bank name',
        })
      }
      if (!val.bankTransactionId || val.bankTransactionId.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['bankTransactionId'],
          message: 'Enter bank transaction reference',
        })
      }
    }
  })

type CheckoutForm = z.infer<typeof checkoutSchema>

const shippingOptions = [
  { id: 'standard', name: 'Standard', time: '5-7 business days', price: 0 },
  { id: 'express', name: 'Express', time: '2-3 business days', price: 1300 },
  { id: 'overnight', name: 'Overnight', time: 'Next business day', price: 3300 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email ?? '',
      firstName: user?.name?.split(' ')[0] ?? '',
      lastName: user?.name?.split(' ').slice(1).join(' ') ?? '',
      address: user?.addresses[0]?.address ?? '',
      city: user?.addresses[0]?.city ?? '',
      postalCode: user?.addresses[0]?.postal ?? '',
      country: user?.addresses[0]?.country ?? 'United States',
      shippingMethod: 'standard',
      paymentMethod: 'card',
      sameAsBilling: true,
    },
  })

  const shippingMethod = watch('shippingMethod')
  const paymentMethod = watch('paymentMethod')
  const selectedShipping = shippingOptions.find((o) => o.id === shippingMethod)

  const subtotal = getTotal()
  const shipping = selectedShipping?.price ?? 0
  const tax = subtotal * 0.13
  const total = subtotal + shipping + tax

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = `BTQ${Date.now().toString(36).toUpperCase()}`

    const paymentLabel =
      data.paymentMethod === 'esewa'
        ? 'eSewa'
        : data.paymentMethod === 'khalti'
          ? 'Khalti'
          : data.paymentMethod === 'bank'
            ? 'Bank Transfer'
            : 'Card'

    clearCart()
    toast.success(`Order placed successfully! Paid with ${paymentLabel}`)
    router.push(`/order/${orderId}/confirmation`)
  }

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-light">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some products before checking out
          </p>
          <Button className="mt-8 rounded-full" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-light tracking-tight">Checkout</h1>
            <nav className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/cart" className="hover:text-foreground">
                Cart
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Checkout</span>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="space-y-8 lg:col-span-2">
              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Contact Information</h2>
                {!isAuthenticated && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                      Log in
                    </Link>
                  </p>
                )}
                <div className="mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      className="mt-1"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      className="mt-1"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      {...register('address')}
                      className="mt-1"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} className="mt-1" />
                    {errors.city && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      {...register('postalCode')}
                      className="mt-1"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      {...register('country')}
                      className="mt-1"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="mt-1"
                    />
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="mt-4 flex items-center gap-2">
                    <Checkbox
                      id="saveAddress"
                      {...register('saveAddress')}
                    />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>
                )}
              </motion.div>

              {/* Shipping Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="text-lg font-semibold">Shipping Method</h2>
                <RadioGroup
                  defaultValue="standard"
                  onValueChange={(value) =>
                    setValue('shippingMethod', value as typeof shippingMethod)
                  }
                  className="mt-4 space-y-3"
                >
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div>
                          <Label htmlFor={option.id} className="font-medium">
                            {option.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {option.time}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {option.price === 0 ? 'Free' : formatPrice(option.price)}
                      </span>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </h2>

                {/* Payment method selector */}
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'esewa')}
                    className={
                      paymentMethod === 'esewa'
                        ? 'rounded-lg border bg-green-50 p-4 text-left ring-2 ring-green-500/50'
                        : 'rounded-lg border bg-muted p-4 text-left hover:bg-muted/60'
                    }
                  >
                    <div className="text-sm font-semibold text-green-800">
                      eSewa
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Demo gateway
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                        GREEN
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'khalti')}
                    className={
                      paymentMethod === 'khalti'
                        ? 'rounded-lg border bg-purple-50 p-4 text-left ring-2 ring-purple-500/50'
                        : 'rounded-lg border bg-muted p-4 text-left hover:bg-muted/60'
                    }
                  >
                    <div className="text-sm font-semibold text-purple-800">
                      Khalti
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Digital wallet
                      </span>
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-[10px] font-semibold text-purple-700">
                        FAST
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'bank')}
                    className={
                      paymentMethod === 'bank'
                        ? 'rounded-lg border bg-sky-50 p-4 text-left ring-2 ring-sky-500/50'
                        : 'rounded-lg border bg-muted p-4 text-left hover:bg-muted/60'
                    }
                  >
                    <div className="text-sm font-semibold text-sky-800">
                      Bank Transfer
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Manual payment
                      </span>
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold text-sky-700">
                        REAL
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'card')}
                    className={
                      paymentMethod === 'card'
                        ? 'rounded-lg border bg-primary/5 p-4 text-left ring-2 ring-primary/30'
                        : 'rounded-lg border bg-muted p-4 text-left hover:bg-muted/60'
                    }
                  >
                    <div className="text-sm font-semibold">Card</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Pay by card
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                        SSL
                      </span>
                    </div>
                  </button>
                </div>

                {/* eSewa / Khalti / Card cards */}
                <div className="mt-5 space-y-4">
                  {paymentMethod === 'esewa' && (
                    <div className="rounded-xl border bg-gradient-to-br from-green-50 to-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-green-800">
                            eSewa
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Instant Transfer demo
                          </p>
                        </div>
                        <div className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700">
                          Secure & Safe
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <Label htmlFor="esewaId">eSewa ID</Label>
                          <Input
                            id="esewaId"
                            placeholder="Enter eSewa ID"
                            {...register('esewaId')}
                            className="mt-1 border-green-200 bg-white focus-visible:ring-green-500/30"
                          />
                          {errors.esewaId && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.esewaId.message}
                            </p>
                          )}
                        </div>

                        <div className="rounded-lg border bg-white p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-semibold">
                              {formatPrice(total)}
                            </span>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm">
                            <span className="font-medium text-green-800">
                              Instant Transfer
                            </span>
                            <span className="text-xs text-green-700">✓</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm">
                            <span className="font-medium text-green-800">
                              No Extra Charge
                            </span>
                            <span className="text-xs text-green-700">✓</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm">
                            <span className="font-medium text-green-800">
                              Secure & Safe
                            </span>
                            <span className="text-xs text-green-700">✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'khalti' && (
                    <div className="rounded-xl border bg-gradient-to-br from-purple-50 to-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-purple-800">
                            Khalti
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Fast digital wallet checkout
                          </p>
                        </div>
                        <div className="rounded-lg bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700">
                          Ready to pay
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <Label htmlFor="khaltiId">Khalti Phone / ID</Label>
                          <Input
                            id="khaltiId"
                            placeholder="Enter Khalti phone/ID"
                            {...register('khaltiId')}
                            className="mt-1 border-purple-200 bg-white focus-visible:ring-purple-500/30"
                          />
                          {errors.khaltiId && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.khaltiId.message}
                            </p>
                          )}
                        </div>

                        <div className="rounded-lg border bg-white p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-semibold">
                              {formatPrice(total)}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            You will be redirected to Khalti for payment confirmation after placing the order.
                          </p>
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm">
                            <span className="font-medium text-purple-800">
                              Instant wallet checkout
                            </span>
                            <span className="text-xs text-purple-700">✓</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm">
                            <span className="font-medium text-purple-800">
                              Secure transaction
                            </span>
                            <span className="text-xs text-purple-700">✓</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm">
                            <span className="font-medium text-purple-800">
                              Mobile verification
                            </span>
                            <span className="text-xs text-purple-700">✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="rounded-xl border bg-gradient-to-br from-sky-50 to-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-sky-800">
                            Bank Transfer
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Transfer directly to our bank account and enter the transaction reference.
                          </p>
                        </div>
                        <div className="rounded-lg bg-sky-100 px-3 py-2 text-xs font-semibold text-sky-700">
                          Real payment
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div className="rounded-lg border bg-white p-4">
                          <div className="text-sm font-semibold text-slate-900">Merchant bank details</div>
                          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <p>Bank: Nepal Investment Bank Ltd.</p>
                            <p>Account Name: Skincare E-Commerce</p>
                            <p>Account Number: 1234567890</p>
                            <p>Branch: Head Office, Kathmandu</p>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="bankName">Your Bank Name</Label>
                          <Input
                            id="bankName"
                            placeholder="e.g. Nabil Bank"
                            {...register('bankName')}
                            className="mt-1 border-sky-200 bg-white focus-visible:ring-sky-500/30"
                          />
                          {errors.bankName && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.bankName.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="bankTransactionId">Transaction Reference</Label>
                          <Input
                            id="bankTransactionId"
                            placeholder="Enter your bank transaction or deposit reference"
                            {...register('bankTransactionId')}
                            className="mt-1 border-sky-200 bg-white focus-visible:ring-sky-500/30"
                          />
                          {errors.bankTransactionId && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.bankTransactionId.message}
                            </p>
                          )}
                        </div>

                        <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
                          <p className="font-medium">Note</p>
                          <p className="mt-1">
                            Complete the transfer to the account above and provide the reference here. We will verify the payment before confirming your order.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="rounded-xl border bg-card p-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            {...register('cardNumber')}
                            className="mt-1"
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              {...register('cardExpiry')}
                              className="mt-1"
                            />
                            {errors.cardExpiry && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.cardExpiry.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input
                              id="cardCvc"
                              placeholder="123"
                              {...register('cardCvc')}
                              className="mt-1"
                            />
                            {errors.cardCvc && (
                              <p className="mt-1 text-sm text-destructive">
                                {errors.cardCvc.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            {...register('cardName')}
                            className="mt-1"
                          />
                          {errors.cardName && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.cardName.message}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="sameAsBilling"
                            defaultChecked
                            {...register('sameAsBilling')}
                          />
                          <Label htmlFor="sameAsBilling" className="text-sm">
                            Billing address same as shipping
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <div className="mt-6 max-h-64 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(
                            (item.product.salePrice ?? item.product.price) *
                            item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (13%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                </Button>

                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
