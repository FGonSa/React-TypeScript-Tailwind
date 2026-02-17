import type { StateCreator } from "zustand";

export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("user"); // Limpiamos el usuario del localStorage al hacer logout
    window.location.href = "/"; // Redirigimos al usuario a la página de login
  },
});