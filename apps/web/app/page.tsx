import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Mock data for the homepage
const nextMatch = {
  id: '1',
  homeTeam: { name: 'Bogota FC', shortName: 'BFC' },
  awayTeam: { name: 'Millonarios', shortName: 'MIL' },
  date: 'Sábado, 15 de Marzo',
  time: '18:00',
  competition: 'Liga BetPlay',
  stadium: 'Estadio El Campín',
  ticketLink: '/entradas/1',
};

const recentResults = [
  {
    id: '1',
    homeTeam: { name: 'Bogota FC', score: 2 },
    awayTeam: { name: 'Santa Fe', score: 1 },
    competition: 'Liga BetPlay',
    date: 'Hace 3 días',
  },
  {
    id: '2',
    homeTeam: { name: 'Nacional', score: 0 },
    awayTeam: { name: 'Bogota FC', score: 0 },
    competition: 'Liga BetPlay',
    date: 'Hace 1 semana',
  },
];

const news = [
  {
    id: '1',
    title: 'Bogota FC gana el clásico capitalino',
    excerpt: 'Victoria importante en El Campín con goles de Martínez y Rodríguez.',
    category: 'Equipo',
    date: 'Hace 2 horas',
    featured: true,
  },
  {
    id: '2',
    title: 'Nuevo refuerzo para la delantera',
    excerpt: 'El delantero internacional se une al equipo para la segunda mitad de la temporada.',
    category: 'Fichajes',
    date: 'Hace 5 horas',
    featured: false,
  },
  {
    id: '3',
    title: 'Convocatoria para la cantera',
    excerpt: 'Pruebas de selección para las categorías inferiores este fin de semana.',
    category: 'Academia',
    date: 'Hace 1 día',
    featured: false,
  },
];

const standings = [
  { pos: 1, team: 'Bogota FC', pj: 15, pts: 35, form: ['W', 'W', 'D', 'W', 'W'] },
  { pos: 2, team: 'Millonarios', pj: 15, pts: 32, form: ['W', 'D', 'W', 'W', 'D'] },
  { pos: 3, team: 'Nacional', pj: 15, pts: 29, form: ['D', 'W', 'L', 'W', 'W'] },
  { pos: 4, team: 'Santa Fe', pj: 15, pts: 27, form: ['L', 'W', 'W', 'L', 'D'] },
  { pos: 5, team: 'América', pj: 15, pts: 24, form: ['W', 'L', 'D', 'W', 'L'] },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Next Match */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/40" />
        <div className="container-club relative py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Próximo Partido
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {nextMatch.homeTeam.name} vs {nextMatch.awayTeam.name}
              </h1>
              <p className="text-white/80 text-lg mb-2">
                {nextMatch.competition} • {nextMatch.date} • {nextMatch.time}
              </p>
              <p className="text-white/60 mb-6">
                {nextMatch.stadium}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={nextMatch.ticketLink}>
                  <Button variant="secondary" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Comprar Entradas
                  </Button>
                </Link>
                <Link href={`/partidos/${nextMatch.id}`}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Ver Detalles
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-xl md:text-2xl">BFC</span>
                </div>
                <span className="text-white font-semibold">{nextMatch.homeTeam.name}</span>
              </div>
              <div className="text-center">
                <span className="text-white/60 text-sm">VS</span>
                <div className="text-4xl md:text-6xl font-bold text-white/20">—</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-xl md:text-2xl">MIL</span>
                </div>
                <span className="text-white font-semibold">{nextMatch.awayTeam.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-8 bg-surface-dark">
        <div className="container-club">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Resultados Recientes</h2>
            <Link href="/partidos?tab=resultados" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentResults.map((match) => (
              <Card key={match.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">BFC</span>
                    </div>
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-2xl font-bold text-primary">{match.homeTeam.score}</span>
                    <span className="text-text-muted">:</span>
                    <span className="text-2xl font-bold text-primary">{match.awayTeam.score}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <span className="font-medium">{match.awayTeam.name}</span>
                    <div className="w-10 h-10 bg-surface-dark rounded-full flex items-center justify-center">
                      <span className="text-text-muted font-bold text-sm">{match.awayTeam.name.slice(0, 3).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm text-text-muted">
                  <span>{match.competition}</span>
                  <span>{match.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-16">
        <div className="container-club">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Últimas Noticias</h2>
            <Link href="/noticias" className="text-primary hover:underline">
              Ver todas las noticias →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <Link key={article.id} href={`/noticias/${article.id}`}>
                <Card className={`h-full transition-shadow hover:shadow-md ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <div className={`bg-surface-dark rounded-lg mb-4 flex items-center justify-center ${index === 0 ? 'h-48 md:h-64' : 'h-40'}`}>
                    <svg className="w-16 h-16 text-text-muted/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <CardHeader className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-sm text-text-muted">{article.date}</span>
                    </div>
                    <CardTitle className={index === 0 ? 'text-2xl' : 'text-lg'}>
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-muted">{article.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Standings Section */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container-club">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Clasificación</h2>
            <Link href="/competicion/tabla" className="text-primary hover:underline">
              Ver tabla completa →
            </Link>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-text-muted">Pos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-text-muted">Equipo</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-text-muted">PJ</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-text-muted">Pts</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-text-muted hidden sm:table-cell">Forma</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team) => (
                    <tr key={team.pos} className="border-b border-border last:border-0 hover:bg-surface-dark/50">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-sm font-bold ${
                          team.pos === 1 ? 'bg-secondary text-white' : 'text-text-muted'
                        }`}>
                          {team.pos}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{team.team}</td>
                      <td className="py-3 px-4 text-center text-text-muted">{team.pj}</td>
                      <td className="py-3 px-4 text-center font-bold text-primary">{team.pts}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="flex gap-1 justify-center">
                          {team.form.map((result, i) => (
                            <span
                              key={i}
                              className={`w-5 h-5 rounded text-xs flex items-center justify-center font-bold ${
                                result === 'W' ? 'bg-success text-white' :
                                result === 'D' ? 'bg-warning text-primary-dark' :
                                'bg-error text-white'
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTAs Section */}
      <section className="py-12 md:py-16">
        <div className="container-club">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tickets CTA */}
            <Card className="bg-primary text-white">
              <CardHeader>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Entradas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Compra tus entradas para los próximos partidos o adquiere tu abono de temporada.
                </p>
                <Link href="/entradas">
                  <Button variant="secondary" className="w-full">
                    Ver entradas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Shop CTA */}
            <Card className="bg-secondary text-white">
              <CardHeader>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Tienda Oficial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Descubre la nueva colección de camisetas, equipamiento y merchandising oficial.
                </p>
                <Link href="/tienda">
                  <Button className="w-full bg-white text-secondary hover:bg-white/90">
                    Ir a la tienda
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Membership CTA */}
            <Card className="bg-accent">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-primary">Hazte Socio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/80 mb-4">
                  Únete a la familia Bogota FC y disfruta de beneficios exclusivos como socio.
                </p>
                <Link href="/fans/membresia">
                  <Button className="w-full bg-primary text-white hover:bg-primary-dark">
                    Conocer beneficios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-primary-dark">
        <div className="container-club">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Mantente al día con Bogota FC
            </h2>
            <p className="text-white/70 mb-8">
              Suscríbete a nuestro newsletter y recibe las últimas noticias, ofertas exclusivas y contenido especial directamente en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
              />
              <Button type="submit" variant="secondary" className="px-6">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

