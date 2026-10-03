'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, User, Address } from './data'
import { demoUser } from './data'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

interface WishlistStore {
  items: string[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (addressId: string, updates: Partial<Address>) => void
  removeAddress: (addressId: string) => void
  setDefaultAddress: (addressId: string) => void
}

interface SearchStore {
  isOpen: boolean
  query: string
  openSearch: () => void
  closeSearch: () => void
  setQuery: (query: string) => void
}

interface MiniCartStore {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.product.salePrice ?? item.product.price
          return total + price * item.quantity
        }, 0)
      },
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'botaniq-cart',
    }
  )
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items
            : [...state.items, productId],
        }))
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(id => id !== productId),
        }))
      },
      isInWishlist: (productId) => {
        return get().items.includes(productId)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'botaniq-wishlist',
    }
  )
)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        // Demo authentication - accepts any credentials
        await new Promise(resolve => setTimeout(resolve, 500))
        const user = email === 'sophia@example.com' 
          ? demoUser 
          : {
              ...demoUser,
              id: 'user-new',
              email,
              name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User',
            }
        set({ user, isAuthenticated: true })
        return true
      },
      signup: async (name: string, email: string, _password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const user: User = {
          ...demoUser,
          id: 'user-new',
          name,
          email,
          orders: [],
          wishlist: [],
          addresses: [],
        }
        set({ user, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },
      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
        }
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: [...state.user.addresses, newAddress],
              }
            : null,
        }))
      },
      updateAddress: (addressId, updates) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map(addr =>
                  addr.id === addressId ? { ...addr, ...updates } : addr
                ),
              }
            : null,
        }))
      },
      removeAddress: (addressId) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.filter(addr => addr.id !== addressId),
              }
            : null,
        }))
      },
      setDefaultAddress: (addressId) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map(addr => ({
                  ...addr,
                  isDefault: addr.id === addressId,
                })),
              }
            : null,
        }))
      },
    }),
    {
      name: 'botaniq-auth',
    }
  )
)

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  query: '',
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  setQuery: (query) => set({ query }),
}))

export const useMiniCartStore = create<MiniCartStore>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}))
