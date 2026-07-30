import { create } from 'zustand';

type AppState = {
  appName: string;
  sidebarCollapsed: boolean;

  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  appName: 'Pharmacy Admin',
  sidebarCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),
}));
