import Link from "next/link";

const categories = [
  {
    name: "Hardware",
    description: "Peças e componentes para seu PC",
    href: "/produtos?categoria=hardware",
  },
  {
    name: "Periféricos",
    description: "Tudo para completar seu setup",
    href: "/produtos?categoria=perifericos",
  },
  {
    name: "Gabinetes",
    description: "Estilo e espaço para sua máquina",
    href: "/produtos?categoria=gabinetes",
  },
  {
    name: "Decoração para Setup",
    description: "Deixe seu espaço com a sua cara",
    href: "/produtos?categoria=decoracao",
  },
];

export default function Categories() {
  return (
    <section className="border-b border-white/10 bg-[#080b0d] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-400 md:text-xs md:tracking-[0.25em]">
              ENCONTRE O QUE VOCÊ PRECISA
            </p>

            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Explore por categoria
            </h2>
          </div>

          <Link
            href="/produtos"
            className="hidden text-sm font-semibold text-cyan-400 transition hover:text-cyan-300 md:block"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative flex min-h-[190px] flex-col justify-end overflow-hidden border border-white/10 bg-[#10161a] p-5 transition hover:border-cyan-400/50 md:min-h-[260px] md:p-6"
            >
              <div className="absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full border border-cyan-400/10 transition group-hover:border-cyan-400/30 md:h-40 md:w-40" />

              <span className="mb-2 text-[10px] font-bold tracking-[0.18em] text-cyan-400 md:mb-3 md:text-xs md:tracking-[0.2em]">
                TECH LINE
              </span>

              <h3 className="max-w-[220px] text-xl font-bold leading-tight text-white md:text-2xl">
                {category.name}
              </h3>

              <p className="mt-2 max-w-[240px] text-sm leading-5 text-zinc-400">
                {category.description}
              </p>

              <span className="mt-4 text-lg text-cyan-400 transition-transform group-hover:translate-x-2 md:mt-5 md:text-xl">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/produtos"
          className="mt-6 block text-sm font-semibold text-cyan-400 md:hidden"
        >
          Ver todas as categorias →
        </Link>
      </div>
    </section>
  );
}