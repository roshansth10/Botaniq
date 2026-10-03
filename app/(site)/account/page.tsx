'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  Heart,
  MapPin,
  User,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AccountSidebar } from '@/components/account-sidebar'
import { useAuthStore } from '@/lib/store'
import { orders, products } from '@/lib/data'
import { formatPrice } from '@/lib/format'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const userOrders = orders.filter((o) => o.userId === user.id).slice(0, 5)

  const stats = [
    {
      label: 'Total Orders',
      value: userOrders.length,
      icon: Package,
    },
    {
      label: 'Active Orders',
      value: userOrders.filter((o) => o.status !== 'delivered').length,
      icon: ShoppingBag,
    },
    {
      label: 'Wishlist Items',
      value: user.wishlist.length,
      icon: Heart,
    },
    {
      label: 'Saved Addresses',
      value: user.addresses.length,
      icon: MapPin,
    },
  ]

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-light tracking-tight">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage your orders, wishlist, and account settings
              </p>
            </motion.div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border bg-card p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <Button variant="link" asChild>
                  <Link href="/account/orders">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {userOrders.length === 0 ? (
                <div className="mt-4 rounded-xl border bg-card p-8 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 font-medium">No orders yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start shopping to see your orders here
                  </p>
                  <Button className="mt-4 rounded-full" asChild>
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-4 overflow-hidden rounded-xl border bg-card">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium">
                          Order
                        </th>
                        <th className="hidden px-6 py-3 text-left text-sm font-medium sm:table-cell">
                          Date
                        </th>
                        <th className="hidden px-6 py-3 text-left text-sm font-medium md:table-cell">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {userOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={`/orders/${order.id}/track`}
                              className="font-mono text-sm font-medium text-primary hover:underline"
                            >
                              {order.id}
                            </Link>
                          </td>
                          <td className="hidden px-6 py-4 text-sm text-muted-foreground sm:table-cell">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="hidden px-6 py-4 text-sm md:table-cell">
                            {order.items.length} items
                          </td>
                          <td className="px-6 py-4">
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
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            {formatPrice(order.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
