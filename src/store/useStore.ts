import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type Routine = {
  id: string;
  title: string;
  time: string;
  icon: string;
  completed: boolean;
};

interface AppState {
  role: 'patient' | 'caregiver' | null;
  setRole: (role: 'patient' | 'caregiver' | null) => void;
  
  routines: Routine[];
  isLoading: boolean;
  
  fetchRoutines: () => Promise<void>;
  toggleRoutine: (id: string, currentStatus: boolean) => Promise<void>;
  addRoutine: (routine: Omit<Routine, 'id' | 'completed'>) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  role: null,
  setRole: (role) => set({ role }),

  routines: [],
  isLoading: false,

  fetchRoutines: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching routines:', error);
    } else if (data) {
      set({ routines: data as Routine[] });
    }
    set({ isLoading: false });
  },

  toggleRoutine: async (id, currentStatus) => {
    // Optimistic UI update
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === id ? { ...routine, completed: !currentStatus } : routine
      ),
    }));

    // Database update
    const { error } = await supabase
      .from('routines')
      .update({ completed: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating routine:', error);
      // Revert optimistic update on error
      get().fetchRoutines();
    }
  },

  addRoutine: async (routine) => {
    const { data, error } = await supabase
      .from('routines')
      .insert([{ ...routine, completed: false }])
      .select();

    if (error) {
      console.error('Error adding routine:', error);
    } else if (data) {
      set((state) => ({
        routines: [...state.routines, data[0] as Routine],
      }));
    }
  },

  deleteRoutine: async (id) => {
    // Optimistic UI update
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== id),
    }));

    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting routine:', error);
      get().fetchRoutines();
    }
  },
}));
