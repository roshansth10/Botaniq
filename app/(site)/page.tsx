'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Shield, Heart, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { getFeaturedProducts, blogPosts, routines, products } from '@/lib/data'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const trustBadges = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Pure botanical ingredients sourced responsibly',
  },
  {
    icon: Shield,
    title: 'Dermatologist Tested',
    description: 'Clinically proven safe for all skin types',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description: 'Never tested on animals, certified vegan',
  },
]

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&h=1080&fit=crop"
            alt="Botanical skincare ingredients"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-2xl py-20"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Botanical Skincare
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mt-4 text-balance text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Where Nature{' '}
              <span className="font-semibold text-primary">Touches</span> Skin
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              Discover science-backed skincare crafted from pure botanical
              ingredients. Transform your daily ritual into a moment of
              self-care.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/shop">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                asChild
              >
                <Link href="/routines">Take Skin Quiz</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Bestsellers
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
                Customer Favorites
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center text-sm font-medium text-primary hover:underline sm:flex"
            >
              Shop All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop">Shop All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Build Your Ritual */}
      <section className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Skincare Routines
            </p>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
              Build Your Ritual
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover curated routines designed for your skin&apos;s needs.
              Morning glow, evening repair, or weekly reset.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {routines.map((routine, index) => (
              <motion.div
                key={routine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/routines#${routine.id}`}
                  className="group block overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={routine.image}
                      alt={routine.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-card">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        {routine.duration}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold">
                        {routine.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {routine.description}
                    </p>
                    <p className="mt-4 flex items-center text-sm font-medium text-primary">
                      {routine.products.length} products
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=1000&fit=crop"
                  alt="Botaniq story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-card p-6 shadow-lg sm:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">50K+</p>
                    <p className="text-sm text-muted-foreground">
                      Happy customers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Our Story
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
                Beauty That Respects Nature
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Founded in 2024, Botaniq was born from a simple belief: skincare
                should be as pure as the ingredients we source. Every formula is
                crafted with responsibly harvested botanicals, backed by
                dermatological science, and packaged sustainably.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We believe in transparency, efficacy, and the transformative
                power of nature. Our commitment to clean beauty goes beyond
                ingredients—it&apos;s a promise to you and the planet.
              </p>
              <Button className="mt-8 rounded-full" variant="outline" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Just In
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="hidden items-center text-sm font-medium text-primary hover:underline sm:flex"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(15, 19).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                The Journal
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
                Skincare Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden items-center text-sm font-medium text-primary hover:underline sm:flex"
            >
              Read All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-xl bg-card shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-card px-3 py-1 text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="border-t py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              @botaniqskin
            </p>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
              Follow Our Journey
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=300&fit=crop',
            ].map((src, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light tracking-tight text-primary-foreground sm:text-4xl">
              Join the Botaniq Family
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Subscribe for exclusive offers, skincare tips, and early access to
              new products. Get 10% off your first order.
            </p>
            <form className="mx-auto mt-8 flex flex-col sm:flex-row max-w-md gap-3 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 w-full sm:w-auto rounded-full border-0 bg-primary-foreground/10 px-6 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              />
              <Button
                type="submit"
                variant="secondary"
                className="rounded-full px-8 w-full sm:w-auto shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
