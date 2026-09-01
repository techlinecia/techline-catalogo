"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItemType = "product" | "service";

export type CartItem = {
  cartId: string;

  type: CartItemType;

  slug: string;
  name: string;

  image?: string;

  price: number;

  /*
   * PRODUTO
   */
  variation?: string;
  quantity: number;
  maxStock?: number;

  /*
   * SERVIÇO
   */
  serviceType?: string;
};

export type AddProductToCartItem = {
  type?: "product";

  slug: string;
  name: string;

  image?: string;

  price: number;

  variation?: string;

  quantity: number;
  maxStock: number;
};

export type AddServiceToCartItem = {
  type: "service";

  slug: string;
  name: string;

  image?: string;

  price: number;

  serviceType?: string;
};

export type AddToCartItem =
  | AddProductToCartItem
  | AddServiceToCartItem;

export type PaymentMethod =
  | "pix"
  | "dinheiro"
  | "debito"
  | "credito";

/*
 * PRODUTOS
 *
 * entrega = entrega grátis
 * retirada = retirada na TECH LINE
 */
export type ProductDeliveryMethod =
  | "retirada"
  | "entrega";

/*
 * SERVIÇOS
 *
 * levar = cliente leva o PC
 * buscar = TECH LINE busca e devolve
 */
export type ServiceDeliveryMethod =
  | "levar"
  | "buscar";

export type CheckoutData = {
  paymentMethod: PaymentMethod | null;

  installments: number;

  productDeliveryMethod:
    | ProductDeliveryMethod
    | null;

  serviceDeliveryMethod:
    | ServiceDeliveryMethod
    | null;

  customerName: string;

  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
};

type CheckoutField =
  | "customerName"
  | "street"
  | "number"
  | "neighborhood"
  | "complement"
  | "reference";

type CartContextType = {
  items: CartItem[];

  productItems: CartItem[];
  serviceItems: CartItem[];

  hasProducts: boolean;
  hasServices: boolean;

  totalItems: number;

  /*
   * Soma somente produtos + serviços.
   */
  totalPrice: number;

  /*
   * Taxa da busca + devolução.
   */
  serviceTransportFee: number;

  /*
   * Itens + taxa.
   */
  finalTotal: number;

  isCartOpen: boolean;

  checkout: CheckoutData;

  addItem: (item: AddToCartItem) => void;

  removeItem: (cartId: string) => void;

  increaseItem: (cartId: string) => void;

  decreaseItem: (cartId: string) => void;

  clearCart: () => void;

  openCart: () => void;

  closeCart: () => void;

  toggleCart: () => void;

  setPaymentMethod: (
    paymentMethod: PaymentMethod
  ) => void;

  setInstallments: (
    installments: number
  ) => void;

  setProductDeliveryMethod: (
    method: ProductDeliveryMethod
  ) => void;

  setServiceDeliveryMethod: (
    method: ServiceDeliveryMethod
  ) => void;

  updateCheckoutField: (
    field: CheckoutField,
    value: string
  ) => void;

  resetCheckout: () => void;
};

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

const CART_STORAGE_KEY = "techline-cart";

const CHECKOUT_STORAGE_KEY =
  "techline-checkout";

/*
 * TAXA DO SERVIÇO
 *
 * Buscar o computador no endereço
 * + devolver depois do serviço.
 */
const SERVICE_TRANSPORT_FEE = 10;

const defaultCheckout: CheckoutData = {
  paymentMethod: null,

  installments: 1,

  productDeliveryMethod: null,

  serviceDeliveryMethod: null,

  customerName: "",

  street: "",
  number: "",
  neighborhood: "",
  complement: "",
  reference: "",
};

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<
    CartItem[]
  >([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [checkout, setCheckout] =
    useState<CheckoutData>(
      defaultCheckout
    );

  const [loaded, setLoaded] =
    useState(false);

  /*
   * CARREGA CARRINHO + CHECKOUT
   */
  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(
          CART_STORAGE_KEY
        );

      if (savedCart) {
        const parsedCart =
          JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          /*
           * Compatibilidade com o carrinho
           * antigo.
           *
           * Produtos antigos não possuem
           * "type", então viram product.
           */
          const normalizedCart =
            parsedCart.map((item) => ({
              ...item,

              type:
                item.type === "service"
                  ? "service"
                  : "product",
            }));

          setItems(normalizedCart);
        }
      }

      const savedCheckout =
        localStorage.getItem(
          CHECKOUT_STORAGE_KEY
        );

      if (savedCheckout) {
        const parsedCheckout =
          JSON.parse(savedCheckout);

        if (
          parsedCheckout &&
          typeof parsedCheckout ===
            "object"
        ) {
          /*
           * Compatibilidade com o checkout
           * antigo.
           */
          setCheckout({
            ...defaultCheckout,

            ...parsedCheckout,

            productDeliveryMethod:
              parsedCheckout
                .productDeliveryMethod ??
              parsedCheckout
                .deliveryMethod ??
              null,

            serviceDeliveryMethod:
              parsedCheckout
                .serviceDeliveryMethod ??
              null,
          });
        }
      }
    } catch (error) {
      console.error(
        "Erro ao carregar carrinho:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  /*
   * SALVA CARRINHO
   */
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Erro ao salvar carrinho:",
        error
      );
    }
  }, [items, loaded]);

  /*
   * SALVA CHECKOUT
   */
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        CHECKOUT_STORAGE_KEY,
        JSON.stringify(checkout)
      );
    } catch (error) {
      console.error(
        "Erro ao salvar checkout:",
        error
      );
    }
  }, [checkout, loaded]);

  /*
   * ADICIONAR ITEM
   */
  const addItem = (
    item: AddToCartItem
  ) => {
    /*
     * SERVIÇO
     */
    if (item.type === "service") {
      const cartId = `service-${
        item.slug
      }-${
        item.serviceType ||
        "default"
      }`;

      setItems((currentItems) => {
        const existingService =
          currentItems.find(
            (cartItem) =>
              cartItem.cartId ===
              cartId
          );

        /*
         * Não duplica o mesmo serviço.
         */
        if (existingService) {
          return currentItems;
        }

        return [
          ...currentItems,
          {
            cartId,

            type: "service",

            slug: item.slug,

            name: item.name,

            image: item.image,

            price: item.price,

            serviceType:
              item.serviceType,

            quantity: 1,
          },
        ];
      });

      setIsCartOpen(true);

      return;
    }

    /*
     * PRODUTO
     *
     * Mantém compatibilidade com os
     * ProductModal atuais, mesmo que eles
     * ainda não enviem type: "product".
     */
    const cartId = `product-${
      item.slug
    }-${
      item.variation || "default"
    }`;

    setItems((currentItems) => {
      /*
       * Procura também pelo ID antigo
       * para não duplicar produtos que já
       * estavam salvos no navegador.
       */
      const oldCartId = `${
        item.slug
      }-${
        item.variation || "default"
      }`;

      const existingItem =
        currentItems.find(
          (cartItem) =>
            cartItem.cartId ===
              cartId ||
            cartItem.cartId ===
              oldCartId
        );

      if (existingItem) {
        return currentItems.map(
          (cartItem) => {
            if (
              cartItem.cartId !==
                existingItem.cartId
            ) {
              return cartItem;
            }

            const currentQuantity =
              cartItem.quantity || 1;

            const newQuantity =
              Math.min(
                currentQuantity +
                  item.quantity,
                item.maxStock
              );

            return {
              ...cartItem,

              cartId,

              type: "product",

              quantity: newQuantity,

              maxStock:
                item.maxStock,
            };
          }
        );
      }

      return [
        ...currentItems,
        {
          ...item,

          cartId,

          type: "product",

          quantity: Math.min(
            item.quantity,
            item.maxStock
          ),
        },
      ];
    });

    setIsCartOpen(true);
  };

  /*
   * REMOVER ITEM
   */
  const removeItem = (
    cartId: string
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.cartId !== cartId
      )
    );
  };

  /*
   * AUMENTAR QUANTIDADE
   *
   * Só produto possui quantidade.
   */
  const increaseItem = (
    cartId: string
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (
          item.cartId !== cartId
        ) {
          return item;
        }

        if (
          item.type === "service"
        ) {
          return item;
        }

        const maxStock =
          item.maxStock ?? 1;

        if (
          item.quantity >= maxStock
        ) {
          return item;
        }

        return {
          ...item,

          quantity:
            item.quantity + 1,
        };
      })
    );
  };

  /*
   * DIMINUIR QUANTIDADE
   */
  const decreaseItem = (
    cartId: string
  ) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (
            item.cartId !== cartId
          ) {
            return item;
          }

          /*
           * Serviço não usa controle
           * de quantidade.
           */
          if (
            item.type === "service"
          ) {
            return item;
          }

          return {
            ...item,

            quantity:
              item.quantity - 1,
          };
        })
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  /*
   * LIMPAR CARRINHO
   */
  const clearCart = () => {
    setItems([]);
  };

  /*
   * ABRIR / FECHAR CARRINHO
   */
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(
      (current) => !current
    );
  };

  /*
   * PAGAMENTO
   */
  const setPaymentMethod = (
    paymentMethod: PaymentMethod
  ) => {
    setCheckout((current) => ({
      ...current,

      paymentMethod,

      installments:
        paymentMethod === "credito"
          ? current.installments
          : 1,
    }));
  };

  const setInstallments = (
    installments: number
  ) => {
    const safeInstallments =
      Math.min(
        12,
        Math.max(1, installments)
      );

    setCheckout((current) => ({
      ...current,

      installments:
        safeInstallments,
    }));
  };

  /*
   * ENTREGA DE PRODUTO
   */
  const setProductDeliveryMethod = (
    method: ProductDeliveryMethod
  ) => {
    setCheckout((current) => ({
      ...current,

      productDeliveryMethod:
        method,
    }));
  };

  /*
   * TRANSPORTE DE SERVIÇO
   */
  const setServiceDeliveryMethod = (
    method: ServiceDeliveryMethod
  ) => {
    setCheckout((current) => ({
      ...current,

      serviceDeliveryMethod:
        method,
    }));
  };

  /*
   * DADOS DO CLIENTE / ENDEREÇO
   */
  const updateCheckoutField = (
    field: CheckoutField,
    value: string
  ) => {
    setCheckout((current) => ({
      ...current,

      [field]: value,
    }));
  };

  /*
   * LIMPAR CHECKOUT
   */
  const resetCheckout = () => {
    setCheckout(defaultCheckout);

    try {
      localStorage.removeItem(
        CHECKOUT_STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Erro ao limpar checkout:",
        error
      );
    }
  };

  /*
   * PRODUTOS
   */
  const productItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.type === "product"
      ),
    [items]
  );

  /*
   * SERVIÇOS
   */
  const serviceItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.type === "service"
      ),
    [items]
  );

  const hasProducts =
    productItems.length > 0;

  const hasServices =
    serviceItems.length > 0;

  /*
   * TOTAL DE ITENS
   *
   * Produto conta quantidade.
   * Serviço conta como 1.
   */
  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => {
          if (
            item.type ===
            "service"
          ) {
            return total + 1;
          }

          return (
            total +
            item.quantity
          );
        },
        0
      ),
    [items]
  );

  /*
   * SUBTOTAL DOS ITENS
   */
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.price *
            (item.type ===
            "service"
              ? 1
              : item.quantity),
        0
      ),
    [items]
  );

  /*
   * TAXA DE BUSCA + DEVOLUÇÃO
   *
   * Só existe quando:
   * - há serviço no carrinho
   * - cliente escolheu buscar
   */
  const serviceTransportFee =
    hasServices &&
    checkout.serviceDeliveryMethod ===
      "buscar"
      ? SERVICE_TRANSPORT_FEE
      : 0;

  /*
   * TOTAL FINAL
   */
  const finalTotal =
    totalPrice +
    serviceTransportFee;

  return (
    <CartContext.Provider
      value={{
        items,

        productItems,

        serviceItems,

        hasProducts,

        hasServices,

        totalItems,

        totalPrice,

        serviceTransportFee,

        finalTotal,

        isCartOpen,

        checkout,

        addItem,

        removeItem,

        increaseItem,

        decreaseItem,

        clearCart,

        openCart,

        closeCart,

        toggleCart,

        setPaymentMethod,

        setInstallments,

        setProductDeliveryMethod,

        setServiceDeliveryMethod,

        updateCheckoutField,

        resetCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart precisa ser usado dentro de CartProvider"
    );
  }

  return context;
}