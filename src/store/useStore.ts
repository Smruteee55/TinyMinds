import { create } from 'zustand';

interface AppState {
  role: 'patient' | 'caregiver' | null;
  setRole: (role: 'patient' | 'caregiver' | null) => void;
}

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
