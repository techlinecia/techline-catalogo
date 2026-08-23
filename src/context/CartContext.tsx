"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  cartId: string;

  slug: string;
  name: string;

  image?: string;

  price: number;

  variation?: string;

  quantity: number;

  maxStock: number;
};

type AddToCartItem = {
  slug: string;
  name: string;
  image?: string;
  price: number;
  variation?: string;
  quantity: number;
  maxStock: number;
};

export type PaymentMethod =
  | "pix"
  | "dinheiro"
  | "debito"
  | "credito";

export type DeliveryMethod =
  | "retirada"
  | "entrega";

export type CheckoutData = {
  paymentMethod: PaymentMethod | null;
  installments: number;

  deliveryMethod: DeliveryMethod | null;

  customerName: string;

  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
};

type CartContextType = {
  items: CartItem[];

  totalItems: number;
  totalPrice: number;

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

  setDeliveryMethod: (
    deliveryMethod: DeliveryMethod
  ) => void;

  updateCheckoutField: (
    field:
      | "customerName"
      | "street"
      | "number"
      | "neighborhood"
      | "complement"
      | "reference",
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

const defaultCheckout: CheckoutData = {
  paymentMethod: null,
  installments: 1,

  deliveryMethod: null,

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
          setItems(parsedCart);
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
          setCheckout({
            ...defaultCheckout,
            ...parsedCheckout,
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
   * SALVA O CARRINHO
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
   * SALVA DADOS DE FINALIZAÇÃO
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
   * ADICIONAR PRODUTO
   */
  const addItem = (
    item: AddToCartItem
  ) => {
    const cartId = `${item.slug}-${
      item.variation || "default"
    }`;

    setItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (cartItem) =>
            cartItem.cartId === cartId
        );

      if (existingItem) {
        return currentItems.map(
          (cartItem) => {
            if (
              cartItem.cartId !==
              cartId
            ) {
              return cartItem;
            }

            const newQuantity =
              Math.min(
                cartItem.quantity +
                  item.quantity,
                item.maxStock
              );

            return {
              ...cartItem,
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
   * REMOVER PRODUTO
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
          item.quantity >=
          item.maxStock
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
            item.cartId !==
            cartId
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
   * ABRIR / FECHAR
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

      /*
       * Se não for crédito,
       * volta para 1x.
       */
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
   * ENTREGA / RETIRADA
   */
  const setDeliveryMethod = (
    deliveryMethod: DeliveryMethod
  ) => {
    setCheckout((current) => ({
      ...current,
      deliveryMethod,
    }));
  };

  /*
   * CAMPOS DO ENDEREÇO
   */
  const updateCheckoutField = (
    field:
      | "customerName"
      | "street"
      | "number"
      | "neighborhood"
      | "complement"
      | "reference",
    value: string
  ) => {
    setCheckout((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
   * LIMPAR DADOS DE FINALIZAÇÃO
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
   * TOTAL DE ITENS
   */
  const totalItems = useMemo(
    () => {
      return items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );
    },
    [items]
  );

  /*
   * VALOR TOTAL
   */
  const totalPrice = useMemo(
    () => {
      return items.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      );
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,

        totalItems,

        totalPrice,

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

        setDeliveryMethod,

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