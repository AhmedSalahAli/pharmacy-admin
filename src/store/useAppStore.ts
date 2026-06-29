import { create } from 'zustand';

type AppState = {
  appName: string;
  userName: string;
  setUserName: (name: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  appName: 'Pharmacy Admin',
  userName: 'Ahmed Salah Ali',
  setUserName: (name) => set({ userName: name }),
}));