"use client"

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCartStore } from '@/lib/store'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verifying, setVerifying] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState<Record<string, any> | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  useEffect(() => {
    const dataParam = searchParams.get('data')
    const pidx = searchParams.get('pidx')
    const status = searchParams.get('status')
    const transaction_id = searchParams.get('transaction_id')
    const amount = searchParams.get('amount')
    const purchase_order_id = searchParams.get('purchase_order_id')

    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(dataParam))
        setPaymentInfo(decoded)
        setPaymentMethod('esewa')
        setIsSuccess(decoded.status === 'COMPLETE')
        setIsCancelled(decoded.status === 'USER_CANCELLED' || decoded.status === 'User canceled' || decoded.status === 'Cancelled')
      } catch (error) {
        setPaymentInfo({ error: 'Invalid eSewa callback data.' })
      }
      return
    }

    if (pidx) {
      setPaymentMethod('khalti')
      setVerifying(true)
      fetch('/api/khalti/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pidx }) })
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok) {
            setPaymentInfo({ error: data.error || 'Verification failed.' })
            setIsSuccess(false)
            setIsCancelled(false)
            return
          }

          setPaymentInfo(data)
          const success = data.status === 'Completed' || data.status === 'COMPLETE' || data.status === 'Success'
          setIsSuccess(success)
          setIsCancelled(data.status === 'User canceled' || data.status === 'Cancelled' || data.status === 'Canceled')
        })
        .catch(() => {
          setPaymentInfo({ error: 'Verification failed.' })
          setIsSuccess(false)
          setIsCancelled(false)
        })
        .finally(() => setVerifying(false))

      return
    }

    if (status && transaction_id) {
      setPaymentMethod('khalti')
      setPaymentInfo({ status, transaction_id, amount, purchase_order_id })
      setIsSuccess(status === 'Completed')
      setIsCancelled(status === 'User canceled')
    }
  }, [searchParams])

  useEffect(() => {
    if (isSuccess) useCartStore.getState().clearCart()
  }, [isSuccess])

  const transactionId = paymentInfo?.transaction_id || paymentInfo?.pidx || 'Unavailable'
  const displayAmount = paymentMethod === 'khalti'
    ? paymentInfo?.total_amount
      ? `NPR ${(Number(paymentInfo.total_amount) / 100).toLocaleString()}`
      : paymentInfo?.amount
        ? `NPR ${Number(paymentInfo.amount).toLocaleString()}`
        : undefined
    : paymentInfo?.amount
      ? `NPR ${Number(paymentInfo.amount).toLocaleString()}`
      : undefined

  if (verifying) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center py-16 px-4">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-10 w-10 animate-spin" />
          </div>
          <p className="text-xl font-semibold text-foreground">Verifying your payment...</p>
          <p className="mt-2 text-sm text-muted-foreground">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen py-16 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 rounded-full bg-success/20 p-5 inline-flex">
            <CheckCircle2 className="h-16 w-16" style={{ color: '#A8C5A8' }} />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Order Placed Successfully!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for shopping with Botaniq.</p>

          <Card className="mt-8 p-6">
            <div className="text-left text-sm text-muted-foreground">
              <p>Transaction ID</p>
              <p className="mt-1 text-foreground">{transactionId}</p>
            </div>
            {displayAmount && (
              <div className="mt-4 text-left text-sm text-muted-foreground">
                <p>Amount</p>
                <p className="mt-1 text-foreground">{displayAmount}</p>
              </div>
            )}
          </Card>

          <div className="mt-8 space-y-3">
            <Button onClick={() => router.push('/shop')} variant="outline" className="w-full border-border py-4 text-base font-semibold text-foreground hover:bg-muted">Continue Shopping</Button>
            <Button onClick={() => router.push('/orders')} className="w-full bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90">Track Order</Button>
          </div>
        </div>
      </div>
    )
  }

  if (isCancelled) {
    return (
      <div className="bg-background min-h-screen py-16 px-4">
        <div className="mx-auto max-w-md text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-semibold text-foreground">Payment Cancelled</h1>
          <p className="mt-2 text-muted-foreground">Your payment was cancelled. You can try again or choose another method.</p>

          <div className="mt-8 space-y-3">
            <Button onClick={() => router.push('/checkout/payment')} className="w-full bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90">Try Again</Button>
            <Button onClick={() => router.push('/cart')} variant="outline" className="w-full border-border py-4 text-base font-semibold text-foreground hover:bg-muted">Back to Cart</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <div className="mx-auto max-w-md text-center">
        <XCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-semibold text-foreground">Payment Failed</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong while verifying your payment.</p>
        <p className="mt-4 text-sm text-muted-foreground">{paymentInfo?.error || 'Please try again or choose a different payment method.'}</p>

        <div className="mt-8 space-y-3">
          <Button onClick={() => router.push('/checkout/payment')} className="w-full bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90">Try Again</Button>
          <Button onClick={() => router.push('/cart')} variant="outline" className="w-full border-border py-4 text-base font-semibold text-foreground hover:bg-muted">Back to Cart</Button>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen py-16 text-center text-muted-foreground">Processing payment result...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
