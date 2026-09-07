import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://abihtjesmclsutmuzodc.supabase.co';
const supabaseAnonKey = 'sb_publishable_slomnJ4xr3305qQvpMv2pQ_DyVKFTPD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
