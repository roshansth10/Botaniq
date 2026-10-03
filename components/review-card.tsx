'use client'

import Image from 'next/image'
import { Star, ThumbsUp, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Review } from '@/lib/data'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b pb-6">
      <div className="flex items-start gap-4">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={review.userAvatar}
            alt={review.userName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.userName}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-success">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified Purchase
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < review.rating
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          {review.skinType && (
            <p className="mt-1 text-xs text-muted-foreground">
              Skin Type: {review.skinType}
            </p>
          )}
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {review.text}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs">
              <ThumbsUp className="h-3.5 w-3.5" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
