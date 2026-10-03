export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  salePrice?: number
  rating: number
  reviewCount: number
  images: string[]
  shortDesc: string
  fullDesc: string
  ingredients: { name: string; purpose: string }[]
  skinTypes: string[]
  concerns: string[]
  inStock: boolean
  featured: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  addresses: Address[]
  orders: string[]
  wishlist: string[]
}

export interface Address {
  id: string
  label: string
  name: string
  address: string
  city: string
  postal: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  orderDate: string
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered'
  items: { productId: string; quantity: number; price: number }[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: Address
  trackingNumber?: string
  timeline: { status: string; date: string; details: string }[]
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  text: string
  date: string
  verified: boolean
  helpful: number
  skinType?: string
}

export interface BlogPost {
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  author: string
  authorAvatar: string
  date: string
  readTime: string
  featuredImage: string
  tags: string[]
}

export const categories = [
  { id: 'cleansers', name: 'Cleansers', count: 8 },
  { id: 'serums', name: 'Serums', count: 10 },
  { id: 'moisturizers', name: 'Moisturizers', count: 7 },
  { id: 'masks', name: 'Masks', count: 5 },
  { id: 'toners', name: 'Toners', count: 6 },
  { id: 'eye-care', name: 'Eye Care', count: 4 },
  { id: 'sunscreen', name: 'Sunscreen', count: 5 },
  { id: 'treatments', name: 'Treatments', count: 5 },
]

export const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
export const concerns = ['Acne', 'Anti-Aging', 'Brightening', 'Hydration', 'Pores', 'Redness', 'Dark Spots', 'Fine Lines']

export const products: Product[] = [
  {
    id: '1',
    name: 'Vitamin C Brightening Serum',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'brightening',
    price: 5990,
    rating: 4.8,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Powerful 15% Vitamin C serum for radiant, even-toned skin.',
    fullDesc: 'Infused with 15% Vitamin C and kakadu plum, this brightening serum targets dark spots while protecting against environmental stressors. Lightweight, fast-absorbing formula suitable for all skin types. Use morning and night for best results.',
    ingredients: [
      { name: 'Vitamin C (15%)', purpose: 'Brightening & antioxidant protection' },
      { name: 'Kakadu Plum', purpose: 'Natural Vitamin C source' },
      { name: 'Hyaluronic Acid', purpose: 'Deep hydration' },
      { name: 'Vitamin E', purpose: 'Skin barrier support' },
    ],
    skinTypes: ['Normal', 'Dry', 'Combination'],
    concerns: ['Brightening', 'Dark Spots', 'Anti-Aging'],
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Hyaluronic Acid Hydrator',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'hydrating',
    price: 4990,
    rating: 4.9,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Multi-weight hyaluronic acid for intense, lasting hydration.',
    fullDesc: 'Our bestselling hydrator features a blend of low, medium, and high molecular weight hyaluronic acid to deliver moisture at every layer of the skin. Plumps fine lines and creates a dewy, glass-skin effect.',
    ingredients: [
      { name: 'Hyaluronic Acid Complex', purpose: 'Multi-layer hydration' },
      { name: 'Panthenol', purpose: 'Skin soothing' },
      { name: 'Aloe Vera', purpose: 'Calming & hydrating' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration', 'Fine Lines'],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Retinol Night Repair Cream',
    brand: 'Botaniq',
    category: 'moisturizers',
    subcategory: 'anti-aging',
    price: 8250,
    salePrice: 6900,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Encapsulated retinol for gentle yet effective anti-aging.',
    fullDesc: 'Wake up to visibly renewed skin with our gentle retinol night cream. Encapsulated retinol releases slowly throughout the night, minimizing irritation while maximizing results. Paired with bakuchiol for enhanced efficacy.',
    ingredients: [
      { name: 'Encapsulated Retinol (0.5%)', purpose: 'Cell turnover & anti-aging' },
      { name: 'Bakuchiol', purpose: 'Natural retinol alternative' },
      { name: 'Squalane', purpose: 'Moisture lock' },
      { name: 'Ceramides', purpose: 'Barrier repair' },
    ],
    skinTypes: ['Normal', 'Dry', 'Combination'],
    concerns: ['Anti-Aging', 'Fine Lines', 'Dark Spots'],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Gentle Foaming Cleanser',
    brand: 'Botaniq',
    category: 'cleansers',
    subcategory: 'foam',
    price: 3720,
    rating: 4.6,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'pH-balanced foam cleanser that never strips.',
    fullDesc: 'Start your routine right with our cloud-like foaming cleanser. Amino acid-based surfactants gently remove impurities while maintaining your skin\'s natural moisture barrier. Perfect for morning and evening use.',
    ingredients: [
      { name: 'Amino Acid Surfactants', purpose: 'Gentle cleansing' },
      { name: 'Green Tea Extract', purpose: 'Antioxidant' },
      { name: 'Centella Asiatica', purpose: 'Soothing' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration'],
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Niacinamide Pore Refining Toner',
    brand: 'Botaniq',
    category: 'toners',
    subcategory: 'pore-care',
    price: 4650,
    rating: 4.5,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: '10% Niacinamide to minimize pores and control oil.',
    fullDesc: 'Visibly minimize pores and balance sebum production with our potent niacinamide toner. Also brightens skin tone and strengthens the skin barrier. Alcohol-free and suitable for sensitive skin.',
    ingredients: [
      { name: 'Niacinamide (10%)', purpose: 'Pore minimizing & brightening' },
      { name: 'Zinc PCA', purpose: 'Oil control' },
      { name: 'Willow Bark Extract', purpose: 'Natural BHA' },
    ],
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Pores', 'Acne', 'Brightening'],
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Rose Clay Detox Mask',
    brand: 'Botaniq',
    category: 'masks',
    subcategory: 'clay',
    price: 5590,
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'French pink clay mask for deep pore cleansing.',
    fullDesc: 'Indulge in a spa-like experience with our French pink clay mask. Draws out impurities while rose water soothes and hydrates. Leaves skin soft, refined, and glowing. Use 1-2 times weekly.',
    ingredients: [
      { name: 'French Pink Clay', purpose: 'Deep cleansing' },
      { name: 'Rose Water', purpose: 'Soothing & hydrating' },
      { name: 'Witch Hazel', purpose: 'Pore tightening' },
      { name: 'Rosehip Oil', purpose: 'Nourishing' },
    ],
    skinTypes: ['Normal', 'Oily', 'Combination'],
    concerns: ['Pores', 'Hydration'],
    inStock: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Ceramide Barrier Cream',
    brand: 'Botaniq',
    category: 'moisturizers',
    subcategory: 'barrier',
    price: 6390,
    rating: 4.9,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Triple ceramide complex for ultimate barrier repair.',
    fullDesc: 'Restore and protect your skin barrier with our rich ceramide cream. Features a triple ceramide complex mimicking your skin\'s natural lipids. Perfect for compromised, dry, or sensitive skin.',
    ingredients: [
      { name: 'Ceramide NP, AP, EOP', purpose: 'Barrier repair' },
      { name: 'Cholesterol', purpose: 'Lipid replenishment' },
      { name: 'Fatty Acids', purpose: 'Moisture seal' },
      { name: 'Phytosphingosine', purpose: 'Skin identical lipid' },
    ],
    skinTypes: ['Dry', 'Sensitive'],
    concerns: ['Hydration', 'Redness'],
    inStock: true,
    featured: true,
  },
  {
    id: '8',
    name: 'Oil-Free Gel Moisturizer',
    brand: 'Botaniq',
    category: 'moisturizers',
    subcategory: 'gel',
    price: 4520,
    rating: 4.6,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Lightweight gel hydration for oily skin.',
    fullDesc: 'Get all the hydration without the heaviness. Our oil-free gel moisturizer absorbs instantly, leaving a matte finish perfect for oily and acne-prone skin. Packed with water-binding ingredients for lasting moisture.',
    ingredients: [
      { name: 'Sodium Hyaluronate', purpose: 'Lightweight hydration' },
      { name: 'Aloe Vera', purpose: 'Soothing' },
      { name: 'Green Tea', purpose: 'Antioxidant' },
    ],
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Hydration', 'Acne'],
    inStock: true,
    featured: false,
  },
  {
    id: '9',
    name: 'AHA/BHA Exfoliating Serum',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'exfoliating',
    price: 5320,
    rating: 4.7,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Dual-acid formula for smooth, clear skin.',
    fullDesc: 'Reveal fresh, radiant skin with our blend of glycolic and salicylic acids. Gently exfoliates dead skin cells, unclogs pores, and improves texture. Start with 2-3 times weekly and build up tolerance.',
    ingredients: [
      { name: 'Glycolic Acid (7%)', purpose: 'Surface exfoliation' },
      { name: 'Salicylic Acid (2%)', purpose: 'Pore cleansing' },
      { name: 'Allantoin', purpose: 'Soothing' },
    ],
    skinTypes: ['Normal', 'Oily', 'Combination'],
    concerns: ['Acne', 'Pores', 'Brightening'],
    inStock: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Peptide Eye Cream',
    brand: 'Botaniq',
    category: 'eye-care',
    subcategory: 'anti-aging',
    price: 7315,
    rating: 4.8,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Multi-peptide complex for the delicate eye area.',
    fullDesc: 'Target fine lines, dark circles, and puffiness with our advanced peptide eye cream. Caffeine reduces puffiness while peptides stimulate collagen production. Lightweight texture absorbs quickly.',
    ingredients: [
      { name: 'Matrixyl 3000', purpose: 'Collagen stimulation' },
      { name: 'Caffeine', purpose: 'De-puffing' },
      { name: 'Vitamin K', purpose: 'Dark circle reduction' },
      { name: 'Squalane', purpose: 'Moisturizing' },
    ],
    skinTypes: ['All'],
    concerns: ['Anti-Aging', 'Fine Lines'],
    inStock: true,
    featured: false,
  },
  {
    id: '11',
    name: 'Mineral Sunscreen SPF 50',
    brand: 'Botaniq',
    category: 'sunscreen',
    subcategory: 'mineral',
    price: 4790,
    rating: 4.5,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Invisible zinc oxide protection for all skin tones.',
    fullDesc: 'Protect your skin with our reef-safe mineral sunscreen. Micronized zinc oxide provides broad-spectrum protection without the white cast. Water-resistant for 80 minutes and perfect under makeup.',
    ingredients: [
      { name: 'Zinc Oxide (20%)', purpose: 'UVA/UVB protection' },
      { name: 'Squalane', purpose: 'Hydration' },
      { name: 'Vitamin E', purpose: 'Antioxidant' },
    ],
    skinTypes: ['All'],
    concerns: ['Anti-Aging'],
    inStock: true,
    featured: false,
  },
  {
    id: '12',
    name: 'Overnight Hydrating Mask',
    brand: 'Botaniq',
    category: 'masks',
    subcategory: 'sleeping',
    price: 6120,
    rating: 4.9,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Wake up to plump, dewy skin.',
    fullDesc: 'Transform your skin overnight with our intensive hydrating mask. A blend of hyaluronic acid, honey, and plant oils creates a moisture-locking barrier while you sleep. Wake up to visibly plumper, more radiant skin.',
    ingredients: [
      { name: 'Hyaluronic Acid', purpose: 'Deep hydration' },
      { name: 'Manuka Honey', purpose: 'Humectant' },
      { name: 'Jojoba Oil', purpose: 'Nourishing' },
      { name: 'Shea Butter', purpose: 'Moisture seal' },
    ],
    skinTypes: ['Dry', 'Normal'],
    concerns: ['Hydration'],
    inStock: true,
    featured: false,
  },
  {
    id: '13',
    name: 'Micellar Cleansing Water',
    brand: 'Botaniq',
    category: 'cleansers',
    subcategory: 'micellar',
    price: 2920,
    rating: 4.4,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Gentle makeup remover for sensitive eyes.',
    fullDesc: 'Remove makeup, dirt, and oil in one simple step. Our gentle micellar water is formulated without alcohol or fragrance, making it perfect for sensitive skin and eyes. No rinsing required.',
    ingredients: [
      { name: 'Micelle Technology', purpose: 'Gentle cleansing' },
      { name: 'Rose Water', purpose: 'Soothing' },
      { name: 'Cucumber Extract', purpose: 'Refreshing' },
    ],
    skinTypes: ['All', 'Sensitive'],
    concerns: ['Hydration'],
    inStock: true,
    featured: false,
  },
  {
    id: '14',
    name: 'Azelaic Acid Treatment',
    brand: 'Botaniq',
    category: 'treatments',
    subcategory: 'acne',
    price: 5050,
    rating: 4.6,
    reviewCount: 82,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: '10% Azelaic acid for acne and rosacea.',
    fullDesc: 'Combat acne, rosacea, and hyperpigmentation with this multi-tasking treatment. Azelaic acid gently exfoliates while reducing inflammation and killing acne-causing bacteria. Suitable for sensitive skin.',
    ingredients: [
      { name: 'Azelaic Acid (10%)', purpose: 'Acne & rosacea treatment' },
      { name: 'Licorice Root', purpose: 'Brightening' },
      { name: 'Bisabolol', purpose: 'Anti-inflammatory' },
    ],
    skinTypes: ['All', 'Sensitive'],
    concerns: ['Acne', 'Redness', 'Brightening'],
    inStock: true,
    featured: false,
  },
  {
    id: '15',
    name: 'Bakuchiol Anti-Aging Oil',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'oil',
    price: 7715,
    rating: 4.7,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Plant-based retinol alternative for sensitive skin.',
    fullDesc: 'Get retinol-like results without the irritation. Bakuchiol is a natural alternative that boosts collagen, fights wrinkles, and evens skin tone. Safe for pregnancy and sensitive skin. Use day or night.',
    ingredients: [
      { name: 'Bakuchiol', purpose: 'Natural anti-aging' },
      { name: 'Rosehip Oil', purpose: 'Vitamin A & C' },
      { name: 'Squalane', purpose: 'Hydrating' },
      { name: 'Sea Buckthorn', purpose: 'Antioxidant' },
    ],
    skinTypes: ['All', 'Sensitive'],
    concerns: ['Anti-Aging', 'Fine Lines'],
    inStock: true,
    featured: false,
  },
  {
    id: '16',
    name: 'Centella Calming Essence',
    brand: 'Botaniq',
    category: 'toners',
    subcategory: 'essence',
    price: 4255,
    rating: 4.8,
    reviewCount: 143,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Soothe irritated, stressed skin instantly.',
    fullDesc: 'Calm inflammation and strengthen your skin barrier with our centella essence. Perfect for post-treatment care, sunburn relief, or daily sensitive skin maintenance. Absorbs quickly with no sticky residue.',
    ingredients: [
      { name: 'Centella Asiatica', purpose: 'Healing & soothing' },
      { name: 'Madecassoside', purpose: 'Anti-inflammatory' },
      { name: 'Tea Tree', purpose: 'Antibacterial' },
    ],
    skinTypes: ['Sensitive', 'All'],
    concerns: ['Redness', 'Acne'],
    inStock: true,
    featured: false,
  },
  {
    id: '17',
    name: 'Double Cleansing Oil',
    brand: 'Botaniq',
    category: 'cleansers',
    subcategory: 'oil',
    price: 4255,
    rating: 4.7,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Melt away makeup and sunscreen effortlessly.',
    fullDesc: 'The first step in the Korean double cleanse method. Our lightweight oil emulsifies with water to dissolve makeup, sunscreen, and sebum without clogging pores. Leaves skin clean but never tight.',
    ingredients: [
      { name: 'Jojoba Oil', purpose: 'Makeup dissolving' },
      { name: 'Olive Squalane', purpose: 'Nourishing' },
      { name: 'Vitamin E', purpose: 'Antioxidant' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration'],
    inStock: true,
    featured: false,
  },
  {
    id: '18',
    name: 'Tranexamic Acid Dark Spot Serum',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'brightening',
    price: 5850,
    rating: 4.6,
    reviewCount: 71,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Fade stubborn dark spots and melasma.',
    fullDesc: 'Target hyperpigmentation at its source with tranexamic acid. This gentle yet effective serum inhibits melanin production to fade dark spots, sun damage, and melasma. Safe for daily use on all skin tones.',
    ingredients: [
      { name: 'Tranexamic Acid (3%)', purpose: 'Melanin inhibition' },
      { name: 'Niacinamide', purpose: 'Brightening support' },
      { name: 'Alpha Arbutin', purpose: 'Dark spot fading' },
    ],
    skinTypes: ['All'],
    concerns: ['Dark Spots', 'Brightening'],
    inStock: true,
    featured: false,
  },
  {
    id: '19',
    name: 'Enzyme Exfoliating Powder',
    brand: 'Botaniq',
    category: 'cleansers',
    subcategory: 'exfoliating',
    price: 3990,
    rating: 4.5,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Gentle papaya enzyme exfoliation.',
    fullDesc: 'Mix with water to activate natural papaya and pineapple enzymes. This powder-to-foam cleanser gently dissolves dead skin cells without harsh scrubbing. Perfect for sensitive skin that can\'t tolerate acids.',
    ingredients: [
      { name: 'Papain', purpose: 'Enzyme exfoliation' },
      { name: 'Bromelain', purpose: 'Brightening enzyme' },
      { name: 'Rice Powder', purpose: 'Gentle physical exfoliation' },
    ],
    skinTypes: ['Sensitive', 'All'],
    concerns: ['Brightening', 'Pores'],
    inStock: true,
    featured: false,
  },
  {
    id: '20',
    name: 'Collagen Boosting Cream',
    brand: 'Botaniq',
    category: 'moisturizers',
    subcategory: 'anti-aging',
    price: 7450,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Stimulate collagen for firmer, plumper skin.',
    fullDesc: 'Turn back time with our advanced collagen-boosting formula. Peptides signal your skin to produce more collagen while plant stem cells protect existing structures. Visible firming in 4 weeks.',
    ingredients: [
      { name: 'Palmitoyl Pentapeptide-4', purpose: 'Collagen stimulation' },
      { name: 'Plant Stem Cells', purpose: 'Protection' },
      { name: 'Adenosine', purpose: 'Anti-wrinkle' },
    ],
    skinTypes: ['Normal', 'Dry'],
    concerns: ['Anti-Aging', 'Fine Lines'],
    inStock: true,
    featured: false,
  },
  {
    id: '21',
    name: 'Charcoal Purifying Mask',
    brand: 'Botaniq',
    category: 'masks',
    subcategory: 'clay',
    price: 4790,
    rating: 4.4,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Deep clean pores with activated charcoal.',
    fullDesc: 'Activated charcoal acts like a magnet for impurities, drawing out dirt, oil, and toxins from deep within pores. Perfect for weekly detox sessions, especially for oily and acne-prone skin.',
    ingredients: [
      { name: 'Activated Charcoal', purpose: 'Detoxifying' },
      { name: 'Kaolin Clay', purpose: 'Oil absorption' },
      { name: 'Tea Tree Oil', purpose: 'Antibacterial' },
    ],
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Pores', 'Acne'],
    inStock: true,
    featured: false,
  },
  {
    id: '22',
    name: 'Caffeine Eye Serum',
    brand: 'Botaniq',
    category: 'eye-care',
    subcategory: 'depuffing',
    price: 5050,
    rating: 4.6,
    reviewCount: 134,
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Wake up tired eyes instantly.',
    fullDesc: 'Give your eyes a morning boost with concentrated caffeine. Reduces puffiness, minimizes dark circles, and smooths fine lines. The cooling roller ball applicator enhances absorption and soothes.',
    ingredients: [
      { name: 'Caffeine (5%)', purpose: 'De-puffing' },
      { name: 'Vitamin C', purpose: 'Brightening' },
      { name: 'Peptides', purpose: 'Firming' },
    ],
    skinTypes: ['All'],
    concerns: ['Fine Lines'],
    inStock: true,
    featured: false,
  },
  {
    id: '23',
    name: 'Hydrating Toner Mist',
    brand: 'Botaniq',
    category: 'toners',
    subcategory: 'mist',
    price: 3460,
    rating: 4.7,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Refresh and hydrate on-the-go.',
    fullDesc: 'Keep this mist at your desk for instant hydration throughout the day. Rose water and hyaluronic acid deliver moisture while setting makeup beautifully. Also perfect for refreshing skincare before serums.',
    ingredients: [
      { name: 'Rose Water', purpose: 'Soothing' },
      { name: 'Hyaluronic Acid', purpose: 'Hydration' },
      { name: 'Aloe Vera', purpose: 'Calming' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration'],
    inStock: true,
    featured: false,
  },
  {
    id: '24',
    name: 'SPF 30 Daily Moisturizer',
    brand: 'Botaniq',
    category: 'sunscreen',
    subcategory: 'moisturizer',
    price: 5590,
    rating: 4.5,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: '2-in-1 hydration and sun protection.',
    fullDesc: 'Streamline your morning routine with our moisturizer-sunscreen hybrid. Broad spectrum SPF 30 protects while niacinamide and hyaluronic acid hydrate and brighten. Sits beautifully under makeup.',
    ingredients: [
      { name: 'Zinc Oxide & Titanium Dioxide', purpose: 'Sun protection' },
      { name: 'Niacinamide', purpose: 'Brightening' },
      { name: 'Hyaluronic Acid', purpose: 'Hydration' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration', 'Anti-Aging'],
    inStock: true,
    featured: false,
  },
  {
    id: '25',
    name: 'Salicylic Acid Spot Treatment',
    brand: 'Botaniq',
    category: 'treatments',
    subcategory: 'spot',
    price: 2395,
    rating: 4.3,
    reviewCount: 212,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Target blemishes overnight.',
    fullDesc: 'Apply this clear gel directly on blemishes before bed and wake up to visibly reduced spots. Salicylic acid penetrates pores to dissolve clogs while tea tree oil fights bacteria. Dries clear.',
    ingredients: [
      { name: 'Salicylic Acid (2%)', purpose: 'Pore cleansing' },
      { name: 'Tea Tree Oil', purpose: 'Antibacterial' },
      { name: 'Sulfur', purpose: 'Anti-inflammatory' },
    ],
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Acne'],
    inStock: true,
    featured: false,
  },
  {
    id: '26',
    name: 'Glycolic Resurfacing Pads',
    brand: 'Botaniq',
    category: 'treatments',
    subcategory: 'exfoliating',
    price: 4650,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Pre-soaked pads for easy exfoliation.',
    fullDesc: 'Swipe away dullness with these convenient glycolic acid pads. Dual-textured pads physically and chemically exfoliate for smooth, glowing skin. Perfect for travel and busy mornings.',
    ingredients: [
      { name: 'Glycolic Acid (10%)', purpose: 'Chemical exfoliation' },
      { name: 'Witch Hazel', purpose: 'Pore tightening' },
      { name: 'Green Tea', purpose: 'Antioxidant' },
    ],
    skinTypes: ['Normal', 'Oily'],
    concerns: ['Brightening', 'Pores', 'Fine Lines'],
    inStock: true,
    featured: false,
  },
  {
    id: '27',
    name: 'Squalane Facial Oil',
    brand: 'Botaniq',
    category: 'serums',
    subcategory: 'oil',
    price: 3720,
    rating: 4.8,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Pure, lightweight hydration for all skin types.',
    fullDesc: 'This single-ingredient hero is your skin\'s best friend. 100% plant-derived squalane mimics your natural sebum for deep, non-greasy hydration. Mix with anything or use alone as a final step.',
    ingredients: [
      { name: 'Squalane (100%)', purpose: 'Deep hydration' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration'],
    inStock: true,
    featured: false,
  },
  {
    id: '28',
    name: 'Vitamin E Night Cream',
    brand: 'Botaniq',
    category: 'moisturizers',
    subcategory: 'night',
    price: 5850,
    rating: 4.7,
    reviewCount: 93,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Rich overnight nourishment.',
    fullDesc: 'Let vitamin E work its magic while you sleep. This rich cream repairs daily damage, strengthens the skin barrier, and locks in moisture. Wake up to soft, supple, well-rested skin.',
    ingredients: [
      { name: 'Vitamin E', purpose: 'Antioxidant & healing' },
      { name: 'Avocado Oil', purpose: 'Nourishing' },
      { name: 'Cocoa Butter', purpose: 'Deep moisturizing' },
    ],
    skinTypes: ['Dry', 'Normal'],
    concerns: ['Hydration', 'Anti-Aging'],
    inStock: true,
    featured: false,
  },
  {
    id: '29',
    name: 'Honey Glow Mask',
    brand: 'Botaniq',
    category: 'masks',
    subcategory: 'hydrating',
    price: 5320,
    rating: 4.9,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Luxurious honey mask for instant glow.',
    fullDesc: 'Treat yourself to this indulgent honey mask. Raw manuka honey deeply hydrates and naturally exfoliates while propolis soothes inflammation. Rinse off to reveal luminous, honey-kissed skin.',
    ingredients: [
      { name: 'Manuka Honey', purpose: 'Hydrating & antibacterial' },
      { name: 'Propolis', purpose: 'Healing' },
      { name: 'Royal Jelly', purpose: 'Nourishing' },
    ],
    skinTypes: ['All'],
    concerns: ['Hydration', 'Brightening'],
    inStock: true,
    featured: false,
  },
  {
    id: '30',
    name: 'Pore Minimizing Primer',
    brand: 'Botaniq',
    category: 'treatments',
    subcategory: 'primer',
    price: 4520,
    rating: 4.5,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    ],
    shortDesc: 'Blur pores and prep skin for makeup.',
    fullDesc: 'Create the perfect canvas with this silky primer. Blurs pores and fine lines instantly while niacinamide works to minimize them over time. Controls oil for all-day makeup wear.',
    ingredients: [
      { name: 'Silica', purpose: 'Pore blurring' },
      { name: 'Niacinamide', purpose: 'Pore minimizing' },
      { name: 'Dimethicone', purpose: 'Smoothing' },
    ],
    skinTypes: ['All'],
    concerns: ['Pores'],
    inStock: true,
    featured: false,
  },
]

export const demoUser: User = {
  id: 'user-1',
  name: 'Anisha Sharma',
  email: 'anisha@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Anisha+Sharma&background=C97B63&color=fff&size=100',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      name: 'Anisha Sharma',
      address: '123 Durbar Marg',
      city: 'Kathmandu',
      postal: '44600',
      country: 'Nepal',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Work',
      name: 'Anisha Sharma',
      address: '456 Lazimpat Road',
      city: 'Kathmandu',
      postal: '44601',
      country: 'Nepal',
      isDefault: false,
    },
  ],
  orders: ['order-1', 'order-2', 'order-3', 'order-4', 'order-5'],
  wishlist: ['2', '6', '10', '15'],
}

export const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    orderDate: '2024-01-15',
    status: 'delivered',
    items: [
      { productId: '1', quantity: 1, price: 5990 },
      { productId: '4', quantity: 1, price: 3720 },
    ],
    subtotal: 9710,
    shipping: 0,
    tax: 1262,
    total: 10972,
    shippingAddress: demoUser.addresses[0],
    trackingNumber: 'BTQ1234567890',
    timeline: [
      { status: 'Order Placed', date: '2024-01-15 09:30 AM', details: 'Your order has been received' },
      { status: 'Processing', date: '2024-01-15 02:00 PM', details: 'Your items are being prepared' },
      { status: 'Shipped', date: '2024-01-16 10:00 AM', details: 'Package picked up by carrier' },
      { status: 'Out for Delivery', date: '2024-01-18 08:00 AM', details: 'Package is on the delivery truck' },
      { status: 'Delivered', date: '2024-01-18 02:30 PM', details: 'Package delivered to front door' },
    ],
  },
  {
    id: 'order-2',
    userId: 'user-1',
    orderDate: '2024-02-20',
    status: 'shipped',
    items: [
      { productId: '3', quantity: 1, price: 6900 },
      { productId: '7', quantity: 1, price: 6390 },
      { productId: '11', quantity: 1, price: 4790 },
    ],
    subtotal: 18080,
    shipping: 0,
    tax: 2350,
    total: 20430,
    shippingAddress: demoUser.addresses[0],
    trackingNumber: 'BTQ2345678901',
    timeline: [
      { status: 'Order Placed', date: '2024-02-20 11:00 AM', details: 'Your order has been received' },
      { status: 'Processing', date: '2024-02-20 03:30 PM', details: 'Your items are being prepared' },
      { status: 'Shipped', date: '2024-02-21 09:00 AM', details: 'Package picked up by carrier' },
    ],
  },
  {
    id: 'order-3',
    userId: 'user-1',
    orderDate: '2024-03-05',
    status: 'processing',
    items: [
      { productId: '2', quantity: 2, price: 4990 },
    ],
    subtotal: 9980,
    shipping: 0,
    tax: 1297,
    total: 11277,
    shippingAddress: demoUser.addresses[1],
    timeline: [
      { status: 'Order Placed', date: '2024-03-05 10:15 AM', details: 'Your order has been received' },
      { status: 'Processing', date: '2024-03-05 02:00 PM', details: 'Your items are being prepared' },
    ],
  },
  {
    id: 'order-4',
    userId: 'user-1',
    orderDate: '2024-03-10',
    status: 'out-for-delivery',
    items: [
      { productId: '6', quantity: 1, price: 5590 },
      { productId: '9', quantity: 1, price: 5320 },
    ],
    subtotal: 10910,
    shipping: 0,
    tax: 1418,
    total: 12328,
    shippingAddress: demoUser.addresses[0],
    trackingNumber: 'BTQ3456789012',
    timeline: [
      { status: 'Order Placed', date: '2024-03-10 08:00 AM', details: 'Your order has been received' },
      { status: 'Processing', date: '2024-03-10 12:00 PM', details: 'Your items are being prepared' },
      { status: 'Shipped', date: '2024-03-11 09:30 AM', details: 'Package picked up by carrier' },
      { status: 'Out for Delivery', date: '2024-03-13 07:30 AM', details: 'Package is on the delivery truck' },
    ],
  },
  {
    id: 'order-5',
    userId: 'user-1',
    orderDate: '2023-12-01',
    status: 'delivered',
    items: [
      { productId: '10', quantity: 1, price: 7315 },
    ],
    subtotal: 7315,
    shipping: 500,
    tax: 951,
    total: 8766,
    shippingAddress: demoUser.addresses[0],
    trackingNumber: 'BTQ0987654321',
    timeline: [
      { status: 'Order Placed', date: '2023-12-01 09:00 AM', details: 'Your order has been received' },
      { status: 'Processing', date: '2023-12-01 01:00 PM', details: 'Your items are being prepared' },
      { status: 'Shipped', date: '2023-12-02 10:00 AM', details: 'Package picked up by carrier' },
      { status: 'Out for Delivery', date: '2023-12-05 08:00 AM', details: 'Package is on the delivery truck' },
      { status: 'Delivered', date: '2023-12-05 03:00 PM', details: 'Package delivered to mailroom' },
    ],
  },
]

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: '1',
    userId: 'user-2',
    userName: 'Aarav Shrestha',
    userAvatar: 'https://ui-avatars.com/api/?name=Aarav+Shrestha&background=C97B63&color=fff&size=100',
    rating: 5,
    text: 'This serum has completely transformed my skin! My dark spots have faded significantly in just 3 weeks. The texture is lightweight and absorbs quickly. Will definitely repurchase.',
    date: '2024-01-20',
    verified: true,
    helpful: 24,
    skinType: 'Combination',
  },
  {
    id: 'rev-2',
    productId: '1',
    userId: 'user-3',
    userName: 'Pooja Gurung',
    userAvatar: 'https://ui-avatars.com/api/?name=Pooja+Gurung&background=D4A373&color=fff&size=100',
    rating: 4,
    text: 'Great serum for brightening. I use it every morning and have noticed my skin looks more even. Taking off one star because it can feel slightly sticky on humid days.',
    date: '2024-02-05',
    verified: true,
    helpful: 12,
    skinType: 'Oily',
  },
  {
    id: 'rev-3',
    productId: '2',
    userId: 'user-4',
    userName: 'Rohan Adhikari',
    userAvatar: 'https://ui-avatars.com/api/?name=Rohan+Adhikari&background=A8C5A8&color=fff&size=100',
    rating: 5,
    text: 'Holy grail product! My skin has never been more hydrated. I use it morning and night, and it layers beautifully under makeup. The glass-skin effect is real!',
    date: '2024-01-28',
    verified: true,
    helpful: 45,
    skinType: 'Dry',
  },
  {
    id: 'rev-4',
    productId: '3',
    userId: 'user-5',
    userName: 'Sujata Karki',
    userAvatar: 'https://ui-avatars.com/api/?name=Sujata+Karki&background=E9C9B6&color=2C2C2C&size=100',
    rating: 5,
    text: 'Finally a retinol that doesn\'t irritate my skin! I\'ve been using it for a month and can already see improvement in my fine lines. The encapsulated formula is genius.',
    date: '2024-02-10',
    verified: true,
    helpful: 32,
    skinType: 'Sensitive',
  },
  {
    id: 'rev-5',
    productId: '4',
    userId: 'user-6',
    userName: 'Bishal Thapa',
    userAvatar: 'https://ui-avatars.com/api/?name=Bishal+Thapa&background=C97B63&color=fff&size=100',
    rating: 4,
    text: 'Such a gentle cleanser! Removes my makeup well without stripping my skin. The foam is cloud-like and has a subtle, fresh scent. Perfect for double cleansing.',
    date: '2024-01-15',
    verified: true,
    helpful: 18,
    skinType: 'Normal',
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-vitamin-c',
    title: 'The Ultimate Guide to Vitamin C in Skincare',
    category: 'Ingredients',
    excerpt: 'Everything you need to know about incorporating Vitamin C into your routine for brighter, more even-toned skin.',
    content: `Vitamin C is one of the most researched and proven skincare ingredients. Here's why it deserves a spot in your routine...`,
    author: 'Dr. Priya Thapa',
    authorAvatar: 'https://ui-avatars.com/api/?name=Priya+Thapa&background=C97B63&color=fff&size=100',
    date: '2024-02-15',
    readTime: '8 min read',
    featuredImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=400&fit=crop',
    tags: ['Vitamin C', 'Brightening', 'Antioxidants'],
  },
  {
    slug: 'korean-skincare-routine',
    title: '10-Step Korean Skincare Routine Explained',
    category: 'Routines',
    excerpt: 'Demystifying the famous K-beauty routine and how to adapt it for your skin type.',
    content: `The 10-step Korean skincare routine has taken the beauty world by storm. But do you really need all 10 steps?...`,
    author: 'Manisha K.C.',
    authorAvatar: 'https://ui-avatars.com/api/?name=Manisha+KC&background=D4A373&color=fff&size=100',
    date: '2024-02-10',
    readTime: '12 min read',
    featuredImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop',
    tags: ['K-Beauty', 'Routine', 'Skincare Tips'],
  },
  {
    slug: 'retinol-vs-bakuchiol',
    title: 'Retinol vs Bakuchiol: Which is Right for You?',
    category: 'Ingredients',
    excerpt: 'Comparing the gold standard anti-aging ingredient with its gentle, plant-based alternative.',
    content: `When it comes to anti-aging, retinol has long been the gold standard. But bakuchiol is making waves as a gentler alternative...`,
    author: 'Dr. Sarita Gurung',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sarita+Gurung&background=A8C5A8&color=fff&size=100',
    date: '2024-02-05',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=400&fit=crop',
    tags: ['Retinol', 'Bakuchiol', 'Anti-Aging'],
  },
  {
    slug: 'understanding-skin-barrier',
    title: 'Understanding Your Skin Barrier (And How to Fix It)',
    category: 'Skin Science',
    excerpt: 'Learn why your skin barrier matters and signs that it might be compromised.',
    content: `Your skin barrier is like a shield protecting you from the outside world. When it's damaged, everything goes wrong...`,
    author: 'Dr. Priya Thapa',
    authorAvatar: 'https://ui-avatars.com/api/?name=Priya+Thapa&background=C97B63&color=fff&size=100',
    date: '2024-01-28',
    readTime: '10 min read',
    featuredImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=400&fit=crop',
    tags: ['Skin Barrier', 'Ceramides', 'Skin Health'],
  },
  {
    slug: 'skincare-for-men',
    title: 'Skincare for Men: A No-Nonsense Guide',
    category: 'Guides',
    excerpt: 'A straightforward approach to building an effective skincare routine for men.',
    content: `Skincare isn't just for women. Here's a simple, effective routine that any guy can follow...`,
    author: 'Jenish Maharjan',
    authorAvatar: 'https://ui-avatars.com/api/?name=Jenish+Maharjan&background=E9C9B6&color=2C2C2C&size=100',
    date: '2024-01-20',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop',
    tags: ['Men', 'Beginner', 'Routine'],
  },
]

export const routines = [
  {
    id: 'morning',
    name: 'Morning Glow',
    description: 'Start your day with radiant, protected skin',
    duration: '10 minutes',
    products: ['4', '5', '2', '8', '11'],
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop',
  },
  {
    id: 'evening',
    name: 'Evening Repair',
    description: 'Let your skin recover while you sleep',
    duration: '15 minutes',
    products: ['17', '4', '5', '9', '3'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop',
  },
  {
    id: 'weekly',
    name: 'Weekly Reset',
    description: 'Deep treatment for weekly pampering',
    duration: '30 minutes',
    products: ['6', '12', '27'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId)
}

export function getOrderById(orderId: string): Order | undefined {
  return orders.find(o => o.id === orderId)
}

export function getUserOrders(userId: string): Order[] {
  return orders.filter(o => o.userId === userId)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}
