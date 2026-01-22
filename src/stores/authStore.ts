import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

interface User {
  id: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  bootstrapAuth: () => Promise<void>;
  clearAuth: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isHydrated: false,

  /* --------------------------------------------------
     Bootstrap auth + role (single source of truth)
  -------------------------------------------------- */
  bootstrapAuth: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        set({ isHydrated: true });
        return;
      }

      const userId = session.user.id;

      // 🔒 Fetch role ONLY from profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error || !profile?.role) {
        console.error("Failed to resolve role from profiles");
        set({ isHydrated: true });
        return;
      }

      set({
        user: {
          id: userId,
          email: session.user.email ?? "",
          roles: [profile.role.toLowerCase().trim()],
        },
        accessToken: session.access_token,
        isAuthenticated: true,
        isHydrated: true,
      });
    } catch (err) {
      console.error("Auth bootstrap failed:", err);
      set({ isHydrated: true });
    }
  },

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Supabase logout failed:", err);
    } finally {
      get().clearAuth();
      localStorage.removeItem("access_token");
    }
  },
}));
