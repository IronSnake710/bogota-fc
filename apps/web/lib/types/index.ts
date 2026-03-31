// Domain types for Bogota FC
// Based on interBogota-fc-requeriment.md Section 3

// ============ SEASONS & COMPETITIONS ============

export interface Season {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'archivada';
  slug: string;
}

export interface Competition {
  id: string;
  nombre: string;
  tipo: 'liga' | 'copa' | 'amistoso';
  pais?: string;
  region?: string;
  logoUrl?: string;
  slug: string;
}

// ============ TEAMS ============

export interface Team {
  id: string;
  nombre: string;
  tipo: 'principal' | 'rival' | 'cantera';
  escudoUrl?: string;
  pais?: string;
  ciudad?: string;
  slug: string;
}

// ============ MATCHES ============

export type MatchStatus = 'programado' | 'en_vivo' | 'finalizado' | 'suspendido';

export interface MatchEvent {
  id: string;
  tipo: 'gol' | 'tarjeta_amarilla' | 'tarjeta_roja' | 'sustitucion' | 'inicio' | 'fin' | 'var';
  minuto: number;
  jugadorId?: string;
  jugadorNombre?: string;
  jugadorIdSecundario?: string;
  jugadorNombreSecundario?: string;
  descripcion?: string;
}

export interface LineupPlayer {
  jugadorId: string;
  nombre: string;
  dorsal: number;
  posicion: string;
  esTitular: boolean;
  minutoEntrada?: number;
  minutoSalida?: number;
}

export interface Match {
  id: string;
  temporadaId: string;
  competicionId: string;
  jornada?: number;
  fechaHora: string;
  estadioId?: string;
  equipoLocalId: string;
  equipoVisitaId: string;
  estado: MatchStatus;
  marcadorLocal?: number;
  marcadorVisita?: number;
  asistencia?: number;
  arbitro?: string;
  broadcastingRefs?: string[];
  alineacionLocal?: LineupPlayer[];
  alineacionVisita?: LineupPlayer[];
  eventos?: MatchEvent[];
  stats?: Record<string, number | string>;
  // Expanded data
  temporada?: Season;
  competicion?: Competition;
  equipoLocal?: Team;
  equipoVisita?: Team;
}

// ============ PLAYERS & STAFF ============

export interface PlayerClubHistory {
  club: string;
  temporadaInicio: string;
  temporadaFin?: string;
}

export interface PlayerSeasonStats {
  temporadaId: string;
  temporadaNombre?: string;
  competicionId?: string;
  competicionNombre?: string;
  partidos: number;
  goles: number;
  asistencias: number;
  tarjetasAmarillas: number;
  tarjetasRojas: number;
  minutosJugados: number;
}

export interface Player {
  id: string;
  nombre: string;
  apellido: string;
  nombreCompleto?: string;
  dorsal?: number;
  posicion: string;
  fechaNacimiento?: string;
  nacionalidad?: string;
  altura?: number;
  peso?: number;
  pieHabil?: 'derecho' | 'izquierdo' | 'ambidiestro';
  fotoUrl?: string;
  biografiaBloques?: PortableTextBlock[];
  estado: 'activo' | 'lesionado' | 'cedido' | 'retirado';
  equipoId?: string;
  historialClubes?: PlayerClubHistory[];
  statsPorTemporada?: PlayerSeasonStats[];
  redesSociales?: SocialLink[];
  slug: string;
}

export interface Staff {
  id: string;
  nombre: string;
  rol: string;
  fotoUrl?: string;
  biografiaBloques?: PortableTextBlock[];
  equipoId?: string;
  slug: string;
}

// ============ STANDINGS ============

export interface StandingRow {
  posicion: number;
  equipoId: string;
  equipoNombre?: string;
  escudoUrl?: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
  forma: ('W' | 'D' | 'L')[];
}

export interface Standings {
  id: string;
  temporadaId: string;
  competicionId: string;
  temporada?: Season;
  competicion?: Competition;
  filas: StandingRow[];
}

// ============ NEWS & MEDIA ============

export interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
  level?: number;
  listItem?: string;
}

export interface SocialLink {
  plataforma: 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'tiktok';
  url: string;
}

export interface Article {
  id: string;
  titulo: string;
  slug: string;
  fechaPublicacion: string;
  autorRef?: string;
  autorNombre?: string;
  categoria: string;
  etiquetas?: string[];
  extractoStruct?: string;
  bodyBloques?: PortableTextBlock[];
  mediaDestacadaId?: string;
  mediaDestacada?: MediaAsset;
  relacionados?: Article[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
  estado: 'borrador' | 'publicado';
}

export interface OfficialStatement extends Article {
  oficial: boolean;
  archivosAdjuntos?: Array<{
    nombre: string;
    url: string;
    tipo: string;
  }>;
}

export interface MediaAsset {
  id: string;
  tipo: 'imagen' | 'video' | 'audio';
  url: string;
  altText?: string;
  creditos?: string;
  duracion?: number;
  dimensiones?: {
    width: number;
    height: number;
  };
  etiquetas?: string[];
  fecha?: string;
}

export interface Video {
  id: string;
  titulo: string;
  slug: string;
  plataforma: 'youtube' | 'vimeo' | 'internal';
  embedRef: string;
  categorias?: string[];
  fecha?: string;
  relatedMatchId?: string;
  thumbnailUrl?: string;
}

export interface Gallery {
  id: string;
  titulo: string;
  slug: string;
  items: MediaAsset[];
  relatedMatchId?: string;
  fecha?: string;
}

// ============ VENUE ============

export interface Venue {
  id: string;
  nombre: string;
  direccion?: string;
  ciudad?: string;
  pais?: string;
  capacidad?: number;
  mapaEmbedRef?: string;
  accesibilidadBloques?: PortableTextBlock[];
  slug: string;
  imagenes?: MediaAsset[];
}

// ============ COMMERCIAL ============

export interface TicketZone {
  nombre: string;
  precio: number;
  disponibilidad: 'alta' | 'media' | 'baja' | 'agotado';
}

export interface TicketProduct {
  id: string;
  tipo: 'partido' | 'abono' | 'membresia';
  matchId?: string;
  temporadaId?: string;
  nombre: string;
  descripcionBloques?: PortableTextBlock[];
  proveedorCheckoutUrl: string;
  zonas?: TicketZone[];
  politicasBloques?: PortableTextBlock[];
}

export interface ShopProductVariant {
  sku: string;
  talla?: string;
  color?: string;
  precio: number;
  disponible: boolean;
}

export interface ShopProduct {
  id: string;
  nombre: string;
  slug: string;
  categoria: string;
  descripcionBloques?: PortableTextBlock[];
  imagenes?: MediaAsset[];
  variantes?: ShopProductVariant[];
  proveedorCheckoutUrl?: string;
  tags?: string[];
  relatedPlayerId?: string;
  precioDesde?: number;
}

// ============ SPONSORS & MEMBERSHIP ============

export interface Sponsor {
  id: string;
  nombre: string;
  tier: 'principal' | 'platino' | 'oro' | 'plata' | 'bronce';
  logoUrl: string;
  url?: string;
  vigenciaDesde?: string;
  vigenciaHasta?: string;
  activacionesBloques?: PortableTextBlock[];
  slug: string;
}

export interface MembershipPlan {
  id: string;
  nombre: string;
  nivel: 'basico' | 'premium' | 'vip';
  beneficiosBloques?: PortableTextBlock[];
  precioRef?: {
    mensual: number;
    anual: number;
    moneda: string;
  };
  proveedorCheckoutUrl?: string;
  slug: string;
}

// ============ FANS ============

export interface FanEvent {
  id: string;
  nombre: string;
  fechaHora: string;
  lugar?: string;
  tipo: string;
  descripcionBloques?: PortableTextBlock[];
  registroUrl?: string;
  capacidadRef?: number;
  imagen?: MediaAsset;
}

// ============ NAVIGATION ============

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  featured?: {
    title: string;
    description: string;
    imageUrl?: string;
    href: string;
  };
}

// ============ SITE CONFIG ============

export interface SiteConfig {
  clubName: string;
  clubFullName: string;
  foundedYear: number;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  socialLinks: SocialLink[];
  contactEmail: string;
  contactPhone?: string;
  address?: string;
}
