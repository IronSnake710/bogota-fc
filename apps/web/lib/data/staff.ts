import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type Staff = Tables<'staff'>

export async function getStaff(): Promise<Staff[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('status', 'active')
    .order('role', { ascending: true })

  if (error) {
    console.error('Error fetching staff:', error)
    return []
  }

  return data || []
}

export async function getCoachingStaff(): Promise<Staff[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('status', 'active')
    .in('role', ['head_coach', 'assistant_coach', 'goalkeeper_coach', 'fitness_coach'])
    .order('role', { ascending: true })

  if (error) {
    console.error('Error fetching coaching staff:', error)
    return []
  }

  return data || []
}

export async function getStaffBySlug(slug: string): Promise<Staff | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching staff by slug:', error)
    return null
  }

  return data
}
