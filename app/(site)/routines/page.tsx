'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sun,
  Moon,
  Calendar,
  ShieldCheck,
  Leaf,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product-card'
import { routines, getProductById, skinTypes } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import { useCartStore, useMiniCartStore } from '@/lib/store'
import { toast } from 'sonner'

const routineIcons = {
  morning: Sun,
  evening: Moon,
  weekly: Calendar,
}

const routineStepLabels: Record<string, string[]> = {
  morning: ['Cleanse', 'Tone', 'Hydrate', 'Moisturize', 'Protect'],
  evening: ['First Cleanse', 'Second Cleanse', 'Prep', 'Treat', 'Repair'],
  weekly: ['Detox', 'Deep Hydrate', 'Seal Moisture'],
}

export default function RoutinesPage() {
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useMiniCartStore((state) => state.openCart)

  const handleAddRoutineToCart = (routineName: string, productIds: string[]) => {
    let addedCount = 0
    productIds.forEach((id) => {
      const product = getProductById(id)
      if (product) {
        addItem(product, 1)
        addedCount++
      }
    })
    openCart()
    toast.success(`Added ${routineName} Routine to cart!`, {
      description: `${addedCount} botanical products added to your bundle.`,
    })
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Curated Skincare Rituals
          </Badge>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Build Your Daily Ritual
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Science-backed routines crafted from pure botanical ingredients. Transform your everyday care into a moment of mindful renewal.
          </p>
        </motion.div>

        {/* Quick Nav Anchors */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {routines.map((routine) => {
            const Icon = routineIcons[routine.id as keyof typeof routineIcons] || Leaf
            return (
              <a
                key={routine.id}
                href={`#${routine.id}`}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{routine.name}</span>
                <span className="text-xs text-muted-foreground">({routine.duration})</span>
              </a>
            )
          })}
        </div>

        {/* Routines Detail Sections */}
        <div className="mt-16 space-y-20">
          {routines.map((routine, rIndex) => {
            const Icon = routineIcons[routine.id as keyof typeof routineIcons] || Leaf
            const routineProducts = routine.products
              .map((id) => getProductById(id))
              .filter((p): p is NonNullable<typeof p> => p !== undefined)

            const stepLabels = routineStepLabels[routine.id] || []

            const totalPrice = routineProducts.reduce(
              (acc, p) => acc + (p.salePrice ?? p.price),
              0
            )

            return (
              <section
                key={routine.id}
                id={routine.id}
                className="scroll-mt-24 rounded-2xl border bg-card/60 p-6 shadow-xs backdrop-blur-xs sm:p-8 lg:p-10"
              >
                {/* Routine Banner Header */}
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="space-y-4 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider">
                        {routine.duration} Ritual
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        {routineProducts.length} Steps Included
                      </span>
                    </div>

                    <h2 className="text-2xl font-light tracking-tight text-foreground sm:text-3xl">
                      {routine.name}
                    </h2>
                    <p className="max-w-xl leading-relaxed text-muted-foreground">
                      {routine.description}. Specially paired formulas that synergize to nourish your skin barrier and enhance your natural glow.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Button
                        size="lg"
                        className="rounded-full px-6 shadow-md"
                        onClick={() => handleAddRoutineToCart(routine.name, routine.products)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add Entire Bundle - {formatPrice(totalPrice)}
                      </Button>
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-secondary/30 lg:col-span-5 lg:aspect-[4/3]">
                    <Image
                      src={routine.image}
                      alt={routine.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Steps Sequence Cards */}
                <div className="mt-10 border-t pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Step-by-Step Breakdown
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {routineProducts.map((product, pIndex) => (
                      <div
                        key={product.id}
                        className="flex flex-col justify-between rounded-xl border bg-background/80 p-4 shadow-2xs transition-shadow hover:shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {pIndex + 1}
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                              {stepLabels[pIndex] || `Step ${pIndex + 1}`}
                            </span>
                          </div>
                          <Link
                            href={`/product/${product.id}`}
                            className="mt-3 block font-medium text-sm text-foreground hover:text-primary line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {product.shortDesc}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t pt-2 text-xs">
                          <span className="font-semibold text-foreground">
                            {formatPrice(product.salePrice ?? product.price)}
                          </span>
                          <Link
                            href={`/product/${product.id}`}
                            className="text-primary hover:underline flex items-center"
                          >
                            View
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="mt-10">
                  <h3 className="mb-6 text-lg font-light tracking-tight text-foreground sm:text-xl">
                    Products in {routine.name}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {routineProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Interactive Skin Type Filter Recommendation */}
        <section className="mt-20 rounded-2xl bg-secondary/30 p-8 text-center sm:p-12">
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" />
            Skin Compatibility Quiz
          </Badge>
          <h2 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
            Find the Right Routine for Your Skin Type
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Select your skin type to instantly see recommended ritual steps tailored for optimal results.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {skinTypes.map((type) => (
              <Button
                key={type}
                variant={selectedSkinType === type ? 'default' : 'outline'}
                size="sm"
                className="rounded-full px-5 text-xs"
                onClick={() =>
                  setSelectedSkinType(selectedSkinType === type ? null : type)
                }
              >
                {type} Skin
              </Button>
            ))}
          </div>

          {selectedSkinType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl bg-card p-6 max-w-2xl mx-auto border shadow-xs"
            >
              <h3 className="font-semibold text-base text-foreground">
                Recommended for {selectedSkinType} Skin
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {selectedSkinType === 'Oily' &&
                  'Focus on gentle foaming cleansers, niacinamide pore balancing toners, and lightweight oil-free hydration in the morning.'}
                {selectedSkinType === 'Dry' &&
                  'Prioritize multi-weight hyaluronic acid serums, ceramide barrier creams, and rich overnight hydrating masks.'}
                {selectedSkinType === 'Combination' &&
                  'Balance your T-zone with gentle exfoliants while hydrating cheeks with lightweight barrier formulas.'}
                {selectedSkinType === 'Sensitive' &&
                  'Stick to fragrance-free amino acid cleansers, soothing centella essences, and gentle encapsulated retinol.'}
                {selectedSkinType === 'Normal' &&
                  'Maintain your natural glow with daily Vitamin C protection, gentle evening repair, and weekly clay detoxes.'}
              </p>
              <div className="mt-4">
                <Button size="sm" variant="outline" className="rounded-full" asChild>
                  <Link href="/shop">Browse Recommended Products</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}
