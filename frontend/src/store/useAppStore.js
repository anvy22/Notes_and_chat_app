import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isSidebarOpen: false,
  isMobile: false,
  activeView: 'chats',
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setActiveView: (view) => set({ activeView: view }),
}));