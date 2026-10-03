'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, ChevronRight, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AccountSidebar } from '@/components/account-sidebar'
import { useAuthStore } from '@/lib/store'
import { orders, getProductById } from '@/lib/data'
import { formatPrice } from '@/lib/format'

export default function OrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const userOrders = orders.filter((o) => o.userId === user.id)
  const filteredOrders =
    statusFilter === 'all'
      ? userOrders
      : userOrders.filter((o) => o.status === statusFilter)

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light tracking-tight">
                  My Orders
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Track and manage your orders
                </p>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl border bg-card p-12 text-center"
              >
                <Package className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No orders found</p>
                <p className="text-muted-foreground">
                  {statusFilter === 'all'
                    ? "You haven't placed any orders yet"
                    : 'No orders match this filter'}
                </p>
                <Button className="mt-6 rounded-full" asChild>
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </motion.div>
            ) : (
              <div className="mt-8 space-y-4">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border bg-card p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-mono font-semibold">{order.id}</p>
                          <Badge
                            variant={
                              order.status === 'delivered'
                                ? 'default'
                                : 'secondary'
                            }
                            className="capitalize"
                          >
                            {order.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Placed on{' '}
                          {new Date(order.orderDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}/track`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Track Order
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      {order.items.slice(0, 3).map((item) => {
                        const product = getProductById(item.productId)
                        if (!product) return null
                        return (
                          <div
                            key={item.productId}
                            className="flex items-center gap-3"
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-secondary">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {product.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      {order.items.length > 3 && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item
                        {order.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="font-semibold">
                        Total: {formatPrice(order.total)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
