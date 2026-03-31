'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface">
      <div className="text-center px-4">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-error/10 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold text-primary mb-4">
          ¡Algo salió mal!
        </h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Error en la aplicación
        </h2>
        <p className="text-text-muted max-w-md mx-auto mb-8">
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado 
          y estamos trabajando para solucionarlo.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-error/5 border border-error/20 rounded-lg text-left max-w-lg mx-auto">
            <p className="text-sm font-mono text-error break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-text-muted mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={reset} variant="primary" size="lg">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Intentar de nuevo
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Help */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-muted mb-4">
            ¿Necesitas ayuda?{' '}
            <Link href="/club/contacto" className="text-primary hover:underline">
              Contacta con nosotros
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
