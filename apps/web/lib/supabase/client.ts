import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from './database.types'

export function createClient() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  
  // Server environment - use server client without cookies for data fetching
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // No-op in server data fetching
        },
      },
    }
  )
}
