"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";

type Category =
  | "Todos"
  | "Hardware"
  | "Periféricos"
  | "Gabinetes"
  | "Decoração para Setup";

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
  id: number;
  name: string;
  category: Exclude<Category, "Todos">;
  subcategory: string;
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

const categories: Category[] = [
  "Todos",
  "Hardware",
  "Periféricos",
  "Gabinetes",
  "Decoração para Setup",
];

const rs7WhiteImages = [
  "/produtos/Rs7 branco.jpg",
  "/produtos/rs7 branco2.jpg",
  "/produtos/rs7 branco3.jpg",
  "/produtos/rs7 branco4.jpg",
];

const products: Product[] = [
  {
    id: 1,
    name: "Smailwolf RS7",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 84,90",
    status: "Pronta entrega",
    slug: "smailwolf-rs7",
    badge: "DESTAQUE",
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
    id: 2,
    name: "Mouse TGT OM85",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 19,90",
    status: "Pronta entrega",
    slug: "mouse-tgt-om85",
    description:
      "Mouse TGT OM85 disponível para pronta entrega na TECH LINE.",
  },
  {
    id: 3,
    name: "Fone QKZ AK6",
    category: "Periféricos",
    subcategory: "Fones",
    price: "R$ 39,90",
    status: "Pronta entrega",
    slug: "fone-qkz-ak6",
    badge: "MAIS PROCURADO",
    description:
      "Fone QKZ AK6 compacto e versátil para música, jogos e uso no dia a dia.",
  },
  {
    id: 4,
    name: "Mousepad Gamer 70x30",
    category: "Periféricos",
    subcategory: "Mousepads",
    price: "R$ 34,90",
    status: "Disponível",
    slug: "mousepad-gamer-70x30",
    description:
      "Mousepad gamer 70x30 cm com amplo espaço para mouse e teclado.",
  },
  {
    id: 5,
    name: "Kit 5 Fans Acegeek 120mm",
    category: "Hardware",
    subcategory: "Fans",
    price: "R$ 45,00",
    status: "Últimas unidades",
    slug: "kit-5-fans-acegeek-120mm",
    badge: "OFERTA",
    description:
      "Kit com 5 fans Acegeek de 120 mm para melhorar a refrigeração e o visual do gabinete.",
  },
  {
    id: 6,
    name: "Air Cooler Revenger G-VR303",
    category: "Hardware",
    subcategory: "Coolers",
    price: "R$ 35,00",
    status: "Disponível",
    slug: "air-cooler-revenger-g-vr303",
    description:
      "Air Cooler Revenger G-VR303 para refrigeração do processador.",
  },
  {
    id: 7,
    name: "Gabinete Gamer",
    category: "Gabinetes",
    subcategory: "Gabinetes Gamer",
    price: "R$ 199,90",
    status: "Disponível",
    slug: "gabinete-gamer",
    description:
      "Gabinete gamer com espaço para montagem de setups modernos.",
  },
];

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Todos");

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatches =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      const searchTerm = search.toLowerCase().trim();

      const searchMatches =
        product.name.toLowerCase().includes(searchTerm) ||
        product.subcategory.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        Boolean(
          product.variants?.some((variant) =>
            variant.name.toLowerCase().includes(searchTerm)
          )
        );

      return categoryMatches && searchMatches;
    });
  }, [selectedCategory, search]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce<Record<string, Product[]>>(
      (groups, product) => {
        if (!groups[product.subcategory]) {
          groups[product.subcategory] = [];
        }

        groups[product.subcategory].push(product);

        return groups;
      },
      {}
    );
  }, [filteredProducts]);

  const categoryLabel = (category: Category) => {
    if (category === "Decoração para Setup") {
      return "Setup";
    }

    return category;
  };

  const renderProductCard = (product: Product) => (
    <ProductCard
      key={product.id}
      category={product.subcategory}
      name={product.name}
      price={product.price}
      status={product.status}
      slug={product.slug}
      badge={product.badge}
      image={product.image}
    />
  );

  return (
    <section className="catalog-section">
      <div className="catalog-container">
        <div className="catalog-heading">
          <div>
            <span className="catalog-eyebrow">
              SELEÇÃO TECH LINE
            </span>

            <h2>Produtos em destaque</h2>
          </div>

          <div className="catalog-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
                  selectedCategory === category ? "active" : ""
                }
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-divider" />

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-bold text-white">
              Nenhum produto encontrado
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Tente outra categoria ou outro termo de busca.
            </p>
          </div>
        ) : selectedCategory === "Todos" ? (
          <div className="catalog-products-grid">
            {filteredProducts.map(renderProductCard)}
          </div>
        ) : (
          <div className="catalog-groups">
            {Object.entries(groupedProducts).map(
              ([subcategory, items]) => (
                <div className="catalog-group" key={subcategory}>
                  <div className="catalog-group-heading">
                    <div>
                      <span>{selectedCategory}</span>
                      <h3>{subcategory}</h3>
                    </div>

                    <span className="catalog-count">
                      {items.length}{" "}
                      {items.length === 1
                        ? "produto"
                        : "produtos"}
                    </span>
                  </div>

                  <div className="catalog-products-grid">
                    {items.map(renderProductCard)}
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