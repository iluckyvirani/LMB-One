import { create } from "zustand";

type DrawerStore = {
  menuOpen: boolean;
  cartOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  menuOpen: false,
  cartOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),
}));
