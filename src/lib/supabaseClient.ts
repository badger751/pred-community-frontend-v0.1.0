import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,          // must be https://your-project-ref.supabase.co
  import.meta.env.VITE_SUPABASE_ANON_KEY,     // public anon key
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: localStorage,
    },
    global: {
      headers: {
        'Accept': 'application/json',         // ← add this if missing
        'Content-Type': 'application/json',
      },
    },
  }
);