import { create } from 'zustand';

type AppState = {
  appName: string;
  userName: string;
  sidebarCollapsed: boolean;
  setUserName: (name: string) => void;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  appName: 'Pharmacy Admin',
  userName: 'Ahmed',
  sidebarCollapsed: false,
  setUserName: (name) => set({ userName: name }),
  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),
}));