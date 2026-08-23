export type Category =
  | "Hardware"
  | "Periféricos"
  | "Gabinetes"
  | "Decoração para Setup";

export type ProductVariant = {
  name: string;
  stock: number;
  color?: string;
  images?: string[];
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: number;
  name: string;
  category: Category;
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

const rs7WhiteImages = [
  "/produtos/Rs7 branco.jpg",
  "/produtos/rs7 branco2.jpg",
  "/produtos/rs7 branco3.jpg",
  "/produtos/rs7 branco4.jpg",
];

export const products: Product[] = [
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
      {
        label: "Marca",
        value: "Smailwolf",
      },
      {
        label: "Modelo",
        value: "RS7",
      },
      {
        label: "Tipo",
        value: "Mouse gamer",
      },
      {
        label: "Conexão",
        value: "Com fio / 2.4G / Bluetooth 5.2",
      },
      {
        label: "Modos de conexão",
        value: "3 modos",
      },
      {
        label: "Botões laterais",
        value: "Sim",
      },
      {
        label: "Compatibilidade",
        value: "PC / Notebook",
      },
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

    highlights: [
      "Ideal para uso diário",
      "Design compacto",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "TGT",
      },
      {
        label: "Modelo",
        value: "OM85",
      },
      {
        label: "Tipo",
        value: "Mouse",
      },
    ],
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

    highlights: [
      "Compacto e leve",
      "Ideal para música e jogos",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "QKZ",
      },
      {
        label: "Modelo",
        value: "AK6",
      },
      {
        label: "Tipo",
        value: "Fone de ouvido",
      },
    ],
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

    highlights: [
      "Tamanho 70x30 cm",
      "Espaço para teclado e mouse",
      "Ideal para setups gamer",
    ],

    specifications: [
      {
        label: "Tipo",
        value: "Mousepad gamer",
      },
      {
        label: "Tamanho",
        value: "70x30 cm",
      },
    ],
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

    highlights: [
      "Kit com 5 fans",
      "Fans de 120 mm",
      "Melhora a refrigeração do gabinete",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Acegeek",
      },
      {
        label: "Quantidade",
        value: "5 fans",
      },
      {
        label: "Tamanho",
        value: "120 mm",
      },
    ],
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

    highlights: [
      "Refrigeração para processador",
      "Design compacto",
      "Disponível para pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Revenger",
      },
      {
        label: "Modelo",
        value: "G-VR303",
      },
      {
        label: "Tipo",
        value: "Air Cooler",
      },
    ],
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

    highlights: [
      "Visual gamer",
      "Espaço para montagem",
      "Ideal para setups modernos",
    ],

    specifications: [
      {
        label: "Tipo",
        value: "Gabinete gamer",
      },
    ],
  },
];

/*
  Procura um produto pelo slug.

  Exemplo:
  getProductBySlug("smailwolf-rs7")
*/
export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}