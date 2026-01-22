import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { supabase } from "../lib/supabaseClient";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/* --------------------------------------------------
   Attach Supabase access token
-------------------------------------------------- */
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/* --------------------------------------------------
   Handle unauthorized responses
-------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("[API] 401 received → logging out");
      await useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default api;
