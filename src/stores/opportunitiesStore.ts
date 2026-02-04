import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../lib/api';
import toast from 'react-hot-toast';

// --- Types for Opportunities ---

export interface FullOpportunity {
  // Basic Info
  id: string;
  title: string;
  type: string;
  stack: string[];
  postedAt: string;
  status: 'LIVE' | 'DRAFT' | 'PAUSED' | 'CLOSED';
  statusNote?: string;
  
  // Additional fields from Supabase
  domain?: string;
  work_mode?: string;
  time_commitment?: string;
  start_timeline?: string;
  skills_required?: string[];
  experience_level?: string;
  is_compensation_visible?: boolean;
  compensation_range?: string;
  deliverables?: string[];
  mentorship_provided?: boolean;
  learning_outcomes?: string[];
  deadline?: string;
  views_count?: number;
  applications_count?: number;
  published_at?: string;
  
  // Commitments (mapped from Supabase)
  commitments: {
    duration: string;
    hoursPerWeek: number;
    location: string;
  };
  
  // Compensation (mapped from Supabase)
  compensation: {
    isPaid: boolean;
    amount?: string;
    totalBudget?: string;
  };
  
  // Pipeline (mapped from Supabase)
  pipeline: {
    applied: number;
    shortlisted: number;
    selected: number;
  };
  
  // Additional fields from creation flow
  description?: string;
  key_deliverables?: string;
  difficulty?: string;
  difficulty_details?: string;
  support_level?: string;
  talent_engagement?: string;
  primary_communication_mode?: string;
  application_requirements?: string[];
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
  website_url?: string;
  linkedin_url?: string;
  start_date_type?: string;
  start_date?: string;
  
  // Action label for the current row
  actionLabel: string;
}

interface OpportunitiesState {
  // Data
  opportunities: FullOpportunity[];
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
  
  // Actions
  fetchOpportunities: () => Promise<void>;
  refreshOpportunities: () => Promise<void>;
  clearError: () => void;
}

interface OpportunitiesActions {
  fetchOpportunities: () => Promise<void>;
  refreshOpportunities: () => Promise<void>;
  clearError: () => void;
}

type OpportunitiesStore = OpportunitiesState & OpportunitiesActions;

// --- Store Implementation ---
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useOpportunitiesStore = create<OpportunitiesStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      opportunities: [],
      loading: false,
      error: null,
      lastFetched: null,

      // --- Actions ---
      
      fetchOpportunities: async () => {
        const state = get();
        
        // Check if we have cached data
        if (state.lastFetched && 
            Date.now() - state.lastFetched.getTime() < CACHE_DURATION && 
            state.opportunities.length > 0) {
          console.log('[OpportunitiesStore] Using cached data');
          return;
        }

        set({ loading: true, error: null });

        try {
          console.log('[OpportunitiesStore] Fetching opportunities from API');
          const response = await api.get('/opportunities/my');
          
          // Map API response to our interface
          const opportunities: FullOpportunity[] = response.data.map((raw: unknown) => {
            const opp = raw as Record<string, unknown>;
            
            // Parse application requirements from stringified JSON
            let applicationRequirements: string[] = [];
            try {
              applicationRequirements = opp.application_requirements 
                ? JSON.parse(opp.application_requirements as string) 
                : [];
            } catch {
              applicationRequirements = [];
            }
            
            // Map Supabase fields to our interface
            return {
              // Basic fields
              id: String(opp.id),
              title: (opp.title as string) || '',
              description: (opp.description as string) || '',
              type: (opp.opportunity_type as string) || 'Not specified',
              status: (opp.status as string)?.toUpperCase() as 'LIVE' | 'DRAFT' | 'PAUSED' | 'CLOSED',
              postedAt: opp.published_at 
                ? new Date(opp.published_at as string).toLocaleDateString() 
                : new Date().toLocaleDateString(),
              
              // Supabase specific fields
              domain: (opp.domain as string) || '',
              work_mode: (opp.work_mode as string) || '',
              time_commitment: (opp.time_commitment as string) || '',
              start_timeline: (opp.start_timeline as string) || '',
              skills_required: (opp.skills_required as string[]) || [],
              experience_level: (opp.experience_level as string) || '',
              is_compensation_visible: (opp.is_compensation_visible as boolean) ?? true,
              compensation_range: (opp.compensation_range as string) || '',
              deliverables: (opp.deliverables as string[]) || [],
              mentorship_provided: (opp.mentorship_provided as boolean) || false,
              learning_outcomes: (opp.learning_outcomes as string[]) || [],
              deadline: (opp.deadline as string) || '',
              views_count: (opp.views_count as number) || 0,
              applications_count: (opp.applications_count as number) || 0,
              published_at: (opp.published_at as string) || '',
              
              // Map to commitments structure
              commitments: {
                duration: (opp.duration as string) || 'Not specified',
                hoursPerWeek: parseInt((opp.time_commitment as string) || '0', 10),
                location: (opp.work_mode as string) || 'Not specified',
              },
              
              // Map to compensation structure
              compensation: {
                isPaid: (opp.compensation_type as string) === 'paid',
                amount: (opp.compensation_range as string) || undefined,
                totalBudget: undefined, // Not in Supabase data
              },
              
              // Map to pipeline structure
              pipeline: {
                applied: (opp.applications_count as number) || 0,
                shortlisted: 0, // Not in Supabase data yet
                selected: 0,   // Not in Supabase data yet
              },
              
              // Additional fields
              stack: ((opp.skills_required as string[]) || []).map(s => s || ''),
              key_deliverables: (opp.deliverables as string[])?.join(', ') || '',
              difficulty: (opp.experience_level as string) || '',
              difficulty_details: '',
              support_level: (opp.mentorship_provided as boolean) ? 'Yes' : 'No',
              talent_engagement: (opp.talent_engagement as string) || '',
              primary_communication_mode: (opp.primary_communication_mode as string) || '',
              application_requirements: applicationRequirements,
              primary_contact_name: (opp.primary_contact_name as string) || '',
              primary_contact_email: (opp.primary_contact_email as string) || '',
              primary_contact_phone: '', // Not in Supabase data
              website_url: '', // Not in Supabase data
              linkedin_url: '', // Not in Supabase data
              start_date_type: (opp.start_timeline as string) || '',
              start_date: (opp.deadline as string) || '',
              
              // Computed action label
              actionLabel: ''
            } as FullOpportunity;
          });
          
          // Set action labels after mapping
          opportunities.forEach(opp => {
            opp.actionLabel = getActionLabel(opp.status, opp.pipeline);
          });
          
          console.log(`[OpportunitiesStore] Loaded ${opportunities.length} opportunities`);
          
          set({ 
            opportunities, 
            loading: false, 
            lastFetched: new Date(),
            error: null 
          });
          
        } catch (error: unknown) {
          console.error('[OpportunitiesStore] Failed to fetch opportunities:', error);
          
          let errorMessage = 'Failed to load opportunities';
          const err = error as Record<string, unknown>;
          
          if ((err.response as Record<string, unknown>)?.status === 401) {
            // Let the API interceptor handle logout
            errorMessage = 'Authentication failed';
          } else if (err.code === 'NETWORK_ERROR') {
            errorMessage = 'Network error. Please check your connection.';
          } else if ((err.response as Record<string, unknown>)?.data && 
                     ((err.response as Record<string, unknown>).data as Record<string, unknown>)?.message) {
            errorMessage = ((err.response as Record<string, unknown>).data as Record<string, unknown>).message as string;
          }
          
          set({ 
            loading: false, 
            error: errorMessage 
          });
          
          toast.error(errorMessage);
        }
      },

      refreshOpportunities: async () => {
        console.log('[OpportunitiesStore] Refreshing opportunities (bypassing cache)');
        set({ lastFetched: null }); // Reset cache
        await get().fetchOpportunities();
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'opportunities-store',
    }
  )
);

// --- Helper Functions ---

function getActionLabel(status: string, pipeline: Record<string, unknown>): string {
  const applied = (pipeline.applied as number) || 0;
  const shortlisted = (pipeline.shortlisted as number) || 0;
  
  switch (status) {
    case 'LIVE':
      if (applied === 0) return 'Browse Talent Pool';
      if (shortlisted > 0) return 'Review Candidates';
      return 'View Applicants';
    case 'DRAFT':
      return 'Edit Draft';
    case 'PAUSED':
      return 'View Candidates';
    case 'CLOSED':
      return 'View Results';
    default:
      return 'View Details';
  }
}