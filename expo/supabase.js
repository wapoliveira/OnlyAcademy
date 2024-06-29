import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgatjmymbnwqegcwbmgk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXRqbXltYm53cWVnY3dibWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NTA3ODQsImV4cCI6MjAzNDMyNjc4NH0.2PxGLUfPCPAs4TIHj8rPfaeu78f1uWiFZf-3_3MaYj4';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
