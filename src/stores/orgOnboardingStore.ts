// stores/orgOnboardingStore.ts
import { create } from 'zustand';

interface OrgStep1 {
  organization_name: string;
  organization_type: string;
  website_url: string;
  linkedin_url: string;
  organization_domain: string;
  user_role_in_org: string;
  other_role_specify?: string;
  other_domain_specify?: string;
  other_type_specify?: string;
}

interface OrgStep2 {
  opportunity_durations: string[];
  open_to_early_talent: boolean;
  support_style: string;
  non_negotiables: string[];
  preferred_selection_method: string;
  industry_domain: string;
}

interface OrgStep3 {
  primary_contact_name: string;
  primary_contact_email: string;
  typical_hiring_urgency: string;
  org_description: string;
  description: string;
}

interface OrgOnboardingState {
  step1: OrgStep1;
  step2: OrgStep2;
  step3: OrgStep3;

  onboarding_step: number;
  onboarding_completed: boolean;

  setStep1: (data: Partial<OrgStep1>) => void;
  setStep2: (data: Partial<OrgStep2>) => void;
  setStep3: (data: Partial<OrgStep3>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOrgOnboardingStore = create<OrgOnboardingState>((set) => ({
  step1: {
    organization_name: "",
    organization_type: "",
    website_url: "",
    linkedin_url: "",
    organization_domain: "",
    user_role_in_org: "",
    other_role_specify: "",
    other_domain_specify: "",
    other_type_specify: "",
  },
  step2: {
    opportunity_durations: [],
    open_to_early_talent: true,
    support_style: "",
    non_negotiables: [],
    preferred_selection_method: "",
    industry_domain: "",
  },
  step3: {
    primary_contact_name: "",
    primary_contact_email: "",
    typical_hiring_urgency: "",
    org_description: "",
    description: "",
  },

  onboarding_step: 0,
  onboarding_completed: false,

  setStep1: (data) => set((state) => ({
    step1: { ...state.step1, ...data },
  })),

  setStep2: (data) => set((state) => ({
    step2: { ...state.step2, ...data },
  })),

  setStep3: (data) => set((state) => ({
    step3: { ...state.step3, ...data },
  })),

  setOnboardingStep: (step) => set({ onboarding_step: step }),

  completeOnboarding: () => set({
    onboarding_completed: true,
    onboarding_step: 3,
  }),

  resetOnboarding: () => set({
    step1: {
      organization_name: "",
      organization_type: "",
      website_url: "",
      linkedin_url: "",
      organization_domain: "",
      user_role_in_org: "",
      other_role_specify: "",
      other_domain_specify: "",
      other_type_specify: "",
    },
    step2: {
      opportunity_durations: [],
      open_to_early_talent: true,
      support_style: "",
      non_negotiables: [],
      preferred_selection_method: "",
      industry_domain: "",
    },
    step3: {
      primary_contact_name: "",
      primary_contact_email: "",
      typical_hiring_urgency: "",
      org_description: "",
      description: "",
    },
    onboarding_step: 0,
    onboarding_completed: false,
  }),
}));