import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type Player = Tables<'players'>

export async function getPlayers(limit = 50): Promise<Player[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('status', 'active')
    .order('jersey_number', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching players:', error)
    return []
  }

  return data || []
}

export async function getPlayersByPosition(position: string): Promise<Player[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('status', 'active')
    .eq('position', position)
    .order('jersey_number', { ascending: true })

  if (error) {
    console.error('Error fetching players by position:', error)
    return []
  }

  return data || []
}

export async function getPlayerBySlug(slug: string): Promise<Player | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching player by slug:', error)
    return null
  }

  return data
}

export async function getFeaturedPlayers(limit = 5): Promise<Player[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('status', 'active')
    .not('photo_url', 'is', null)
    .order('jersey_number', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured players:', error)
    return []
  }

  return data || []
}
