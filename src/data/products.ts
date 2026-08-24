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

export type ProductCondition = "Novo" | "Usado";

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

  condition?: ProductCondition;
  conditionNote?: string;
  stock?: number;

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
    name: "Mouse Gamer Smailwolf RS7",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 84,90",
    status: "Pronta entrega",
    slug: "smailwolf-rs7",
    badge: "DESTAQUE",
    image: "/produtos/Rs7 branco.jpg",

    condition: "Novo",
    stock: 1,

    description:
      "Mouse gamer Smailwolf RS7 com conexão por cabo, 2.4G e Bluetooth 5.2. Modelo branco disponível para pronta entrega.",

    variants: [
      {
        name: "Branco",
        stock: 1,
        color: "#ffffff",
        images: rs7WhiteImages,
      },
    ],

    highlights: [
      "Conexão com fio, 2.4G e Bluetooth 5.2",
      "3 modos de conexão",
      "Design moderno para setups gamer",
      "Botões laterais",
      "Modelo branco disponível",
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
    name: "Mouse TGT OM85 Preto",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 19,90",
    status: "Pronta entrega",
    slug: "mouse-tgt-om85",

    condition: "Novo",
    stock: 3,

    description:
      "Mouse TGT OM85 preto, compacto e indicado para uso diário em computadores e notebooks.",

    highlights: [
      "Ideal para uso diário",
      "Design compacto",
      "Cor preta",
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
      {
        label: "Cor",
        value: "Preto",
      },
    ],
  },

  {
    id: 3,
    name: "Fone de Ouvido QKZ AK6 Purple",
    category: "Periféricos",
    subcategory: "Fones",
    price: "R$ 39,90",
    status: "Pronta entrega",
    slug: "fone-qkz-ak6",
    badge: "MAIS PROCURADO",

    condition: "Novo",
    stock: 5,

    description:
      "Fone QKZ AK6 Purple compacto e versátil para música, jogos e uso no dia a dia.",

    highlights: [
      "Compacto e leve",
      "Ideal para música e jogos",
      "Cor Purple",
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
      {
        label: "Cor",
        value: "Purple",
      },
    ],
  },

  {
    id: 4,
    name: "Mousepad Gamer BAYAZ Speed 70x30cm",
    category: "Periféricos",
    subcategory: "Mousepads",
    price: "R$ 34,90",
    status: "Pronta entrega",
    slug: "mousepad-gamer-70x30",

    condition: "Novo",
    stock: 2,

    description:
      "Mousepad gamer BAYAZ Speed 70x30cm preto com bordas vermelhas, com espaço para teclado e mouse.",

    highlights: [
      "Tamanho 70x30cm",
      "Superfície Speed",
      "Cor preta com bordas vermelhas",
      "Espaço para teclado e mouse",
    ],

    specifications: [
      {
        label: "Marca",
        value: "BAYAZ",
      },
      {
        label: "Tipo",
        value: "Mousepad gamer",
      },
      {
        label: "Tamanho",
        value: "70x30cm",
      },
      {
        label: "Cor",
        value: "Preto com bordas vermelhas",
      },
    ],
  },

  {
    id: 5,
    name: "Kit com 5 Fans Acegeek",
    category: "Hardware",
    subcategory: "Fans",
    price: "R$ 45,00",
    status: "Últimas unidades",
    slug: "kit-5-fans-acegeek-120mm",
    badge: "OFERTA",

    condition: "Novo",
    stock: 2,

    description:
      "Kit com 5 fans Acegeek para melhorar a refrigeração e o visual do gabinete.",

    highlights: [
      "Kit com 5 fans",
      "Melhora a refrigeração do gabinete",
      "Ideal para setups gamer",
      "Últimas unidades",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Acegeek",
      },
      {
        label: "Quantidade",
        value: "5 fans por kit",
      },
    ],
  },

  {
    id: 6,
    name: "Air Cooler Revenger G-V303",
    category: "Hardware",
    subcategory: "Coolers",
    price: "R$ 35,00",
    status: "Pronta entrega",
    slug: "air-cooler-revenger-g-v303",

    condition: "Novo",
    stock: 1,

    description:
      "Air Cooler Revenger G-V303 para refrigeração do processador, disponível para pronta entrega.",

    highlights: [
      "Refrigeração para processador",
      "Design compacto",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Revenger",
      },
      {
        label: "Modelo",
        value: "G-V303",
      },
      {
        label: "Tipo",
        value: "Air Cooler",
      },
    ],
  },

  {
    id: 7,
    name: "Gabinete Gamer Mymax Lion Rosa",
    category: "Gabinetes",
    subcategory: "Gabinetes Gamer",
    price: "R$ 199,90",
    status: "Pronta entrega",
    slug: "gabinete-gamer-mymax-lion",

    condition: "Novo",
    stock: 1,

    description:
      "Gabinete Gamer Mymax Lion na cor rosa, ideal para setups com visual diferenciado.",

    highlights: [
      "Visual gamer",
      "Cor rosa",
      "Ideal para setups modernos",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Mymax",
      },
      {
        label: "Modelo",
        value: "Lion",
      },
      {
        label: "Tipo",
        value: "Gabinete gamer",
      },
      {
        label: "Cor",
        value: "Rosa",
      },
    ],
  },

  {
    id: 8,
    name: "USADO - Mouse Gamer EWEADN GS01 Preto",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 0,00",
    status: "Pronta entrega",
    slug: "mouse-eweadn-gs01",

    condition: "Usado",
    conditionNote:
      "Produto usado em boas condições de conservação e funcionamento.",
    stock: 1,

    description:
      "Mouse Gamer EWEADN GS01 preto usado, em boas condições de conservação e funcionamento.",

    highlights: [
      "Produto usado",
      "Boas condições",
      "Cor preta",
      "Testado pela TECH LINE",
    ],

    specifications: [
      {
        label: "Marca",
        value: "EWEADN",
      },
      {
        label: "Modelo",
        value: "GS01",
      },
      {
        label: "Tipo",
        value: "Mouse gamer",
      },
      {
        label: "Cor",
        value: "Preto",
      },
    ],
  },

  {
    id: 9,
    name: "Mouse Gamer TGT GM95 Preto",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 29,90",
    status: "Pronta entrega",
    slug: "mouse-tgt-gm95",

    condition: "Novo",
    stock: 2,

    description:
      "Mouse Gamer TGT GM95 preto com visual gamer, disponível para pronta entrega.",

    highlights: [
      "Visual gamer",
      "Cor preta",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "TGT",
      },
      {
        label: "Modelo",
        value: "GM95",
      },
      {
        label: "Tipo",
        value: "Mouse gamer",
      },
      {
        label: "Cor",
        value: "Preto",
      },
    ],
  },

  {
    id: 10,
    name: "Air Cooler Mancer Hazel 120mm",
    category: "Hardware",
    subcategory: "Coolers",
    price: "R$ 0,00",
    status: "Pronta entrega",
    slug: "air-cooler-mancer-hazel-120mm",

    condition: "Novo",
    stock: 3,

    description:
      "Air Cooler Mancer Hazel 120mm para refrigeração do processador, disponível para pronta entrega.",

    highlights: [
      "Fan de 120mm",
      "Refrigeração para processador",
      "Pronta entrega",
    ],

    specifications: [
      {
        label: "Marca",
        value: "Mancer",
      },
      {
        label: "Modelo",
        value: "Hazel",
      },
      {
        label: "Tamanho",
        value: "120mm",
      },
      {
        label: "Tipo",
        value: "Air Cooler",
      },
    ],
  },

  {
    id: 11,
    name: "USADA - Placa de Vídeo NVIDIA GeForce GTX 650 1GB",
    category: "Hardware",
    subcategory: "Placas de Vídeo",
    price: "R$ 0,00",
    status: "Pronta entrega",
    slug: "gtx-650-1gb",

    condition: "Usado",
    conditionNote:
      "Produto usado. A saída HDMI não funciona. Consulte os detalhes e demais conexões antes da compra.",
    stock: 1,

    description:
      "Placa de vídeo NVIDIA GeForce GTX 650 1GB usada. A saída HDMI não funciona; consulte as demais condições antes da compra.",

    highlights: [
      "Produto usado",
      "1GB de memória",
      "Saída HDMI não funciona",
      "Produto testado pela TECH LINE",
    ],

    specifications: [
      {
        label: "Modelo",
        value: "GeForce GTX 650",
      },
      {
        label: "Memória",
        value: "1GB",
      },
      {
        label: "Tipo",
        value: "Placa de vídeo",
      },
      {
        label: "Observação",
        value: "Saída HDMI não funciona",
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