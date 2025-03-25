import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bhszbwcsrbcwunwhqewv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc3pid2NzcmJjd3Vud2hxZXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODk3MDUsImV4cCI6MjA1NjY2NTcwNX0.rBMIneoExxG8xDY_zOi6xv6Mjz3oo4qMc0kPANbjnpE';
export const supabase = createClient(supabaseUrl, supabaseKey);
