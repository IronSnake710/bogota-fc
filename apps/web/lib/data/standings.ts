import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type Standing = Tables<'standings'>
export type Team = Tables<'teams'>

export interface StandingWithTeam extends Standing {
  team: Team | null
}

export async function getStandings(seasonId: string, competitionId: string): Promise<StandingWithTeam[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('standings')
    .select(`
      *,
      team:team_ref_id(*)
    `)
    .eq('season_id', seasonId)
    .eq('competition_id', competitionId)
    .order('position', { ascending: true })

  if (error) {
    console.error('Error fetching standings:', error)
    return []
  }

  return (data as unknown as StandingWithTeam[]) || []
}

export async function getTeamStanding(teamId: string, seasonId: string, competitionId: string): Promise<StandingWithTeam | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('standings')
    .select(`
      *,
      team:team_ref_id(*)
    `)
    .eq('team_ref_id', teamId)
    .eq('season_id', seasonId)
    .eq('competition_id', competitionId)
    .single()

  if (error) {
    console.error('Error fetching team standing:', error)
    return null
  }

  return data as unknown as StandingWithTeam | null
}
