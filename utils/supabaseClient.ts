import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only validate env vars in the browser (not during Vercel build)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Supabase environment variables are missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
