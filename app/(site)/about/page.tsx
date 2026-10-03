'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Heart, Shield, Sparkles, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description:
      'We source the finest botanical ingredients from around the world, ensuring purity and potency in every formula.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description:
      'We never test on animals and are certified by Leaping Bunny. Our products are 100% cruelty-free.',
  },
  {
    icon: Shield,
    title: 'Science-Backed',
    description:
      'Every ingredient is chosen based on clinical research and proven efficacy for real results.',
  },
  {
    icon: Sparkles,
    title: 'Clean Beauty',
    description:
      'Free from parabens, sulfates, phthalates, and artificial fragrances. Only what your skin needs.',
  },
]

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '30+', label: 'Premium Products' },
  { value: '99%', label: 'Natural Ingredients' },
  { value: '5+', label: 'Years of Excellence' },
]

const team = [
  {
    name: 'Dr. Priya Thapa',
    role: 'Founder & Formulator',
    image: 'https://ui-avatars.com/api/?name=Priya+Thapa&background=C97B63&color=fff&size=400',
    bio: 'Board-certified dermatologist with 15+ years of experience in clinical skincare.',
  },
  {
    name: 'Rajan Shrestha',
    role: 'Chief Botanist',
    image: 'https://ui-avatars.com/api/?name=Rajan+Shrestha&background=D4A373&color=fff&size=400',
    bio: 'Expert in Himalayan botanicals and sustainable ingredient sourcing.',
  },
  {
    name: 'Sita Gurung',
    role: 'Product Development',
    image: 'https://ui-avatars.com/api/?name=Sita+Gurung&background=A8C5A8&color=fff&size=400',
    bio: 'Leading innovation in clean beauty formulations for all skin types.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/30 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-light tracking-tight lg:text-5xl">
                Where Nature Meets
                <br />
                <span className="text-primary">Science</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Founded in the heart of Nepal, Botaniq was born from a simple
                belief: skincare should harness the power of nature while being
                backed by science. We bring together Himalayan botanicals and
                cutting-edge dermatological research to create products that
                truly work.
              </p>
              <Button className="mt-8 rounded-full" size="lg" asChild>
                <Link href="/shop">Explore Our Products</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop"
                alt="Botaniq skincare products"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light tracking-tight">Our Story</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                It all started in a small laboratory in Kathmandu, where Dr.
                Priya Thapa was frustrated with the lack of clean, effective
                skincare options in the market. Drawing inspiration from
                traditional Nepali remedies and modern dermatology, she began
                formulating products that would later become Botaniq.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Today, Botaniq serves customers across Nepal and beyond, staying
                true to our founding principles: natural ingredients,
                science-backed formulas, and sustainable practices. Every
                product is crafted with care, tested for efficacy, and designed
                to bring out your skin&apos;s natural radiance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-secondary/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-2"
              >
                <p className="text-3xl sm:text-4xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Our Values</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              What we stand for and what drives every decision we make.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-base sm:text-lg">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/30 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Meet Our Team</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              The passionate experts behind Botaniq&apos;s formulations.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-xl bg-card"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg">{member.name}</h3>
                  <p className="text-xs sm:text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-primary p-6 sm:p-12 text-center text-primary-foreground"
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">
              Ready to Transform Your Skin?
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base opacity-90">
              Join thousands of customers who have discovered the power of
              Botaniq. Start your journey to healthier, more radiant skin today.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 sm:mt-8 rounded-full"
              asChild
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
