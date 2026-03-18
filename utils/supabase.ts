import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This 'export' keyword is what Vercel is looking for
export const supabase = createClient(supabaseUrl, supabaseAnonKey);