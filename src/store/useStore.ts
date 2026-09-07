import { create } from 'zustand';

export type Routine = {
  id: string;
  title: string;
  time: string;
  icon: string; // We'll use expo-vector-icons names or emoji
  completed: boolean;
};

interface AppState {
  role: 'patient' | 'caregiver' | null;
  setRole: (role: 'patient' | 'caregiver' | null) => void;
  
  // Mock Data for Patient Schedule
  routines: Routine[];
  toggleRoutine: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),

  routines: [
    { id: '1', title: 'Wake Up', time: '7:00 AM', icon: '⏰', completed: true },
    { id: '2', title: 'Brush Teeth', time: '7:15 AM', icon: '🪥', completed: false },
    { id: '3', title: 'Get Dressed', time: '7:30 AM', icon: '👕', completed: false },
    { id: '4', title: 'Eat Breakfast', time: '8:00 AM', icon: '🥣', completed: false },
    { id: '5', title: 'Pack Backpack', time: '8:30 AM', icon: '🎒', completed: false },
    { id: '6', title: 'Go to School', time: '9:00 AM', icon: '🚌', completed: false },
  ],
  toggleRoutine: (id) =>
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === id ? { ...routine, completed: !routine.completed } : routine
      ),
    })),
}));
