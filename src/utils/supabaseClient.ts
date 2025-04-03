
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xjugejzlrtxxwmzxqbmi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdWdlanpscnR4eHdtenhxYm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTk0NDUsImV4cCI6MjA1ODQzNTQ0NX0.G4YukGj6j2QfCDqYEYgCyDv6IeNVKQWGwA5eLVQKRsM'
const supabase = createClient(supabaseUrl, supabaseKey)