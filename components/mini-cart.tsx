'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore, useMiniCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'

export function MiniCart() {
  const { isOpen, closeCart } = useMiniCartStore()
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const subtotal = getTotal()
  const freeShippingThreshold = 6500
  const remainingForFreeShipping = freeShippingThreshold - subtotal

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-card shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <Button variant="ghost" size="icon" onClick={closeCart}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
                  <div className="rounded-full bg-secondary p-6">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-center text-sm text-muted-foreground">
                    Add some botanical goodies to your cart
                  </p>
                  <Button onClick={closeCart} asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {/* Free shipping progress */}
                  {remainingForFreeShipping > 0 && (
                    <div className="border-b px-6 py-3">
                      <p className="text-sm text-muted-foreground">
                        Add{' '}
                        <span className="font-medium text-foreground">
                          {formatPrice(remainingForFreeShipping)}
                        </span>{' '}
                        more for free shipping
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${Math.min(
                              (subtotal / freeShippingThreshold) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Cart items */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                  {item.product.brand}
                                </p>
                                <p className="text-sm font-medium">
                                  {item.product.name}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="font-medium">
                                {formatPrice(
                                  (item.product.salePrice ?? item.product.price) *
                                  item.quantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t p-6">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Shipping and taxes calculated at checkout
                    </p>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full" asChild onClick={closeCart}>
                        <Link href="/checkout">Checkout</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={closeCart}
                      >
                        <Link href="/cart">View Cart</Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
