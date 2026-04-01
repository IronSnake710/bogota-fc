import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/database.types'

export type News = Tables<'news'>
export type Match = Tables<'matches'>
export type Team = Tables<'teams'>
export type Competition = Tables<'competitions'>
export type Player = Tables<'players'>
export type Standing = Tables<'standings'>

// News
export async function getNewsServer(limit = 10): Promise<News[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

// Matches with teams
export interface MatchWithTeams extends Match {
  home_team: Team | null
  away_team: Team | null
  competition: Competition | null
}

export async function getUpcomingMatchesServer(limit = 5): Promise<MatchWithTeams[]> {
  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()
  
  // Fetch matches
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .gte('kickoff_at', now)
    .in('status', ['scheduled', 'live'])
    .order('kickoff_at', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching upcoming matches:', error)
    return []
  }

  if (!matches || matches.length === 0) {
    return []
  }

  // Get unique team IDs and competition IDs
  const teamIds = [...new Set([...matches.map(m => m.home_team_id), ...matches.map(m => m.away_team_id)])]
  const competitionIds = [...new Set(matches.map(m => m.competition_id))]

  // Fetch teams and competitions in parallel
  const [{ data: teams }, { data: competitions }] = await Promise.all([
    supabase.from('teams').select('*').in('id', teamIds),
    supabase.from('competitions').select('*').in('id', competitionIds)
  ])

  const teamMap = new Map((teams || []).map(t => [t.id, t]))
  const competitionMap = new Map((competitions || []).map(c => [c.id, c]))

  return matches.map(match => ({
    ...match,
    home_team: teamMap.get(match.home_team_id) || null,
    away_team: teamMap.get(match.away_team_id) || null,
    competition: competitionMap.get(match.competition_id) || null,
  }))
}

export async function getRecentMatchesServer(limit = 5): Promise<MatchWithTeams[]> {
  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()
  
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .lte('kickoff_at', now)
    .eq('status', 'finished')
    .order('kickoff_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent matches:', error)
    return []
  }

  if (!matches || matches.length === 0) {
    return []
  }

  const teamIds = [...new Set([...matches.map(m => m.home_team_id), ...matches.map(m => m.away_team_id)])]
  const competitionIds = [...new Set(matches.map(m => m.competition_id))]

  const [{ data: teams }, { data: competitions }] = await Promise.all([
    supabase.from('teams').select('*').in('id', teamIds),
    supabase.from('competitions').select('*').in('id', competitionIds)
  ])

  const teamMap = new Map((teams || []).map(t => [t.id, t]))
  const competitionMap = new Map((competitions || []).map(c => [c.id, c]))

  return matches.map(match => ({
    ...match,
    home_team: teamMap.get(match.home_team_id) || null,
    away_team: teamMap.get(match.away_team_id) || null,
    competition: competitionMap.get(match.competition_id) || null,
  }))
}

// Players
export async function getPlayersServer(limit = 50): Promise<Player[]> {
  const supabase = await createServerSupabaseClient()
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

// Standings
export interface StandingWithTeam extends Standing {
  team: Team | null
}

export async function getStandingsServer(seasonId: string, competitionId: string): Promise<StandingWithTeam[]> {
  const supabase = await createServerSupabaseClient()
  
  const { data: standings, error } = await supabase
    .from('standings')
    .select('*')
    .eq('season_id', seasonId)
    .eq('competition_id', competitionId)
    .order('position', { ascending: true })

  if (error) {
    console.error('Error fetching standings:', error)
    return []
  }

  if (!standings || standings.length === 0) {
    return []
  }

  const teamIds = standings.map(s => s.team_ref_id)
  const { data: teams } = await supabase.from('teams').select('*').in('id', teamIds)
  
  const teamMap = new Map((teams || []).map(t => [t.id, t]))

  return standings.map(standing => ({
    ...standing,
    team: teamMap.get(standing.team_ref_id) || null,
  }))
}
