'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore, useWishlistStore, useMiniCartStore } from '@/lib/store'
import type { Product } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const openCart = useMiniCartStore((state) => state.openCart)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    openCart()
    toast.success('Added to cart', {
      description: product.name,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.info('Removed from wishlist')
    } else {
      addToWishlist(product.id)
      toast.success('Added to wishlist')
    }
  }

  const displayPrice = product.salePrice ?? product.price

  return (
    <motion.div
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/30">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          {/* Sale badge */}
          {product.salePrice && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              Sale
            </div>
          )}

          {/* Quick actions */}
          <div
            className={cn(
              "absolute right-2 top-2 sm:right-3 sm:top-3 flex flex-col gap-2 transition-opacity duration-200",
              inWishlist ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            )}
          >
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                'h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-card shadow-md transition-colors',
                inWishlist && 'bg-primary text-primary-foreground'
              )}
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} />
            </Button>
          </div>

          {/* Add to cart button */}
          <div
            className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 sm:translate-y-2 sm:group-hover:translate-y-0"
          >
            <Button
              className="w-full gap-1.5 sm:gap-2 rounded-full shadow-lg text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-foreground">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">{formatPrice(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
