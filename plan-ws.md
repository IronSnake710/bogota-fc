# Plan de Ejecución - Bogota FC Web

**Stack desacoplado:** Frontend React + Backend API REST con servicios gestionados (Supabase/Firebase). SEO optimizado, contenido dinámico y arquitectura escalable por fases.

---

## 1. Arquitectura del Stack

### Frontend (React SPA)
| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| Framework | React 18+ | UI components |
| Routing | React Router DOM | SPA navigation |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| UI Kit | shadcn/ui + Lucide Icons | Componentes accesibles |
| HTTP Client | TanStack Query | Caché, loading states, revalidación |
| SEO | React Helmet Async | Metadatos dinámicos |
| Deployment | Vercel | Edge CDN, previews |

### Backend (Servicios Gestionados)
| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| Database | Supabase PostgreSQL | Datos estructurados, relaciones |
| Auth | Supabase Auth | Fan accounts (V1+) |
| Storage | Supabase Storage | Imágenes, assets |
| CMS | Sanity CMS | Contenido editorial flexible |
| API | Supabase REST + Edge Functions | Endpoints custom |
| Search | Algolia / Typesense | Búsqueda global |
| Media | Cloudinary / Mux | Videos optimizados |
| Deployment | Supabase + Sanity | Managed hosting |

### Herramientas de Desarrollo
- **TypeScript** - Tipado estricto en todo el proyecto
- **ESLint + Prettier** - Consistencia de código
- **Husky** - Git hooks para validación
- **Playwright** - E2E testing
- **Vitest** - Unit testing

---

## 2. Estructura de Proyecto

```
bogota-fc-web/
├── apps/
│   ├── web/                    # Frontend React
│   │   ├── src/
│   │   │   ├── components/     # UI components
│   │   │   ├── pages/          # Route components
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── services/       # API clients
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── utils/          # Helpers
│   │   │   └── styles/         # Tailwind config
│   │   └── public/
│   └── cms/                    # Sanity studio
├── packages/
│   ├── shared-types/           # Types compartidos
│   └── eslint-config/
├── supabase/
│   ├── migrations/             # Schema SQL
│   ├── functions/              # Edge functions
│   └── seed/                   # Datos iniciales
└── docs/
    └── api/                    # API documentation
```

---

## 3. Plan de Implementación por Fases

### Fase 1: MVP (Semanas 1-4)
**Objetivo:** Sitio funcional con contenido editorial y básico deportivo.

#### Semana 1: Setup + CMS + Home
- [ ] Configurar monorepo (Turborepo)
- [ ] Setup React + Tailwind + shadcn/ui
- [ ] Configurar Sanity CMS (Noticias, Páginas)
- [ ] Implementar schema de content blocks
- [ ] Maquetar Home con datos mock
- [ ] Setup SEO base (Helmet, robots.txt, sitemap.xml)

#### Semana 2: Supabase + Modelos Core
- [ ] Crear schema SQL: Temporadas, Competiciones, Equipos, Jugadores, Partidos
- [ ] Configurar Supabase client en frontend
- [ ] Seed data inicial (temporada 2024/25, competiciones)
- [ ] Implementar TanStack Query para caché
- [ ] Crear types compartidos
q
#### Semana 3: Equipo + Noticias
- [ ] Página Plantilla (filtros por posición, grid de jugadores)
- [ ] Página Perfil Jugador (stats, bio, media)
- [ ] Listado de Noticias (filtros, grid, paginación)
- [ ] Página Detalle Noticia (content blocks, related)
- [ ] Componentes reutilizables: PlayerCard, NewsCard

#### Semana 4: Partidos + Calendario
- [ ] Listado Calendario/Resultados (filtros por temporada/competición)
- [ ] Página Detalle Partido (marcador, contexto, stats básicas)
- [ ] Componente Tabla de Clasificación
- [ ] Página Competiciones (selector torneo, tabla, calendario)
- [ ] Integrar CTAs de Entradas (links externos)
- [ ] Integrar Tienda (catálogo, links externos)

**Entregables MVP:**
- Home, Noticias, Equipo, Partidos, Competiciones funcionales
- CMS editorial operativo
- SEO técnico base implementado
- Deploy en staging

---

### Fase 2: V1 (Semanas 5-8)
**Objetivo:** Match center completo, internacionalización, módulo Fans.

#### Semana 5: Match Center Ampliado
- [ ] Tabs en detalle de partido: Resumen, Stats, Alineaciones, Minuto a minuto
- [ ] Componente Alineaciones (formación táctica)
- [ ] Timeline de eventos del partido
- [ ] Comparativa de estadísticas (charts)
- [ ] Selectores persistentes de temporada/competición

#### Semana 6: Media + Biblioteca
- [ ] Página Videos (grid, filtros, reproductor)
- [ ] Página Galerías (visor, thumbnails)
- [ ] Taxonomías robustas: por temporada, competición, tipo
- [ ] Lazy loading de media
- [ ] Optimización de imágenes (Cloudinary)

#### Semana 7: Internacionalización
- [ ] Setup i18n (react-i18next)
- [ ] Traducciones UI (es/en/pt)
- [ ] Formatos de fecha/moneda localizados
- [ ] Selector de idioma en header
- [ ] URLs localizables (/en/news, /es/noticias)

#### Semana 8: Módulo Fans
- [ ] Setup Supabase Auth
- [ ] Página Membresía (beneficios, planes)
- [ ] Newsletter opt-in (integración servicio email)
- [ ] Formularios de contacto funcional
- [ ] Alertas y notificaciones (estado)
- [ ] Integrar analytics (Plausible/Google Analytics)
- [ ] Cookie consent y preferencias

**Entregables V1:**
- Match center completo
- Media library con 500+ items
- Sitio multiidioma
- Sistema de cuentas básico
- Analytics activo

---

### Fase 3: V2 (Semanas 9-12)
**Objetivo:** Real-time, personalización, integraciones profundas.

#### Semana 9: Live Match Center
- [ ] WebSocket/Supabase Realtime para eventos en vivo
- [ ] Actualización automática de marcador
- [ ] Push notifications (OneSignal)
- [ ] Estado "En vivo" con badge visual

#### Semana 10: Cuenta de Fan
- [ ] Dashboard de usuario (preferencias)
- [ ] Personalización de homepage (favoritos)
- [ ] Historial de interacciones
- [ ] Guardar partidos favoritos

#### Semana 11: Integraciones
- [ ] Ticketing: API de proveedor externo (mostrar disponibilidad real)
- [ ] E-commerce: Catálogo sincronizado con Shopify/woo
- [ ] Pasarela de pagos (si aplica membresía propia)

#### Semana 12: Evergreen + Polish
- [ ] Contenido histórico (archivo de temporadas)
- [ ] Workflow editorial avanzado (Sanity)
- [ ] Automatización de contenido relacionado
- [ ] Optimización de performance (Lighthouse 95+)
- [ ] Testing E2E completo
- [ ] Accesibilidad auditada (WCAG 2.1 AA)

**Entregables V2:**
- Live match center real-time
- Experiencia personalizada por usuario
- Integraciones de ticketing y e-commerce
- Arquitectura preparada para escalar

---

## 4. Modelo de Datos - Implementación

### Supabase Tables (Core)
```sql
-- Jerarquía: Temporada > Competicion > Partido
seasons (id, name, start_date, end_date, status, slug)
competitions (id, name, type, country, logo_url, slug)
teams (id, name, type, badge_url, country, city, slug)

-- Entidades deportivas
players (id, first_name, last_name, number, position, birth_date, 
         nationality, height, weight, preferred_foot, photo_url, 
         bio_blocks, status, team_id, slug)
staff (id, name, role, photo_url, bio_blocks, team_id, slug)

-- Partidos y relaciones
matches (id, season_id, competition_id, matchday, kickoff, venue_id,
         home_team_id, away_team_id, status, home_score, away_score,
         attendance, referee, home_lineup[], away_lineup[], events[], stats)

-- Clasificaciones
standings (id, season_id, competition_id, rows[team_id, p, w, d, l, gf, ga, gd, pts, form[]])

-- Sponsors
sponsors (id, name, tier, logo_url, url, valid_from, valid_to, slug)
```

### Sanity Documents (Editorial)
```typescript
article {
  title, slug, publishedAt, author, category, tags[],
  excerpt, bodyBlocks[], featuredMedia, related[], seo
}
officialStatement {
  ...article, isOfficial: true, attachments[]
}
mediaAsset {
  type, url, altText, credits, duration, dimensions, tags, date
}
video {
  title, slug, platform, embedRef, categories[], date, relatedMatch
}
gallery {
  title, slug, items[], relatedMatch
}
```

### Content Blocks (Sanity)
```typescript
// Reusable blocks para body de artículos/páginas
type ContentBlock =
  | { _type: 'text', content: PortableText }
  | { _type: 'image', asset: Image, caption: string }
  | { _type: 'video', asset: Video }
  | { _type: 'gallery', items: Image[] }
  | { _type: 'embed', url: string, type: 'youtube' | 'twitter' }
  | { _type: 'matchPreview', matchId: string }
  | { _type: 'playerHighlight', playerId: string }
  | { _type: 'cta', title: string, link: string, variant: 'primary' | 'secondary' }
```

---

## 5. API Design

### REST Endpoints (Supabase)
```
GET  /rest/v1/matches?season_id=eq.{id}&order=kickoff.desc
GET  /rest/v1/matches?id=eq.{id}&select=*,home_team:teams!home_team_id(*),away_team:teams!away_team_id(*)
GET  /rest/v1/players?team_id=eq.{id}&order=position.asc
GET  /rest/v1/players?slug=eq.{slug}
GET  /rest/v1/standings?competition_id=eq.{id}&season_id=eq.{id}
GET  /rest/v1/sponsors?tier=eq.{tier}&order=display_order.asc
```

### GraphQL (opcional V1+)
```graphql
query MatchDetail($slug: String!) {
  match(slug: $slug) {
    id, kickoff, status, homeScore, awayScore
    homeTeam { name, badgeUrl }
    awayTeam { name, badgeUrl }
    venue { name, city }
    lineup { home { player { name, number, position }, status } }
    events { minute, type, player { name }, description }
    stats { possession: { home, away }, shots: { home, away } }
  }
}
```

### Edge Functions (Supabase)
```
POST /functions/v1/search          # Búsqueda global (Algolia)
POST /functions/v1/newsletter      # Suscripción newsletter
GET  /functions/v1/live-match/{id} # Datos en tiempo real
POST /functions/v1/webhook/cms     # Sync Sanity → Supabase
```

---

## 6. SEO & Performance

### Metadatos Dinámicos
```typescript
// Cada página define sus metas
interface PageSEO {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article' | 'profile'
  schema: SportTeam | SportsEvent | NewsArticle // JSON-LD
}
```

### Schema.org Recomendados
- **Home:** `SportsOrganization` (Bogota FC)
- **Partido:** `SportsEvent` con `SportsTeam` participantes
- **Jugador:** `Person` + `Athlete` (custom)
- **Noticia:** `NewsArticle`
- **Video:** `VideoObject`

### Optimizaciones Técnicas
- ISR (Incremental Static Regeneration) si usamos Next.js, o SSG con React
- Lazy loading de imágenes con `loading="lazy"`
- Prefetch de rutas críticas
- CDN para assets (Cloudinary + Vercel Edge)
- Caché de API con stale-while-revalidate

---

## 7. Testing Strategy

### Unit Tests (Vitest)
- Utils, formatters, helpers
- Componentes puros (React Testing Library)
- Hooks personalizados

### Integration Tests
- Flujos de API (MSW para mocks)
- Navegación entre páginas
- Formularios y validaciones

### E2E Tests (Playwright)
- Home → Partido → Jugador
- Filtros de calendario
- Búsqueda global
- Checkout de entradas (flujo completo)

---

## 8. Deployment & DevOps

### Environments
- **Local:** `localhost:3000` (Vite dev server)
- **Preview:** PR-based deployments en Vercel
- **Staging:** `staging.bogotafc.com` (datos de test)
- **Production:** `bogotafc.com` (datos reales)

### CI/CD Pipeline
1. **Lint & Type Check** en cada PR
2. **Unit Tests** deben pasar
3. **Build** preview en Vercel
4. **E2E Tests** en staging
5. **Deploy a prod** solo desde `main`

### Monitoreo
- **Uptime:** Vercel Analytics + Supabase Status
- **Errors:** Sentry
- **Performance:** Web Vitals (Vercel)
- **SEO:** Google Search Console

---

## 9. Checklist de Entregables

### MVP
- [ ] Repo configurado y documentado
- [ ] Sanity Studio funcional
- [ ] Supabase schema migrado
- [ ] Home, Noticias, Equipo, Partidos, Competiciones
- [ ] SEO técnico base
- [ ] Deploy staging

### V1
- [ ] Match center completo (5 tabs)
- [ ] Media library (500+ items)
- [ ] i18n (3 idiomas)
- [ ] Auth básico
- [ ] Analytics activo

### V2
- [ ] Real-time match center
- [ ] Personalización por usuario
- [ ] Integraciones ticketing/e-commerce
- [ ] Performance audit (95+ Lighthouse)
- [ ] Accesibilidad auditada

---

## 10. Notas de Arquitectura

### Decisiones Clave
1. **Desacoplado:** Separar frontend y backend permite escalar equipos independientemente y usar el mejor tool para cada job.
2. **Sanity CMS:** Editor de contenido flexible con content blocks, ideal para artículos complejos.
3. **Supabase:** PostgreSQL con relaciones + REST API automática + Auth incluido.
4. **TanStack Query:** Manejo de estado servidor sin Redux, con caché inteligente.
5. **TypeScript compartido:** Types en package `shared-types` para consistencia FE/BE.

### Escalabilidad Futura
- Añadir microservicios para stats avanzadas
- Implementar GraphQL federado
- Migrar a Next.js si se necesita SSR para SEO
- Caché distribuida (Redis) para datos deportivos

---

*Plan generado para stack desacoplado - Frontend React + Backend Supabase/Sanity*
