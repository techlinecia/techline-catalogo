import Link from "next/link";

const categories = [
  {
    name: "Hardware",
    description: "Peças e componentes para seu PC",
    href: "/?categoria=hardware#produtos",
    image: "/Hardware.png",
  },
  {
    name: "Periféricos",
    description: "Tudo para completar seu setup",
    href: "/?categoria=perifericos#produtos",
    image: "/Periféricos.png",
  },
  {
    name: "Gabinetes",
    description: "Estilo e espaço para sua máquina",
    href: "/?categoria=gabinetes#produtos",
    image: "/Gabinetes.png",
  },
  {
    name: "Decoração para Setup",
    description: "Deixe seu espaço com a sua cara",
    href: "/?categoria=decoracao#produtos",
    image: "/Setup.png",
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
            href="/#produtos"
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
              className="group overflow-hidden border border-white/10 bg-[#10161a] transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div className="p-5 md:p-6">
                <span className="mb-2 block text-[10px] font-bold tracking-[0.18em] text-cyan-400 md:text-xs md:tracking-[0.2em]">
                  TECH LINE
                </span>

                <h3 className="max-w-[220px] text-xl font-black leading-tight text-white md:text-2xl">
                  {category.name}
                </h3>

                <p className="mt-2 max-w-[240px] text-sm leading-5 text-zinc-400">
                  {category.description}
                </p>

                <span className="mt-4 inline-block text-lg text-cyan-400 transition-transform group-hover:translate-x-2 md:mt-5 md:text-xl">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/#produtos"
          className="mt-6 block text-sm font-semibold text-cyan-400 md:hidden"
        >
          Ver todas as categorias →
        </Link>
      </div>
    </section>
  );
}