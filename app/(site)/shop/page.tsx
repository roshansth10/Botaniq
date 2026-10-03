'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductCard } from '@/components/product-card'
import { products, categories, skinTypes, concerns } from '@/lib/data'
import { formatPrice } from '@/lib/format'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([])
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDesc.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Skin type filter
    if (selectedSkinTypes.length > 0) {
      result = result.filter((p) =>
        p.skinTypes.some(
          (st) => selectedSkinTypes.includes(st) || st === 'All'
        )
      )
    }

    // Concerns filter
    if (selectedConcerns.length > 0) {
      result = result.filter((p) =>
        p.concerns.some((c) => selectedConcerns.includes(c))
      )
    }

    // Price filter
    result = result.filter((p) => {
      const price = p.salePrice ?? p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [
    selectedCategories,
    selectedSkinTypes,
    selectedConcerns,
    priceRange,
    inStockOnly,
    sortBy,
    searchQuery,
  ])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const toggleSkinType = (type: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSkinTypes([])
    setSelectedConcerns([])
    setPriceRange([0, 10000])
    setInStockOnly(false)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSkinTypes.length > 0 ||
    selectedConcerns.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000 ||
    inStockOnly

  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['categories', 'skin-type', 'concerns', 'price']}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {category.name}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    ({category.count})
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skin-type">
          <AccordionTrigger>Skin Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {skinTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`skin-${type}`}
                    checked={selectedSkinTypes.includes(type)}
                    onCheckedChange={() => toggleSkinType(type)}
                  />
                  <Label
                    htmlFor={`skin-${type}`}
                    className="cursor-pointer text-sm"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="concerns">
          <AccordionTrigger>Concerns</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {concerns.map((concern) => (
                <div key={concern} className="flex items-center gap-2">
                  <Checkbox
                    id={`concern-${concern}`}
                    checked={selectedConcerns.includes(concern)}
                    onCheckedChange={() => toggleConcern(concern)}
                  />
                  <Label
                    htmlFor={`concern-${concern}`}
                    className="cursor-pointer text-sm"
                  >
                    {concern}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                min={0}
                max={10000}
                step={500}
                className="mt-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <Label htmlFor="in-stock" className="cursor-pointer text-sm">
          In Stock Only
        </Label>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">
              {searchQuery ? `Search: "${searchQuery}"` : 'Shop All'}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {selectedCategories.length +
                        selectedSkinTypes.length +
                        selectedConcerns.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {selectedCategories.map((cat) => (
                <Button
                  key={cat}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleCategory(cat)}
                  className="gap-1"
                >
                  {categories.find((c) => c.id === cat)?.name}
                  <X className="h-3 w-3" />
                </Button>
              ))}
              {selectedSkinTypes.map((type) => (
                <Button
                  key={type}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleSkinType(type)}
                  className="gap-1"
                >
                  {type}
                  <X className="h-3 w-3" />
                </Button>
              ))}
              {selectedConcerns.map((concern) => (
                <Button
                  key={concern}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleConcern(concern)}
                  className="gap-1"
                >
                  {concern}
                  <X className="h-3 w-3" />
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="mt-8 flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <FilterContent />
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-1 text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
                <Button className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <ProductCard product={product} />
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading products...</div>}>
      <ShopContent />
    </Suspense>
  )
}
