import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/supabase/database.types'

export type StoreProduct = Tables<'store_products'>

export async function getStoreProducts(limit = 20): Promise<StoreProduct[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .eq('status', 'published')
    .gt('stock_quantity', 0)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching store products:', error)
    return []
  }

  return data || []
}

export async function getStoreProductBySlug(slug: string): Promise<StoreProduct | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching store product by slug:', error)
    return null
  }

  return data
}

export async function getFeaturedProducts(limit = 4): Promise<StoreProduct[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .eq('status', 'published')
    .not('image_url', 'is', null)
    .gt('stock_quantity', 0)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}
