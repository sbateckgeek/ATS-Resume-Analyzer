// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iknpefaenfjwgueqaosm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbnBlZmFlbmZqd2d1ZXFhb3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMjYwNjksImV4cCI6MjA1NDgwMjA2OX0.81EjYtCHRzNlBggEIAoX5KEIRt50y1LJRfll3o4ucNs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);