import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../lib/api';
import toast from 'react-hot-toast';

// --- Types for Opportunity Creation ---

interface CoreDetails {
  opportunity_type: string;
  title?: string;
  domain?: string;
  work_setup: string;
  weekly_time_commitment?: string;
  duration?: string;
  compensation_type: string;
  compensation_amount?: string;
  difficulty: string;
  difficulty_details?: string;
  start_date_type: string;
  start_date?: Date;
  website_url?: string;
  linkedin_url?: string;
  primary_contact_phone?: string;
}

interface WorkScope {
  description: string;
  key_deliverables: string;
  support_level: string;
  talent_engagement: string;
  primary_communication_mode: string;
  application_requirements: string[];
  primary_contact_name?: string;
  primary_contact_email?: string;
}

interface OpportunityCreationState {
  // Form Data
  coreDetails: CoreDetails;
  workScope: WorkScope;
  
  // Form Management
  current_step: number;
  is_draft: boolean;
  opportunity_id?: string;
  last_saved: Date | null;
  is_loading: boolean;
  error: string | null;
}

interface OpportunityCreationActions {
  // Core Details Actions
  setCoreDetails: (data: Partial<CoreDetails>) => void;
  
  // Work Scope Actions  
  setWorkScope: (data: Partial<WorkScope>) => void;
  
  // Navigation Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  
  // Validation Actions
  isDataValidForSave: () => { coreValid: boolean; workScopeValid: boolean; isValid: boolean };
  
  // Persistence Actions
  saveOpportunity: (isDraft?: boolean) => Promise<{ success: boolean; data?: { id: string }; error?: string }>;
  saveDraft: () => Promise<{ success: boolean; data?: { id: string }; error?: string }>;
  loadDraft: (id: string) => Promise<void>;
  submitOpportunity: () => Promise<{ success: boolean; error?: string }>;
  
  // Management Actions
  resetForm: () => void;
  clearError: () => void;
  clearStepError: () => void;
  navigateToStep: (step: number) => void;
  

}

type OpportunityCreationStore = OpportunityCreationState & OpportunityCreationActions;

// --- Default Values ---
const defaultCoreDetails: CoreDetails = {
  opportunity_type: '',
  work_setup: '',
  compensation_type: '',
  difficulty: '',
  start_date_type: '',
};

const defaultWorkScope: WorkScope = {
  description: '',
  key_deliverables: '',
  support_level: '',
  talent_engagement: '',
  primary_communication_mode: '',
  application_requirements: [],
};

// --- Validation Functions ---
const validateCoreDetails = (data: CoreDetails): boolean => {
  return !!(
    data.opportunity_type &&
    data.work_setup &&
    data.compensation_type &&
    data.difficulty &&
    data.start_date_type
  );
};

const validateWorkScope = (data: WorkScope): boolean => {
  return !!(
    data.description &&
    data.key_deliverables &&
    data.support_level &&
    data.talent_engagement &&
    data.primary_communication_mode &&
    data.application_requirements?.length > 0
  );
};

// --- Enum Mapping Functions ---
const mapWorkMode = (work_setup: string): string => {
  const mapping: Record<string, string> = {
    'Remote': 'remote',
    'Hybrid': 'hybrid', 
    'In-Person': 'onsite',
    'Flexible': 'flexible'
  };
  return mapping[work_setup] || 'flexible';
};

const mapExperienceLevel = (difficulty: string): string => {
  const mapping: Record<string, string> = {
    'Beginner-Friendly': 'entry',
    'Intermediate': 'intermediate', 
    'Advanced': 'senior'
  };
  return mapping[difficulty] || 'any';
};

const mapOpportunityType = (type: string): string => {
  const mapping: Record<string, string> = {
    'Short term project': 'project',
    'Long term project': 'project',
    'Contract role': 'contract',
    'Internship': 'internship',
    'Full-time role': 'full_time',
    'Research Gig': 'research',
    'Other': 'project'
  };
  return mapping[type] || 'project';
};

const mapCompensationType = (type: string): string => {
  const mapping: Record<string, string> = {
    'paid': 'paid',
    'unpaid': 'unpaid',
    'stipend': 'stipend',
    'equity': 'equity',
    'volunteer': 'volunteer',
    'performance_based': 'performance_based'
  };
  return mapping[type] || 'paid';
};

// --- Validation Helper Functions ---
const isValidEmail = (email: string): boolean => {
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return basicEmailRegex.test(email.trim());
};

const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Common validation helpers
const validators = {
  email: (value: string) => value ? isValidEmail(value) : true,
  url: (value: string) => value ? isValidUrl(value) : true,
  phone: (value: string) => value ? isValidPhone(value) : true,
  number: (value: string) => value ? !isNaN(Number(value)) : true,
  required: (value: string) => value?.trim().length > 0,
  minLength: (value: string, min: number) => value?.length >= min,
  maxLength: (value: string, max: number) => value?.length <= max
};

// Map of field names to user-friendly messages
const fieldMessages = {
  'primary_contact_email': 'Email address must be valid (e.g., user@example.com)',
  'website_url': 'Website URL must include http:// or https://',
  'linkedin_url': 'LinkedIn URL must include https://linkedin.com/',
  'primary_contact_phone': 'Phone number must include country code (e.g., +1 555-123-4567)',
  'compensation_amount': 'Compensation amount must be a valid number',
  'title': 'Title is required',
  'description': 'Description is required',
  'domain': 'Domain is required'
};

// --- Data Mapping Function ---
const mapToBackendFormat = (coreDetails: CoreDetails, workScope: WorkScope, isDraft: boolean) => ({
  // Core Details
  title: coreDetails.title || '',
  description: workScope.description || '',
  opportunity_type: mapOpportunityType(coreDetails.opportunity_type),
  domain: coreDetails.domain || '',
  work_mode: mapWorkMode(coreDetails.work_setup),
  weekly_time_commitment: coreDetails.weekly_time_commitment || '',
  duration: coreDetails.duration || '',
  compensation_type: mapCompensationType(coreDetails.compensation_type),
  compensation_range: coreDetails.compensation_amount || '',
  experience_level: mapExperienceLevel(coreDetails.difficulty),
  start_timeline: coreDetails.start_date_type || '',
  start_date: coreDetails.start_date?.toISOString(),
  
  // Work Scope
  deliverables: workScope.key_deliverables 
    ? workScope.key_deliverables.split('\n').filter(Boolean)
    : [],
  mentorship_provided: workScope.support_level === 'Training-friendly',
  talent_engagement: workScope.talent_engagement || '',
  primary_communication_mode: workScope.primary_communication_mode || '',
  application_requirements: workScope.application_requirements || [],
  primary_contact_name: workScope.primary_contact_name || '',
  primary_contact_email: workScope.primary_contact_email || '',
  
  // Status
  status: isDraft ? 'draft' : 'live',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

// --- Store Creation ---
export const useOpportunityCreationStore = create<OpportunityCreationStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      coreDetails: defaultCoreDetails,
      workScope: defaultWorkScope,
      current_step: 1,
      is_draft: true,
      opportunity_id: undefined,
      last_saved: null,
      is_loading: false,
      error: null,

      // Core Details Actions
      setCoreDetails: (data: Partial<CoreDetails>) => {
        console.log('[OpportunityStore] Setting core details:', data);
        
        // Update store state
        set((state) => ({
          coreDetails: { ...state.coreDetails, ...data }
        }));
      },

      // Work Scope Actions
      setWorkScope: (data: Partial<WorkScope>) => {
        console.log('[OpportunityStore] Setting work scope:', data);
        
        // Update store state - NO AUTO-SAVE (explicit save only)
        set((state) => ({
          workScope: { ...state.workScope, ...data }
        }));
      },

      // Navigation Actions
      setCurrentStep: (step: number) => {
        console.log('[OpportunityStore] Setting current step:', step);
        set({ current_step: step });
      },

      nextStep: () => {
        const { current_step, coreDetails, workScope } = get();
        
        // Enhanced validation before proceeding
        if (!validateCoreDetails(coreDetails)) {
          set({ error: 'Please complete all required fields in Core Details: opportunity type, work setup, compensation, difficulty, and start date' });
          toast.error('Please complete all required fields before proceeding');
          return;
        }
        
        // Additional validation if moving to step 3 (work scope must be complete)
        const nextStep = Math.min(3, current_step + 1);
        if (nextStep === 3 && !validateWorkScope(workScope)) {
          set({ error: 'Please complete all required fields in Work Scope before proceeding' });
          toast.error('Please complete work scope details before proceeding');
          return;
        }
        
        console.log('[OpportunityStore] Moving to step:', nextStep);
        set({ current_step: nextStep });
        

      },

      previousStep: () => {
        const { current_step } = get();
        const prevStep = Math.max(1, current_step - 1);
        
        console.log('[OpportunityStore] Moving to previous step:', prevStep);
        set({ current_step: prevStep });
        

      },

      // Enhanced validation before save
      isDataValidForSave: () => {
        const { coreDetails, workScope } = get();
        
        // Core validation with enhanced checks
        const coreValid = !!(
          validators.required(coreDetails.title || '') &&
          coreDetails.opportunity_type &&
          validators.required(coreDetails.domain || '') &&
          coreDetails.work_setup &&
          coreDetails.compensation_type &&
          coreDetails.difficulty &&
          coreDetails.start_date_type &&
          (coreDetails.compensation_type !== 'paid' || 
           (validators.required(coreDetails.compensation_amount || '') && validators.number(coreDetails.compensation_amount || '')))
        );
        
        // Work scope validation with enhanced checks
        const workScopeValid = !!(
          validators.required(workScope.description || '') &&
          validators.required(workScope.key_deliverables || '') &&
          workScope.support_level &&
          validators.required(workScope.talent_engagement || '') &&
          validators.required(workScope.primary_communication_mode || '') &&
          validators.required(workScope.primary_contact_name || '') &&
          validators.required(workScope.primary_contact_email || '') &&
          validators.email(workScope.primary_contact_email || '') &&
          validators.minLength((workScope.application_requirements || []).length.toString(), 1)
        );
        
        console.log('[OpportunityStore] Enhanced validation check:', {
          coreValid,
          workScopeValid,
          coreDetails,
          workScope
        });
        
        return { coreValid, workScopeValid, isValid: coreValid && workScopeValid };
      },

      // Unified Save Function
      saveOpportunity: async (isDraft: boolean = true) => {
        const { coreDetails, workScope } = get();

        // Enhanced validation
        const validation = get().isDataValidForSave();
        
        if (!validation.isValid) {
          const errorMsg = isDraft 
            ? 'Please complete required fields before saving draft'
            : 'Please complete all required fields before posting opportunity';
          
          if (!validation.coreValid) {
            toast.error('Please complete Core Details: title, opportunity type, domain, work setup, compensation, difficulty, and start date');
          }
          if (!validation.workScopeValid) {
            toast.error('Please complete Work Scope: description, deliverables, support level, engagement, communication, contact, and requirements');
          }
          
          set({ error: errorMsg });
          return { success: false, error: errorMsg };
        }

        set({ is_loading: true, error: null });

        try {
          const requestData = mapToBackendFormat(coreDetails, workScope, isDraft);

          console.log('[OpportunityStore] Saving opportunity:', {
            isDraft,
            requestData: JSON.stringify(requestData, null, 2)
          });

          const response = await api.post('/opportunities/frontend', requestData);
          
          // Update store with response data
          set({ 
            opportunity_id: response.data.id,
            is_draft: isDraft,
            last_saved: new Date(),
            is_loading: false 
          });
          
          toast.success(isDraft ? 'Draft saved successfully' : 'Opportunity posted successfully!');
          
          return { success: true, data: response.data };
          
        } catch (error: unknown) {
          let errorMessage = 'Failed to save opportunity';
          let fieldErrors: Array<{ field: string; message: string }> = [];
          
          // Enhanced error handling with specific messages
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { detail?: string }, status?: number } };
            if (axiosError.response?.status === 400) {
              const detail = axiosError.response?.data?.detail;
              if (detail?.includes('Validation errors:')) {
                // Extract field-specific errors
                const validationMatch = detail.match(/Validation errors: \{([^}]+)\}/);
                if (validationMatch) {
                  try {
                    const errors = JSON.parse(validationMatch[1].replace(/'/g, '"'));
                    fieldErrors = Object.entries(errors).map(([field, message]) => ({
                      field,
                      message: message as string
                    }));
                    
                    errorMessage = 'Please fix the following validation errors:';
                  } catch (e) {
                    console.warn('Failed to parse validation errors:', e);
                    errorMessage = detail || 'Invalid data provided';
                  }
                }
              } else {
                errorMessage = detail || 'Invalid data provided';
              }
            } else if (axiosError.response?.status === 500) {
              errorMessage = 'Server error - please try again later';
            } else if (axiosError.response?.status) {
              errorMessage = `Request failed with status ${axiosError.response.status}`;
            }
          } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error as { message?: string }).message || errorMessage;
          }
          
          console.error('[OpportunityStore] Failed to save opportunity:', error);
          
          // Display field-specific errors with user-friendly messages
          if (fieldErrors.length > 0) {
            fieldErrors.forEach(({ field, message }) => {
              const userFriendlyMessage = fieldMessages[field as keyof typeof fieldMessages] || message;
              toast.error(`${field}: ${userFriendlyMessage}`);
            });
          } else {
            toast.error(errorMessage);
          }
          
          set({ 
            error: errorMessage,
            is_loading: false 
          });
          
          // Return error object instead of throwing to prevent unhandled promises
          return { success: false, error: errorMessage, fieldErrors };
        }
      },

      // Persistence Actions
      saveDraft: async () => {
        return get().saveOpportunity(true);
      },

      loadDraft: async (id: string) => {
        try {
          set({ is_loading: true, error: null });
          
          console.log('[OpportunityStore] Loading draft:', id);
          
          // This will be replaced with your actual API call
          // const response = await api.get(`/opportunities/${id}?draft=true`);
          // const draftData = response.data;
          
          // Simulate loading draft data
          const draftData = {
            coreDetails: { ...defaultCoreDetails },
            workScope: { ...defaultWorkScope },
            current_step: 1,
            opportunity_id: id,
            is_draft: true
          };

          set(draftData);
          console.log('[OpportunityStore] Draft loaded successfully');
          
        } catch (error) {
          console.error('[OpportunityStore] Failed to load draft:', error);
          set({ 
            error: 'Failed to load draft',
            is_loading: false 
          });
        }
      },

      submitOpportunity: async () => {
        // Enhanced validation using new validation function
        const validation = get().isDataValidForSave();
        
        if (!validation.isValid) {
          const errorMessage = 'Please complete all required fields before submitting opportunity';
          
          if (!validation.coreValid) {
            toast.error('Please complete Core Details: title, opportunity type, domain, work setup, compensation, difficulty, and start date');
          }
          if (!validation.workScopeValid) {
            toast.error('Please complete Work Scope: description, deliverables, support level, engagement, communication, contact, and requirements');
          }
          
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        try {
          const result = await get().saveOpportunity(false);
          
          if (result.success) {
            set({ is_draft: false });
            toast.success('Opportunity posted successfully! Redirecting to dashboard...');
            
            // Navigate to organization dashboard after successful submission
            setTimeout(() => {
              window.location.href = '/org';
            }, 2000);
          }
          
          return result;
          
        } catch (error) {
          console.error('[OpportunityStore] Failed to submit opportunity:', error);
          // Error is already handled in saveOpportunity
          return { success: false, error: 'Submission failed' };
        }
      },

      // Management Actions
  resetForm: () => {
        console.log('[OpportunityStore] Resetting form...');
        set({
          coreDetails: defaultCoreDetails,
          workScope: defaultWorkScope,
          current_step: 1,
          is_draft: true,
          opportunity_id: undefined,
          last_saved: null,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'opportunity-creation-store'
    }
  )
);