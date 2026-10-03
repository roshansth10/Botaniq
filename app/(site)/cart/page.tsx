'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/product-card'
import { useCartStore } from '@/lib/store'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/format'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal >= 6500 ? 0 : 500
  const tax = subtotal * 0.13
  const total = subtotal + shipping + tax

  const suggestedProducts = products
    .filter((p) => !items.some((item) => item.product.id === p.id))
    .slice(0, 3)

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-light">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven&apos;t added any products yet.
            </p>
            <Button className="mt-8 rounded-full" asChild>
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Suggestions */}
          <div className="mt-20">
            <h2 className="text-xl font-light">You might like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight">Shopping Cart</h1>
        <p className="mt-1 text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y rounded-xl border bg-card">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 p-4 sm:p-6"
                >
                  <Link
                    href={`/product/${item.product.id}`}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-28 sm:w-28"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                          {item.product.brand}
                        </p>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="text-sm sm:text-base font-medium hover:text-primary line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm sm:text-base font-semibold">
                        {formatPrice(
                          (item.product.salePrice ?? item.product.price) *
                          item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (13%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <div className="mt-6">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="mt-2 flex gap-2">
                  <Input placeholder="Enter code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Free shipping progress */}
              {subtotal < 6500 && (
                <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm">
                    Add{' '}
                    <span className="font-medium">
                      {formatPrice(6500 - subtotal)}
                    </span>{' '}
                    more for free shipping
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(subtotal / 6500) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <Button className="mt-6 w-full rounded-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button
                variant="link"
                className="mt-2 w-full text-muted-foreground"
                asChild
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Complete Your Routine */}
        <section className="mt-20">
          <h2 className="text-2xl font-light">Complete Your Routine</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
