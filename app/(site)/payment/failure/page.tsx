"use client"

import { useRouter } from 'next/navigation'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function PaymentFailurePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center">
        <XCircle size={64} className="text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-foreground">Payment Failed</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong. Your cart is still saved.</p>

        <div className="mt-8 space-y-3">
          <Button onClick={() => router.push('/checkout/payment')} className="w-full bg-primary text-primary-foreground">Try Again</Button>
          <Button onClick={() => router.push('/cart')} variant="outline" className="w-full border-border">Back to Cart</Button>
        </div>
      </div>
    </div>
  )
}
