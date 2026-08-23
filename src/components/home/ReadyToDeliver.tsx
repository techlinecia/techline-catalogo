"use client";

import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ReadyToDeliver() {
  const readyProducts = products
    .filter((product) =>
      [
        "smailwolf-rs7",
        "fone-qkz-ak6",
        "mouse-tgt-om85",
      ].includes(product.slug)
    )
    .slice(0, 3);

  return (
    <section className="border-b border-white/10 bg-black py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-400 md:text-xs md:tracking-[0.25em]">
              ESTOQUE LOCAL
            </p>

            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Disponíveis à pronta entrega
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              Produtos disponíveis agora na TECH LINE.
            </p>
          </div>

          <Link
            href="/#produtos"
            className="hidden text-sm font-semibold text-cyan-400 hover:text-cyan-300 md:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {readyProducts.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              category={product.subcategory}
              price={product.price}
              status={product.status}
              slug={product.slug}
              badge={product.badge}
              image={product.image}
            />
          ))}
        </div>

        <Link
          href="/#produtos"
          className="mt-6 block text-sm font-semibold text-cyan-400 md:hidden"
        >
          Ver todos os produtos →
        </Link>
      </div>
    </section>
  );
}