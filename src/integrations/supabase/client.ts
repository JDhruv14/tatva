// Supabase client for Next.js
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use your environment variable names
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

// Warn if environment variables are missing
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing.');
}

// Only create client with valid URL
const isValidUrl = SUPABASE_URL.startsWith('http://') || SUPABASE_URL.startsWith('https://');

export const supabase = isValidUrl
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  })
  : null as any;
