import Link from 'next/link';
import { Metadata } from 'next';
import { MatchCard } from '@/components/matches/MatchCard';
import { MatchFiltersClient } from '@/components/matches/MatchFiltersClient';
import { Button } from '@/components/ui/Button';
import { getUpcomingMatchesServer, getRecentMatchesServer } from '@/lib/data/server';

export const metadata: Metadata = {
  title: 'Partidos',
  description: 'Calendario de partidos, resultados y próximos encuentros de Bogota FC',
};

interface PageProps {
  searchParams: Promise<{ tab?: string; competicion?: string; temporada?: string }>;
}

export default async function PartidosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'proximos';

  // Get real matches from Supabase
  const [upcomingMatches, finishedMatches] = await Promise.all([
    getUpcomingMatchesServer(20),
    getRecentMatchesServer(20),
  ]);
  
  const matches = activeTab === 'proximos' ? upcomingMatches : finishedMatches;

  // Tab configuration
  const tabs = [
    { value: 'proximos', label: 'Próximos Partidos' },
    { value: 'resultados', label: 'Resultados' },
  ];

  // Competition filter (from real data)
  const competitionSlugs = [...new Set(matches.map(m => m.competition?.slug).filter((slug): slug is string => !!slug))];
  const competitionOptions = [
    { value: 'todas', label: 'Todas las competiciones' },
    ...competitionSlugs.map(slug => ({
      value: slug,
      label: matches.find(m => m.competition?.slug === slug)?.competition?.name || slug,
    })),
  ];

  // Season filter (simplified for now)
  const seasonOptions = [{ value: '2025', label: 'Temporada 2025' }];

  // Get selected filters
  const selectedCompetition = params.competicion || 'todas';
  const selectedSeason = params.temporada || '2025';

  // Filter by competition if selected
  const filteredMatches = selectedCompetition === 'todas'
    ? matches
    : matches.filter((m) => m.competition?.slug === selectedCompetition);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-12">
        <div className="container-club">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Calendario de Partidos
          </h1>
          <p className="text-white/80 max-w-2xl">
            Consulta los próximos encuentros, revisa los resultados de partidos anteriores 
            y mantente al día con la agenda deportiva de Bogota FC.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-surface border-b border-border">
        <div className="container-club">
          <MatchFiltersClient
            tabs={tabs}
            activeTab={activeTab}
            competitionOptions={competitionOptions}
            seasonOptions={seasonOptions}
            selectedCompetition={selectedCompetition}
            selectedSeason={selectedSeason}
          />
        </div>
      </section>

      {/* Match List */}
      <section className="py-8">
        <div className="container-club">
          {filteredMatches.length > 0 ? (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No hay partidos disponibles
              </h3>
              <p className="text-text-muted mb-6">
                {activeTab === 'proximos'
                  ? 'No hay partidos programados para los filtros seleccionados.'
                  : 'No hay resultados disponibles para los filtros seleccionados.'}
              </p>
              <Link href="/partidos">
                <Button variant="outline">Ver todos los partidos</Button>
              </Link>
            </div>
          )}

          {/* Pagination (mock) */}
          {filteredMatches.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      page === 1
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-secondary hover:bg-surface-dark'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-t border-border">
        <div className="container-club">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/competicion/tabla" className="group">
              <div className="p-6 bg-surface rounded-xl border border-border group-hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Tabla de Posiciones</h3>
                <p className="text-sm text-text-muted">Consulta la clasificación actual</p>
              </div>
            </Link>

            <Link href="/equipo" className="group">
              <div className="p-6 bg-surface rounded-xl border border-border group-hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Plantilla</h3>
                <p className="text-sm text-text-muted">Conoce a los jugadores</p>
              </div>
            </Link>

            <Link href="/entradas" className="group">
              <div className="p-6 bg-surface rounded-xl border border-border group-hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Comprar Entradas</h3>
                <p className="text-sm text-text-muted">Adquiere tus boletas</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
