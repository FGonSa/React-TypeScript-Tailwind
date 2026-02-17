import { create } from "zustand";
import { createTaskSlice, type TaskState } from "./TaskSlice";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import type { AuthState } from "./authSlice";

// Combinamos las interfaces
type FullStoreState = TaskState & AuthState;

export const useGeneralStore = create<FullStoreState>()(
  persist(
    (...a) => ({
      ...createTaskSlice(...a),
      ...createAuthSlice(...a),
    }),
    { name: 'task-app-storage' } // Nombre del LocalStorage
  )
);


// export const useGeneralStore = create<TaskState>((...args) => ({
//     ...createTaskSlice(...args),
// }))