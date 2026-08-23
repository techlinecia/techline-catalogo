import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-techline relative overflow-hidden">
      {/* FOTO */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-no-repeat
          bg-[position:68%_center]
          md:bg-center
        "
        style={{
          backgroundImage: "url('/banner-techline.png')",
        }}
      />

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-4 py-12 sm:min-h-[560px] md:min-h-[650px] md:px-6 md:py-20">
        <div className="max-w-2xl">
          <span className="hero-badge mb-4 inline-flex border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] sm:mb-5 sm:text-xs">
            PRODUTOS À PRONTA ENTREGA
          </span>

          <h1 className="hero-title max-w-[520px] text-[42px] font-black leading-[0.95] tracking-tight sm:max-w-3xl sm:text-5xl md:text-7xl">
            Seu próximo
            <span className="block text-cyan-400">
              upgrade
            </span>
            começa aqui.
          </h1>

          <p className="hero-description mt-5 max-w-xl text-[15px] leading-7 sm:mt-6 sm:text-base md:text-lg">
            Hardware, periféricos, acessórios e assistência técnica em um só lugar.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="/#produtos"
              className="bg-cyan-400 px-6 py-3 text-center text-sm font-black text-black transition hover:bg-cyan-300"
            >
              Explorar produtos
            </Link>

            <Link
              href="/#servicos"
              className="hero-secondary-button border px-6 py-3 text-center text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Conheça nossos serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}