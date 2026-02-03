import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
  
  // Persistence Actions
  saveDraft: () => Promise<void>;
  loadDraft: (id: string) => Promise<void>;
  submitOpportunity: () => Promise<void>;
  
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
        set((state) => ({
          coreDetails: { ...state.coreDetails, ...data }
        }));
      },

      // Work Scope Actions
      setWorkScope: (data: Partial<WorkScope>) => {
        console.log('[OpportunityStore] Setting work scope:', data);
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
        const { current_step, coreDetails } = get();
        
        // Validate core details before proceeding
        if (!validateCoreDetails(coreDetails)) {
          set({ error: 'Please complete all required fields in Core Details' });
          return;
        }
        
        const nextStep = Math.min(3, current_step + 1);
        
        console.log('[OpportunityStore] Moving to step:', nextStep);
        set({ current_step: nextStep });
        
        // Auto-save when step changes
        get().saveDraft();
      },

      previousStep: () => {
        const { current_step } = get();
        const prevStep = Math.max(1, current_step - 1);
        
        console.log('[OpportunityStore] Moving to previous step:', prevStep);
        set({ current_step: prevStep });
        
        // Auto-save when step changes
        get().saveDraft();
      },

      // Persistence Actions
      saveDraft: async () => {
        const { coreDetails, workScope, current_step, opportunity_id, is_draft } = get();
        
        try {
          set({ is_loading: true, error: null });
          
          console.log('[OpportunityStore] Saving draft...');
          
          // This will be replaced with your actual API call
          console.log('[OpportunityStore] Draft data:', {
            core_details: coreDetails,
            work_scope: workScope,
            current_step,
            is_draft,
            updated_at: new Date().toISOString()
          });

          // Add opportunity_id validation for revirw
          const hasBasicDetails = validateCoreDetails(coreDetails);
          const hasWorkScope = validateWorkScope(workScope);
          
          console.log('[OpportunityStore] Validation check:', {
            hasBasicDetails,
            hasWorkScope
          });

          // Only save if there's meaningful data
          if (opportunity_id && (hasBasicDetails || hasWorkScope)) {
            if (opportunity_id) {
              // Update existing draft
              console.log('[OpportunityStore] Updating existing draft:', opportunity_id);
              // await api.patch(`/opportunities/${opportunity_id}`, requestData);
            } else {
              // Create new draft
              console.log('[OpportunityStore] Creating new draft');
              // const response = await api.post('/opportunities/draft', requestData);
              // set({ opportunity_id: response.data.id });
            }
          }

          set({ 
            last_saved: new Date(),
            is_loading: false 
          });
          
          console.log('[OpportunityStore] Draft saved successfully');
          
        } catch (error) {
          console.error('[OpportunityStore] Failed to save draft:', error);
          set({ 
            error: 'Failed to save draft',
            is_loading: false 
          });
        }
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
        const { coreDetails, workScope, opportunity_id } = get();
        
        // Validate both steps before submission
        if (!validateCoreDetails(coreDetails)) {
          set({ error: 'Please complete all required fields in Core Details' });
          return;
        }
        
        if (!validateWorkScope(workScope)) {
          set({ error: 'Please complete all required fields in Work Scope' });
          return;
        }

        try {
          set({ is_loading: true, error: null });
          
          console.log('[OpportunityStore] Submitting opportunity...');
          
          // This will be replaced with your actual API call
          console.log('[OpportunityStore] Submission data:', {
            ...coreDetails,
            ...workScope,
            is_draft: false,
            submitted_at: new Date().toISOString()
          });

          if (opportunity_id) {
            // Submit existing draft
            console.log('[OpportunityStore] Submitting existing opportunity:', opportunity_id);
            // await api.patch(`/opportunities/${opportunity_id}`, {
            //   ...coreDetails,
            //   ...workScope,
            //   is_draft: false,
            //   submitted_at: new Date().toISOString()
            // });
          } else {
            // Create new opportunity
            console.log('[OpportunityStore] Creating new opportunity');
            // const response = await api.post('/opportunities', {
            //   ...coreDetails,
            //   ...workScope,
            //   is_draft: false,
            //   submitted_at: new Date().toISOString()
            // });
            // set({ opportunity_id: response.data.id });
          }

          set({ 
            is_draft: false,
            is_loading: false 
          });
          
          console.log('[OpportunityStore] Opportunity submitted successfully');
          
          // Redirect to opportunities page
          window.location.href = '/opportunities';
          
        } catch (error) {
          console.error('[OpportunityStore] Failed to submit opportunity:', error);
          set({ 
            error: 'Failed to submit opportunity',
            is_loading: false 
          });
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