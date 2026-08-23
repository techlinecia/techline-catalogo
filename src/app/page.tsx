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
        <ProductCatalog />
      </main>
    </>
  );
}