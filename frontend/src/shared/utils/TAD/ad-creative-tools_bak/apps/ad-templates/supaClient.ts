import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofmivamsgnpfrwbjiasm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbWl2YW1zZ25wZnJ3YmppYXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NzI3NjMsImV4cCI6MjA3MzA0ODc2M30.lPsCDVCo5Pz4M8dmHRcipSpIJOrzsi40J2ijUsQQLsE';

export const supabase = createClient(supabaseUrl, supabaseKey);
