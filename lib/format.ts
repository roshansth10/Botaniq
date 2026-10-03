// Currency formatting utilities for NPR (Nepalese Rupee)

export function formatPrice(price: number): string {
  return `NPR ${price.toLocaleString('en-NP', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`
}

export function formatPriceShort(price: number): string {
  return `Rs. ${price.toLocaleString('en-NP', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`
}
