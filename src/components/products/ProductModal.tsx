"use client";

import { useEffect, useMemo, useState } from "react";

type ProductVariant = {
  name: string;
  stock: number;
  color?: string;
  images?: string[];
};

type ProductHighlight = string;

type ProductSpecification = {
  label: string;
  value: string;
};

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    category: string;
    price: string;
    status: string;
    description?: string;
    badge?: string;
    variants?: ProductVariant[];
    highlights?: ProductHighlight[];
    specifications?: ProductSpecification[];
  } | null;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedVariantIndex(0);
      setQuantity(1);
      setSelectedImageIndex(0);
      setSearch("");
      setMenuOpen(false);
    }
  }, [open, product]);

  const selectedVariant = product?.variants?.[selectedVariantIndex];

  const currentStock = selectedVariant
    ? selectedVariant.stock
    : product?.status === "Esgotado"
      ? 0
      : 1;

  const currentImages = useMemo(() => {
    if (selectedVariant?.images?.length) {
      return selectedVariant.images;
    }

    return [];
  }, [selectedVariant]);

  if (!open || !product) return null;

  const hasVariants = Boolean(product.variants?.length);

  const changeVariant = (index: number) => {
    setSelectedVariantIndex(index);
    setQuantity(1);
    setSelectedImageIndex(0);
  };

  const increaseQuantity = () => {
    if (quantity < currentStock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((current) => current - 1);
    }
  };

  const previousImage = () => {
    if (currentImages.length <= 1) return;

    setSelectedImageIndex((current) =>
      current === 0 ? currentImages.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    if (currentImages.length <= 1) return;

    setSelectedImageIndex((current) =>
      current === currentImages.length - 1 ? 0 : current + 1
    );
  };

  const variantText = selectedVariant
    ? `, na cor ${selectedVariant.name}`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Olá! Vim pelo catálogo da TECH LINE e tenho interesse em ${quantity} ${
      quantity === 1 ? "unidade" : "unidades"
    } do ${product.name}${variantText}, por ${product.price} cada. Ainda está disponível?`
  );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const term = search.trim();

    if (!term) return;

    onClose();
    window.location.href = `/?busca=${encodeURIComponent(term)}#produtos`;
  };

  const pageBg = isLightMode ? "bg-[#f1f3f5]" : "bg-[#070a0c]";
  const panelBg = isLightMode ? "bg-white" : "bg-[#0f1518]";
  const imageBg = isLightMode ? "bg-[#f7f7f7]" : "bg-[#090d0f]";
  const primaryText = isLightMode ? "text-[#0b1013]" : "text-white";
  const secondaryText = isLightMode ? "text-zinc-600" : "text-zinc-400";
  const mutedText = isLightMode ? "text-zinc-500" : "text-zinc-500";
  const border = isLightMode ? "border-black/10" : "border-white/10";
  const softPanel = isLightMode ? "bg-black/[0.03]" : "bg-white/[0.025]";

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-y-auto ${pageBg}`}
      onClick={onClose}
    >
      <div
        className={`mx-auto min-h-screen w-full ${panelBg}`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <header
          className={`sticky top-0 z-50 border-b ${border} ${
            isLightMode ? "bg-white/95" : "bg-[#080b0d]/95"
          } backdrop-blur-xl`}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex h-[72px] items-center justify-between">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className={`flex h-11 w-11 items-center justify-center border ${border} ${primaryText}`}
                aria-label="Abrir menu"
              >
                <span className="text-2xl leading-none">☰</span>
              </button>

              <div className="text-center">
                <p className="text-lg font-black tracking-[0.24em] md:text-xl">
                  <span className={primaryText}>TECH </span>
                  <span className="text-cyan-400">LINE</span>
                </p>

                <p
                  className={`mt-1 hidden text-[7px] font-bold tracking-[0.34em] sm:block ${mutedText}`}
                >
                  PERFORMANCE + TECNOLOGIA
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightMode((current) => !current)}
                className={`relative flex h-11 w-[70px] items-center rounded-full border ${border} ${
                  isLightMode ? "bg-zinc-200" : "bg-[#0c1216]"
                } p-1 transition`}
                aria-label="Alternar tema claro e escuro"
              >
                <span
                  className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-base text-black transition-transform ${
                    isLightMode ? "translate-x-[28px]" : "translate-x-0"
                  }`}
                >
                  {isLightMode ? "☀" : "☾"}
                </span>
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-0 pb-4">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="O que você está procurando?"
                className={`h-12 min-w-0 flex-1 border ${border} ${
                  isLightMode
                    ? "bg-zinc-100 text-black placeholder:text-zinc-500"
                    : "bg-[#11171b] text-white placeholder:text-zinc-600"
                } px-4 text-sm outline-none focus:border-cyan-400`}
              />

              <button
                type="submit"
                className="flex h-12 w-14 items-center justify-center bg-cyan-400 text-xl font-black text-black"
                aria-label="Buscar"
              >
                ⌕
              </button>
            </form>
          </div>
        </header>

        {/* MENU LATERAL */}
        <div
          className={`fixed inset-0 z-[80] transition ${
            menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Fechar menu"
          />

          <aside
            className={`absolute left-0 top-0 h-full w-[82%] max-w-[340px] border-r ${border} ${
              isLightMode ? "bg-white" : "bg-[#080b0d]"
            } shadow-2xl transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              className={`flex h-[72px] items-center justify-between border-b ${border} px-5`}
            >
              <div>
                <p className="text-lg font-black tracking-[0.22em]">
                  <span className={primaryText}>TECH </span>
                  <span className="text-cyan-400">LINE</span>
                </p>

                <p
                  className={`mt-1 text-[7px] font-bold tracking-[0.28em] ${mutedText}`}
                >
                  PERFORMANCE + TECNOLOGIA
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className={`flex h-10 w-10 items-center justify-center border ${border} ${primaryText}`}
                aria-label="Fechar menu"
              >
                ×
              </button>
            </div>

            <nav className="px-5 py-6">
              {[
                { label: "Início", href: "/" },
                { label: "Produtos", href: "/#produtos" },
                { label: "Ofertas", href: "/#ofertas" },
                { label: "Serviços", href: "/#servicos" },
                { label: "Contato", href: "/#contato" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b ${border} py-5 text-base font-semibold transition hover:text-cyan-400 ${primaryText}`}
                >
                  <span>{item.label}</span>
                  <span className="text-cyan-400">→</span>
                </a>
              ))}
            </nav>

            <div
              className={`absolute bottom-0 left-0 right-0 border-t ${border} p-5`}
            >
              <p className={`text-xs ${secondaryText}`}>Catálogo Tech Line</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-cyan-400">
                CIANORTE • PR
              </p>
            </div>
          </aside>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:items-start">
            {/* GALERIA */}
            <section className={`${imageBg} lg:sticky lg:top-[170px]`}>
              <div
                className={`relative flex min-h-[360px] items-center justify-center overflow-hidden border ${border} ${
                  isLightMode ? "bg-white" : "bg-[#0b1013]"
                } md:min-h-[480px] lg:min-h-[520px]`}
              >
                {product.badge && (
                  <span className="absolute left-4 top-4 z-20 bg-cyan-400 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-black">
                    {product.badge}
                  </span>
                )}

                {currentImages.length > 0 ? (
                  <img
                    src={currentImages[selectedImageIndex]}
                    alt={`${product.name} ${
                      selectedVariant ? selectedVariant.name : ""
                    }`}
                    className="h-full max-h-[520px] w-full object-contain"
                  />
                ) : (
                  <p className="text-xs tracking-[0.3em] text-zinc-600">
                    FOTO PRINCIPAL
                  </p>
                )}

                {currentImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-3xl leading-none text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-400 md:left-5 md:h-12 md:w-12"
                      aria-label="Foto anterior"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-3xl leading-none text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-400 md:right-5 md:h-12 md:w-12"
                      aria-label="Próxima foto"
                    >
                      ›
                    </button>
                  </>
                )}

                {currentImages.length > 0 && (
                  <span className="absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                    {selectedImageIndex + 1}/{currentImages.length}
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {(currentImages.length > 0
                  ? currentImages
                  : ["1", "2", "3", "4"]
                )
                  .slice(0, 4)
                  .map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? "border-cyan-400"
                          : border
                      } ${isLightMode ? "bg-white" : "bg-[#0b1013]"}`}
                    >
                      {currentImages.length > 0 ? (
                        <img
                          src={image}
                          alt={`${product.name} - foto ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-[8px] tracking-widest text-zinc-600">
                          FOTO {index + 1}
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            </section>

            {/* COMPRA / INFORMAÇÕES PRINCIPAIS */}
            <section
              className={`border ${border} ${softPanel} p-5 md:p-7 lg:p-8`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-400">
                {product.category}
              </p>

              <h1
                className={`mt-3 text-3xl font-black leading-tight md:text-4xl ${primaryText}`}
              >
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      currentStock > 0 ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  />

                  <span
                    className={`text-sm font-medium ${
                      currentStock > 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {currentStock > 0
                      ? `${currentStock} ${
                          currentStock === 1
                            ? "unidade disponível"
                            : "unidades disponíveis"
                        }`
                      : "Indisponível"}
                  </span>
                </div>

                {currentStock > 0 && (
                  <span className={`text-xs ${secondaryText}`}>
                    Pronta entrega
                  </span>
                )}
              </div>

              <p className="mt-7 text-4xl font-black text-cyan-400">
                {product.price}
              </p>

              {/* INFORMAÇÕES RÁPIDAS */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className={`border ${border} ${panelBg} p-3`}>
                  <p
                    className={`text-[9px] font-bold uppercase tracking-[0.18em] ${mutedText}`}
                  >
                    Disponibilidade
                  </p>
                  <p className={`mt-2 text-sm font-bold ${primaryText}`}>
                    {currentStock > 0 ? "Pronta entrega" : "Indisponível"}
                  </p>
                </div>

                <div className={`border ${border} ${panelBg} p-3`}>
                  <p
                    className={`text-[9px] font-bold uppercase tracking-[0.18em] ${mutedText}`}
                  >
                    Atendimento
                  </p>
                  <p className={`mt-2 text-sm font-bold ${primaryText}`}>
                    WhatsApp
                  </p>
                </div>
              </div>

              {hasVariants && (
                <div className={`mt-8 border-t pt-7 ${border}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${mutedText}`}
                    >
                      Cor
                    </p>

                    <span className={`text-sm font-semibold ${primaryText}`}>
                      {selectedVariant?.name}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.variants!.map((variant, index) => {
                      const selected = selectedVariantIndex === index;

                      return (
                        <button
                          key={variant.name}
                          type="button"
                          onClick={() => changeVariant(index)}
                          className={`flex min-h-11 items-center gap-2 border px-4 py-2 transition ${
                            selected
                              ? "border-cyan-400"
                              : `${border} hover:border-cyan-400/60`
                          } ${selected ? primaryText : secondaryText}`}
                        >
                          <span
                            className="h-5 w-5 rounded-full border border-black/20"
                            style={{
                              backgroundColor: variant.color || "#ffffff",
                            }}
                          />

                          <span className="text-sm font-semibold">
                            {variant.name}
                          </span>

                          {variant.stock === 0 && (
                            <span className="text-[10px] text-red-400">
                              Esgotado
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={`mt-8 border-t pt-7 ${border}`}>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${mutedText}`}
                >
                  Quantidade
                </p>

                <div className="mt-4 flex h-14 items-center border border-white/10">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 || currentStock === 0}
                    className={`flex h-full w-14 items-center justify-center text-2xl ${primaryText} disabled:cursor-not-allowed disabled:text-zinc-700`}
                  >
                    −
                  </button>

                  <span
                    className={`flex h-full flex-1 items-center justify-center border-x ${border} text-base font-black ${primaryText}`}
                  >
                    {currentStock === 0 ? 0 : quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={currentStock === 0 || quantity >= currentStock}
                    className={`flex h-full w-14 items-center justify-center text-2xl ${primaryText} disabled:cursor-not-allowed disabled:text-zinc-700`}
                  >
                    +
                  </button>
                </div>

                {currentStock > 0 && (
                  <p className={`mt-3 text-xs ${secondaryText}`}>
                    Máximo disponível nesta variação: {currentStock}
                  </p>
                )}
              </div>

              <a
                href={
                  currentStock > 0
                    ? `https://wa.me/5544991373517?text=${whatsappMessage}`
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                aria-disabled={currentStock === 0}
                className={`mt-6 flex min-h-14 w-full items-center justify-center gap-3 px-5 text-center text-sm font-black uppercase tracking-wide transition ${
                  currentStock > 0
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "pointer-events-none bg-zinc-800 text-zinc-500"
                }`}
              >
                {currentStock > 0
                  ? "Comprar pelo WhatsApp"
                  : "Produto indisponível"}
              </a>
            </section>
          </div>

          {/* CONTEÚDO DETALHADO */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className={`border ${border} ${softPanel} p-5 md:p-7`}>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">
                Sobre o produto
              </p>

              <p
                className={`mt-4 text-sm leading-7 ${
                  isLightMode ? "text-zinc-700" : "text-zinc-300"
                }`}
              >
                {product.description ||
                  "Produto disponível na TECH LINE. Consulte disponibilidade, condições e informações adicionais diretamente pelo WhatsApp."}
              </p>

              {product.highlights && product.highlights.length > 0 && (
                <div className="mt-8">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.24em] ${mutedText}`}
                  >
                    Destaques
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className={`border ${border} ${panelBg} p-4 text-sm ${
                          isLightMode ? "text-zinc-700" : "text-zinc-300"
                        }`}
                      >
                        <span className="mr-2 text-cyan-400">•</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className={`border ${border} ${softPanel} p-5 md:p-7`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">
                    Especificações
                  </p>
                  <p className={`mt-2 text-sm ${secondaryText}`}>
                    Informações técnicas do produto
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.specifications?.map((specification) => (
                  <div
                    key={`${specification.label}-${specification.value}`}
                    className={`border ${border} ${panelBg} p-4`}
                  >
                    <p
                      className={`text-[9px] font-bold uppercase tracking-[0.18em] ${mutedText}`}
                    >
                      {specification.label}
                    </p>

                    <p className={`mt-2 text-sm font-bold ${primaryText}`}>
                      {specification.value}
                    </p>
                  </div>
                ))}

                {selectedVariant && (
                  <div className={`border ${border} ${panelBg} p-4`}>
                    <p
                      className={`text-[9px] font-bold uppercase tracking-[0.18em] ${mutedText}`}
                    >
                      Cor selecionada
                    </p>
                    <p className={`mt-2 text-sm font-bold ${primaryText}`}>
                      {selectedVariant.name}
                    </p>
                  </div>
                )}

                <div className={`border ${border} ${panelBg} p-4`}>
                  <p
                    className={`text-[9px] font-bold uppercase tracking-[0.18em] ${mutedText}`}
                  >
                    Estoque
                  </p>
                  <p className={`mt-2 text-sm font-bold ${primaryText}`}>
                    {currentStock}{" "}
                    {currentStock === 1 ? "unidade" : "unidades"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`mt-8 min-h-12 w-full border ${border} px-5 text-sm font-semibold ${primaryText} transition hover:border-cyan-400 hover:text-cyan-400`}
          >
            Continuar vendo produtos
          </button>
        </div>
      </div>
    </div>
  );
}