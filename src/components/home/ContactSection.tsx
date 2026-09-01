"use client";

import { useTheme } from "@/context/ThemeContext";

const contacts = [
  {
    title: "WhatsApp",
    value: "(44) 99137-3517",
    description: "Fale com a TECH LINE para dúvidas, pedidos e disponibilidade.",
    href: "https://wa.me/5544991373517?text=Olá!%20Tudo%20bem?%20Vim%20pelo%20catálogo%20da%20TECH%20LINE%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20disponíveis.",
    action: "Chamar no WhatsApp",
    icon: "💬",
  },
  {
    title: "Instagram",
    value: "@techline.info",
    description:
      "Acompanhe novidades, reposições, ofertas e produtos disponíveis.",
    href: "https://www.instagram.com/techline.info/",
    action: "Ver Instagram",
    icon: "📷",
  },
  {
    title: "Atendimento",
    value: "Cianorte - PR",
    description:
      "Atendimento local para retirada de produtos e entregas na cidade.",
    href: "https://www.google.com/maps/search/?api=1&query=Tech+Line+Cianorte+PR",
    action: "Ver localização",
    icon: "📍",
  },
];

export default function ContactSection() {
  const { isLightMode } = useTheme();

  const sectionBg = isLightMode ? "bg-[#f4f6f8]" : "bg-[#070a0c]";
  const cardBg = isLightMode ? "bg-white" : "bg-[#0e1418]";
  const primaryText = isLightMode ? "text-[#0b1013]" : "text-white";
  const secondaryText = isLightMode ? "text-zinc-600" : "text-zinc-400";
  const border = isLightMode ? "border-black/10" : "border-white/10";

  return (
    <section
      id="contato"
      className={`scroll-mt-36 border-t border-b ${border} ${sectionBg} py-14 md:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-400 md:text-xs">
            FALE COM A GENTE
          </p>

          <h2
            className={`text-3xl font-black leading-tight md:text-5xl ${primaryText}`}
          >
            Contato TECH LINE
          </h2>

          <p className={`mt-3 max-w-2xl text-sm leading-6 ${secondaryText}`}>
            Precisa tirar uma dúvida ou quer comprar algum produto? Entre em
            contato com a TECH LINE pelo canal que preferir.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex min-h-[250px] flex-col border ${border} ${cardBg} p-5 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] md:p-6`}
            >
              <div className="flex h-12 w-12 items-center justify-center bg-cyan-400/10 text-2xl">
                {contact.icon}
              </div>

              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
                {contact.title}
              </p>

              <h3 className={`mt-2 text-xl font-black ${primaryText}`}>
                {contact.value}
              </h3>

              <p className={`mt-3 flex-1 text-sm leading-6 ${secondaryText}`}>
                {contact.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-400 transition group-hover:gap-3">
                {contact.action} →
              </span>
            </a>
          ))}
        </div>

        <div className={`mt-6 border ${border} ${cardBg} p-5 md:p-6`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={`text-lg font-black ${primaryText}`}>
                Quer consultar disponibilidade?
              </p>

              <p className={`mt-1 text-sm ${secondaryText}`}>
                Chame no WhatsApp e confirme o produto antes da retirada ou
                entrega.
              </p>
            </div>

            <a
              href="https://wa.me/5544991373517?text=Olá!%20Vim%20pelo%20catálogo%20da%20TECH%20LINE%20e%20gostaria%20de%20consultar%20a%20disponibilidade%20de%20um%20produto."
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 shrink-0 items-center justify-center bg-cyan-400 px-6 text-sm font-black text-black transition hover:bg-cyan-300"
            >
              Falar com a TECH LINE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}