export type Category =
  | "Hardware"
  | "Refrigeração"
  | "Periféricos"
  | "Gabinetes";

export type ProductVariant = {
  name: string;
  stock: number;
  price?: string;
  color?: string;
  images?: string[];
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductCondition = "Novo" | "Usado";

export type ProductOffer = {
  active: boolean;
  price: string;
};

export type Product = {
  id: number;
  name: string;
  category: Category;
  subcategory: string;

  // Preço normal do produto
  price: string;

  // Oferta temporária
  offer?: ProductOffer;

  status: string;
  slug: string;

  description?: string;
  image?: string;
  images?: string[];

  condition?: ProductCondition;
  conditionNote?: string;
  stock?: number;

  variants?: ProductVariant[];
  highlights?: string[];
  specifications?: ProductSpecification[];
};

const rs7WhiteImages = [
  "/produtos/smailwolf-rs7/branco-1.jpg",
  "/produtos/smailwolf-rs7/branco-2.jpg",
  "/produtos/smailwolf-rs7/branco-3.jpg",
];

const rs7BlackImages = [
  "/produtos/smailwolf-rs7/preto-1.jpg",
  "/produtos/smailwolf-rs7/preto-2.jpg",
  "/produtos/smailwolf-rs7/preto-3.jpg",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Mouse Gamer Smailwolf RS7",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 109,90",
    offer: {
      active: true,
      price: "R$ 90,00",
    },
    status: "Pronta entrega",
    slug: "smailwolf-rs7",
    image: "/produtos/smailwolf-rs7/branco-1.jpg",
    images: rs7WhiteImages,

    condition: "Novo",
    stock: 3,

    description:
      "Mouse gamer Smailwolf RS7 com conexão por cabo, 2.4G e Bluetooth 5.2. Disponível nas cores branca e preta para pronta entrega.",

    variants: [
      {
        name: "Branco",
        stock: 2,
        price: "R$ 109,90",
        color: "#ffffff",
        images: rs7WhiteImages,
      },
      {
        name: "Preto",
        stock: 1,
        price: "R$ 109,90",
        color: "#111111",
        images: rs7BlackImages,
      },
    ],

    highlights: [
      "Conexão com fio, 2.4G e Bluetooth 5.2",
      "3 modos de conexão",
      "Design moderno para setups gamer",
      "Botões laterais",
      "Modelos branco e preto disponíveis",
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
    image: "/produtos/tgt-om85/om85-1.jpg",
    images: [
      "/produtos/tgt-om85/om85-1.jpg",
      "/produtos/tgt-om85/om85-2.jpg",
      "/produtos/tgt-om85/om85-3.jpg",
    ],

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
    price: "R$ 49,90",
    offer: {
      active: true,
      price: "R$ 39,90",
    },
    status: "Pronta entrega",
    slug: "fone-qkz-ak6",
    image: "/produtos/qkz-ak6/ak6-1.jpg",
    images: [
      "/produtos/qkz-ak6/ak6-1.jpg",
      "/produtos/qkz-ak6/ak6-2.jpg",
      "/produtos/qkz-ak6/ak6-3.jpg",
    ],

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
    offer: {
      active: true,
      price: "R$ 24,90",
    },
    status: "Pronta entrega",
    slug: "mousepad-gamer-70x30",
    image: "/produtos/bayaz-70x30/bayaz-1.jpg",
    images: [
      "/produtos/bayaz-70x30/bayaz-1.jpg",
      "/produtos/bayaz-70x30/bayaz-2.jpg",
      "/produtos/bayaz-70x30/bayaz-3.jpg",
    ],

    condition: "Novo",
    stock: 1,

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
    category: "Refrigeração",
    subcategory: "Fans",
    price: "R$ 69,90",
    status: "Últimas unidades",
    slug: "kit-5-fans-acegeek-120mm",
    image: "/produtos/fans/fans-0.png",
    images: [
      "/produtos/fans/fans-0.png",
      "/produtos/fans/fans-1.png",
      "/produtos/fans/fans-2.png",
    ],

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
    id: 7,
    name: "Gabinete Gamer Mymax Lion Rosa",
    category: "Gabinetes",
    subcategory: "Gabinetes Gamer",
    price: "R$ 149,90",
    status: "Pronta entrega",
    slug: "gabinete-gamer-mymax-lion",
    image: "/produtos/gabinete-rosa/rosa-1.png",
    images: [
      "/produtos/gabinete-rosa/rosa-1.png",
      "/produtos/gabinete-rosa/rosa-2.png",
      "/produtos/gabinete-rosa/rosa-3.png",
    ],

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
    name: "Mouse Gamer TGT GM95 Preto",
    category: "Periféricos",
    subcategory: "Mouses",
    price: "R$ 29,90",
    status: "Pronta entrega",
    slug: "mouse-tgt-gm95",
    image: "/produtos/tgt-gm95/gm95-1.jpg",
    images: [
      "/produtos/tgt-gm95/gm95-1.jpg",
      "/produtos/tgt-gm95/gm95-2.jpg",
      "/produtos/tgt-gm95/gm95-3.jpg",
    ],

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
    id: 9,
    name: "Air Cooler Mancer Hazel 120mm",
    category: "Refrigeração",
    subcategory: "Coolers",
    price: "R$ 39,90",
    offer: {
      active: true,
      price: "R$ 24,90",
    },
    status: "Pronta entrega",
    slug: "air-cooler-mancer-hazel-120mm",
    image: "/produtos/hazel/mancer-1.jpg",
    images: [
      "/produtos/hazel/mancer-1.jpg",
      "/produtos/hazel/mancer-2.jpg",
      "/produtos/hazel/mancer-3.jpg",
    ],

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
    id: 10,
    name: "USADA - Placa de Vídeo NVIDIA GeForce GTX 650 1GB",
    category: "Hardware",
    subcategory: "Placas de Vídeo",
    price: "R$ 149,90",
    status: "Pronta entrega",
    slug: "gtx-650-1gb",
    image: "/produtos/gtx-650/gtx-1.jpg",
    images: [
      "/produtos/gtx-650/gtx-1.jpg",
      "/produtos/gtx-650/gtx-2.jpg",
      "/produtos/gtx-650/gtx-3.jpg",
    ],

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
  {
    id: 11,
    name: "Pasta Térmica Husky Glaze 5g",
    category: "Refrigeração",
    subcategory: "Pastas Térmicas",
    price: "R$ 19,90",
    status: "Pronta entrega",
    slug: "pasta-termica-husky-glaze-5g",
    image: "/produtos/husky-glaze-5g/husky-1.jpg",
    images: [
      "/produtos/husky-glaze-5g/husky-1.jpg",
      "/produtos/husky-glaze-5g/husky-2.jpg",
      "/produtos/husky-glaze-5g/husky-3.jpg",
    ],
    condition: "Novo",
    stock: 2,
    description:
      "Pasta térmica Husky Glaze de 5g para auxiliar na transferência de calor entre o processador e o cooler.",
    highlights: [
      "Conteúdo de 5g",
      "Indicada para processadores",
      "Auxilia na transferência de calor",
      "Pronta entrega",
    ],
    specifications: [
      { label: "Marca", value: "Husky" },
      { label: "Modelo", value: "Glaze" },
      { label: "Conteúdo", value: "5g" },
      { label: "Tipo", value: "Pasta térmica" },
    ],
  },

  {
    id: 12,
    name: "Teclado Gamer AJAZZ x NACODEX NK61",
    category: "Periféricos",
    subcategory: "Teclados",
    price: "R$ 170,00",
    offer: {
      active: true,
      price: "R$ 150,00",
    },
    status: "Pronta entrega",
    slug: "teclado-gamer-ajazz-nacodex-nk61",
    image: "/produtos/teclado nk1/nk61-1.jpg",
    images: [
      "/produtos/teclado nk1/nk61-1.jpg",
      "/produtos/teclado nk1/nk61-2.jpg",
      "/produtos/teclado nk1/nk61-3.jpg",
    ],
    condition: "Novo",
    stock: 1,
    description:
      "Teclado Gamer AJAZZ x NACODEX NK61 compacto, com iluminação RGB e visual moderno para setups gamer.",
    highlights: [
      "Iluminação RGB",
      "Formato compacto",
      "Design gamer",
      "Pronta entrega",
    ],
    specifications: [
      { label: "Marca", value: "AJAZZ x NACODEX" },
      { label: "Modelo", value: "NK61" },
      { label: "Tipo", value: "Teclado gamer" },
      { label: "Iluminação", value: "RGB" },
    ],
  },

  {
    id: 13,
    name: "Lightbar para Monitor 5W USB Touch",
    category: "Periféricos",
    subcategory: "Acessórios para Monitor",
    price: "R$ 69,90",
    status: "Pronta entrega",
    slug: "lightbar-monitor-5w-usb-touch",
    image: "/produtos/lightbar/light-1.jpg",
    images: [
      "/produtos/lightbar/light-1.jpg",
      "/produtos/lightbar/light-2.jpg",
      "/produtos/lightbar/light-3.jpg",
    ],
    condition: "Novo",
    stock: 1,
    description:
      "Lightbar para monitor com potência de 5W, alimentação USB e acionamento touch, ideal para iluminar a área de trabalho e o setup.",
    highlights: [
      "Potência de 5W",
      "Alimentação USB",
      "Acionamento touch",
      "Iluminação para monitor e setup",
    ],
    specifications: [
      { label: "Tipo", value: "Lightbar para monitor" },
      { label: "Potência", value: "5W" },
      { label: "Alimentação", value: "USB" },
      { label: "Acionamento", value: "Touch" },
    ],
  },

  {
    id: 14,
    name: "Controle sem fio compatível com PS4",
    category: "Periféricos",
    subcategory: "Controles",
    price: "R$ 120,00",
    offer: {
      active: true,
      price: "R$ 100,00",
    },
    status: "Pronta entrega",
    slug: "controle-sem-fio-compativel-ps4",
    image: "/produtos/controlesp4/ps4-1.jpg",
    images: [
      "/produtos/controlesp4/ps4-1.jpg",
      "/produtos/controlesp4/ps4-2.jpg",
      "/produtos/controlesp4/ps4-3.jpg",
      "/produtos/controlesp4/ps4-4.jpg",
    ],
    condition: "Novo",
    stock: 2,
    description:
      "Controle sem fio compatível com PS4, com vibração e design no estilo do controle tradicional do console.",
    highlights: [
      "Conexão sem fio",
      "Compatível com PS4",
      "Função de vibração",
      "Pronta entrega",
    ],
    specifications: [
      { label: "Tipo", value: "Controle sem fio" },
      { label: "Compatibilidade", value: "PS4" },
      { label: "Vibração", value: "Sim" },
      { label: "Cor", value: "Preto" },
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
