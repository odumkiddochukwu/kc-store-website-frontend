import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

function toSafeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(toSafeNumber(price));
}

function buildOrderMessage(
  cartItems,
  subtotal,
  shipping,
  discount,
  total
) {
  const firstItem = cartItems[0];

  const openingLine =
    cartItems.length === 1
      ? `Hello, I want to buy ${toSafeNumber(firstItem.quantity)} ${toSafeNumber(firstItem.quantity) === 1 ? "piece" : "pieces"} of ${firstItem.selectedColor ? `${firstItem.selectedColor} ` : ""}${firstItem.name} from your store.`
      : "Hello, I want to buy these products from your store.";

  const itemLines = cartItems
    .map((item) => {
      const quantity = toSafeNumber(item.quantity);
      const price = toSafeNumber(item.price);
      const itemTotal = price * quantity;

      const variant = [
        item.selectedColor
          ? `Color: ${item.selectedColor}`
          : "",
        item.selectedSize
          ? `Size: ${item.selectedSize}`
          : "",
      ]
        .filter(Boolean)
        .join(", ");

      return `• ${quantity} ${quantity === 1 ? "piece" : "pieces"} of ${item.name}${variant ? ` (${variant})` : ""} — ${formatPrice(itemTotal)}`;
    })
    .join("\n");

  const safeShipping = toSafeNumber(shipping);
  const safeDiscount = toSafeNumber(discount);
  const safeSubtotal = toSafeNumber(subtotal);
  const safeTotal = toSafeNumber(total);

  const shippingLine =
    safeShipping === 0
      ? "Free"
      : formatPrice(safeShipping);

  const discountLine =
    safeDiscount > 0
      ? `-${formatPrice(safeDiscount)}`
      : formatPrice(0);

  return `${openingLine}\n\nOrder summary:\n${itemLines}\n\nSubtotal: ${formatPrice(safeSubtotal)}\nShipping: ${shippingLine}\nDiscount: ${discountLine}\nTOTAL PRICE: ${formatPrice(safeTotal)}\n\nPlease send me the payment instructions and confirm the delivery details.\n\nSent from the KC Store website.`;
}

/* =========================================================
   ICON COMPONENT
========================================================= */

const Icon = ({
  name,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className,
  };

  const icons = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    heart: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    ),

    bag: (
      <>
        <path d="M6 8h12l1 13H5L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </>
    ),

    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),

    arrowDown: (
      <>
        <path d="m6 9 6 6 6-6" />
      </>
    ),

    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),

    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),

    refresh: (
      <>
        <path d="M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16" />
        <path d="M20 20v-4h-4" />
      </>
    ),

    headset: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4Z" />
        <path d="M20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" />
      </>
    ),

    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),

    chevronLeft: <path d="m15 18-6-6 6-6" />,

    chevronRight: <path d="m9 18 6-6-6-6" />,

    check: <path d="m5 12 4 4L19 6" />,

    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    minus: (
      <path d="M5 12h14" />
    ),

    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 10v6" />
        <path d="M14 10v6" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3 20 7v5c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V7l8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   CART ITEM
========================================================= */

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onDuplicate,
  onRemove,
  onSaveForLater,
}) {
  const quantity = toSafeNumber(item.quantity);
  const price = toSafeNumber(item.price);
  const itemTotal = price * quantity;

  return (
    <article className="border-b border-black/[0.08] py-6 first:pt-0">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr_auto]">

        {/* Product image */}

        <Link
          to={`/product/${item.slug}`}
          className="block aspect-square overflow-hidden rounded-xl bg-[#f5f5f3]"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </Link>

        {/* Product details */}

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4 sm:block">

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#808080]">
                {item.category}
              </p>

              <Link
                to={`/product/${item.slug}`}
                className="mt-1 block text-[16px] font-medium leading-6 hover:opacity-60"
              >
                {item.name}
              </Link>
            </div>

            {/* Mobile price */}

            <div className="text-right sm:hidden">
              <p className="text-[15px] font-semibold">
                {formatPrice(itemTotal)}
              </p>
            </div>

          </div>

          <p className="mt-2 text-[11px] text-[#808080]">
            Sold by {item.dealer}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#63666A]">

            {item.selectedColor && (
              <span>
                Color:{" "}
                <strong className="font-medium text-black">
                  {item.selectedColor}
                </strong>
              </span>
            )}

            {item.selectedSize && (
              <span>
                Size:{" "}
                <strong className="font-medium text-black">
                  {item.selectedSize}
                </strong>
              </span>
            )}

          </div>

          {/* Stock */}

          <div className="mt-3 flex items-center gap-1.5">

            <span className="h-1.5 w-1.5 rounded-full bg-black" />

            <span className="text-[10px] text-[#63666A]">
              {item.availability
                ? "In stock"
                : "Currently unavailable"}
            </span>

          </div>

          {/* Actions */}

          <div className="mt-5 flex flex-wrap items-center gap-4">

            {/* Quantity */}

            <div className="flex h-9 items-center rounded-lg border border-black/10">

              <button
                type="button"
                onClick={() =>
                  onDecrease(item.cartItemId)
                }
                aria-label={`Decrease quantity of ${item.name}`}
                className="flex h-full w-9 items-center justify-center text-[#63666A] hover:text-black"
              >
                <Icon
                  name="minus"
                  size={13}
                />
              </button>

              <span className="flex min-w-8 items-center justify-center text-[11px] font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  onIncrease(item.cartItemId)
                }
                aria-label={`Increase quantity of ${item.name}`}
                className="flex h-full w-9 items-center justify-center text-[#63666A] hover:text-black"
              >
                <Icon
                  name="plus"
                  size={13}
                />
              </button>

            </div>

            <span className="h-4 w-px bg-black/10" />

            {/* Duplicate */}

            <button
              type="button"
              onClick={() =>
                onDuplicate(item.cartItemId)
              }
              className="text-[10px] font-medium text-[#63666A] transition hover:text-black"
            >
              Duplicate
            </button>

            {/* Save */}

            <button
              type="button"
              onClick={() =>
                onSaveForLater(item.cartItemId)
              }
              className="text-[10px] font-medium text-[#63666A] transition hover:text-black"
            >
              Save for later
            </button>

            {/* Remove */}

            <button
              type="button"
              onClick={() =>
                onRemove(item.cartItemId)
              }
              className="flex items-center gap-1 text-[10px] font-medium text-[#63666A] transition hover:text-black"
            >
              <Icon
                name="trash"
                size={13}
              />
              Remove
            </button>

          </div>
        </div>

        {/* Desktop total */}

        <div className="hidden text-right sm:block">

          <p className="text-[15px] font-semibold">
            {formatPrice(itemTotal)}
          </p>

          {quantity > 1 && (
            <p className="mt-1 text-[10px] text-[#808080]">
              {formatPrice(price)} each
            </p>
          )}

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   SAVED FOR LATER ITEM
========================================================= */

function SavedItem({
  item,
  onMoveToCart,
  onRemove,
}) {
  return (
    <article className="flex gap-4 border-b border-black/[0.07] py-5">

      <Link
        to={`/product/${item.slug}`}
        className="h-[82px] w-[70px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f3]"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[12px] font-medium">
          {item.name}
        </p>

        <p className="mt-1 text-[10px] text-[#808080]">
          {formatPrice(item.price)}
        </p>

        <div className="mt-3 flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              onMoveToCart(item)
            }
            className="text-[10px] font-medium underline underline-offset-2"
          >
            Move to cart
          </button>

          <button
            type="button"
            onClick={() =>
              onRemove(item.cartItemId)
            }
            className="text-[10px] text-[#808080] hover:text-black"
          >
            Remove
          </button>

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   EMPTY CART
========================================================= */

function EmptyCart() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center px-5">

      <div className="max-w-[480px] text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f5f3]">
          <Icon
            name="bag"
            size={31}
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#808080]">
          Your shopping bag
        </p>

        <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em]">
          Your cart is empty
        </h1>

        <p className="mt-3 text-[13px] leading-6 text-[#808080]">
          Looks like you haven't added anything
          to your cart yet. Discover our latest
          collections and find something you'll
          love.
        </p>

        <Link
          to="/shop"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3.5 text-[12px] font-medium text-white"
        >
          Continue Shopping

          <Icon
            name="arrowRight"
            size={15}
          />
        </Link>

      </div>
    </div>
  );
}

/* =========================================================
   CART PAGE
========================================================= */

export default function Cart() {
  const {
    cartItems,
    savedItems,

    increaseQuantity,
    decreaseQuantity,
    duplicateItem,
    removeFromCart,
    saveForLater,

    moveSavedToCart,
    removeSavedItem,

    clearCart,

    totalItems,
    subtotal,
    shipping,
    discount,
    total,
  } = useCart();

  /* =======================================================
     UI STATE
     Cart data itself is managed by CartContext.
  ======================================================= */

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [isOpeningWhatsApp, setIsOpeningWhatsApp] =
    useState(false);

  const [categoryMenuOpen, setCategoryMenuOpen] =
    useState(false);

  const [
    mobileCategoriesOpen,
    setMobileCategoriesOpen,
  ] = useState(false);

  /* =======================================================
     SAFE CART TOTALS
  ======================================================= */

  const safeCartItems = Array.isArray(cartItems)
    ? cartItems
    : [];

  const calculatedSubtotal =
    safeCartItems.reduce(
      (sum, item) => {
        const price = toSafeNumber(item.price);
        const quantity =
          toSafeNumber(item.quantity);

        return sum + price * quantity;
      },
      0
    );

  const safeSubtotal = Number.isFinite(
    Number(subtotal)
  )
    ? Number(subtotal)
    : calculatedSubtotal;

  const safeShipping = Number.isFinite(
    Number(shipping)
  )
    ? Number(shipping)
    : 0;

  const safeDiscount = Number.isFinite(
    Number(discount)
  )
    ? Number(discount)
    : 0;

  const calculatedTotal =
    safeSubtotal +
    safeShipping -
    safeDiscount;

  const safeTotal = Number.isFinite(
    Number(total)
  )
    ? Number(total)
    : calculatedTotal;

  /* =======================================================
     TOAST
  ======================================================= */

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast("");
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast]);

  /* =======================================================
     CART ACTIONS
     Cart mutations are delegated to CartContext so every
     page sees the same cart state and totals.
  ======================================================= */

  const handleDuplicate = (cartItemId) => {
    duplicateItem(cartItemId);
    setToast("Item duplicated");
  };

  const handleRemove = (cartItemId) => {
    const item = safeCartItems.find(
      (cartItem) =>
        cartItem.cartItemId === cartItemId
    );

    removeFromCart(cartItemId);

    if (item) {
      setToast(
        `${item.name} removed from cart`
      );
    }
  };

  const handleSaveForLater = (cartItemId) => {
    saveForLater(cartItemId);
    setToast("Item saved for later");
  };

  const handleMoveToCart = (item) => {
    moveSavedToCart(item.cartItemId);
    setToast("Item moved to cart");
  };

  const handleRemoveSaved = (cartItemId) => {
    removeSavedItem(cartItemId);
  };

  const handleClearCart = () => {
    clearCart();
    setToast("Cart cleared");
  };

  /* =======================================================
     WHATSAPP ORDER MESSAGE
     No customer account or checkout page is required.
     The cart summary is placed directly into WhatsApp.
  ======================================================= */

  const handleMakePayment = () => {
    if (
      isOpeningWhatsApp ||
      safeCartItems.length === 0
    ) {
      return;
    }

    const whatsappNumber = (
      import.meta.env.VITE_WHATSAPP_NUMBER ||
      "YOUR_WHATSAPP_NUMBER"
    ).replace(/\D/g, "");

    if (!whatsappNumber) {
      setToast(
        "Add VITE_WHATSAPP_NUMBER to your .env file first."
      );
      return;
    }

    setIsOpeningWhatsApp(true);

    const orderMessage = buildOrderMessage(
      safeCartItems,
      safeSubtotal,
      safeShipping,
      safeDiscount,
      safeTotal
    );

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}` +
      `?text=${encodeURIComponent(
        orderMessage
      )}`;

    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      setToast(
        "WhatsApp could not be opened. Please allow pop-ups and try again."
      );
      setIsOpeningWhatsApp(false);
      return;
    }

    clearCart();
    setToast(
      "Your order details are ready in WhatsApp"
    );

    window.setTimeout(() => {
      setIsOpeningWhatsApp(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">

          {/* Logo */}

          <a
            href="/"
            className="text-[22px] font-semibold tracking-[-0.05em]"
          >
            KC{" "}
            <span className="text-[#63666A]">
              Store
            </span>
          </a>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-7 lg:flex">

            <a
              href="/"
              className="relative py-2 text-[13px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
            >
              Home
            </a>

            <a
              href="/shop"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Shop
            </a>

            <a
              href="/new-arrivals"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              New Arrivals
            </a>

            <a
              href="/best-sellers"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Best Sellers
            </a>

            {/* =================================================
                CATEGORIES DROPDOWN
            ================================================== */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setCategoryMenuOpen(
                    (current) =>
                      !current
                  )
                }
                aria-haspopup="menu"
                aria-expanded={
                  categoryMenuOpen
                }
                className="flex items-center gap-1 py-2 text-[13px] text-[#63666A] transition hover:text-black"
              >
                Categories

                <Icon
                  name="arrowDown"
                  size={13}
                />
              </button>

              {categoryMenuOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[245px] -translate-x-1/2 pt-3">

                  <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl">

                    <div className="border-b border-black/[0.07] px-5 py-4">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                        Shop Categories
                      </p>

                    </div>

                    <div className="py-2">

                      <Link
                        to="/categories/womens-bags"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Women's Bags
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                      <Link
                        to="/categories/watches"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Watches
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                      <Link
                        to="/categories/clothing"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Clothing
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                      <Link
                        to="/categories/shoes"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Shoes
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                      <Link
                        to="/categories/jewelry"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Jewelry
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                      <Link
                        to="/categories/accessories"
                        onClick={() =>
                          setCategoryMenuOpen(false)
                        }
                        className="flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6]"
                      >
                        <span>
                          Accessories
                        </span>

                        <Icon
                          name="arrowRight"
                          size={14}
                          strokeWidth={1.5}
                        />
                      </Link>

                    </div>
                  </div>
                </div>
              )}

            </div>

            <a
              href="/about"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              About
            </a>

            <a
              href="/contact"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Contact
            </a>

          </nav>

          {/* Header actions */}

          <div className="flex items-center gap-1">

            <Link
              to="/search"
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
            >
              <Icon
                name="search"
                size={20}
              />
            </Link>

            {/* =================================================
                SHARED CART COUNT FROM CART CONTEXT
            ================================================= */}

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
            >
              <Icon
                name="bag"
                size={20}
              />

              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] lg:hidden"
            >
              <Icon
                name="menu"
                size={22}
              />
            </button>

          </div>
        </div>

        {/* Search panel */}

        {searchOpen && (
          <div className="border-t border-black/[0.06] bg-white">

            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-7 lg:px-10">

              <div className="relative">

                <Icon
                  name="search"
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />

                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search bags, watches, clothing..."
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f6] py-4 pl-12 pr-12 text-sm outline-none transition placeholder:text-[#808080] focus:border-black"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] hover:text-black"
                >
                  <Icon
                    name="close"
                    size={18}
                  />
                </button>

              </div>
            </div>
          </div>
        )}

      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />

          <div className="absolute right-0 top-0 h-full w-[88%] max-w-[380px] overflow-y-auto bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <Link
                to="/"
                className="text-[22px] font-semibold tracking-[-0.05em]"
              >
                KC{" "}
                <span className="text-[#63666A]">
                  Store
                </span>
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]"
              >
                <Icon
                  name="close"
                  size={20}
                />
              </button>

            </div>

            <nav className="mt-12 flex flex-col">

              <Link
                to="/"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Shop
              </Link>

              <Link
                to="/new-arrivals"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                New Arrivals
              </Link>

              <Link
                to="/best-sellers"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Best Sellers
              </Link>

              {/* MOBILE CATEGORIES */}

              <div className="border-b border-black/[0.07]">

                <button
                  type="button"
                  onClick={() =>
                    setMobileCategoriesOpen(
                      (current) =>
                        !current
                    )
                  }
                  aria-haspopup="menu"
                  aria-expanded={
                    mobileCategoriesOpen
                  }
                  className="flex w-full items-center justify-between py-5 text-left text-[17px] font-medium"
                >
                  <span>
                    Categories
                  </span>

                  <Icon
                    name="arrowDown"
                    size={16}
                  />
                </button>

                {mobileCategoriesOpen && (
                  <div className="pb-3 pl-3">

                    <Link
                      to="/categories/womens-bags"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Women's Bags

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/watches"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Watches

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/clothing"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Clothing

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/shoes"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Shoes

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/jewelry"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Jewelry

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/accessories"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                    >
                      Accessories

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                  </div>
                )}

              </div>

              <Link
                to="/about"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                About
              </Link>

              <Link
                to="/track-order"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Track Order
              </Link>

              <Link
                to="/contact"
                className="border-b border-black/[0.07] py-5 text-[17px] font-medium"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Contact
              </Link>

            </nav>
          </div>
        </div>
      )}

      {/* =====================================================
          PAGE
      ====================================================== */}

      {safeCartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <main>

          {/* =================================================
              CART HEADER
          ================================================== */}

          <section className="px-5 pb-8 pt-8 sm:px-7 sm:pt-10 lg:px-10">

            <div className="mx-auto max-w-[1440px]">

              {/* Breadcrumb */}

              <div className="flex items-center gap-2 text-[10px] text-[#808080]">

                <Link
                  to="/"
                  className="hover:text-black"
                >
                  Home
                </Link>

                <span>/</span>

                <span className="text-black">
                  Cart
                </span>

              </div>

              {/* Heading */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                    Shopping Bag
                  </p>

                  <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.055em] sm:text-[50px]">
                    Your Cart
                  </h1>

                </div>

                <p className="text-[12px] text-[#808080]">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}
                </p>

              </div>

            </div>
          </section>

          {/* =================================================
              CART CONTENT
          ================================================== */}

          <section className="px-5 pb-16 sm:px-7 lg:px-10 lg:pb-20">

            <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_390px] xl:gap-12">

              {/* =================================================
                  LEFT
              ================================================== */}

              <div className="min-w-0">

                {/* Cart heading */}

                <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">

                  <div>

                    <h2 className="text-[14px] font-semibold">
                      Items in your cart
                    </h2>

                    <p className="mt-1 text-[10px] text-[#808080]">
                      Review your items before
                      sending the order to our store.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-[10px] font-medium text-[#63666A] underline underline-offset-2 hover:text-black"
                  >
                    Clear Cart
                  </button>

                </div>

                {/* Cart items */}

                <div className="mt-1">

                  {safeCartItems.map(
                    (item) => (
                      <CartItem
                        key={
                          item.cartItemId
                        }
                        item={item}
                        onIncrease={
                          increaseQuantity
                        }
                        onDecrease={
                          decreaseQuantity
                        }
                        onDuplicate={
                          handleDuplicate
                        }
                        onRemove={
                          handleRemove
                        }
                        onSaveForLater={
                          handleSaveForLater
                        }
                      />
                    )
                  )}

                </div>

                {/* Continue shopping */}

                <div className="mt-7">

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[11px] font-medium"
                  >
                    <Icon
                      name="arrowLeft"
                      size={14}
                    />
                    Continue Shopping
                  </Link>

                </div>

                {/* Saved for later */}

                {savedItems.length > 0 && (
                  <div className="mt-14 border-t border-black/[0.08] pt-8">

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                        Saved
                      </p>

                      <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em]">
                        Saved for Later
                      </h2>

                    </div>

                    <div className="mt-6">

                      {savedItems.map(
                        (item) => (
                          <SavedItem
                            key={
                              item.cartItemId
                            }
                            item={item}
                            onMoveToCart={
                              handleMoveToCart
                            }
                            onRemove={
                              handleRemoveSaved
                            }
                          />
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* =================================================
                  RIGHT - ORDER SUMMARY
              ================================================== */}

              <aside>

                <div className="sticky top-[105px] rounded-2xl bg-[#f7f7f6] p-5 sm:p-7">

                  <h2 className="text-[17px] font-semibold tracking-[-0.02em]">
                    Order Summary
                  </h2>

                  {/* Items */}

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center justify-between text-[12px]">

                      <span className="text-[#63666A]">
                        Subtotal
                      </span>

                      <span className="font-medium">
                        {formatPrice(
                          safeSubtotal
                        )}
                      </span>

                    </div>

                    <div className="flex items-center justify-between text-[12px]">

                      <span className="text-[#63666A]">
                        Shipping
                      </span>

                      <span className="font-medium">
                        {safeShipping === 0
                          ? "Free"
                          : formatPrice(
                              safeShipping
                            )}
                      </span>

                    </div>

                    {safeDiscount > 0 && (
                      <div className="flex items-center justify-between text-[12px]">

                        <span className="text-[#63666A]">
                          Discount
                        </span>

                        <span className="font-medium">
                          -
                          {formatPrice(
                            safeDiscount
                          )}
                        </span>

                      </div>
                    )}

                  </div>

                  <div className="my-6 border-t border-black/10" />

                  {/* Total */}

                  <div className="flex items-end justify-between gap-4">

                    <div>

                      <p className="text-[13px] font-medium">
                        Total
                      </p>

                      <p className="mt-1 text-[10px] text-[#808080]">
                        Final payment details are confirmed in chat.
                      </p>

                    </div>

                    <p className="text-[24px] font-semibold tracking-[-0.03em]">
                      {formatPrice(
                        safeTotal
                      )}
                    </p>

                  </div>

                  {/* Make Payment / Start Order Chat */}

                  <button
                    type="button"
                    onClick={handleMakePayment}
                    disabled={
                      isOpeningWhatsApp
                    }
                    className="mt-7 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-black text-[13px] font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isOpeningWhatsApp ? (
                      "Opening WhatsApp..."
                    ) : (
                      <>
                        Make Payment

                        <Icon
                          name="arrowRight"
                          size={16}
                        />
                      </>
                    )}

                  </button>

                  {/* Payment note */}

                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-white p-4">

                    <Icon
                      name="shield"
                      size={17}
                      className="shrink-0 text-[#63666A]"
                    />

                    <p className="text-[10px] leading-5 text-[#808080]">
                      Click to complete your order payment
                    </p>

                  </div>

                  {/* Shipping benefit */}

                  <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-4">

                    <Icon
                      name="truck"
                      size={17}
                      className="shrink-0 text-[#63666A]"
                    />

                    <div>

                      <p className="text-[11px] font-medium">
                        Fast Delivery
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-[#808080]">
                        Delivery details can be
                        confirmed with the store in chat.
                      </p>

                    </div>

                  </div>

                </div>

              </aside>

            </div>

          </section>

          {/* =================================================
              TRUST SECTION
          ================================================== */}

          <section className="border-y border-black/[0.07] bg-[#fafafa]">

            <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

              {[
                [
                  "truck",
                  "Fast Delivery",
                  "Quick and reliable shipping",
                ],
                [
                  "shield",
                  "Payment Support",
                  "Arrange payment directly in chat",
                ],
                [
                  "refresh",
                  "Easy Returns",
                  "Simple 30-day returns",
                ],
                [
                  "heart",
                  "Customer Support",
                  "We're here to help",
                ],
              ].map(
                ([icon, title, text]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 border-black/[0.07] px-5 py-7 even:border-l lg:border-l"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">

                      <Icon
                        name={icon}
                        size={17}
                      />

                    </div>

                    <div>

                      <p className="text-[12px] font-semibold">
                        {title}
                      </p>

                      <p className="mt-1 text-[10px] text-[#808080]">
                        {text}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

        </main>
      )}

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2 whitespace-nowrap rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}

    </div>
  );
}