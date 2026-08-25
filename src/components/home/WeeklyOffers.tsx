"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useTheme } from "@/context/ThemeContext";

function priceToNumber(price: string) {
  return Number(
    price
      .replace(/[^\d,]/g, "")
      .replace(",", ".")
  );
}

export default function WeeklyOffers() {
  const { isLightMode } = useTheme();

  const offerProducts = products
    .filter(
      (product) =>
        product.offer?.active &&
        product.offer?.price
    )
    .map((product) => {
      const oldPrice = priceToNumber(product.price);
      const offerPrice = priceToNumber(
        product.offer!.price
      );

      const saving = oldPrice - offerPrice;

      const discount =
        oldPrice > 0
          ? Math.round(
              ((oldPrice - offerPrice) /
                oldPrice) *
                100
            )
          : 0;

      return {
        product,
        oldPrice: product.price,
        offerPrice: product.offer!.price,
        saving,
        discount,
      };
    });

  const sectionBg = isLightMode
    ? "bg-[#f1f3f5]"
    : "bg-[#070a0c]";

  const cardBg = isLightMode
    ? "bg-white"
    : "bg-[#0e1418]";

  const primaryText = isLightMode
    ? "text-[#0b1013]"
    : "text-white";

  const secondaryText = isLightMode
    ? "text-zinc-600"
    : "text-zinc-400";

  const border = isLightMode
    ? "border-black/10"
    : "border-white/10";

  if (offerProducts.length === 0) {
    return null;
  }

  return (
    <section
      id="ofertas"
      className={`border-b ${border} ${sectionBg} py-14 md:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-400 md:text-xs">
              PREÇOS ESPECIAIS
            </p>

            <h2
              className={`text-3xl font-black leading-tight md:text-5xl ${primaryText}`}
            >
              Ofertas da semana
            </h2>

            <p
              className={`mt-3 max-w-xl text-sm ${secondaryText}`}
            >
              Produtos selecionados com preço
              especial por tempo limitado.
            </p>
          </div>

          <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-cyan-400 md:block">
            TECH LINE
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offerProducts.map((item) => {
            const {
              product,
              oldPrice,
              offerPrice,
              saving,
              discount,
            } = item;

            return (
              <Link
                key={product.slug}
                href={`/produto/${product.slug}`}
                className={`group overflow-hidden border ${border} ${cardBg} transition hover:-translate-y-1 hover:border-cyan-400/70`}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    isLightMode
                      ? "bg-zinc-100"
                      : "bg-[#080c0f]"
                  }`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex h-full items-center justify-center text-xs tracking-[0.2em] ${secondaryText}`}
                    >
                      IMAGEM DO PRODUTO
                    </div>
                  )}

                  {discount > 0 && (
                    <span className="absolute left-3 top-3 bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
                      {discount}% OFF
                    </span>
                  )}

                  <span className="absolute right-3 top-3 bg-cyan-400 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-black">
                    OFERTA
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                    {product.subcategory}
                  </p>

                  <h3
                    className={`mt-2 line-clamp-2 min-h-[48px] text-lg font-black leading-6 ${primaryText}`}
                  >
                    {product.name}
                  </h3>

                  <div className="mt-5">
                    <p
                      className={`text-sm line-through ${secondaryText}`}
                    >
                      {oldPrice}
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">
                      <p className="text-3xl font-black text-cyan-400">
                        {offerPrice}
                      </p>

                      {saving > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400">
                          Economize{" "}
                          {saving.toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`mt-5 flex items-center justify-between border-t ${border} pt-4`}
                  >
                    <span
                      className={`text-xs font-semibold ${secondaryText}`}
                    >
                      {product.status}
                    </span>

                    <span className="text-sm font-black text-cyan-400 transition-transform group-hover:translate-x-1">
                      Ver produto →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p
          className={`mt-6 text-center text-[10px] ${secondaryText}`}
        >
          Ofertas sujeitas à disponibilidade
          de estoque.
        </p>
      </div>
    </section>
  );
}