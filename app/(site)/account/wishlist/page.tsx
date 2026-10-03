'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { AccountSidebar } from '@/components/account-sidebar'
import { useAuthStore, useWishlistStore } from '@/lib/store'
import { getProductById } from '@/lib/data'

export default function WishlistPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { items, clearWishlist } = useWishlistStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const wishlistProducts = items
    .map((id) => getProductById(id))
    .filter(Boolean)

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light tracking-tight">
                  My Wishlist
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {items.length} saved item{items.length !== 1 ? 's' : ''}
                </p>
              </div>
              {items.length > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
              )}
            </div>

            {wishlistProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl border bg-card p-12 text-center"
              >
                <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">
                  Your wishlist is empty
                </p>
                <p className="text-muted-foreground">
                  Save items you love by clicking the heart icon
                </p>
                <Button className="mt-6 rounded-full" asChild>
                  <Link href="/shop">Explore Products</Link>
                </Button>
              </motion.div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product!.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product!} />
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
