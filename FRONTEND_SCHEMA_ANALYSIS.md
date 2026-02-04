# Frontend Schema Analysis - Opportunity Posting Flow

## 📋 **Frontend Schema Analysis - Complete Data Structure**

### **🔍 Exact JSON Payload Sent to Backend**

Here's the **complete data structure** that frontend sends to `/api/v1/opportunities/frontend`:

```typescript
{
  // Core Details
  title: string,
  description: string,
  opportunity_type: 'project' | 'contract' | 'internship' | 'full_time' | 'research',
  domain: string,
  work_mode: 'remote' | 'hybrid' | 'onsite' | 'flexible',
  weekly_time_commitment: string,
  duration: string,
  compensation_type: 'paid' | 'unpaid' | 'stipend' | 'equity' | 'volunteer' | 'performance_based',
  compensation_range: string,  // Note: from compensation_amount field
  experience_level: 'entry' | 'intermediate' | 'senior' | 'any',
  start_timeline: string,
  start_date?: string, // ISO string if provided
  
  // Work Scope
  deliverables: string[], // split from key_deliverables by newlines
  mentorship_provided: boolean, // true if support_level === 'Training-friendly'
  talent_engagement: string,
  primary_communication_mode: string,
  application_requirements: string[], 
  primary_contact_name: string,
  primary_contact_email: string,
  
  // Status
  opportunity_status: 'draft' | 'active',
  created_at: string, // ISO timestamp
  updated_at: string  // ISO timestamp
}
```

### **🔧 Field Mappings & Transformations**

**Key Transformations Applied:**

1. **Work Setup → Work Mode:**
   - `'Remote'` → `'remote'`
   - `'Hybrid'` → `'hybrid'`
   - `'In-Person'` → `'onsite'`
   - `'Flexible'` → `'flexible'`

2. **Difficulty → Experience Level:**
   - `'Beginner-Friendly'` → `'entry'`
   - `'Intermediate'` → `'intermediate'`
   - `'Advanced'` → `'senior'`

3. **Opportunity Type Mappings:**
   - `'Short term project'` → `'project'`
   - `'Contract role'` → `'contract'`
   - `'Internship'` → `'internship'`
   - `'Full-time role'` → `'full_time'`
   - `'Research Gig'` → `'research'`

### **⚠️ Potential 400 Bad Request Causes**

#### **Most Likely Issues:**

1. **Missing `organization_id` Field:**
   - Frontend doesn't send `organization_id`
   - Backend likely requires this to link opportunity to organization

2. **Field Name Mismatches:**
   - `weekly_time_commitment` vs `time_commitment`
   - `compensation_range` vs `compensation_amount`
   - `experience_level` vs `experience_required`

3. **Required Field Validation:**
   - `domain` is required in form but not validated before sending
   - Empty arrays for `deliverables` or `application_requirements`

4. **Data Type Issues:**
   - `deliverables` sent as array, backend might expect string
   - Date format issues with `start_date` and timestamps

#### **Missing Validations in Frontend:**

```typescript
// Current validation (INCOMPLETE):
const validateCoreDetails = (data: CoreDetails): boolean => {
  return !!(
    data.opportunity_type &&
    data.work_setup &&
    data.compensation_type &&
    data.difficulty &&
    data.start_date_type
  );
  // ❌ Missing: domain validation
  // ❌ Missing: compensation_amount validation when compensation_type === 'paid'
};
```

### **🎯 Debugging Plan**

#### **Step 1: Compare with Backend Schema**

**Ask your backend team about:**

1. **Required Fields:** Does backend expect `organization_id`?
2. **Field Names:** Confirm exact field names expected
3. **Data Types:** Are arrays allowed for `deliverables` and `application_requirements`?
4. **Validations:** What enum values are acceptable?

#### **Step 2: Add Enhanced Logging**

**Add this to your `saveOpportunity` function:**

```typescript
// In opportunityCreationStore.ts before the API call
console.log('[OpportunityStore] Full payload:', JSON.stringify(requestData, null, 2));
```

#### **Step 3: Check Network Tab**

**Look in Browser DevTools → Network:**
1. Find the failed POST request to `/opportunities/frontend`
2. Check the **Request Payload** tab for exact JSON sent
3. Check the **Response** tab for error details (400 errors usually include validation messages)

### **🔧 Quick Fix Suggestions**

#### **Most Likely Fix - Add organization_id:**

```typescript
const mapToBackendFormat = (coreDetails: CoreDetails, workScope: WorkScope, isDraft: boolean) => {
  const { user } = useAuthStore.getState(); // Get current user
  
  return {
    // ... existing fields
    
    // ADD THIS:
    organization_id: user?.id, // or user.organization_id based on your auth structure
    
    // ... rest of fields
  };
};
```

#### **Add Missing Validations:**

```typescript
const validateCoreDetails = (data: CoreDetails): boolean => {
  return !!(
    data.opportunity_type &&
    data.work_setup &&
    data.compensation_type &&
    data.difficulty &&
    data.start_date_type &&
    data.domain && // ADD THIS
    (data.compensation_type !== 'paid' || data.compensation_amount) // ADD THIS
  );
};
```

### **❓ Questions for Backend Team:**

1. **What exact field names does the backend expect?** (Especially `organization_id`, `time_commitment`, `compensation_amount`)

2. **What are the required fields?** (Is `organization_id` required?)

3. **What data types are expected for arrays** like `deliverables` and `application_requirements`?

4. **Are there any enum restrictions** beyond what frontend is sending?

5. **Can you share the 400 error response body?** (Usually contains specific validation messages)

### **📊 Summary**

The most likely causes of your 400 error are:
1. **Missing `organization_id` field** (90% probability)
2. **Field name mismatches** between frontend and backend
3. **Missing validation** for required fields like `domain`

Once you compare this frontend schema with your backend API documentation, you should be able to identify the exact field mismatches causing the 400 error.

---

### **🔍 Additional Technical Details**

**File Location:** `src/stores/opportunityCreationStore.ts`

**Key Functions:**
- `mapToBackendFormat()` (lines 168-198) - Data transformation
- `saveOpportunity()` (lines 290-320) - API call
- `validateCoreDetails()` (lines 101-109) - Validation
- `validateWorkScope()` (lines 111-120) - Validation

**API Endpoint:** `POST /api/v1/opportunities/frontend`

**Validation Flow:**
1. `validateCoreDetails()` - Checks basic required fields
2. `validateWorkScope()` - Checks work scope fields
3. `mapToBackendFormat()` - Transforms data to backend format
4. `api.post()` - Sends to backend

**Auto-save Trigger:**
- Triggers 2 seconds after any field change
- `setCoreDetails()` → `setTimeout(() => { saveDraft(); }, 2000)`

---

### **🐛 Debugging Checklist**

- [ ] Check Network tab for exact request payload
- [ ] Check 400 error response body for validation messages
- [ ] Confirm backend expects `organization_id`
- [ ] Verify field names match exactly
- [ ] Check if arrays are accepted by backend
- [ ] Validate all enum values are allowed
- [ ] Test with minimal required fields first