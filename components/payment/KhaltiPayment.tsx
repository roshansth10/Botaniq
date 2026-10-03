"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/lib/store'

export default function KhaltiPayment() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const total = useCartStore.getState().getTotal()

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)

    const orderId = `SKN-${Date.now()}`

    try {
      const res = await fetch('/api/khalti/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, purchase_order_id: orderId, purchase_order_name: 'Skincare Products - Botaniq' }),
      })

      if (!res.ok) {
        setError('Payment initiation failed. Please try again.')
        setIsLoading(false)
        return
      }

      const data = await res.json()
      const payment_url = data?.payment_url || data?.paymentUrl || data?.checkout_url
      if (!payment_url) {
        setError('Payment initiation failed. Please try again.')
        setIsLoading(false)
        return
      }

      window.location.href = payment_url
    } catch (err) {
      setError('Payment initiation failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card">
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#5C2D91] text-white text-xs font-bold px-1.5 py-0.5 rounded">K</span>
            <span className="font-semibold text-foreground">halti</span>
          </div>
          <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">Fast & Secure</span>
        </div>

        <div className="border-t border-border my-3" />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-lg font-bold text-foreground">NPR {total.toLocaleString()}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-purple-500 mr-2 shrink-0" size={14} />
            Instant Transfer
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-purple-500 mr-2 shrink-0" size={14} />
            No Extra Charges
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-purple-500 mr-2 shrink-0" size={14} />
            Fast & Secure
          </div>
        </div>

        {error && (
          <div className="mt-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <Button type="button" onClick={handlePayment} disabled={isLoading} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirecting...
            </>
          ) : (
            'Pay with Khalti'
          )}
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">You will be redirected to Khalti to complete your payment.</p>
      </CardContent>
    </Card>
  )
}
