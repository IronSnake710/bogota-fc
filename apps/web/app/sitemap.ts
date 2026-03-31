import type { MetadataRoute } from 'next';

// Static routes
const routes = [
  '',
  '/partidos',
  '/partidos/calendario',
  '/partidos/resultados',
  '/equipo',
  '/equipo/staff',
  '/equipo/femenino',
  '/equipo/cantera',
  '/competicion',
  '/noticias',
  '/noticias/comunicados',
  '/media/videos',
  '/media/galerias',
  '/entradas',
  '/entradas/abonos',
  '/entradas/estadio',
  '/tienda',
  '/club/historia',
  '/club/identidad',
  '/club/estadio',
  '/club/fundacion',
  '/club/transparencia',
  '/club/contacto',
  '/fans',
  '/fans/membresia',
  '/fans/eventos',
  '/fans/newsletter',
  '/fans/faq',
  '/sponsors',
  '/academy',
  '/terminos',
  '/privacidad',
  '/cookies',
  '/accesibilidad',
  '/busqueda',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bogotafc.com';

  // Generate entries for static routes
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/partidos') ? 0.9 : 0.7,
  }));

  return staticEntries;
}
