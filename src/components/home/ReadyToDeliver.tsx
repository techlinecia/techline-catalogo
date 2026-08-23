"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import ProductModal from "@/components/products/ProductModal";

type ProductVariant = {
  name: string;
  stock: number;
  color?: string;
  images?: string[];
};

type ProductSpecification = {
  label: string;
  value: string;
};

type Product = {
  name: string;
  category: string;
  price: string;
  status: string;
  slug: string;
  badge?: string;
  description?: string;
  image?: string;
  variants?: ProductVariant[];
  highlights?: string[];
  specifications?: ProductSpecification[];
};

const rs7WhiteImages = [
  "/produtos/Rs7 branco.jpg",
  "/produtos/rs7 branco2.jpg",
  "/produtos/rs7 branco3.jpg",
  "/produtos/rs7 branco4.jpg",
];

const products: Product[] = [
  {
    name: "Smailwolf RS7",
    category: "Mouses",
    price: "R$ 84,90",
    status: "Pronta entrega",
    slug: "smailwolf-rs7",
    badge: "Destaque",
    image: "/produtos/Rs7 branco.jpg",
    description:
      "Mouse gamer Smailwolf RS7 com visual moderno e conexão versátil. Escolha a cor desejada e consulte o estoque disponível.",
    variants: [
      {
        name: "Branco",
        stock: 2,
        color: "#ffffff",
        images: rs7WhiteImages,
      },
      {
        name: "Preto",
        stock: 1,
        color: "#111111",
        images: [],
      },
    ],
    highlights: [
      "Conexão com fio, 2.4G e Bluetooth 5.2",
      "Design moderno para setups gamer",
      "Botões laterais",
      "Disponível nas cores branco e preto",
    ],
    specifications: [
      { label: "Marca", value: "Smailwolf" },
      { label: "Modelo", value: "RS7" },
      { label: "Conexão", value: "Com fio / 2.4G / Bluetooth 5.2" },
      { label: "Categoria", value: "Mouse gamer" },
    ],
  },
  {
    name: "Fone QKZ AK6",
    category: "Fones",
    price: "R$ 39,90",
    status: "Pronta entrega",
    slug: "fone-qkz-ak6",
    badge: "Mais procurado",
    description:
      "Fone QKZ AK6 compacto e versátil para música, jogos e uso no dia a dia.",
  },
  {
    name: "Mouse TGT OM85",
    category: "Mouses",
    price: "R$ 19,90",
    status: "Pronta entrega",
    slug: "mouse-tgt-om85",
    description:
      "Mouse TGT OM85 disponível para pronta entrega na TECH LINE.",
  },
];

export default function ReadyToDeliver() {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

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
            href="/produtos"
            className="hidden text-sm font-semibold text-cyan-400 hover:text-cyan-300 md:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              category={product.category}
              price={product.price}
              status={product.status}
              slug={product.slug}
              badge={product.badge}
              image={product.image}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        <Link
          href="/produtos"
          className="mt-6 block text-sm font-semibold text-cyan-400 md:hidden"
        >
          Ver todos os produtos →
        </Link>
      </div>

      <ProductModal
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                category: selectedProduct.category,
                price: selectedProduct.price,
                status: selectedProduct.status,
                badge: selectedProduct.badge,
                description: selectedProduct.description,
                variants: selectedProduct.variants,
                highlights: selectedProduct.highlights,
                specifications: selectedProduct.specifications,
              }
            : null
        }
      />
    </section>
  );
}