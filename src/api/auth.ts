const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export type UserRole = "talent" | "organization";

/* ───────────────────────── Signup (Generic) ───────────────────────── */

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface SignupResponse {
  message: string;
  user_id: string;
  email: string;
  full_name?: string;
  role?: UserRole;
  needs_confirmation: boolean;
  confirmation_sent_to?: string | null;
}

export async function signup(payload: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail ?? "Signup failed");
  }

  return data as SignupResponse;
}

/* ───────────────────────── Signup (Organization) ───────────────────────── */

export interface OrgSignupRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface OrgSignupResponse {
  message: string;
  user_id: string;
  email: string;
  full_name?: string;
  role: "organization";
  needs_confirmation: boolean;
  confirmation_sent_to?: string | null;
}

export async function orgSignup(
  payload: OrgSignupRequest,
): Promise<OrgSignupResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/orgsignup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail ?? "Organization signup failed");
  }

  return data as OrgSignupResponse;
}

/* ───────────────────────── Login ───────────────────────── */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
  role?: UserRole;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail ?? "Invalid email or password");
  }

  return data as LoginResponse;
}

/* ───────────────────────── Forgot Password ───────────────────────── */

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  ok: true;
}

export async function forgotPassword(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Always parse, backend should always return 200
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail ?? "Failed to request password reset");
  }

  return data as ForgotPasswordResponse;
}

/* ───────────────────────── Reset Password ───────────────────────── */

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  ok: true;
}

export async function resetPassword(
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail ?? "Invalid or expired reset token");
  }

  return data as ResetPasswordResponse;
}
