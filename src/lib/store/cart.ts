import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  produitId: string
  nom: string
  prix: number
  imageUrl: string
  textePersonnalisation: string
  policeId: string
  policeNom: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  salonCode: string | null

  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setSalonCode: (code: string) => void

  // Computed
  getTotal: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      salonCode: null,

      addItem: (item) => {
        const id = `${item.produitId}-${item.textePersonnalisation}-${item.policeId}-${Date.now()}`
        set((state) => ({
          items: [...state.items, { ...item, id }]
        }))
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      setSalonCode: (code) => {
        set({ salonCode: code })
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.prix * item.quantity,
          0
        )
      },

      getSubtotal: () => {
        return get().getTotal()
      }
    }),
    {
      name: 'ava-cart-storage',
    }
  )
)

// Frais de livraison
export const FRAIS_LIVRAISON = {
  boutique: 0,
  mondial_relay_point: 4.99,
  mondial_relay_domicile: 7.99,
} as const

export type ModeLivraison = keyof typeof FRAIS_LIVRAISON
