import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface">
      <div className="text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          ¡Página no encontrada!
        </h2>
        <p className="text-text-muted max-w-md mx-auto mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida. 
          Puede que el partido se haya jugado en otra cancha.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Volver al inicio
            </Button>
          </Link>
          <Link href="/partidos">
            <Button variant="outline" size="lg">
              Ver calendario de partidos
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-muted mb-4">Enlaces populares:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/equipo" className="text-primary hover:underline">
              Plantilla
            </Link>
            <Link href="/noticias" className="text-primary hover:underline">
              Noticias
            </Link>
            <Link href="/entradas" className="text-primary hover:underline">
              Entradas
            </Link>
            <Link href="/tienda" className="text-primary hover:underline">
              Tienda
            </Link>
            <Link href="/club/contacto" className="text-primary hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
