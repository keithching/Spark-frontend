// Zustand state management 
// https://www.npmjs.com/package/zustand
// https://blog.devgenius.io/managing-persistent-states-in-nextjs-with-zustand-e6feea1a2d36
import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const useCart = create(
    persist(
        (set, get) => ({
            counter: 0,
            events: [],
            updateCounter: () => set({ counter: get().events.length }),
            addToEvents: (id) => set({ events: get().events.concat(id) }),
            removeFromEvents: (id) => set({ events: get().events.filter(event => event !== id) })
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => localStorage)
        }
    )
)