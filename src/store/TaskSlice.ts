import {
  editTask,
  getTasksByUser,
  removeTask,
  toggleFavorite,
} from "./../services/TaskService";
import type { StateCreator } from "zustand";
import { addTask, fetchTasks } from "../services/TaskService";
import type { User } from "./authSlice";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: "Baja" | "Media" | "Alta";
  isFavorite: boolean;
  userId: string;
};

export type TaskState = {
  user: User | null;
  tasks: Task[];
  loading: boolean;
  error: null | string;
  addTask: (task: Task) => void;
  getTaskById: (id: string) => Task | undefined;
  removeTask: (id: string) => Promise<boolean>;
  editTask: (id: string, taskActualizada: Task) => void;
  // getTasksByUser: (userId: string) => Promise<Task[]>;
  fetchTasks: (user:User) => Promise<void>;
  toggleFavorite: (id: string, isFavorite: boolean) => void;
};

export const createTaskSlice: StateCreator<TaskState> = (set, get) => ({
  user: null, // Obtenemos el usuario del estado actual
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async (user) => {
    set({ loading: true });
    if (!user) return;

    const tasks = await fetchTasks(user.id);
    set({ tasks, loading: false });
  },
  addTask: async (newTask: Task) => {
    set({ loading: true });
    const savedTask = await addTask(newTask);
    if (savedTask == ({} as Task)) {
      alert("Error al añadir la tarea, por favor inténtalo de nuevo.");
    } else {
      set((state) => ({ tasks: [...state.tasks, savedTask] }));
    }
    set({ loading: false });
  },
  getTaskById: (id: string) => {
    const task = get().tasks.find((task) => task.id === id);
    return task;
  },
  removeTask: async (id: string) => {
    let result = false;
    result = await removeTask(id);

    if (result) {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      alert("Tarea eliminada del estado.");
    } else {
      alert("Error al eliminar la tarea, por favor inténtalo de nuevo.");
    }
    return result;
  },
  editTask: async (id: string, taskActualizada: Task) => {
    const updatedTask = await editTask(id, taskActualizada);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
    }));
  },

  // getTasksByUser: async (userId: number): Promise<Task[]> => {
  //   const tasks = await getTasksByUser(userId);
  //   return tasks;
  // },

  toggleFavorite: async (id: string, isFavorite: boolean) => {
    const toggle = await toggleFavorite(id, isFavorite);
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isFavorite: toggle.isFavorite } : t,
      ),
    }));
  },
});
