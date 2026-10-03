"use client"

import { useState } from 'react'
import { CreditCard, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

export default function CardPayment() {
  const [cardholder, setCardholder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [showCvv, setShowCvv] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cardType, setCardType] = useState<'visa' | 'mc' | 'unknown'>('unknown')

  const total = useCartStore.getState().getTotal()

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
    setCardNumber(formatted)

    if (digits.startsWith('4')) setCardType('visa')
    else if (digits.startsWith('5')) setCardType('mc')
    else setCardType('unknown')
  }

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length <= 2) {
      setExpiryDate(digits)
      return
    }
    setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`)
  }

  const handlePay = () => {
    if (!cardholder.trim()) return toast.error('Cardholder name is required.')
    if (cardNumber.replace(/\s/g, '').length !== 16) return toast.error('Enter a valid card number.')
    if (!/^[0-1]\d\/[0-9]{2}$/.test(expiryDate)) return toast.error('Enter a valid expiry date.')
    if (!/^\d{3,4}$/.test(cvv)) return toast.error('Enter a valid CVV.')

    setIsLoading(true)
    setTimeout(() => {
      toast.info('Card payment coming soon. Please use eSewa or Khalti for now.')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="p-6 bg-card">
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-primary" size={18} />
            <span className="font-semibold text-foreground">Credit / Debit Card</span>
            <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">SSL Encrypted</span>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-lg font-bold text-foreground">NPR {total.toLocaleString()}</p>
        </div>

        <div className="space-y-5">
          <div>
            <Label htmlFor="cardholder" className="text-foreground">Cardholder Name</Label>
            <Input id="cardholder" value={cardholder} onChange={(e) => setCardholder(e.target.value)} placeholder="Name on card" className="mt-2 border-input focus-visible:ring-ring" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
              {cardType !== 'unknown' && (<span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{cardType === 'visa' ? 'VISA' : 'MC'}</span>)}
            </div>
            <div className="relative mt-2">
              <Input id="cardNumber" value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} className="border-input focus-visible:ring-ring" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="expiry" className="text-foreground">Expiry</Label>
              <Input id="expiry" value={expiryDate} onChange={(e) => handleExpiryChange(e.target.value)} placeholder="MM/YY" maxLength={5} className="mt-2 border-input focus-visible:ring-ring" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                <button type="button" onClick={() => setShowCvv(!showCvv)} className="text-muted-foreground hover:text-foreground">{showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
              <Input id="cvv" type={showCvv ? 'text' : 'password'} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" maxLength={4} className="mt-2 border-input focus-visible:ring-ring" />
            </div>
          </div>

          <Button type="button" onClick={handlePay} disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>) : `Pay NPR ${total.toLocaleString()}`}
          </Button>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>Your payment is SSL encrypted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
