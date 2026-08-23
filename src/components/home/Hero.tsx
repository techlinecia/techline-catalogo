import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
        <div>
          <span className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-cyan-400">
            PRODUTOS À PRONTA ENTREGA
          </span>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Seu próximo
            <span className="block text-cyan-400">upgrade</span>
            começa aqui.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
            Hardware, periféricos, acessórios e assistência técnica em um só lugar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/produtos"
              className="rounded-md bg-cyan-400 px-6 py-3 text-center text-sm font-bold text-black transition hover:bg-cyan-300"
            >
              Explorar produtos
            </Link>

            <Link
              href="/servicos"
              className="rounded-md border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Conheça nossos serviços
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] md:block">
          <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-cyan-400/20 bg-cyan-400/5 blur-sm" />
          <div className="absolute right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-cyan-400/20" />
          <div className="absolute right-24 top-1/2 -translate-y-1/2 text-right">
            <p className="text-xs tracking-[0.35em] text-zinc-500">
              TECH LINE
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              PERFORMANCE
            </p>
            <p className="text-3xl font-black text-cyan-400">
              + TECNOLOGIA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}