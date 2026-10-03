"use client"

import { useRef, useState } from 'react'
import CryptoJS from 'crypto-js'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/lib/store'

const ESEWA_MERCHANT_CODE = 'EPAYTEST'
const ESEWA_SECRET_KEY = '8gBm/:&EnhH.1/q'
const ESEWA_PAYMENT_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'

function generateSignature(totalAmount: number, uuid: string) {
  const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=${ESEWA_MERCHANT_CODE}`
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, ESEWA_SECRET_KEY))
}

export default function EsewaPayment() {
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const total = useCartStore.getState().getTotal()

  const handleSubmit = () => {
    setIsLoading(true)
    const uuid = crypto.randomUUID()
    const signature = generateSignature(total, uuid)

    if (!formRef.current) return

    // clear and set hidden fields
    formRef.current.innerHTML = ''

    const fields: Record<string, string> = {
      amount: String(total),
      tax_amount: '0',
      total_amount: String(total),
      transaction_uuid: uuid,
      product_code: ESEWA_MERCHANT_CODE,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: 'http://localhost:3000/payment/success',
      failure_url: 'http://localhost:3000/payment/failure',
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature,
    }

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      formRef.current?.appendChild(input)
    })

    formRef.current.submit()
  }

  return (
    <Card className="p-6 bg-card">
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#60BB46] text-white text-xs font-bold px-1.5 py-0.5 rounded mr-1">e</span>
            <span className="font-semibold text-foreground">Sewa</span>
          </div>
          <div className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">Secure & Safe</div>
        </div>

        <div className="border-t border-border my-3" />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-lg font-bold text-foreground">NPR {total.toLocaleString()}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-green-500 mr-2 shrink-0" size={14} />
            Instant Transfer
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-green-500 mr-2 shrink-0" size={14} />
            No Extra Charges
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="text-green-500 mr-2 shrink-0" size={14} />
            Secure & Safe
          </div>
        </div>

        <Button type="button" onClick={handleSubmit} disabled={isLoading} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay with eSewa'
          )}
        </Button>

        <form ref={formRef} action={ESEWA_PAYMENT_URL} method="POST" className="hidden" />

        <p className="mt-4 text-xs text-muted-foreground">You will be redirected to eSewa to complete your payment.</p>
      </CardContent>
    </Card>
  )
}
