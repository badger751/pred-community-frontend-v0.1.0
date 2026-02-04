import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './validation.css';
import App from './App';
import { supabase } from './lib/supabaseClient';
import { useAuthStore } from './stores/authStore';
import { Toaster } from 'react-hot-toast';

/* --------------------------------------------------
   Mount the React app
-------------------------------------------------- */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#f3f4f6',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  </StrictMode>,
);

/* --------------------------------------------------
   Auth bootstrap (single source of truth)
-------------------------------------------------- */

console.log('[main.tsx] Bootstrapping auth');

const authStore = useAuthStore.getState();

/**
 * IMPORTANT:
 * On cold load, Supabase restores session async.
 * We must wait for it before marking auth hydrated.
 */
(async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    await authStore.bootstrapAuth();
  } else {
    authStore.clearAuth(); // ensures hydrated = true
  }
})();

/* --------------------------------------------------
   Listen for auth state changes
-------------------------------------------------- */

supabase.auth.onAuthStateChange((event) => {
  console.log('[main.tsx] Auth event:', event);

  switch (event) {
    case 'SIGNED_OUT':
      authStore.clearAuth();
      break;

    case 'SIGNED_IN':
    case 'TOKEN_REFRESHED':
      authStore.bootstrapAuth();
      break;

    default:
      break;
  }
});
