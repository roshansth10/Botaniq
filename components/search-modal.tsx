'use client'

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/lib/store'
import { products, blogPosts, categories } from '@/lib/data'
import { formatPrice } from '@/lib/format'

const popularSearches = [
  'Vitamin C',
  'Hyaluronic Acid',
  'Retinol',
  'Moisturizer',
  'Sunscreen',
]

export function SearchModal() {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeSearch])

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], posts: [], categories: [] }

    const q = query.toLowerCase()
    return {
      products: products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q)
        )
        .slice(0, 4),
      posts: blogPosts
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q)
        )
        .slice(0, 2),
      categories: categories.filter((c) => c.name.toLowerCase().includes(q)),
    }
  }, [query])

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.posts.length > 0 ||
    searchResults.categories.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 top-24 z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-xl bg-card shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products, routines, articles..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent p-0 text-base focus-visible:ring-0"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={closeSearch}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {!query.trim() ? (
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      Popular Searches
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/80"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : hasResults ? (
                  <div className="space-y-6">
                    {/* Products */}
                    {searchResults.products.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-muted-foreground">
                            Products
                          </p>
                          <Link
                            href={`/shop?search=${encodeURIComponent(query)}`}
                            onClick={closeSearch}
                            className="text-sm text-primary hover:underline"
                          >
                            View all
                          </Link>
                        </div>
                        <div className="mt-3 space-y-2">
                          {searchResults.products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              onClick={closeSearch}
                              className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-secondary"
                            >
                              <div className="relative h-12 w-12 overflow-hidden rounded-md bg-secondary">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {product.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(product.salePrice ?? product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories */}
                    {searchResults.categories.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Categories
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {searchResults.categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/shop?category=${category.id}`}
                              onClick={closeSearch}
                              className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/80"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blog posts */}
                    {searchResults.posts.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Articles
                        </p>
                        <div className="mt-3 space-y-2">
                          {searchResults.posts.map((post) => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              onClick={closeSearch}
                              className="block rounded-lg p-2 transition-colors hover:bg-secondary"
                            >
                              <p className="text-sm font-medium">{post.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {post.readTime}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try searching for something else
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
