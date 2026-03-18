import { createClient } from '@supabase/supabase-js';

// 1. Get your keys from the environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. The "export" keyword is the most important part!
// It makes 'supabase' available to the rest of your app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);