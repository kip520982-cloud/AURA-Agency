import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_AURABACKEND_SUPABASE_URL)!
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_AURABACKEND_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_AURABACKEND_SUPABASE_PUBLISHABLE_KEY)!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface CreatorProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  creator_name: string
  platform: 'onlyfans' | 'fansly' | 'other'
  platform_username: string
  phone?: string
  bio?: string
  current_fans?: number
  monthly_revenue?: number
  timezone?: string
  created_at: string
  updated_at: string
}

export interface WaitlistEntry {
  id: string
  email: string
  creator_name?: string
  platform?: string
  current_fans?: number
  monthly_revenue?: number
  referral_source?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
  updated_at: string
}
