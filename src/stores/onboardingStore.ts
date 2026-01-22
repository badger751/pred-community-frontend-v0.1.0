// stores/onboardingStore.ts
import { create } from 'zustand';

interface Step1Data {
  focus_right_now: string;
  domains: string[];
  weekly_commitment: string;
  opportunity_types: string[];
}

interface Step2Data {
  city: string;
  country: string;
  timezone: string;
  current_status: string;
  education_level: string;
  major_specialization: string;
}

interface Step3Data {
  work_style: string;
  start_timeline: string;
  age_range: string;
  availability: string;
}

interface OnboardingState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  onboarding_step: number;
  onboarding_completed: boolean;

  setStep1: (data: Partial<Step1Data>) => void;
  setStep2: (data: Partial<Step2Data>) => void;
  setStep3: (data: Partial<Step3Data>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step1: {
    focus_right_now: "",
    domains: [],
    weekly_commitment: "",
    opportunity_types: [],
  },
  step2: {
    city: "",
    country: "",
    timezone: "",
    current_status: "",
    education_level: "",
    major_specialization: "",
  },
  step3: {
    work_style: "",
    start_timeline: "",
    age_range: "",
    availability: "",
  },

  onboarding_step: 0,
  onboarding_completed: false,

  setStep1: (data) => {
    console.log("[Store] Saving Step 1:", data);
    set((state) => {
      const newState = { ...state, step1: { ...state.step1, ...data } };
      console.log("[Store] After Step 1:", newState.step1);
      return newState;
    });
  },

  setStep2: (data) => {
    console.log("[Store] Saving Step 2:", data);
    set((state) => {
      const newState = { ...state, step2: { ...state.step2, ...data } };
      console.log("[Store] After Step 2:", newState.step2);
      return newState;
    });
  },

  setStep3: (data) => {
    console.log("[Store] Saving Step 3:", data);
    set((state) => {
      const newState = { ...state, step3: { ...state.step3, ...data } };
      console.log("[Store] After Step 3:", newState.step3);
      return newState;
    });
  },

  setOnboardingStep: (step) => set({ onboarding_step: step }),

  completeOnboarding: () => set({ onboarding_completed: true, onboarding_step: 3 }),

  resetOnboarding: () => set({
    step1: { focus_right_now: "", domains: [], weekly_commitment: "", opportunity_types: [] },
    step2: { city: "", country: "", timezone: "", current_status: "", education_level: "", major_specialization: "" },
    step3: { work_style: "", start_timeline: "", age_range: "", availability: "" },
    onboarding_step: 0,
    onboarding_completed: false,
  }),
}));