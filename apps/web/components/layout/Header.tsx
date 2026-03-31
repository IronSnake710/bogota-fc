'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Partidos',
    href: '/partidos',
    children: [
      { label: 'Calendario', href: '/partidos' },
      { label: 'Resultados', href: '/partidos?tab=resultados' },
      { label: 'Por Competición', href: '/competicion' },
    ],
  },
  {
    label: 'Equipo',
    href: '/equipo',
    children: [
      { label: 'Primer Equipo', href: '/equipo' },
      { label: 'Femenino', href: '/equipo/femenino' },
      { label: 'Cantera / Academia', href: '/equipo/cantera' },
    ],
  },
  {
    label: 'Noticias',
    href: '/noticias',
    children: [
      { label: 'Últimas Noticias', href: '/noticias' },
      { label: 'Categorías', href: '/noticias/categorias' },
      { label: 'Comunicados', href: '/noticias/comunicados' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'Videos', href: '/media/videos' },
      { label: 'Fotos', href: '/media/galerias' },
    ],
  },
  {
    label: 'Entradas',
    href: '/entradas',
    children: [
      { label: 'Comprar', href: '/entradas' },
      { label: 'Abonos / Membresías', href: '/entradas/abonos' },
      { label: 'Info Estadio', href: '/entradas/estadio' },
    ],
  },
  {
    label: 'Tienda',
    href: '/tienda',
  },
  {
    label: 'Club',
    href: '/club',
    children: [
      { label: 'Historia', href: '/club/historia' },
      { label: 'Estadio', href: '/club/estadio' },
      { label: 'Fundación', href: '/club/fundacion' },
      { label: 'Transparencia', href: '/club/transparencia' },
      { label: 'Contacto', href: '/club/contacto' },
    ],
  },
];

function NavLink({ item, className }: { item: NavItem; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          'px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors',
          className
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        className={cn(
          'px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1',
          className
        )}
      >
        {item.label}
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            isHovered && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50',
          isHovered && 'opacity-100 visible'
        )}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-primary z-40 overflow-y-auto">
          <nav className="container-club py-6">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-white/10 last:border-0">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleItem(item.label)}
                      className="flex items-center justify-between w-full py-4 text-white text-lg font-medium"
                    >
                      {item.label}
                      <svg
                        className={cn(
                          'w-5 h-5 transition-transform',
                          expandedItems.includes(item.label) && 'rotate-180'
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedItems.includes(item.label) && (
                      <div className="pb-4 pl-4 space-y-2">
                        <Link
                          href={item.href}
                          className="block py-2 text-white/80 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          Ver todo
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-white/80 hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-4 text-white text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="bg-primary sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-dark">
        <div className="container-club py-2 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-4">
            <span>Fundado en 2024</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Bogotá, Colombia</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/busqueda" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <span className="hidden sm:inline">|</span>
            <button className="hover:text-white transition-colors hidden sm:block">
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-white/10">
        <div className="container-club py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">BFC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl">Bogota FC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/entradas"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-secondary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Entradas
            </Link>
            <Link
              href="/tienda"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary-dark text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Tienda
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
