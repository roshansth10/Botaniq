'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Package,
  Truck,
  Home,
  CheckCircle,
  Clock,
  ArrowLeft,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getOrderById, getProductById } from '@/lib/data'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

const statusSteps = [
  { key: 'Order Placed', icon: Package, label: 'Order Placed' },
  { key: 'Processing', icon: Clock, label: 'Processing' },
  { key: 'Shipped', icon: Truck, label: 'Shipped' },
  { key: 'Out for Delivery', icon: MapPin, label: 'Out for Delivery' },
  { key: 'Delivered', icon: Home, label: 'Delivered' },
]

export default function OrderTrackingPage({ params }: PageProps) {
  const { id } = use(params)
  const order = getOrderById(id)

  // Demo order for non-existing IDs
  const demoOrder = {
    id,
    orderDate: new Date().toISOString().split('T')[0],
    status: 'shipped' as const,
    items: [{ productId: '1', quantity: 1, price: 45 }],
    total: 45,
    shippingAddress: {
      name: 'Demo User',
      address: '123 Demo Street',
      city: 'San Francisco',
      postal: '94102',
      country: 'United States',
    },
    trackingNumber: 'BTQ1234567890',
    timeline: [
      { status: 'Order Placed', date: 'Today 9:00 AM', details: 'Order received' },
      { status: 'Processing', date: 'Today 2:00 PM', details: 'Being prepared' },
      { status: 'Shipped', date: 'Today 5:00 PM', details: 'Package shipped' },
    ],
  }

  const displayOrder = order || demoOrder
  const currentStepIndex = statusSteps.findIndex(
    (step) =>
      displayOrder.timeline[displayOrder.timeline.length - 1]?.status === step.key
  )

  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-light tracking-tight">Track Order</h1>
            <p className="mt-1 text-muted-foreground">Order #{displayOrder.id}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="text-lg font-semibold capitalize">
                {displayOrder.timeline[displayOrder.timeline.length - 1]?.status}
              </p>
            </div>
            {displayOrder.trackingNumber && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-mono text-lg font-semibold">
                  {displayOrder.trackingNumber}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative mt-8">
            {/* Desktop Timeline */}
            <div className="hidden sm:block">
              <div className="flex justify-between">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex

                  return (
                    <div
                      key={step.key}
                      className="flex flex-1 flex-col items-center"
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                          isCompleted
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted bg-card text-muted-foreground'
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <p
                        className={cn(
                          'mt-2 text-center text-sm',
                          isCurrent
                            ? 'font-semibold text-foreground'
                            : isCompleted
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        )}
                      >
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>
              {/* Progress Line */}
              <div className="absolute left-0 right-0 top-5 -z-10 h-0.5 bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="space-y-4 sm:hidden">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex

                return (
                  <div key={step.key} className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2',
                        isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted bg-card text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <p
                      className={cn(
                        'text-sm',
                        isCurrent
                          ? 'font-semibold text-foreground'
                          : isCompleted
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Timeline Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-xl border bg-card p-6"
        >
          <h2 className="text-lg font-semibold">Shipment Updates</h2>
          <div className="mt-4 space-y-4">
            {[...displayOrder.timeline].reverse().map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-3 w-3 rounded-full',
                      index === 0 ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                  {index < displayOrder.timeline.length - 1 && (
                    <div className="h-full w-0.5 bg-muted" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="font-medium">{event.status}</p>
                  <p className="text-sm text-muted-foreground">{event.details}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Details */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border bg-card p-6"
          >
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {displayOrder.shippingAddress.name}
              </p>
              <p>{displayOrder.shippingAddress.address}</p>
              <p>
                {displayOrder.shippingAddress.city},{' '}
                {displayOrder.shippingAddress.postal}
              </p>
              <p>{displayOrder.shippingAddress.country}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border bg-card p-6"
          >
            <h2 className="text-lg font-semibold">Order Items</h2>
            <div className="mt-4 space-y-3">
              {displayOrder.items.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null
                return (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-secondary">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/contact">Need Help? Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
