import type { Match, Season, Competition, Team } from '@/lib/types';

export const mockSeasons: Season[] = [
  { id: '1', nombre: '2024', fechaInicio: '2024-01-01', fechaFin: '2024-12-31', estado: 'activa', slug: '2024' },
  { id: '2', nombre: '2023', fechaInicio: '2023-01-01', fechaFin: '2023-12-31', estado: 'archivada', slug: '2023' },
];

export const mockCompetitions: Competition[] = [
  { id: '1', nombre: 'Liga BetPlay Dimayor', tipo: 'liga', pais: 'Colombia', logoUrl: '/liga-logo.png', slug: 'liga-betplay' },
  { id: '2', nombre: 'Copa Colombia', tipo: 'copa', pais: 'Colombia', logoUrl: '/copa-logo.png', slug: 'copa-colombia' },
  { id: '3', nombre: 'Copa Libertadores', tipo: 'copa', pais: 'Sudamérica', logoUrl: '/libertadores-logo.png', slug: 'copa-libertadores' },
];

export const mockTeams: Team[] = [
  { id: '1', nombre: 'Bogota FC', tipo: 'principal', escudoUrl: '/bogota-fc.png', pais: 'Colombia', ciudad: 'Bogotá', slug: 'bogota-fc' },
  { id: '2', nombre: 'Millonarios', tipo: 'rival', escudoUrl: '/millonarios.png', pais: 'Colombia', ciudad: 'Bogotá', slug: 'millonarios' },
  { id: '3', nombre: 'Santa Fe', tipo: 'rival', escudoUrl: '/santa-fe.png', pais: 'Colombia', ciudad: 'Bogotá', slug: 'santa-fe' },
  { id: '4', nombre: 'Nacional', tipo: 'rival', escudoUrl: '/nacional.png', pais: 'Colombia', ciudad: 'Medellín', slug: 'nacional' },
  { id: '5', nombre: 'América', tipo: 'rival', escudoUrl: '/america.png', pais: 'Colombia', ciudad: 'Cali', slug: 'america' },
  { id: '6', nombre: 'Cali', tipo: 'rival', escudoUrl: '/cali.png', pais: 'Colombia', ciudad: 'Cali', slug: 'cali' },
  { id: '7', nombre: 'Junior', tipo: 'rival', escudoUrl: '/junior.png', pais: 'Colombia', ciudad: 'Barranquilla', slug: 'junior' },
];

export const mockMatches: Match[] = [
  // Partidos próximos
  {
    id: '1',
    temporadaId: '1',
    competicionId: '1',
    jornada: 16,
    fechaHora: '2024-03-30T18:00:00',
    equipoLocalId: '1',
    equipoVisitaId: '2',
    estado: 'programado',
    marcadorLocal: undefined,
    marcadorVisita: undefined,
    arbitro: 'Wilmar Roldán',
    equipoLocal: mockTeams[0],
    equipoVisita: mockTeams[1],
    competicion: mockCompetitions[0],
  },
  {
    id: '2',
    temporadaId: '1',
    competicionId: '1',
    jornada: 17,
    fechaHora: '2024-04-06T15:00:00',
    equipoLocalId: '4',
    equipoVisitaId: '1',
    estado: 'programado',
    equipoLocal: mockTeams[3],
    equipoVisita: mockTeams[0],
    competicion: mockCompetitions[0],
  },
  {
    id: '3',
    temporadaId: '1',
    competicionId: '2',
    jornada: undefined,
    fechaHora: '2024-04-10T19:00:00',
    equipoLocalId: '1',
    equipoVisitaId: '5',
    estado: 'programado',
    equipoLocal: mockTeams[0],
    equipoVisita: mockTeams[4],
    competicion: mockCompetitions[1],
  },
  // Partidos finalizados
  {
    id: '4',
    temporadaId: '1',
    competicionId: '1',
    jornada: 15,
    fechaHora: '2024-03-23T16:00:00',
    equipoLocalId: '1',
    equipoVisitaId: '3',
    estado: 'finalizado',
    marcadorLocal: 2,
    marcadorVisita: 1,
    equipoLocal: mockTeams[0],
    equipoVisita: mockTeams[2],
    competicion: mockCompetitions[0],
  },
  {
    id: '5',
    temporadaId: '1',
    competicionId: '1',
    jornada: 14,
    fechaHora: '2024-03-17T18:00:00',
    equipoLocalId: '6',
    equipoVisitaId: '1',
    estado: 'finalizado',
    marcadorLocal: 0,
    marcadorVisita: 0,
    equipoLocal: mockTeams[5],
    equipoVisita: mockTeams[0],
    competicion: mockCompetitions[0],
  },
  {
    id: '6',
    temporadaId: '1',
    competicionId: '1',
    jornada: 13,
    fechaHora: '2024-03-10T15:30:00',
    equipoLocalId: '1',
    equipoVisitaId: '7',
    estado: 'finalizado',
    marcadorLocal: 3,
    marcadorVisita: 0,
    equipoLocal: mockTeams[0],
    equipoVisita: mockTeams[6],
    competicion: mockCompetitions[0],
  },
  {
    id: '7',
    temporadaId: '1',
    competicionId: '3',
    jornada: undefined,
    fechaHora: '2024-03-05T19:30:00',
    equipoLocalId: '1',
    equipoVisitaId: '4',
    estado: 'finalizado',
    marcadorLocal: 1,
    marcadorVisita: 2,
    equipoLocal: mockTeams[0],
    equipoVisita: mockTeams[3],
    competicion: mockCompetitions[2],
  },
];

export function getMatchesByStatus(status: Match['estado']): Match[] {
  return mockMatches.filter((match) => match.estado === status);
}

export function getUpcomingMatches(): Match[] {
  return mockMatches.filter((match) => match.estado === 'programado');
}

export function getFinishedMatches(): Match[] {
  return mockMatches.filter((match) => match.estado === 'finalizado');
}

export function getMatchById(id: string): Match | undefined {
  return mockMatches.find((match) => match.id === id);
}
