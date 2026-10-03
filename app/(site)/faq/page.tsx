'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqCategories = [
  {
    title: 'Ordering & Shipping',
    faqs: [
      {
        question: 'How long does shipping take?',
        answer:
          'Standard shipping within Nepal takes 3-5 business days. Express shipping is available for 1-2 business day delivery within Kathmandu Valley. For orders above NPR 6,500, we offer free standard shipping.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Currently, we ship within Nepal only. We are working on expanding to international markets soon. Sign up for our newsletter to be notified when we launch international shipping.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your order ships, you will receive an email with your tracking number. You can also track your order by logging into your account and visiting the "My Orders" section.',
      },
      {
        question: 'Can I change or cancel my order?',
        answer:
          'You can modify or cancel your order within 2 hours of placing it. After that, our team begins processing orders and changes cannot be guaranteed. Contact our support team immediately if you need to make changes.',
      },
    ],
  },
  {
    title: 'Products & Ingredients',
    faqs: [
      {
        question: 'Are your products cruelty-free?',
        answer:
          'Yes! Botaniq is 100% cruelty-free. We never test on animals and none of our ingredient suppliers conduct animal testing. We are certified by Leaping Bunny.',
      },
      {
        question: 'Are your products suitable for sensitive skin?',
        answer:
          'Many of our products are formulated for sensitive skin. Look for products labeled "Sensitive Skin Friendly" or check the product page for skin type compatibility. We recommend patch testing any new product before full application.',
      },
      {
        question: 'What is the shelf life of your products?',
        answer:
          'Most of our products have a shelf life of 12-24 months unopened. Once opened, we recommend using within 6-12 months for optimal efficacy. Each product has a PAO (Period After Opening) symbol indicating its specific timeframe.',
      },
      {
        question: 'Do you use any artificial fragrances?',
        answer:
          'No, we never use artificial fragrances. Some of our products contain natural essential oils for scent, but we always list these in our ingredients. We also offer fragrance-free options for those with sensitivities.',
      },
    ],
  },
  {
    title: 'Skincare Routines',
    faqs: [
      {
        question: 'In what order should I apply my skincare products?',
        answer:
          'The general rule is to apply products from thinnest to thickest consistency: 1) Cleanser, 2) Toner/Essence, 3) Serum, 4) Eye cream, 5) Moisturizer, 6) Sunscreen (AM only). However, specific products may have different instructions.',
      },
      {
        question: 'Can I use retinol and Vitamin C together?',
        answer:
          'While both are powerful ingredients, using them together can cause irritation for some people. We recommend using Vitamin C in the morning (it provides antioxidant protection) and retinol at night. If you want to use both in your PM routine, apply Vitamin C first, wait 30 minutes, then apply retinol.',
      },
      {
        question: 'How long before I see results?',
        answer:
          'Skincare results vary by product and individual. Generally, you may see immediate hydration benefits, but for concerns like hyperpigmentation or fine lines, expect to see visible improvements in 4-8 weeks with consistent use. Be patient and consistent!',
      },
      {
        question: 'Do I need to use all the products in a routine?',
        answer:
          'No! You can build a routine that works for you. The essentials are: cleanser, moisturizer, and sunscreen (AM). Serums and treatments are optional but can address specific concerns. Start simple and add products gradually.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    faqs: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy on all unopened products in their original packaging. If you are not satisfied with a product, contact our support team to initiate a return.',
      },
      {
        question: 'Can I return a product if I had a reaction?',
        answer:
          'Yes. Your skin safety is our priority. If you experience an adverse reaction, please stop using the product immediately and contact our support team. We will process a full refund and our skincare experts can help recommend alternative products.',
      },
      {
        question: 'How long do refunds take to process?',
        answer:
          'Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method. For bank transfers, please allow an additional 2-3 business days for the amount to reflect.',
      },
    ],
  },
  {
    title: 'Account & Rewards',
    faqs: [
      {
        question: 'How do I create an account?',
        answer:
          'Click on the "Account" icon in the top navigation and select "Sign Up." Fill in your details to create your account. Having an account lets you track orders, save favorites, and earn rewards.',
      },
      {
        question: 'Do you have a rewards program?',
        answer:
          'Yes! Our Botaniq Rewards program lets you earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up for an account to start earning today.',
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer:
          'Click on "Login" and then "Forgot Password." Enter your registered email address and we will send you a link to reset your password. The link expires in 24 hours for security purposes.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-light tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our products, orders, and more.
          </p>
        </motion.div>

        {/* FAQ Sections */}
        <div className="mt-12 space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="mb-4 text-xl font-semibold">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${category.title}-${faqIndex}`}
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-secondary/50 p-8 text-center lg:p-12"
        >
          <h2 className="text-2xl font-light tracking-tight">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Our skincare experts are here to help. Reach out to us through any of
            these channels.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-card p-6">
              <Mail className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-medium">Email Us</p>
              <p className="mt-1 text-sm text-muted-foreground">
                support@botaniq.com.np
              </p>
            </div>
            <div className="rounded-xl bg-card p-6">
              <Phone className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-medium">Call Us</p>
              <p className="mt-1 text-sm text-muted-foreground">
                +977 1-4567890
              </p>
            </div>
            <div className="rounded-xl bg-card p-6">
              <MessageCircle className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-medium">Live Chat</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Available 9 AM - 6 PM NPT
              </p>
            </div>
          </div>

          <Button className="mt-8 rounded-full" size="lg" asChild>
            <Link href="mailto:support@botaniq.com.np">Contact Support</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
