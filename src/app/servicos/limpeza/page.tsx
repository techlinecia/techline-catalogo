"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

type CleaningType = "basica" | "avancada" | null;

const cleaningOptions = {
  basica: {
    name: "Limpeza Básica",
    price: 120,
    description:
      "Limpeza geral para remover poeira e sujeira acumulada no computador.",
    includes: [
      "Limpeza externa do gabinete",
      "Remoção de poeira interna",
      "Limpeza de fans e filtros",
      "Inspeção visual dos componentes",
    ],
  },
  avancada: {
    name: "Limpeza Avançada",
    price: null,
    description:
      "Limpeza mais completa e detalhada, indicada para manutenção profunda.",
    includes: [
      "Desmontagem mais detalhada",
      "Limpeza completa dos componentes",
      "Limpeza de fans e sistema de refrigeração",
      "Organização e revisão geral",
    ],
  },
} as const;

export default function LimpezaPage() {
  const { isLightMode, toggleTheme } = useTheme();
  const { addItem, totalItems, openCart } = useCart();

  const [cleaningType, setCleaningType] = useState<CleaningType>(null);

  const pageBg = isLightMode ? "bg-[#f1f3f5]" : "bg-[#070a0c]";
  const cardBg = isLightMode ? "bg-white" : "bg-[#0e1418]";
  const primaryText = isLightMode ? "text-[#0b1013]" : "text-white";
  const secondaryText = isLightMode ? "text-zinc-600" : "text-zinc-400";
  const border = isLightMode ? "border-black/10" : "border-white/10";

  const selectedOption =
    cleaningType ? cleaningOptions[cleaningType] : null;

  const handleAddService = () => {
    if (!cleaningType || !selectedOption || selectedOption.price === null) {
      return;
    }

    addItem({
      type: "service",
      slug: `limpeza-${cleaningType}`,
      name: selectedOption.name,
      price: selectedOption.price,
      serviceType: "Limpeza de PC",
    });
  };

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <header
        className={`sticky top-0 z-50 border-b ${border} ${
          isLightMode ? "bg-white/95" : "bg-[#080b0d]/95"
        } backdrop-blur-xl`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/#servicos" className={`text-sm font-bold ${primaryText}`}>
            ← Voltar
          </Link>

          <p className="font-black tracking-[0.16em]">
            <span className={primaryText}>TECH </span>
            <span className="text-cyan-400">LINE</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center border ${border} ${primaryText}`}
              aria-label="Alternar tema"
            >
              {isLightMode ? "☀" : "☾"}
            </button>

            <button
              type="button"
              onClick={openCart}
              className={`relative flex h-10 w-10 items-center justify-center border ${border} ${primaryText}`}
              aria-label="Abrir carrinho"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-black text-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-400">
            ASSISTÊNCIA TÉCNICA
          </p>

          <h1 className={`mt-3 text-4xl font-black md:text-6xl ${primaryText}`}>
            Limpeza de PC
          </h1>

          <p className={`mt-4 text-sm leading-7 md:text-base ${secondaryText}`}>
            Escolha o tipo de limpeza. A forma de levar o computador, busca +
            devolução e pagamento são escolhidos na finalização do carrinho.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="grid gap-4 md:grid-cols-2">
            {(Object.keys(cleaningOptions) as Array<keyof typeof cleaningOptions>).map(
              (key) => {
                const option = cleaningOptions[key];
                const selected = cleaningType === key;
                const available = option.price !== null;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCleaningType(key)}
                    className={`flex flex-col border p-6 text-left transition ${
                      selected
                        ? "border-cyan-400 bg-cyan-400/10"
                        : `${border} ${cardBg} hover:border-cyan-400/50`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-400">
                          LIMPEZA DE PC
                        </p>
                        <h2 className={`mt-2 text-2xl font-black ${primaryText}`}>
                          {option.name}
                        </h2>
                      </div>

                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-cyan-400 bg-cyan-400 text-black"
                            : border
                        }`}
                      >
                        {selected ? "✓" : ""}
                      </span>
                    </div>

                    <p className={`mt-4 text-sm leading-6 ${secondaryText}`}>
                      {option.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      {option.includes.map((item) => (
                        <p
                          key={item}
                          className={`flex gap-2 text-xs leading-5 ${secondaryText}`}
                        >
                          <span className="text-cyan-400">✓</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>

                    <div className={`mt-6 border-t ${border} pt-5`}>
                      {available ? (
                        <>
                          <p className={`text-[10px] font-bold uppercase tracking-wide ${secondaryText}`}>
                            Valor do serviço
                          </p>
                          <p className="mt-1 text-3xl font-black text-cyan-400">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(option.price)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-400">
                            Valor a definir
                          </p>
                          <p className={`mt-2 text-xs ${secondaryText}`}>
                            Configure o preço da Limpeza Avançada antes de liberar
                            a compra pelo carrinho.
                          </p>
                        </>
                      )}
                    </div>
                  </button>
                );
              }
            )}
          </section>

          <aside className={`h-fit border ${border} ${cardBg} p-5 lg:sticky lg:top-[100px]`}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
              SEU SERVIÇO
            </p>

            {selectedOption ? (
              <>
                <h3 className={`mt-3 text-xl font-black ${primaryText}`}>
                  {selectedOption.name}
                </h3>

                <p className={`mt-2 text-sm leading-6 ${secondaryText}`}>
                  Transporte e pagamento são escolhidos na próxima etapa.
                </p>

                <div className={`mt-5 border-t ${border} pt-5`}>
                  {selectedOption.price !== null ? (
                    <p className="text-3xl font-black text-cyan-400">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(selectedOption.price)}
                    </p>
                  ) : (
                    <p className="text-lg font-black text-amber-400">
                      Preço ainda não definido
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddService}
                  disabled={selectedOption.price === null}
                  className={`mt-5 flex min-h-14 w-full items-center justify-center px-5 text-sm font-black uppercase tracking-wide transition ${
                    selectedOption.price !== null
                      ? "bg-cyan-400 text-black hover:bg-cyan-300"
                      : "cursor-not-allowed bg-zinc-500/20 text-zinc-500"
                  }`}
                >
                  {selectedOption.price !== null
                    ? "Adicionar serviço ao carrinho"
                    : "Preço a definir"}
                </button>

                {selectedOption.price !== null && (
                  <p className={`mt-3 text-[10px] leading-5 ${secondaryText}`}>
                    Na finalização você escolhe entre levar o PC grátis ou busca +
                    devolução por R$ 10,00.
                  </p>
                )}
              </>
            ) : (
              <div className="py-8 text-center">
                <span className="text-3xl">🧹</span>
                <p className={`mt-4 text-sm font-bold ${primaryText}`}>
                  Escolha uma opção
                </p>
                <p className={`mt-2 text-xs leading-5 ${secondaryText}`}>
                  Selecione Básica ou Avançada para continuar.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}