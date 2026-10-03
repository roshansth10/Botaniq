'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const footerLinks = {
  shop: [
    { href: '/shop?category=cleansers', label: 'Cleansers' },
    { href: '/shop?category=serums', label: 'Serums' },
    { href: '/shop?category=moisturizers', label: 'Moisturizers' },
    { href: '/shop?category=masks', label: 'Masks' },
    { href: '/shop?category=sunscreen', label: 'Sunscreen' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribing(false)
    setEmail('')
    toast.success('Thanks for subscribing!', {
      description: 'Check your email for a 10% off welcome code.',
    })
  }

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-semibold tracking-tight">
                Botaniq
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Where nature touches skin. We believe in the power of botanical
              ingredients, backed by science, to transform your skincare
              routine.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Support (left) & Shop (right) in 2 columns */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:gap-8">
            {/* Support links */}
            <div>
              <h3 className="font-semibold">Support</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop links */}
            <div>
              <h3 className="font-semibold">Shop</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold">Stay in Touch</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe for skincare tips and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
                <Button type="submit" disabled={isSubscribing} size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Botaniq. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Secure payments with
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded bg-[#60BB46]/10 px-2 py-1 text-xs font-semibold text-[#60BB46] border border-[#60BB46]/20">
                <span className="mr-1 rounded bg-[#60BB46] px-1 text-[10px] font-bold text-white">e</span>
                Sewa
              </span>
              <span className="inline-flex items-center rounded bg-[#5C2D91]/10 px-2 py-1 text-xs font-semibold text-[#5C2D91] border border-[#5C2D91]/20">
                <span className="mr-1 rounded bg-[#5C2D91] px-1 text-[10px] font-bold text-white">K</span>
                halti
              </span>
              <span className="inline-flex items-center rounded bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border">
                Bank Transfer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
