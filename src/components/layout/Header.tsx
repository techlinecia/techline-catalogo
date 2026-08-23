"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout">("cart");

  const {
    items,
    totalItems,
    totalPrice,
    isCartOpen,
    removeItem,
    increaseItem,
    decreaseItem,
    clearCart,
    openCart,
    closeCart,
    checkout,
    setPaymentMethod,
    setInstallments,
    setDeliveryMethod,
    updateCheckoutField,
  } = useCart();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    setIsLightMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLightMode ? "light" : "dark"
    );
  }, [isLightMode]);

  useEffect(() => {
    if (!isCartOpen) {
      setCheckoutStep("cart");
    }
  }, [isCartOpen]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const term = search.trim();

    if (!term) {
      window.location.href = "/#produtos";
      return;
    }

    window.location.href = `/?busca=${encodeURIComponent(term)}#produtos`;
  };

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const paymentLabel = {
    pix: "Pix",
    dinheiro: "Dinheiro",
    debito: "Cartão de débito",
    credito: "Cartão de crédito",
  } as const;

  const deliveryLabel = {
    retirada: "Retirada na TECH LINE",
    entrega: "Entrega grátis em Cianorte",
  } as const;

  const checkoutReady =
    checkout.paymentMethod !== null &&
    checkout.deliveryMethod !== null &&
    (checkout.deliveryMethod !== "entrega" ||
      (checkout.customerName.trim() !== "" &&
        checkout.street.trim() !== "" &&
        checkout.number.trim() !== "" &&
        checkout.neighborhood.trim() !== ""));

  const cartWhatsappMessage = encodeURIComponent(
    [
      "Olá! Vim pelo catálogo da TECH LINE e gostaria de finalizar meu pedido:",
      "",
      "*MEU PEDIDO*",
      "",
      ...items.map(
        (item) =>
          `• ${item.quantity}x ${item.name}${
            item.variation ? ` - ${item.variation}` : ""
          } — ${formatMoney(item.price * item.quantity)}`
      ),
      "",
      `*Total: ${formatMoney(totalPrice)}*`,
      "",
      checkout.paymentMethod
        ? `*Pagamento:* ${paymentLabel[checkout.paymentMethod]}${
            checkout.paymentMethod === "credito"
              ? ` em ${checkout.installments}x`
              : ""
          }`
        : "",
      checkout.deliveryMethod
        ? `*Recebimento:* ${deliveryLabel[checkout.deliveryMethod]}`
        : "",
      checkout.deliveryMethod === "entrega"
        ? `*Nome:* ${checkout.customerName}`
        : "",
      checkout.deliveryMethod === "entrega"
        ? `*Endereço:* ${checkout.street}, ${checkout.number}`
        : "",
      checkout.deliveryMethod === "entrega"
        ? `*Bairro:* ${checkout.neighborhood}`
        : "",
      checkout.deliveryMethod === "entrega" && checkout.complement.trim()
        ? `*Complemento:* ${checkout.complement}`
        : "",
      checkout.deliveryMethod === "entrega" && checkout.reference.trim()
        ? `*Referência:* ${checkout.reference}`
        : "",
      "",
      "Poderia me confirmar a disponibilidade e finalizar o pedido?",
    ]
      .filter((line) => line !== "")
      .join("\n")
  );

  const primaryText = isLightMode ? "text-[#0b1013]" : "text-white";
  const secondaryText = isLightMode ? "text-zinc-600" : "text-zinc-400";
  const border = isLightMode ? "border-black/10" : "border-white/10";
  const surface = isLightMode ? "bg-white" : "bg-[#070b0f]";
  const softSurface = isLightMode ? "bg-zinc-100" : "bg-[#0c1217]";
  const navSurface = isLightMode ? "bg-[#f7f8fa]" : "bg-[#080d12]";

  const navigation = [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/#produtos" },
    { label: "Ofertas", href: "/#ofertas" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Contato", href: "/#contato" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b ${border} ${surface}/95 backdrop-blur-xl`}
      >
        {/* TOPO PRINCIPAL */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid min-h-[82px] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 md:min-h-[96px] md:grid-cols-[240px_minmax(280px,1fr)_auto] md:gap-6">
            {/* MOBILE: HAMBURGUER / DESKTOP: LOGO */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex h-11 w-11 items-center justify-center border ${border} ${primaryText} md:hidden`}
              aria-label="Abrir menu"
            >
              <span className="text-2xl leading-none">☰</span>
            </button>

            <Link
              href="/"
              className="hidden min-w-0 md:block"
            >
              <div className="leading-none">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-[25px] font-black tracking-[0.08em] ${primaryText}`}
                  >
                    TECH
                  </span>
                  <span className="text-[25px] font-black tracking-[0.08em] text-cyan-400">
                    LINE
                  </span>
                </div>

                <p className={`mt-2 text-[8px] font-bold tracking-[0.28em] ${secondaryText}`}>
                  INFORMÁTICA E TECNOLOGIA
                </p>
              </div>
            </Link>

            {/* LOGO MOBILE */}
            <Link
              href="/"
              className="justify-self-center text-center md:hidden"
            >
              <div className="flex items-baseline justify-center gap-2">
                <span
                  className={`text-[20px] font-black tracking-[0.12em] ${primaryText}`}
                >
                  TECH
                </span>
                <span className="text-[20px] font-black tracking-[0.12em] text-cyan-400">
                  LINE
                </span>
              </div>

              <p className={`mt-1 hidden text-[7px] font-bold tracking-[0.2em] sm:block ${secondaryText}`}>
                INFORMÁTICA E TECNOLOGIA
              </p>
            </Link>

            {/* BUSCA DESKTOP */}
            <form
              onSubmit={handleSearch}
              className="hidden min-w-0 md:flex"
            >
              <div
                className={`flex h-[52px] min-w-0 flex-1 items-center border ${border} ${softSurface}`}
              >
                <span className={`pl-4 text-xl ${secondaryText}`}>⌕</span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar produtos..."
                  className={`h-full min-w-0 flex-1 bg-transparent px-4 text-sm outline-none ${primaryText} placeholder:text-zinc-600`}
                />

                <button
                  type="submit"
                  className="flex h-full w-14 shrink-0 items-center justify-center bg-cyan-400 text-xl font-black text-black transition hover:bg-cyan-300"
                  aria-label="Buscar"
                >
                  ⌕
                </button>
              </div>
            </form>

            {/* AÇÕES */}
            <div className="flex items-center justify-self-end gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => setIsLightMode((current) => !current)}
                className={`relative flex h-11 w-[58px] items-center rounded-full border ${border} ${
                  isLightMode ? "bg-zinc-200" : "bg-[#0d141a]"
                } p-1 transition md:w-[64px]`}
                aria-label="Alternar tema claro e escuro"
              >
                <span
                  className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-base text-black transition-transform ${
                    isLightMode
                      ? "translate-x-[18px] md:translate-x-[24px]"
                      : "translate-x-0"
                  }`}
                >
                  {isLightMode ? "☀" : "☾"}
                </span>
              </button>

              <button
                type="button"
                onClick={openCart}
                className={`relative flex h-11 items-center justify-center gap-3 border ${border} px-3 transition hover:border-cyan-400 md:h-[52px] md:min-w-[154px] md:justify-start md:px-4`}
                aria-label="Abrir carrinho"
              >
                <span className={`text-xl ${primaryText}`}>🛒</span>

                <div className="hidden text-left md:block">
                  <p className={`text-xs font-black uppercase tracking-wide ${primaryText}`}>
                    Carrinho
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-cyan-400">
                    {totalItems} {totalItems === 1 ? "produto" : "produtos"}
                  </p>
                </div>

                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-black text-black md:hidden">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* BUSCA MOBILE */}
          <form
            onSubmit={handleSearch}
            className="pb-4 md:hidden"
          >
            <div
              className={`flex h-[52px] items-center border ${border} ${softSurface}`}
            >
              <span className={`pl-4 text-xl ${secondaryText}`}>⌕</span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar produtos..."
                className={`h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none ${primaryText} placeholder:text-zinc-600`}
              />

              <button
                type="submit"
                className="flex h-full w-14 shrink-0 items-center justify-center bg-cyan-400 text-xl font-black text-black"
                aria-label="Buscar"
              >
                ⌕
              </button>
            </div>
          </form>
        </div>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav
          className={`hidden border-t ${border} ${navSurface} shadow-[0_3px_0_rgba(34,211,238,0.75)] md:block`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-5 px-6">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-h-[62px] items-center justify-center border-r ${border} px-4 text-center text-sm font-black uppercase tracking-wide transition hover:bg-cyan-400/10 hover:text-cyan-400 ${
                  index === 0
                    ? "border-l border-cyan-400/70 text-cyan-400"
                    : primaryText
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* MENU MOBILE */}
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
          className={`absolute left-0 top-0 h-full w-[82%] max-w-[340px] border-r ${border} ${surface} shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`flex h-[72px] items-center justify-between border-b ${border} px-5`}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              <p className="text-lg font-black tracking-[0.16em]">
                <span className={primaryText}>TECH </span>
                <span className="text-cyan-400">LINE</span>
              </p>

              <p className={`mt-1 text-[7px] font-bold tracking-[0.22em] ${secondaryText}`}>
                INFORMÁTICA E TECNOLOGIA
              </p>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className={`flex h-10 w-10 items-center justify-center border ${border} text-xl ${primaryText}`}
              aria-label="Fechar menu"
            >
              ×
            </button>
          </div>

          <div className="px-5 py-5">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between border-b ${border} py-4 text-sm font-bold ${primaryText}`}
              >
                <span>{item.label}</span>
                <span className="text-cyan-400">→</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* CARRINHO LATERAL */}
      <div
        className={`fixed inset-0 z-[90] transition ${
          isCartOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isCartOpen}
      >
        <button
          type="button"
          onClick={closeCart}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
            isCartOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Fechar carrinho"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l ${border} ${surface} shadow-2xl transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className={`flex h-[72px] items-center justify-between border-b ${border} px-5`}
          >
            <div>
              <p className={`text-lg font-black ${primaryText}`}>
                {checkoutStep === "checkout" ? "Finalizar pedido" : "Seu carrinho"}
              </p>

              <p className={`mt-1 text-xs ${secondaryText}`}>
                {checkoutStep === "checkout"
                  ? "Revise os dados antes de enviar"
                  : `${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
              </p>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className={`flex h-10 w-10 items-center justify-center border ${border} text-xl ${primaryText}`}
              aria-label="Fechar carrinho"
            >
              ×
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span className="text-4xl">🛒</span>

              <p className={`mt-5 text-lg font-black ${primaryText}`}>
                Seu carrinho está vazio
              </p>

              <p className={`mt-2 max-w-[260px] text-sm leading-6 ${secondaryText}`}>
                Adicione produtos para montar seu pedido.
              </p>

              <button
                type="button"
                onClick={closeCart}
                className="mt-6 bg-cyan-400 px-5 py-3 text-sm font-black text-black"
              >
                Continuar comprando
              </button>
            </div>
          ) : checkoutStep === "cart" ? (
            <>
              {/* ETAPA 1 - CARRINHO */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5">
                <div className="space-y-3">
                  {items.map((item) => (
                    <article
                      key={item.cartId}
                      className={`border ${border} ${softSurface} p-3`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`h-20 w-20 shrink-0 overflow-hidden border ${border} ${softSurface}`}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[8px] text-zinc-600">
                              SEM FOTO
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className={`line-clamp-2 text-sm font-black ${primaryText}`}>
                            {item.name}
                          </p>

                          {item.variation && (
                            <p className={`mt-1 text-xs ${secondaryText}`}>
                              Cor: {item.variation}
                            </p>
                          )}

                          <p className="mt-2 text-sm font-black text-cyan-400">
                            {formatMoney(item.price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.cartId)}
                          className="self-start text-lg text-zinc-500 transition hover:text-red-400"
                          aria-label={`Remover ${item.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className={`flex h-10 items-center border ${border}`}>
                          <button
                            type="button"
                            onClick={() => decreaseItem(item.cartId)}
                            className={`flex h-full w-10 items-center justify-center text-lg ${primaryText}`}
                          >
                            −
                          </button>

                          <span
                            className={`flex h-full min-w-10 items-center justify-center border-x ${border} text-sm font-black ${primaryText}`}
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseItem(item.cartId)}
                            disabled={item.quantity >= item.maxStock}
                            className={`flex h-full w-10 items-center justify-center text-lg ${primaryText} disabled:text-zinc-700`}
                          >
                            +
                          </button>
                        </div>

                        <p className={`text-sm font-black ${primaryText}`}>
                          {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className={`border-t ${border} p-4 md:p-5`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className={`text-xs uppercase tracking-wide ${secondaryText}`}>
                      Total do pedido
                    </span>
                    <p className={`mt-1 text-xs ${secondaryText}`}>
                      {totalItems} {totalItems === 1 ? "item" : "itens"}
                    </p>
                  </div>

                  <strong className="text-2xl font-black text-cyan-400">
                    {formatMoney(totalPrice)}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutStep("checkout")}
                  className="mt-5 flex min-h-14 w-full items-center justify-center bg-cyan-400 px-5 text-center text-sm font-black uppercase tracking-wide text-black transition hover:bg-cyan-300"
                >
                  Confirmar pedido
                </button>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={closeCart}
                    className={`min-h-11 border ${border} px-3 text-xs font-bold ${primaryText}`}
                  >
                    Continuar comprando
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="min-h-11 border border-red-500/30 px-3 text-xs font-bold text-red-400 transition hover:border-red-400"
                  >
                    Limpar carrinho
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* ETAPA 2 - CHECKOUT */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className={`mb-5 flex items-center gap-2 text-xs font-bold ${secondaryText} transition hover:text-cyan-400`}
                >
                  ← Voltar ao carrinho
                </button>

                <div className={`border ${border} ${softSurface} p-4`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className={`text-xs font-black uppercase tracking-[0.14em] ${primaryText}`}>
                        Finalizar pedido
                      </p>
                      <p className={`mt-1 text-xs ${secondaryText}`}>
                        {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
                      </p>
                    </div>

                    <strong className="text-xl font-black text-cyan-400">
                      {formatMoney(totalPrice)}
                    </strong>
                  </div>
                </div>

                {/* FORMA DE PAGAMENTO */}
                <div className="mt-5">
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${primaryText}`}>
                    Forma de pagamento
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      ["pix", "⚡ Pix"],
                      ["dinheiro", "💵 Dinheiro"],
                      ["debito", "💳 Débito"],
                      ["credito", "💳 Crédito"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            value as "pix" | "dinheiro" | "debito" | "credito"
                          )
                        }
                        className={`min-h-11 border px-3 text-xs font-bold transition ${
                          checkout.paymentMethod === value
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                            : `${border} ${primaryText}`
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {checkout.paymentMethod === "credito" && (
                    <div className="mt-3">
                      <label className={`text-xs ${secondaryText}`}>
                        Parcelamento
                      </label>

                      <select
                        value={checkout.installments}
                        onChange={(event) =>
                          setInstallments(Number(event.target.value))
                        }
                        className={`mt-2 h-11 w-full border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                      >
                        {Array.from({ length: 12 }, (_, index) => index + 1).map(
                          (installment) => (
                            <option key={installment} value={installment}>
                              {installment}x
                            </option>
                          )
                        )}
                      </select>

                      <p className={`mt-2 text-[10px] ${secondaryText}`}>
                        Consulte as condições e valores das parcelas pelo WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* ENTREGA / RETIRADA */}
                <div className="mt-5">
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${primaryText}`}>
                    Como deseja receber?
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("retirada")}
                      className={`min-h-12 border px-3 text-xs font-bold transition ${
                        checkout.deliveryMethod === "retirada"
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                          : `${border} ${primaryText}`
                      }`}
                    >
                      🏪 Retirar
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("entrega")}
                      className={`min-h-12 border px-3 text-xs font-bold transition ${
                        checkout.deliveryMethod === "entrega"
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                          : `${border} ${primaryText}`
                      }`}
                    >
                      🚚 Entrega grátis
                    </button>
                  </div>

                  {checkout.deliveryMethod === "entrega" && (
                    <p className="mt-2 text-[10px] font-bold text-cyan-400">
                      Entrega grátis dentro do perímetro urbano de Cianorte.
                    </p>
                  )}
                </div>

                {/* ENDEREÇO */}
                {checkout.deliveryMethod === "entrega" && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      value={checkout.customerName}
                      onChange={(event) =>
                        updateCheckoutField("customerName", event.target.value)
                      }
                      placeholder="Seu nome *"
                      className={`h-11 w-full border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                    />

                    <div className="grid grid-cols-[1fr_90px] gap-2">
                      <input
                        type="text"
                        value={checkout.street}
                        onChange={(event) =>
                          updateCheckoutField("street", event.target.value)
                        }
                        placeholder="Rua / Avenida *"
                        className={`h-11 min-w-0 border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                      />

                      <input
                        type="text"
                        value={checkout.number}
                        onChange={(event) =>
                          updateCheckoutField("number", event.target.value)
                        }
                        placeholder="Nº *"
                        className={`h-11 min-w-0 border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                      />
                    </div>

                    <input
                      type="text"
                      value={checkout.neighborhood}
                      onChange={(event) =>
                        updateCheckoutField("neighborhood", event.target.value)
                      }
                      placeholder="Bairro *"
                      className={`h-11 w-full border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                    />

                    <input
                      type="text"
                      value={checkout.complement}
                      onChange={(event) =>
                        updateCheckoutField("complement", event.target.value)
                      }
                      placeholder="Complemento (opcional)"
                      className={`h-11 w-full border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                    />

                    <input
                      type="text"
                      value={checkout.reference}
                      onChange={(event) =>
                        updateCheckoutField("reference", event.target.value)
                      }
                      placeholder="Ponto de referência (opcional)"
                      className={`h-11 w-full border ${border} ${softSurface} px-3 text-sm outline-none ${primaryText}`}
                    />
                  </div>
                )}

                {!checkoutReady && (
                  <p className="mt-4 text-center text-[11px] font-bold text-amber-500">
                    {!checkout.paymentMethod
                      ? "Escolha uma forma de pagamento para continuar."
                      : !checkout.deliveryMethod
                        ? "Escolha como deseja receber o pedido."
                        : checkout.deliveryMethod === "entrega"
                          ? "Preencha os campos obrigatórios do endereço para finalizar."
                          : "Revise os dados para finalizar o pedido."}
                  </p>
                )}
              </div>

              <div className={`border-t ${border} p-4 md:p-5`}>
                {checkoutReady ? (
                  <a
                    href={`https://wa.me/5544991373517?text=${cartWhatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-14 w-full items-center justify-center bg-cyan-400 px-5 text-center text-sm font-black uppercase tracking-wide text-black transition hover:bg-cyan-300"
                  >
                    Finalizar pelo WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex min-h-14 w-full cursor-not-allowed items-center justify-center bg-zinc-500/30 px-5 text-center text-sm font-black uppercase tracking-wide text-zinc-500"
                  >
                    Finalizar pelo WhatsApp
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className={`mt-3 min-h-11 w-full border ${border} px-3 text-xs font-bold ${primaryText}`}
                >
                  Voltar ao carrinho
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}