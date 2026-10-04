'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductCard } from '@/components/product-card'
import { ReviewCard } from '@/components/review-card'
import { cn } from '@/lib/utils'
import {
  getProductById,
  getProductReviews,
  products,
  type Product,
} from '@/lib/data'
import { useCartStore, useWishlistStore, useMiniCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import { toast } from 'sonner'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params)
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore()
  const openCart = useMiniCartStore((state) => state.openCart)
  const inWishlist = isInWishlist(product.id)

  const reviews = getProductReviews(product.id)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const displayPrice = product.salePrice ?? product.price

  const handleAddToCart = () => {
    addItem(product, quantity)
    openCart()
    toast.success('Added to cart', {
      description: `${quantity}x ${product.name}`,
    })
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.info('Removed from wishlist')
    } else {
      addToWishlist(product.id)
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/shop?category=${product.category}`}
            className="capitalize hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square overflow-hidden rounded-xl bg-secondary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.salePrice && (
                <Badge className="absolute left-4 top-4">Sale</Badge>
              )}
            </motion.div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative aspect-square w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-light tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold">{formatPrice(displayPrice)}</span>
              {product.salePrice && (
                <span className="text-base sm:text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {product.shortDesc}
            </p>

            {/* Skin Type Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.skinTypes.map((type) => (
                <Badge key={type} variant="secondary">
                  {type === 'All' ? 'All Skin Types' : `For ${type} Skin`}
                </Badge>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 rounded-full"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart - {formatPrice(displayPrice * quantity)}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    'rounded-full',
                    inWishlist && 'border-primary text-primary'
                  )}
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={cn('h-5 w-5', inWishlist && 'fill-current')}
                  />
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t pt-8">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>Free shipping NPR 6,500+</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-16">
          <TabsList className="w-full max-w-full overflow-x-auto flex-nowrap justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-4 sm:px-6 py-3 shrink-0 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="rounded-none border-b-2 border-transparent px-4 sm:px-6 py-3 shrink-0 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 sm:px-6 py-3 shrink-0 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div className="max-w-3xl space-y-4">
              <p className="leading-relaxed text-muted-foreground">
                {product.fullDesc}
              </p>
              <h3 className="font-semibold">Benefits</h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {product.concerns.map((concern) => (
                  <li key={concern}>Targets {concern.toLowerCase()}</li>
                ))}
              </ul>
              <h3 className="font-semibold">How to Use</h3>
              <p className="text-muted-foreground">
                Apply a small amount to clean, dry skin. Gently massage in
                upward circular motions until fully absorbed. Use morning and/or
                evening as directed.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-8">
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {product.ingredients.map((ingredient, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{ingredient.name}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {ingredient.purpose}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="max-w-3xl space-y-6">
              {reviews.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to review this product!
                  </p>
                  <Button className="mt-4" variant="outline">
                    Write a Review
                  </Button>
                </div>
              ) : (
                <>
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-light tracking-tight">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
