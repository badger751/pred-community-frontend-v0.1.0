# Portfolio Implementation Plan

This document outlines the architecture and implementation steps for the Talent Portfolio feature, integrating the `portfolio_items`, `portfolio_media`, and `portfolio_skills_link` tables with Supabase Storage.

## 1. Database Schema

We will utilize the following schema structure. Ensure these tables are created in your Supabase SQL Editor.

### 1.1 `portfolio_items` (Core Data)
Stores the main details of a project.
*   **Key Fields**: `talent_id` (Auth User), `title`, `description`, `project_url`, `is_featured`, `is_public`.
*   **Notes**: `video_url` is reserved for external links (e.g., YouTube/Vimeo). Uploaded videos go to `portfolio_media`.

### 1.2 `portfolio_media` (Uploaded Assets)
Stores direct file references for images and videos uploaded to Supabase Storage.
```sql
CREATE TABLE IF NOT EXISTS portfolio_media (
    id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    portfolio_id    bigint REFERENCES portfolio_items(id) ON DELETE CASCADE,
    url             text NOT NULL,
    media_type      text DEFAULT 'image', -- 'image' or 'video'
    created_at      timestamptz DEFAULT now()
);
```

### 1.3 `portfolio_skills_link` (Skills Junction)
Connects portfolio items to specific skills.
```sql
CREATE TABLE IF NOT EXISTS portfolio_skills_link (
    portfolio_id    bigint REFERENCES portfolio_items(id) ON DELETE CASCADE,
    skill_id        bigint REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (portfolio_id, skill_id)
);
```

---

## 2. Storage Strategy

We need a secure but publicly accessible bucket for serving portfolio assets.

*   **Bucket Name**: `portfolio-content`
*   **Public Access**: `true`
*   **Folder Structure**: `user_{uuid}/{portfolio_item_id}/{filename}`
    *   *Reasoning*: Organizing by user and then by item prevents filename collisions and makes cleanup easier (deleting an item can trigger a folder deletion).

### RLS Policies for Storage
1.  **Select/Read**: Publicly available `(bucket_id = 'portfolio-content')`.
2.  **Insert/Update/Delete**: Authenticated users only, restricted to their own folder:
    *   `auth.uid()::text = (storage.foldername(name))[1]` (Assuming folder starts with user ID).

---

## 3. Implementation Logic (Frontend)

The "Add Project" flow acts as a transactional operation from the user's perspective, though it involves multiple API calls.

### 3.1 The "Add/Edit Project" Modal
We will build a `PortfolioDialog` component containing:
1.  **General Info**: Title, Role, Description, Company (Text inputs).
2.  **Dates**: Start/End Date pickers, Ongoing checkbox.
3.  **Links**: Project URL, Code URL, External Video URL.
4.  **Skills**: A multi-select dropdown fetching from the `skills` table.
5.  **Media Upload**: A drag-and-drop zone for multiple images/videos.

### 3.2 Submission Workflow (Step-by-Step)

When the user clicks "Save":

**Step 1: Create Parent Record**
*   **Action**: `supabase.from('portfolio_items').insert({...}).select()`
*   **Result**: Receive the new `id` (e.g., `105`).

**Step 2: Upload Files (Parallel)**
*   **Action**: Loop through selected files.
*   **Path**: `user_${user.id}/105/${cleanFileName}`.
*   **Call**: `supabase.storage.from('portfolio-content').upload(path, file)`.
*   **Result**: Get public URLs for all successfully uploaded files.

**Step 3: Insert Child Records (Media)**
*   **Action**: Prepare an array of objects `{ portfolio_id: 105, url: '...', media_type: '...' }`.
*   **Call**: `supabase.from('portfolio_media').insert(mediaRecords)`.

**Step 4: Link Skills**
*   **Action**: Prepare an array `{ portfolio_id: 105, skill_id: 12 }`.
*   **Call**: `supabase.from('portfolio_skills_link').insert(skillRecords)`.

**Step 5: Rollback (Error Handling)**
*   If Step 1 fails, show error.
*   If Step 2 or 3 fails, we should ideally alert the user. Since `portfolio_items` exists, we can let them "retry" uploading media later, rather than deleting the item immediately.

---

## 4. Immediate Next Steps

1.  **Execute SQL**: Run the `portfolio_skills_link` and `portfolio_media` creation scripts in Supabase.
2.  **Create Bucket**: Go to Supabase Storage -> Create bucket `portfolio-content`.
3.  **Frontend Stub**: Create the `api/portfolio.ts` file to encapsulate these multi-step operations.
