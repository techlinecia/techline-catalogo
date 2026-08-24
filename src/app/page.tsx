import { Suspense } from "react";

import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import ReadyToDeliver from "@/components/home/ReadyToDeliver";
import ProductCatalog from "@/components/home/ProductCatalog";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
        <ReadyToDeliver />

        <Suspense
          fallback={
            <section className="catalog-section">
              <div className="catalog-container py-16 text-center">
                <p className="text-sm text-zinc-500">
                  Carregando produtos...
                </p>
              </div>
            </section>
          }
        >
          <ProductCatalog />
        </Suspense>
      </main>
    </>
  );
}