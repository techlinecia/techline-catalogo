"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/products/ProductModal";
import { getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({
  params,
}: ProductPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            TECH LINE
          </p>

          <h1 className="mt-4 text-3xl font-black text-white">
            Produto não encontrado
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Esse produto não está disponível no catálogo.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 bg-cyan-400 px-6 py-3 text-sm font-black text-black transition hover:bg-cyan-300"
          >
            VOLTAR AO CATÁLOGO
          </button>
        </div>
      </main>
    );
  }

  return (
    <ProductModal
      open={true}
      onClose={() => router.push("/")}
      product={{
        name: product.name,
        category: product.subcategory,
        price: product.price,
        status: product.status,
        badge: product.badge,
        description: product.description,
        variants: product.variants,
        highlights: product.highlights,
        specifications: product.specifications,
      }}
    />
  );
}