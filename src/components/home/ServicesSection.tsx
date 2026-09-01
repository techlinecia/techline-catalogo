"use client";

import { useTheme } from "@/context/ThemeContext";

const services = [
  {
    title: "Formatação",
    description:
      "Formatação de computadores com instalação do sistema, drivers e configurações essenciais.",
    icon: "💻",
    message:
      "Olá! Vim pelo catálogo da TECH LINE e gostaria de solicitar um orçamento para formatação.",
  },
  {
    title: "Limpeza",
    description:
      "Limpeza básica ou avançada para manter o computador limpo, organizado e com melhor refrigeração.",
    icon: "🧹",
    href: "/servicos/limpeza",
  },
  {
    title: "Upgrade de PC",
    description:
      "Upgrade de memória RAM, SSD, placa de vídeo, fonte, cooler e outros componentes.",
    icon: "⚙️",
    message:
      "Olá! Vim pelo catálogo da TECH LINE e gostaria de solicitar um orçamento para upgrade do meu PC.",
  },
  {
    title: "Montagem de PC",
    description:
      "Montagem básica ou avançada de computadores, com organização e instalação dos componentes.",
    icon: "🖥️",
    message:
      "Olá! Vim pelo catálogo da TECH LINE e gostaria de solicitar um orçamento para montagem de PC.",
  },
];

export default function ServicesSection() {
  const { isLightMode } = useTheme();

  const sectionBg = isLightMode ? "bg-[#f1f3f5]" : "bg-[#070a0c]";
  const cardBg = isLightMode ? "bg-white" : "bg-[#0e1418]";
  const primaryText = isLightMode ? "text-[#0b1013]" : "text-white";
  const secondaryText = isLightMode ? "text-zinc-600" : "text-zinc-400";
  const border = isLightMode ? "border-black/10" : "border-white/10";
  const whatsappNumber = "5544991373517";

  return (
    <section
      id="servicos"
      className={`border-b ${border} ${sectionBg} py-14 md:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-400 md:text-xs">
            ASSISTÊNCIA TÉCNICA
          </p>

          <h2 className={`text-3xl font-black leading-tight md:text-5xl ${primaryText}`}>
            Serviços TECH LINE
          </h2>

          <p className={`mt-3 max-w-2xl text-sm leading-6 ${secondaryText}`}>
            Serviços para manutenção, melhoria e montagem do seu computador.
            Consulte os detalhes e escolha o serviço ideal.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const whatsappUrl = service.message
              ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.message)}`
              : "";

            return (
              <article
                key={service.title}
                className={`group flex flex-col border ${border} ${cardBg} p-5 transition hover:-translate-y-1 hover:border-cyan-400/60 md:p-6`}
              >
                <div className="flex h-12 w-12 items-center justify-center bg-cyan-400/10 text-2xl">
                  {service.icon}
                </div>

                <h3 className={`mt-5 text-xl font-black ${primaryText}`}>
                  {service.title}
                </h3>

                <p className={`mt-3 flex-1 text-sm leading-6 ${secondaryText}`}>
                  {service.description}
                </p>

                {service.href ? (
                  <a
                    href={service.href}
                    className="mt-6 flex min-h-12 items-center justify-center border border-cyan-400 px-4 text-center text-xs font-black uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
                  >
                    Ver serviço →
                  </a>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex min-h-12 items-center justify-center border border-cyan-400 px-4 text-center text-xs font-black uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
                  >
                    Solicitar orçamento
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
