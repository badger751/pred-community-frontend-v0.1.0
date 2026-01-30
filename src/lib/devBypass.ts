// Build-time constants for secure dev bypass
// These are replaced by Vite at build time
const IS_DEV = !import.meta.env.PROD;
const IS_PROD = import.meta.env.PROD;

/**
 * ONLY AVAILABLE IN DEVELOPMENT
 * Uses build-time constants to ensure bypass code is eliminated from production
 */
export const devBypass = {
  get isEnabled(): boolean {
    // Early return in production - this entire block gets eliminated
    if (IS_PROD) return false;
    
    // Only check localStorage in development
    return IS_DEV && localStorage.getItem("devBypassAuth") === "true";
  },
  
  set enabled(value: boolean) {
    // No-op in production - this gets eliminated
    if (IS_PROD) return;
    
    if (IS_DEV) {
      localStorage.setItem("devBypassAuth", String(value));
    }
  },
  
  toggle(): boolean {
    // No-op in production - this gets eliminated
    if (IS_PROD) return false;
    
    const newValue = !this.isEnabled;
    this.enabled = newValue;
    return newValue;
  }
};

/**
 * Mock user data for development bypass
 */
export const devMockUser = {
  id: "dev-bypass-user",
  email: "dev@example.com",
  roles: ["talent"],
};