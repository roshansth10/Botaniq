'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, ChevronLeft, Share2, Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params)
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2)

  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          {/* Header */}
          <header>
            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="mt-4 text-3xl font-light tracking-tight lg:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

            <div className="mt-6 flex items-center justify-between border-b pb-6">
              <div className="flex items-center gap-4">
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{post.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg mx-auto mt-8 max-w-none dark:prose-invert">
            <p>{post.content}</p>
            <p>
              When it comes to skincare, understanding the science behind
              ingredients can help you make better choices for your unique skin
              needs. Let&apos;s dive deeper into how these powerful ingredients work.
            </p>
            <h2>How It Works</h2>
            <p>
              The key to effective skincare lies in using the right
              concentration of active ingredients. Too little won&apos;t produce
              results, while too much can cause irritation. That&apos;s why at
              Botaniq, we carefully formulate each product to deliver optimal
              results without compromising your skin barrier.
            </p>
            <h2>Tips for Best Results</h2>
            <ul>
              <li>Start slowly and build up tolerance</li>
              <li>Always patch test new products</li>
              <li>Use sunscreen daily when using active ingredients</li>
              <li>Be patient - results take time</li>
              <li>Consistency is key to seeing improvements</li>
            </ul>
            <h2>Common Mistakes to Avoid</h2>
            <p>
              One of the biggest mistakes people make is layering too many
              active ingredients at once. This can compromise your skin barrier
              and lead to irritation, redness, and sensitivity. We recommend
              starting with one active at a time and gradually building up your
              routine.
            </p>
            <h2>Our Recommendation</h2>
            <p>
              For best results, we recommend incorporating these ingredients
              gradually into your routine. Start with a simple routine and add
              new products one at a time, giving your skin at least two weeks to
              adjust before adding another active ingredient.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2 border-t pt-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-light tracking-tight">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group overflow-hidden rounded-xl border bg-card"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {relatedPost.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
