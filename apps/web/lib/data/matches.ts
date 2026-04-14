import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type Match = Tables<'matches'>
export type Team = Tables<'teams'>
export type Competition = Tables<'competitions'>
export type Stadium = Tables<'stadiums'>

export interface MatchWithTeams extends Match {
  home_team: Team | null
  away_team: Team | null
  competition: Competition | null
  stadium: Stadium | null
}

export async function getMatches(limit = 20): Promise<MatchWithTeams[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*),
      competition:competition_id(*),
      stadium:stadium_id(*)
    `)
    .order('kickoff_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching matches:', error)
    return []
  }

  return (data as unknown as MatchWithTeams[]) || []
}

export async function getUpcomingMatches(limit = 5): Promise<MatchWithTeams[]> {
  const supabase = createClient()
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*),
      competition:competition_id(*),
      stadium:stadium_id(*)
    `)
    .gte('kickoff_at', now)
    .in('status', ['scheduled', 'live'])
    .order('kickoff_at', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching upcoming matches:', error)
    return []
  }

  return (data as unknown as MatchWithTeams[]) || []
}

export async function getRecentMatches(limit = 5): Promise<MatchWithTeams[]> {
  const supabase = createClient()
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*),
      competition:competition_id(*),
      stadium:stadium_id(*)
    `)
    .lte('kickoff_at', now)
    .eq('status', 'finished')
    .order('kickoff_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent matches:', error)
    return []
  }

  return (data as unknown as MatchWithTeams[]) || []
}

export async function getMatchById(id: string): Promise<MatchWithTeams | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:home_team_id(*),
      away_team:away_team_id(*),
      competition:competition_id(*),
      stadium:stadium_id(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching match by id:', error)
    return null
  }

  return data as unknown as MatchWithTeams | null
}
