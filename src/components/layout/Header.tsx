"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-[0.25em] text-cyan-400">
          TECH LINE
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          <Link href="/" className="transition hover:text-cyan-400">
            Início
          </Link>
          <Link href="/produtos" className="transition hover:text-cyan-400">
            Produtos
          </Link>
          <Link href="/ofertas" className="transition hover:text-cyan-400">
            Ofertas
          </Link>
          <Link href="/servicos" className="transition hover:text-cyan-400">
            Serviços
          </Link>
          <Link href="/contato" className="transition hover:text-cyan-400">
            Contato
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-200 md:hidden"
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-black px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-zinc-300">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Início
            </Link>
            <Link href="/produtos" onClick={() => setMenuOpen(false)}>
              Produtos
            </Link>
            <Link href="/ofertas" onClick={() => setMenuOpen(false)}>
              Ofertas
            </Link>
            <Link href="/servicos" onClick={() => setMenuOpen(false)}>
              Serviços
            </Link>
            <Link href="/contato" onClick={() => setMenuOpen(false)}>
              Contato
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}