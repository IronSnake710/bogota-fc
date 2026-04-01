import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { MatchWithTeams } from '@/lib/data/server';

interface MatchCardProps {
  match: MatchWithTeams;
  variant?: 'default' | 'compact' | 'detailed';
}

export function MatchCard({ match, variant = 'default' }: MatchCardProps) {
  const isHome = match.is_home;
  const isScheduled = match.status === 'scheduled';
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (variant === 'compact') {
    return (
      <Card className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xs">
                {match.home_team?.short_name?.slice(0, 3).toUpperCase() || 'LOC'}
              </span>
            </div>
            <span className="text-sm font-medium truncate">{match.home_team?.name}</span>
          </div>
          <div className="px-3">
            {isScheduled ? (
              <span className="text-sm font-bold text-primary">{formatTime(match.kickoff_at)}</span>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-primary">{match.home_score}</span>
                <span className="text-text-muted">-</span>
                <span className="text-lg font-bold text-primary">{match.away_score}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className="text-sm font-medium truncate">{match.away_team?.name}</span>
            <div className="w-8 h-8 bg-surface-dark rounded-full flex items-center justify-center">
              <span className="text-text-muted font-bold text-xs">
                {match.away_team?.short_name?.slice(0, 3).toUpperCase() || 'VIS'}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/partidos/${match.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={isLive ? 'error' : isScheduled ? 'default' : 'secondary'}>
              {isLive ? 'EN VIVO' : isScheduled ? 'Próximo' : 'Finalizado'}
            </Badge>
            <span className="text-sm text-text-muted">
              {match.competition?.name} {match.matchday && `• Jornada ${match.matchday}`}
            </span>
          </div>
          <span className="text-sm text-text-muted">{formatDate(match.kickoff_at)}</span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className={`flex flex-col items-center flex-1 ${!isHome ? 'opacity-70' : ''}`}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <span className="text-primary font-bold text-lg">
                {match.home_team?.short_name?.slice(0, 3).toUpperCase() || 'LOC'}
              </span>
            </div>
            <span className="text-sm font-semibold text-center">{match.home_team?.name}</span>
            <span className="text-xs text-text-muted">Local</span>
          </div>

          {/* Score/Time */}
          <div className="flex flex-col items-center px-8">
            {isScheduled ? (
              <>
                <span className="text-3xl font-bold text-primary">{formatTime(match.kickoff_at)}</span>
                <span className="text-sm text-text-muted mt-1">Por jugarse</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-primary">{match.home_score}</span>
                  <span className="text-2xl text-text-muted">-</span>
                  <span className="text-4xl font-bold text-primary">{match.away_score}</span>
                </div>
                {isFinished && <span className="text-sm text-text-muted mt-1">Final</span>}
                {isLive && <span className="text-sm text-error mt-1 animate-pulse">En vivo</span>}
              </>
            )}
          </div>

          {/* Away Team */}
          <div className={`flex flex-col items-center flex-1 ${isHome ? 'opacity-70' : ''}`}>
            <div className="w-16 h-16 bg-surface-dark rounded-full flex items-center justify-center mb-2">
              <span className="text-text-muted font-bold text-lg">
                {match.away_team?.short_name?.slice(0, 3).toUpperCase() || 'VIS'}
              </span>
            </div>
            <span className="text-sm font-semibold text-center">{match.away_team?.name}</span>
            <span className="text-xs text-text-muted">Visita</span>
          </div>
        </div>

        {/* Footer */}
        {isScheduled && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-4">
              <button className="text-sm text-primary hover:underline font-medium">
                Ver detalles
              </button>
              <span className="text-border">|</span>
              <button className="text-sm text-secondary hover:underline font-medium">
                Comprar entradas
              </button>
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
}
