'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/data'

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const remainingPosts = blogPosts.slice(1)

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-light tracking-tight">
            The Botaniq Journal
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Skincare tips, ingredient spotlights, and expert advice
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid gap-8 overflow-hidden rounded-2xl border bg-card lg:grid-cols-2"
          >
            <div className="relative aspect-video lg:aspect-auto">
              <Image
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <Badge variant="secondary" className="w-fit">
                {featuredPost.category}
              </Badge>
              <h2 className="mt-4 text-2xl font-semibold transition-colors group-hover:text-primary lg:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-muted-foreground line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={featuredPost.authorAvatar}
                  alt={featuredPost.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{featuredPost.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        {/* Posts Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border bg-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-secondary/50 p-8 text-center lg:p-12"
        >
          <h2 className="text-2xl font-light tracking-tight">
            Stay Updated with Our Newsletter
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Get the latest skincare tips, product launches, and exclusive offers
            delivered to your inbox.
          </p>
          <Button className="mt-6 rounded-full" asChild>
            <Link href="/">Subscribe Now</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
