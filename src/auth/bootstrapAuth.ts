import api from "../lib/api";
import { useAuthStore } from "../stores/authStore";

let bootstrapPromise: Promise<void> | null = null;

export const bootstrapAuth = () => {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      try {
        const response = await api.post("/auth/refresh");
        const { accessToken, user } = response.data;

        useAuthStore.getState().setAuth(user, accessToken);
      } catch {
        useAuthStore.getState().clearAuth();
      } finally {
        useAuthStore.getState().setHydrated();
      }
    })();
  }

  return bootstrapPromise;
};
