import { createClient } from '@supabase/supabase-js'

// Client-side Supabase initialization
// These environment variables will need to be added to the project (.env)
// and prefixed with VITE_ to be exposed to the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
