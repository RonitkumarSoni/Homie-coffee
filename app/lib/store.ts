import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    roastType: string
}

interface CartStore {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, delta: number) => void
    clearCart: () => void
    toggleCart: () => void
    setOpen: (open: boolean) => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === newItem.id)
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === newItem.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                            isOpen: true, // Open cart when adding
                        }
                    }
                    return {
                        items: [...state.items, { ...newItem, quantity: 1 }],
                        isOpen: true,
                    }
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, delta) =>
                set((state) => {
                    const newItems = state.items.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity: Math.max(0, item.quantity + delta) }
                        }
                        return item
                    }).filter(item => item.quantity > 0)

                    return { items: newItems }
                }),
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            setOpen: (open) => set({ isOpen: open }),
        }),
        {
            name: 'homie-cart-storage',
        }
    )
)
