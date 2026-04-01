import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type Sponsor = Tables<'sponsors'>

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('status', 'published')
    .order('tier', { ascending: true })

  if (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }

  return data || []
}

export async function getSponsorsByTier(tier: string): Promise<Sponsor[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('status', 'published')
    .eq('tier', tier)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching sponsors by tier:', error)
    return []
  }

  return data || []
}

export async function getMainSponsors(limit = 3): Promise<Sponsor[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('status', 'published')
    .in('tier', ['platinum', 'gold'])
    .order('tier', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching main sponsors:', error)
    return []
  }

  return data || []
}
