"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/products/ProductCard";
import {
  products,
  type Product,
  type Category as ProductCategory,
} from "@/data/products";

type CatalogCategory =
  | "Todos"
  | Exclude<ProductCategory, "Decoração para Setup">;

const categories: CatalogCategory[] = [
  "Todos",
  "Hardware",
  "Refrigeração",
  "Periféricos",
  "Gabinetes",
];

const categoryFromUrl = (
  value: string | null
): CatalogCategory => {
  switch (value?.toLowerCase()) {
    case "hardware":
      return "Hardware";

    case "refrigeracao":
      return "Refrigeração";

    case "perifericos":
      return "Periféricos";

    case "gabinetes":
      return "Gabinetes";

    default:
      return "Todos";
  }
};

export default function ProductCatalog() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] =
    useState<CatalogCategory>("Todos");

  const [search, setSearch] = useState("");

  useEffect(() => {
    const urlSearch = searchParams.get("busca");
    const urlCategory = searchParams.get("categoria");

    setSearch(urlSearch ?? "");
    setSelectedCategory(categoryFromUrl(urlCategory));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return products.filter((product) => {
      const categoryMatches =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      const variantMatches =
        product.variants?.some((variant) =>
          variant.name
            .toLowerCase()
            .includes(searchTerm)
        ) ?? false;

      const searchMatches =
        searchTerm === "" ||
        product.name
          .toLowerCase()
          .includes(searchTerm) ||
        product.subcategory
          .toLowerCase()
          .includes(searchTerm) ||
        product.category
          .toLowerCase()
          .includes(searchTerm) ||
        product.description
          ?.toLowerCase()
          .includes(searchTerm) === true ||
        variantMatches;

      return categoryMatches && searchMatches;
    });
  }, [selectedCategory, search]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce<
      Record<string, Product[]>
    >((groups, product) => {
      if (!groups[product.subcategory]) {
        groups[product.subcategory] = [];
      }

      groups[product.subcategory].push(product);

      return groups;
    }, {});
  }, [filteredProducts]);

  const handleCategoryChange = (
    category: CatalogCategory
  ) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(
      window.location.search
    );

    if (category === "Todos") {
      params.delete("categoria");
    } else {
      const categoryMap: Record<
        Exclude<CatalogCategory, "Todos">,
        string
      > = {
        Hardware: "hardware",
        Refrigeração: "refrigeracao",
        Periféricos: "perifericos",
        Gabinetes: "gabinetes",
      };

      params.set(
        "categoria",
        categoryMap[category]
      );
    }

    const query = params.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${
        query ? `?${query}` : ""
      }#produtos`
    );
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);

    const params = new URLSearchParams(
      window.location.search
    );

    if (value.trim()) {
      params.set("busca", value);
    } else {
      params.delete("busca");
    }

    const query = params.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${
        query ? `?${query}` : ""
      }#produtos`
    );
  };

  const renderProductCard = (
    product: Product
  ) => {
    return (
      <ProductCard
        key={product.id}
        category={product.subcategory}
        name={product.name}
        price={product.price}
        status={product.status}
        slug={product.slug}
        image={product.image}
        offerActive={product.offer?.active}
        offerPrice={product.offer?.price}
      />
    );
  };

  return (
    <section
      id="produtos"
      className="catalog-section scroll-mt-[170px] md:scroll-mt-[165px]"
    >
      <div className="catalog-container">
        <div className="catalog-heading">
          <div>
            <span className="catalog-eyebrow">
              SELEÇÃO TECH LINE
            </span>

            <h2>Produtos em destaque</h2>
          </div>

          <div className="catalog-search">
            <span aria-hidden="true">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value
                )
              }
              placeholder="Busque por produto..."
              aria-label="Buscar produto"
            />
          </div>
        </div>

        <div className="catalog-category-scroll">
          <div className="catalog-categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-divider" />

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-bold text-[var(--tl-text)]">
              Nenhum produto encontrado
            </p>

            <p className="mt-2 text-sm text-[var(--tl-text-muted)]">
              Tente outra categoria ou outro termo
              de busca.
            </p>
          </div>
        ) : selectedCategory === "Todos" ? (
          <div className="catalog-products-grid">
            {filteredProducts.map(
              renderProductCard
            )}
          </div>
        ) : (
          <div className="catalog-groups">
            {Object.entries(
              groupedProducts
            ).map(
              ([subcategory, items]) => (
                <div
                  className="catalog-group"
                  key={subcategory}
                >
                  <div className="catalog-group-heading">
                    <div>
                      <span>
                        {selectedCategory}
                      </span>

                      <h3>
                        {subcategory}
                      </h3>
                    </div>

                    <span className="catalog-count">
                      {items.length}{" "}
                      {items.length === 1
                        ? "produto"
                        : "produtos"}
                    </span>
                  </div>

                  <div className="catalog-products-grid">
                    {items.map(
                      renderProductCard
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}