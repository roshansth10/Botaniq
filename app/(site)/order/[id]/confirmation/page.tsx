'use client'

import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function OrderConfirmationPage({ params }: PageProps) {
  const { id } = use(params)

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20"
        >
          <CheckCircle className="h-10 w-10 text-success" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="mt-6 text-3xl font-light tracking-tight">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your order has been confirmed and is being processed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-xl border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-lg font-semibold">{id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="text-lg font-semibold">
                {estimatedDelivery.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Mail className="h-4 w-4" />
          <span>A confirmation email has been sent to your email address</span>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          <div className="rounded-xl border bg-card p-6 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Track Your Order</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Follow your package from our warehouse to your doorstep.
            </p>
            <Button variant="link" className="mt-2 h-auto p-0" asChild>
              <Link href={`/orders/${id}/track`}>
                Track Order
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-xl border bg-card p-6 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Shipping Info</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Learn about our shipping policies and delivery times.
            </p>
            <Button variant="link" className="mt-2 h-auto p-0" asChild>
              <Link href="/shipping">
                View Shipping Info
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button className="rounded-full" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/account/orders">View All Orders</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
