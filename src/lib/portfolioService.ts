
import { supabase } from './supabaseClient';

export interface PortfolioItem {
  id?: number;
  talent_id?: string;
  title: string;
  description?: string;
  project_url?: string;
  code_url?: string;
  company_name?: string;
  role?: string;
  start_date?: string;
  end_date?: string;
  is_ongoing?: boolean;
  video_url?: string; // External video link
  is_featured?: boolean;
  is_public?: boolean;
  tags?: string[];
  portfolio_media?: PortfolioMedia[];
  skills?: any[]; // To be typed properly with skills table integration
}

export interface PortfolioMedia {
  id?: number;
  portfolio_id?: number;
  url: string;
  media_type: 'image' | 'video';
  created_at?: string;
}

export interface SkillLink {
    portfolio_id: number;
    skill_id: number;
}


/**
 * 1. Create the Portfolio Item
 */
export const createPortfolioItem = async (item: Omit<PortfolioItem, 'id' | 'portfolio_media' | 'skills' | 'talent_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
        .from('portfolio_items')
        .insert({ ...item, talent_id: user.id })
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

/**
 * 2. Upload file to Storage
 */
export const uploadPortfolioMediaFile = async (portfolioId: number, file: File) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${user.id}/${portfolioId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('portfolio-content')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
        .from('portfolio-content')
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * 3. Link Media to Portfolio Item
 */
export const linkMediaToPortfolio = async (mediaRecords: { portfolio_id: number; url: string; media_type: 'image' | 'video' }[]) => {
    if (mediaRecords.length === 0) return;
    
    const { data, error } = await supabase
        .from('portfolio_media')
        .insert(mediaRecords)
        .select();

    if (error) throw error;
    return data;
};

/**
 * 4. Link Skills to Portfolio Item
 */
export const linkSkillsToPortfolio = async (skillLinks: SkillLink[]) => {
    if (skillLinks.length === 0) return;

    const { error } = await supabase
        .from('portfolio_skills_link')
        .insert(skillLinks);

    if (error) throw error;
};

/**
 * Validates and coordinates the entire creation process
 */
export const addFullPortfolioProject = async (
    itemData: Omit<PortfolioItem, 'id' | 'portfolio_media' | 'skills' | 'talent_id'>,
    files: File[],
    skillIds: number[]
) => {
    try {
        // Step 1: Create Item
        const newItem = await createPortfolioItem(itemData);
        if (!newItem) throw new Error("Failed to create portfolio item");

        const portfolioId = newItem.id;

        // Step 2: Upload Files (Parallel)
        const uploadPromises = files.map(file => uploadPortfolioMediaFile(portfolioId, file));
        const uploadedUrls = await Promise.all(uploadPromises);

        // Step 3: Link Media
        const mediaRecords = uploadedUrls.map(url => ({
            portfolio_id: portfolioId,
            url,
            media_type: 'image' as const // TODO: Detect video type if needed
        }));

        if (mediaRecords.length > 0) {
            await linkMediaToPortfolio(mediaRecords);
        }

        // Step 4: Link Skills
        const skillLinks = skillIds.map(skillId => ({
            portfolio_id: portfolioId,
            skill_id: skillId
        }));

        if (skillLinks.length > 0) {
            await linkSkillsToPortfolio(skillLinks);
        }

        return newItem;

    } catch (error) {
        console.error("Error in addFullPortfolioProject:", error);
        throw error;
    }
};

/**
 * Fetch all items for the current user
 */
export const getMyPortfolio = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('portfolio_items')
        .select(`
            *,
            portfolio_media ( * ),
            portfolio_skills_link ( skill_id )
        `)
        .eq('talent_id', user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

