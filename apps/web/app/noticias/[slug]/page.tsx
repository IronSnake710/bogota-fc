import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getNewsServer } from '@/lib/data/server';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

// Format date for display
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function getNewsBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related news
  const relatedNews = (await getNewsServer(4)).filter(
    (news) => news.id !== article.id
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary py-8">
        <div className="container-club">
          <div className="flex items-center gap-2 text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/noticias" className="hover:text-white transition-colors">
              Noticias
            </Link>
            <span>/</span>
            <span className="text-white">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-surface-dark py-8">
        <div className="container-club">
          <Badge variant="secondary" className="mb-4">
            {article.content_type === 'article' ? 'Artículo' : article.content_type}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {article.title}
          </h1>
          {article.published_at && (
            <div className="flex items-center gap-4 text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(article.published_at)}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {article.cover_image_url && (
        <section className="bg-surface-dark pb-8">
          <div className="container-club">
            <div className="relative w-full aspect-video max-h-[500px] rounded-lg overflow-hidden">
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 bg-surface">
        <div className="container-club">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {article.summary && (
                <p className="text-xl text-text-muted mb-8 font-medium leading-relaxed">
                  {article.summary}
                </p>
              )}
              
              {article.body ? (
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-foreground prose-strong:text-primary prose-a:text-secondary hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              ) : (
                <p className="text-text-muted italic">
                  Contenido completo próximamente...
                </p>
              )}

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-primary mb-4">Compartir</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related News */}
              {relatedNews.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Más noticias
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((news) => (
                      <Link 
                        key={news.id} 
                        href={`/noticias/${news.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          {news.cover_image_url && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={news.cover_image_url}
                                alt={news.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="80px"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {news.title}
                            </h4>
                            {news.published_at && (
                              <span className="text-xs text-text-muted mt-1 block">
                                {formatDate(news.published_at)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              {/* Newsletter CTA */}
              <Card className="p-6 bg-primary text-white">
                <h3 className="text-lg font-semibold mb-2">Mantente informado</h3>
                <p className="text-white/80 text-sm mb-4">
                  Suscríbete para recibir las últimas noticias de Bogota FC.
                </p>
                <input
                  type="email"
                  placeholder="Tu correo"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 text-sm mb-3"
                />
                <Button variant="secondary" size="sm" className="w-full">
                  Suscribirse
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
