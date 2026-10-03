'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useCartStore } from '@/lib/store'
import EsewaPayment from '@/components/payment/EsewaPayment'
import KhaltiPayment from '@/components/payment/KhaltiPayment'
import CardPayment from '@/components/payment/CardPayment'

export default function PaymentPage() {
  const { getTotal } = useCartStore()
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | 'card' | null>(null)

  const total = getTotal()

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/checkout" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Checkout
          </Link>

          <p className="text-primary font-bold">Total: NPR {total.toLocaleString()}</p>
        </div>

        <h1 className="text-2xl font-semibold text-foreground">Payment Method</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSelectedMethod('esewa')}
            className={
              selectedMethod === 'esewa'
                ? 'cursor-pointer border-2 border-primary bg-secondary/20 transition-all duration-200 p-4 rounded-lg'
                : 'cursor-pointer border border-border bg-card hover:border-primary/50 transition-all duration-200 p-4 rounded-lg'
            }
          >
            <Card className="bg-transparent p-0 shadow-none">
              <div className="mb-2 flex items-center">
                <span className="bg-[#60BB46] text-white text-xs font-bold px-1.5 py-0.5 rounded mr-1">e</span>
                <span className="font-semibold text-foreground">Sewa</span>
                <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">Instant</span>
              </div>
              <p className="text-sm text-muted-foreground">Pay via eSewa wallet</p>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('khalti')}
            className={
              selectedMethod === 'khalti'
                ? 'cursor-pointer border-2 border-primary bg-secondary/20 transition-all duration-200 p-4 rounded-lg'
                : 'cursor-pointer border border-border bg-card hover:border-primary/50 transition-all duration-200 p-4 rounded-lg'
            }
          >
            <Card className="bg-transparent p-0 shadow-none">
              <div className="mb-2 flex items-center">
                <span className="bg-[#5C2D91] text-white text-xs font-bold px-1.5 py-0.5 rounded mr-1">K</span>
                <span className="font-semibold text-foreground">halti</span>
                <span className="ml-auto rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">Fast</span>
              </div>
              <p className="text-sm text-muted-foreground">Pay via Khalti wallet</p>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('card')}
            className={
              selectedMethod === 'card'
                ? 'cursor-pointer border-2 border-primary bg-secondary/20 transition-all duration-200 p-4 rounded-lg'
                : 'cursor-pointer border border-border bg-card hover:border-primary/50 transition-all duration-200 p-4 rounded-lg'
            }
          >
            <Card className="bg-transparent p-0 shadow-none">
              <div className="mb-2 flex items-center">
                <CreditCard className="text-primary mr-2" size={18} />
                <span className="font-semibold text-foreground">Credit / Debit Card</span>
                <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">SSL</span>
              </div>
              <p className="text-sm text-muted-foreground">Visa, Mastercard accepted</p>
            </Card>
          </button>
        </div>

        <motion.div
          key={selectedMethod ?? 'placeholder'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {selectedMethod === 'esewa' && <EsewaPayment />}
          {selectedMethod === 'khalti' && <KhaltiPayment />}
          {selectedMethod === 'card' && <CardPayment />}

          {!selectedMethod && (
            <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
              Select a payment method above to continue.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

