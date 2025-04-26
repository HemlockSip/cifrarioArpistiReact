// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase project URL and anon key - will be stored in environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;