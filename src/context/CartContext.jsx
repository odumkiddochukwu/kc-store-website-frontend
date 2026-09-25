import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";



const CART_STORAGE_KEY = "novatrend-cart";
const SAVED_STORAGE_KEY = "novatrend-saved";

const CartContext = createContext(null);

/* =========================================================
   HELPERS
========================================================= */

function createCartItemId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : fallback;
  } catch {
    return fallback;
  }
}

/*
  Products are considered the same cart item only when:
  - productId is the same
  - selectedColor is the same
  - selectedSize is the same
*/
function isSameVariant(item, product) {
  return (
    item.productId === product.id &&
    item.selectedColor ===
      (product.selectedColor ?? null) &&
    item.selectedSize ===
      (product.selectedSize ?? null)
  );
}

/* =========================================================
   CART PROVIDER
========================================================= */

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    () =>
      loadFromStorage(
        CART_STORAGE_KEY,
        []
      )
  );

  const [savedItems, setSavedItems] = useState(
    () =>
      loadFromStorage(
        SAVED_STORAGE_KEY,
        []
      )
  );

  /* =======================================================
     PERSIST CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch {
      // Ignore localStorage failures.
    }
  }, [cartItems]);

  /* =======================================================
     PERSIST SAVED ITEMS
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(savedItems)
      );
    } catch {
      // Ignore localStorage failures.
    }
  }, [savedItems]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (product, options = {}) => {
    const selectedColor =
      options.selectedColor ??
      product.selectedColor ??
      null;

    const selectedSize =
      options.selectedSize ??
      product.selectedSize ??
      null;

    const quantity = Math.max(
      1,
      Number(options.quantity ?? 1)
    );

    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };

    setCartItems((currentItems) => {
      const existingIndex =
        currentItems.findIndex((item) =>
          isSameVariant(
            item,
            productWithOptions
          )
        );

      /* ---------------------------------------------------
         Existing variant
      --------------------------------------------------- */

      if (existingIndex !== -1) {
        return currentItems.map(
          (item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity +
                      quantity,
                    10
                  ),
                }
              : item
        );
      }

      /* ---------------------------------------------------
         New variant
      --------------------------------------------------- */

      const newCartItem = {
        cartItemId: createCartItemId(),

        productId: product.id,
        slug: product.slug,

        name: product.name,
        category: product.category,

        price: product.price,

        image:
          product.image ??
          product.images?.[0] ??
          "",

        selectedColor,
        selectedSize,

        quantity,

        dealer:
          product.dealer?.name ??
          product.dealer ??
          null,

        availability:
          product.availability ?? true,

        addedAt: new Date().toISOString(),
      };

      return [
        ...currentItems,
        newCartItem,
      ];
    });
  };

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.cartItemId !== cartItemId
      )
    );
  };

  /* =======================================================
     INCREASE QUANTITY
  ======================================================= */

  const increaseQuantity = (
    cartItemId
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                10
              ),
            }
          : item
      )
    );
  };

  /* =======================================================
     DECREASE QUANTITY
  ======================================================= */

  const decreaseQuantity = (
    cartItemId
  ) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (
    cartItemId,
    quantity
  ) => {
    const nextQuantity = Number(
      quantity
    );

    if (
      !Number.isFinite(nextQuantity) ||
      nextQuantity <= 0
    ) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: Math.min(
                Math.floor(nextQuantity),
                10
              ),
            }
          : item
      )
    );
  };

  /* =======================================================
     DUPLICATE ITEM
  ======================================================= */

  const duplicateItem = (
    cartItemId
  ) => {
    setCartItems((currentItems) => {
      const item = currentItems.find(
        (cartItem) =>
          cartItem.cartItemId ===
          cartItemId
      );

      if (!item) {
        return currentItems;
      }

      const duplicatedItem = {
        ...item,
        cartItemId: createCartItemId(),
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      return [
        ...currentItems,
        duplicatedItem,
      ];
    });
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =======================================================
     SAVE FOR LATER
  ======================================================= */

  const saveForLater = (
    cartItemId
  ) => {
    setCartItems((currentItems) => {
      const item = currentItems.find(
        (cartItem) =>
          cartItem.cartItemId ===
          cartItemId
      );

      if (!item) {
        return currentItems;
      }

      setSavedItems((currentSaved) => {
        const alreadySaved =
          currentSaved.some(
            (saved) =>
              saved.productId ===
                item.productId &&
              saved.selectedColor ===
                item.selectedColor &&
              saved.selectedSize ===
                item.selectedSize
          );

        if (alreadySaved) {
          return currentSaved;
        }

        return [
          ...currentSaved,
          {
            ...item,
            savedAt:
              new Date().toISOString(),
          },
        ];
      });

      return currentItems.filter(
        (cartItem) =>
          cartItem.cartItemId !==
          cartItemId
      );
    });
  };

  /* =======================================================
     MOVE SAVED ITEM TO CART
  ======================================================= */

  const moveSavedToCart = (
    savedItemId
  ) => {
    const item = savedItems.find(
      (saved) =>
        saved.cartItemId ===
        savedItemId
    );

    if (!item) {
      return;
    }

    addToCart(
      {
        id: item.productId,
        slug: item.slug,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        dealer: item.dealer,
        availability:
          item.availability,
      },
      {
        selectedColor:
          item.selectedColor,
        selectedSize:
          item.selectedSize,
        quantity: item.quantity,
      }
    );

    setSavedItems((currentItems) =>
      currentItems.filter(
        (saved) =>
          saved.cartItemId !==
          savedItemId
      )
    );
  };

  /* =======================================================
     REMOVE SAVED ITEM
  ======================================================= */

  const removeSavedItem = (
    savedItemId
  ) => {
    setSavedItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.cartItemId !==
          savedItemId
      )
    );
  };

  /* =======================================================
     TOGGLE SAVED PRODUCT
     This is useful for the heart button.
  ======================================================= */

  const isSaved = (productId) => {
    return savedItems.some(
      (item) =>
        item.productId === productId
    );
  };

  const toggleSavedProduct = (
    product
  ) => {
    const existingItem =
      savedItems.find(
        (item) =>
          item.productId === product.id
      );

    if (existingItem) {
      removeSavedItem(
        existingItem.cartItemId
      );

      return false;
    }

    const savedProduct = {
      cartItemId: createCartItemId(),

      productId: product.id,
      slug: product.slug,

      name: product.name,
      category: product.category,

      price: product.price,

      image:
        product.image ??
        product.images?.[0] ??
        "",

      dealer:
        product.dealer?.name ??
        product.dealer ??
        null,

      selectedColor:
        product.selectedColor ??
        null,

      selectedSize:
        product.selectedSize ??
        null,

      quantity: 1,

      savedAt: new Date().toISOString(),
    };

    setSavedItems((currentItems) => [
      ...currentItems,
      savedProduct,
    ]);

    return true;
  };

  /* =======================================================
     CART CALCULATIONS
  ======================================================= */

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );
  }, [cartItems]);

  /*
    Temporary shipping logic.

    Later this should come from the backend
    based on shipping address, dealer,
    product weight, etc.
  */
  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 150000
        ? 0
        : 5000;

  const discount = 0;

  const total =
    subtotal +
    shipping -
    discount;

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    /* State */
    cartItems,
    savedItems,

    /* Cart actions */
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    duplicateItem,
    clearCart,

    /* Saved actions */
    saveForLater,
    moveSavedToCart,
    removeSavedItem,
    isSaved,
    toggleSavedProduct,

    /* Calculations */
    totalItems,
    subtotal,
    shipping,
    discount,
    total,

    /* Useful booleans */
    isCartEmpty:
      cartItems.length === 0,

    hasSavedItems:
      savedItems.length > 0,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* =========================================================
   CUSTOM HOOK
========================================================= */

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}