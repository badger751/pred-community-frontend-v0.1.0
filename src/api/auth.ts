// Dummy Auth API (TypeScript safe, backend-ready)

export type Role = "talent" | "organization";

export interface LoginResponse {
  success: boolean;
  role: Role;
}

export interface SignupResponse {
  success: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  return {
    success: true,
    role: "talent", // change to "organization" to test
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<SignupResponse> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  return {
    success: true,
  };
};
