// Zustand state management 
// https://www.npmjs.com/package/zustand
// https://blog.devgenius.io/managing-persistent-states-in-nextjs-with-zustand-e6feea1a2d36

// How to migrate Zustand local storage store to a new version
// https://relatablecode.com/how-to-migrate-zustand-local-storage-store-to-a-new-version
import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const useCart = create(
    persist(
        (set, get) => ({
            counter: 0,
            increaseCounter: () => set({ counter: get().counter + 1 })
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
// JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).counter : 0