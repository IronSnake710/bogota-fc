import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type News = Tables<'news'>

export async function getNews(limit = 10): Promise<News[]> {
  const supabase = createClient()
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

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }

  return data
}

export async function getFeaturedNews(): Promise<News[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .not('cover_image_url', 'is', null)
    .order('published_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching featured news:', error)
    return []
  }

  return data || []
}
