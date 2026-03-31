import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getMatchById, mockMatches } from '@/lib/data/mock';

interface PageProps {
  params: Promise<{ matchId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { matchId } = await params;
  const match = getMatchById(matchId);
  
  if (!match) {
    return { title: 'Partido no encontrado | Bogota FC' };
  }

  return {
    title: `${match.equipoLocal?.nombre} vs ${match.equipoVisita?.nombre} | Bogota FC`,
    description: `Detalles del partido ${match.equipoLocal?.nombre} vs ${match.equipoVisita?.nombre} - ${match.competicion?.nombre}`,
  };
}

export async function generateStaticParams() {
  return mockMatches.map((match) => ({
    matchId: match.id,
  }));
}

export default async function MatchDetailPage({ params }: PageProps) {
  const { matchId } = await params;
  const match = getMatchById(matchId);

  if (!match) {
    notFound();
  }

  const isScheduled = match.estado === 'programado';
  const isLive = match.estado === 'en_vivo';
  const isFinished = match.estado === 'finalizado';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container-club py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-text-muted hover:text-primary">Inicio</Link>
            <span className="text-text-muted">/</span>
            <Link href="/partidos" className="text-text-muted hover:text-primary">Partidos</Link>
            <span className="text-text-muted">/</span>
            <span className="text-foreground">Detalle del partido</span>
          </nav>
        </div>
      </div>

      {/* Match Header */}
      <section className="bg-primary py-12">
        <div className="container-club">
          {/* Competition & Status */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="secondary" className="text-sm">
              {match.competicion?.nombre}
            </Badge>
            {match.jornada && (
              <span className="text-white/80 text-sm">Jornada {match.jornada}</span>
            )}
            {isLive && (
              <Badge variant="error" className="animate-pulse">EN VIVO</Badge>
            )}
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {/* Home Team */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-2xl md:text-3xl">
                  {match.equipoLocal?.nombre?.slice(0, 3).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">
                {match.equipoLocal?.nombre}
              </h2>
              <span className="text-white/60 mt-1">Local</span>
            </div>

            {/* Score */}
            <div className="text-center">
              {isScheduled ? (
                <div className="text-5xl md:text-7xl font-bold text-white">
                  {formatTime(match.fechaHora)}
                </div>
              ) : (
                <div className="flex items-center gap-4 text-6xl md:text-8xl font-bold text-white">
                  <span>{match.marcadorLocal}</span>
                  <span className="text-white/40">:</span>
                  <span>{match.marcadorVisita}</span>
                </div>
              )}
              <div className="mt-4">
                {isLive ? (
                  <Badge variant="error" className="text-base px-4 py-1">En vivo</Badge>
                ) : isFinished ? (
                  <span className="text-white/80 text-lg">Final</span>
                ) : (
                  <span className="text-white/80 text-lg">Por jugarse</span>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl md:text-3xl">
                  {match.equipoVisita?.nombre?.slice(0, 3).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">
                {match.equipoVisita?.nombre}
              </h2>
              <span className="text-white/60 mt-1">Visita</span>
            </div>
          </div>

          {/* Match Info */}
          <div className="mt-8 text-center">
            <p className="text-white/80 text-lg">{formatDate(match.fechaHora)}</p>
            <p className="text-white/60 mt-1">{match.arbitro && `Árbitro: ${match.arbitro}`}</p>
          </div>

          {/* CTA */}
          {isScheduled && (
            <div className="mt-8 flex justify-center">
              <Link href={`/entradas/${match.id}`}>
                <Button variant="secondary" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Comprar Entradas
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Match Content Tabs */}
      <section className="py-8">
        <div className="container-club">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {[
              { id: 'resumen', label: 'Resumen', icon: '📋' },
              { id: 'stats', label: 'Estadísticas', icon: '📊' },
              { id: 'alineaciones', label: 'Alineaciones', icon: '👥' },
              { id: 'minutoaminuto', label: 'Minuto a minuto', icon: '⏱️' },
            ].map((tab, index) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:bg-surface-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Partido</CardTitle>
                </CardHeader>
                <CardContent>
                  {isScheduled ? (
                    <div className="text-center py-8">
                      <p className="text-text-muted">
                        El resumen del partido estará disponible una vez finalice el encuentro.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Timeline placeholder */}
                      <div className="space-y-3">
                        {['Gol de Bogota FC - Min 23', 'Gol de Santa Fe - Min 45', 'Gol de Bogota FC - Min 78'].map((event, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-surface rounded-lg">
                            <span className="text-sm font-medium text-primary w-16">{event.split('-')[1]}</span>
                            <span className="text-foreground">{event.split('-')[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Card */}
              {isFinished && (
                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'Posesión del balón', home: 58, away: 42 },
                        { label: 'Tiros a puerta', home: 12, away: 8 },
                        { label: 'Córneres', home: 6, away: 4 },
                        { label: 'Faltas', home: 10, away: 14 },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-primary">{stat.home}%</span>
                            <span className="text-sm text-text-muted">{stat.label}</span>
                            <span className="font-bold text-text-muted">{stat.away}%</span>
                          </div>
                          <div className="flex gap-1 h-2">
                            <div
                              className="bg-primary rounded-l-full"
                              style={{ width: `${stat.home}%` }}
                            />
                            <div
                              className="bg-surface-dark rounded-r-full"
                              style={{ width: `${stat.away}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Match Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Información del Partido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Competición</span>
                      <span className="font-medium">{match.competicion?.nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Fecha</span>
                      <span className="font-medium">{formatDate(match.fechaHora)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Hora</span>
                      <span className="font-medium">{formatTime(match.fechaHora)}</span>
                    </div>
                    {match.jornada && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Jornada</span>
                        <span className="font-medium">{match.jornada}</span>
                      </div>
                    )}
                    {match.arbitro && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Árbitro</span>
                        <span className="font-medium">{match.arbitro}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Related Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Enlaces relacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/competicion/tabla" className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-dark transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="font-medium">Tabla de posiciones</span>
                    </Link>
                    <Link href="/partidos" className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-dark transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Todos los partidos</span>
                    </Link>
                    <Link href="/entradas" className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-dark transition-colors">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      <span className="font-medium">Comprar entradas</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
