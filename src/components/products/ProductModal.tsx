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

  useEffect(() => {
    if (open) {
      setSelectedVariantIndex(0);
      setQuantity(1);
      setSelectedImageIndex(0);
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

  const variantText = selectedVariant
    ? `, na cor ${selectedVariant.name}`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Olá! Vim pelo catálogo da TECH LINE e tenho interesse em ${quantity} ${
      quantity === 1 ? "unidade" : "unidades"
    } do ${product.name}${variantText}, por ${product.price} cada. Ainda está disponível?`
  );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center bg-black/80 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full overflow-y-auto bg-[#0f1518] md:max-w-5xl md:border md:border-white/10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/10 bg-black/60 text-xl text-white transition hover:border-cyan-400 hover:text-cyan-400"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[#090d0f] p-4 md:p-8">
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#0b1013] md:min-h-[520px]">
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 bg-cyan-400 px-3 py-1 text-[10px] font-black uppercase text-black">
                  {product.badge}
                </span>
              )}

              {currentImages.length > 0 ? (
                <img
                  src={currentImages[selectedImageIndex]}
                  alt={`${product.name} ${selectedVariant ? selectedVariant.name : ""}`}
                  className="h-full max-h-[520px] w-full object-contain"
                />
              ) : (
                <p className="text-xs tracking-[0.3em] text-zinc-600">
                  FOTO PRINCIPAL
                </p>
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
                    className={`aspect-square overflow-hidden border bg-[#0b1013] transition ${
                      selectedImageIndex === index
                        ? "border-cyan-400"
                        : "border-white/10 hover:border-cyan-400/60"
                    }`}
                  >
                    {currentImages.length > 0 ? (
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[9px] tracking-widest text-zinc-600">
                        FOTO {index + 1}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
              {product.category}
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
              {product.name}
            </h2>

            <div className="mt-5 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  currentStock > 0 ? "bg-emerald-400" : "bg-red-400"
                }`}
              />

              <span
                className={`text-sm ${
                  currentStock > 0 ? "text-emerald-400" : "text-red-400"
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

            <p className="mt-7 text-3xl font-black text-white">
              {product.price}
            </p>

            {hasVariants && (
              <>
                <div className="my-7 h-px bg-white/10" />

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Cor
                    </p>

                    <span className="text-sm text-white">
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
                          className={`flex items-center gap-2 border px-3 py-2 transition ${
                            selected
                              ? "border-cyan-400 text-white"
                              : "border-white/10 text-zinc-400 hover:border-white/30"
                          }`}
                        >
                          <span
                            className="h-5 w-5 rounded-full border border-white/20"
                            style={{
                              backgroundColor: variant.color || "#ffffff",
                            }}
                          />

                          <span className="text-sm">{variant.name}</span>

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
              </>
            )}

            <div className="my-7 h-px bg-white/10" />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Quantidade
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center border border-white/10">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 || currentStock === 0}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white disabled:cursor-not-allowed disabled:text-zinc-700"
                  >
                    −
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-white/10 text-sm font-bold text-white">
                    {currentStock === 0 ? 0 : quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={currentStock === 0 || quantity >= currentStock}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white disabled:cursor-not-allowed disabled:text-zinc-700"
                  >
                    +
                  </button>
                </div>

                {currentStock > 0 && (
                  <span className="text-xs text-zinc-500">
                    Máximo: {currentStock}
                  </span>
                )}
              </div>
            </div>

            <div className="my-7 h-px bg-white/10" />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Sobre o produto
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {product.description ||
                  "Produto disponível na TECH LINE. Consulte disponibilidade, condições e informações adicionais diretamente pelo WhatsApp."}
              </p>
            </div>

            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Destaques
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="border border-white/10 bg-white/[0.02] p-3 text-sm text-zinc-300"
                    >
                      <span className="mr-2 text-cyan-400">•</span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.specifications &&
              product.specifications.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Especificações
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-zinc-300">
                    {product.specifications.map((specification) => (
                      <div
                        key={`${specification.label}-${specification.value}`}
                        className="flex justify-between gap-4 border-b border-white/10 pb-3"
                      >
                        <span>{specification.label}</span>
                        <span className="text-right text-white">
                          {specification.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Informações
              </p>

              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Categoria</span>
                  <span className="text-white">{product.category}</span>
                </div>

                {selectedVariant && (
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span>Cor</span>
                    <span className="text-white">{selectedVariant.name}</span>
                  </div>
                )}

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Estoque</span>
                  <span className="text-white">{currentStock}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Atendimento</span>
                  <span className="text-white">TECH LINE</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={
                  currentStock > 0
                    ? `https://wa.me/55SEUNUMERO?text=${whatsappMessage}`
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                aria-disabled={currentStock === 0}
                className={`flex min-h-14 items-center justify-center px-5 text-sm font-black transition ${
                  currentStock > 0
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "pointer-events-none bg-zinc-800 text-zinc-500"
                }`}
              >
                {currentStock > 0
                  ? "Comprar pelo WhatsApp"
                  : "Produto indisponível"}
              </a>

              <button
                type="button"
                onClick={onClose}
                className="min-h-12 border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Continuar vendo produtos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}