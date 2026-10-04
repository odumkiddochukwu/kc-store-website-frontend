import { useMemo, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
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
        <path d="M20 14h-3v5h2a1 1 0 0 1 1-1v-4Z" />
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
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   DATA
========================================================= */

const categories = [
  {
    id: 1,
    title: "Women's Bags",
    slug: "womens-bags",
    subtitle: "Shop Now",
    image:
    "https://res.cloudinary.com/st6vzres/image/upload/v1790868725/WhatsApp_Image_2026-10-01_at_15.43.22.jpg"
  },
  {
    id: 2,
    title: "Watches",
    slug: "watches",
    subtitle: "Shop Now",
    image:
    "https://res.cloudinary.com/st6vzres/image/upload/v1790889670/IMG_1382.jpg"
  },
  {
    id: 3,
    title: "Clothing",
    slug: "clothing",
    subtitle: "Shop Now",
    image:
      "images/shirt1.jpg",
  },
  {
    id: 4,
    title: "Shoes",
    slug: "shoes",
    subtitle: "Shop Now",
    image:
    "https://res.cloudinary.com/st6vzres/image/upload/v1790889432/IMG_1306.jpg"
  },
  {
    id: 5,
    title: "Jewelry",
    slug: "jewelry",
    subtitle: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "Accessories",
    slug: "accessories",
    subtitle: "Shop Now",
    image: "images/sunglasses1.jpg",
  },
];

const newArrivals = [
  {
    id: 1,
    slug: "gucci-classic-men-shoes",
    name: "Gucci Classic Men Shoes",
    category: "Shoes",
    categorySlug: "shoes",
    price: 168000,
    oldPrice: 210000,
    discount: "-20%",
    badge: null,
    rating: 4.6,
    reviews: 120,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943163/IMG_1966.jpg",
  },
    {
    id: 2,
    slug: "chanel-quilted-flap-shoulder-bag",
    name: "Chanel Quilted Flap Shoulder Bag",
    category: "Bags",
    categorySlug: "Women's Bags",
    price: 200000,
    oldPrice: 250000,
    discount: "-20%",
    badge: null,
    rating: 4.6,
    reviews: 120,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941323/IMG_1397.jpg",
  },  {
    id: 3,
    slug: "rolex-sport-steel-bracelet-watch",
    name: "Rolex Sport Steel Bracelet Watch",
    category: "Watches",
    categorySlug: "watches",
    price: 220000,
    oldPrice: 275000,
    discount: "-20%",
    badge: null,
    rating: 4.6,
    reviews: 120,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2062.jpg",
  },  {
    id: 4,
    slug: "gucci-retro-runner-shoe",
    name: "Gucci Retro Runner Shoe",
    category: "Shoes",
    categorySlug: "shoes",
    price: 110000,
    oldPrice: 150200,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 120,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889906/IMG_1354.jpg",
  },  {
    id: 5,
    slug: "louis-vuitton-speedy-trunk-pillow-shoulder-bag",
    name: "Louis Vuitton Speedy Trunk Pillow Shoulder Bag",
    category: "Bags",
    categorySlug: "women's bags",
    price: 117000,
    oldPrice: 123000,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 42,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868716/WhatsApp_Image_2026-10-01_at_15.43.16.jpg",
  },  {
    id: 6,
    slug: "rolex-silver-bezel-dress-watch",
    name: "Rolex Silver Bezel Dress Watch",
    category: "Watches",
    categorySlug: "watches",
    price: 182000,
    oldPrice: 209000,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 22,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2061.jpg",
  },
 
];

const bestSellers = [
  {
    id: 7,
    name: "Gucci Interlocking-G Style Low-Top Heels",
    category: "Shoes",
    price: 108200,
    rating: 4.2,
    reviews: 50,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889911/IMG_1344.jpg",
  },
  {
    id: 8,
    name: "Chanel Compact Quilted Handbag",
    category: "Bags",
    price: 143900,
    rating: 4.5,
    reviews: 70,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941163/IMG_1529.jpg",
  },
  {
    id: 9,
    name: "Patek Philippe Slim Steel Dial Watch",
    category: "Watches",
    price: 137100,
    rating: 4.2,
    reviews: 80,
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2057.jpg",
  },
];

const customers = [
  "images/clients/client-woman1.jpg",
  "images/clients/client-woman2.jpg",
  "images/clients/client-man2.jpg",
  "images/clients/client-man1.jpg",
];

/* =========================================================
   HELPERS
========================================================= */

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Stars = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-black text-[12px]"
              : "text-gray-300 text-[12px]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

/* =========================================================
   PRODUCT CARD
========================================================= */

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  saved,
}) => {
  const productSlug = slugify(product.name);

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-2xl bg-[#f5f5f3] aspect-[4/4.8]">
        {/* Badge */}
        {(product.badge || product.discount) && (
          <div className="absolute left-3 top-3 z-10">
            <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
              {product.badge || product.discount}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Save product"
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition ${
            saved
              ? "text-black"
              : "text-[#63666A] hover:text-black"
          }`}
        >
          <Icon
            name="heart"
            size={17}
            strokeWidth={1.7}
          />
        </button>

        {/* Image */}
        <Link
          to={`/product/${productSlug}`}
          className="block h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add */}
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#222]"
        >
          Quick Add
        </button>
      </div>

      <div className="pt-3.5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#808080]">
          {product.category}
        </p>

        <Link
          to={`/product/${productSlug}`}
          className="mt-1 block text-[14px] font-medium text-black transition hover:opacity-60"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[15px] font-semibold text-black">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice && (
            <span className="text-[12px] text-[#808080] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />

          <span className="text-[11px] text-[#808080]">
            ({product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   MAIN HOME PAGE
========================================================= */

export default function Home() {
  /* =======================================================
     CART CONTEXT
  ======================================================== */

  const { cartItems, addToCart } = useCart();

  /* =======================================================
     LOCAL UI STATE
  ======================================================== */

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [savedProducts, setSavedProducts] =
    useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [toast, setToast] =
    useState("");

  const [categoryMenuOpen, setCategoryMenuOpen] =
    useState(false);

  const [
    mobileCategoriesOpen,
    setMobileCategoriesOpen,
  ] = useState(false);

  /* =======================================================
     GLOBAL CART COUNT
     
     This is calculated directly from CartContext.
     Every page using the same CartContext gets the same
     cart state and therefore the same cart number.
  ======================================================== */

  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) {
      return 0;
    }

    return cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  /* =======================================================
     TOAST
  ======================================================== */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__novaToastTimeout
    );

    window.__novaToastTimeout =
      window.setTimeout(() => {
        setToast("");
      }, 2500);
  };

  /* =======================================================
     ADD TO CART
     
     IMPORTANT:
     We no longer manually increment cartCount.
     CartContext handles the actual cart state.
  ======================================================== */

  const handleAddToCart = (product) => {
    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  /* =======================================================
     WISHLIST
  ======================================================== */

  const handleToggleWishlist = (
    productId
  ) => {
    setSavedProducts((current) => {
      const exists =
        current.includes(productId);

      if (exists) {
        showToast(
          "Removed from saved products"
        );

        return current.filter(
          (id) => id !== productId
        );
      }

      showToast("Product saved");

      return [
        ...current,
        productId,
      ];
    });
  };

  /* =======================================================
     FILTER PRODUCTS
  ======================================================== */

  const filteredNewArrivals =
    useMemo(() => {
      const query =
        searchTerm.trim().toLowerCase();

      return newArrivals.filter(
        (product) => {
          const matchesSearch =
            !query ||
            product.name
              .toLowerCase()
              .includes(query) ||
            product.category
              .toLowerCase()
              .includes(query);

          const matchesCategory =
            activeCategory === "All" ||
            product.category ===
              activeCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      searchTerm,
      activeCategory,
    ]);

  const categoryFilters = [
    "All",
    "Bags",
    "Watches",
    "Clothing",
    "Shoes",
    "Accessories",
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">

          {/* Logo */}

          <Link
                      to="/"
                      className="text-[22px] font-semibold tracking-[-0.05em]"
                    >
                      KC{" "}
                      <span className="text-[#63666A]">
                        Store
                      </span>
                    </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-7 lg:flex">

            <Link
              to="/"
              className="relative py-2 text-[13px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              to="/new-arrivals"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              New Arrivals
            </Link>

            <Link
              to="/best-sellers"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Best Sellers
            </Link>

            {/* CATEGORIES DROPDOWN */}

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

            <Link
              to="/about"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              About
            </Link>

            <Link
              to="/track-order"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Track Order
            </Link>

            <Link
              to="/contact"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Contact
            </Link>

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
                SHARED CART
            ================================================= */}

            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} ${
                cartCount === 1
                  ? "item"
                  : "items"
              }`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
            >
              <Icon
                name="bag"
                size={20}
              />

              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {cartCount}
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

                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon
                    name="search"
                    size={19}
                  />
                </div>

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
          MOBILE NAV
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

            {/* MOBILE CART / SAVED */}
          </div>
        </div>
      )}

      <main>

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="px-5 pb-10 pt-7 sm:px-7 sm:pt-10 lg:px-10 lg:pb-16 lg:pt-12">

          <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#f4f4f2] lg:grid-cols-[0.85fr_1.15fr]">

            <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-20">

              <span className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#63666A]">
                Trending Now
              </span>

              <h1 className="max-w-[620px] text-[45px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]">
                Discover
                <br />
                Products
                <br />
                You&apos;ll Love
              </h1>

              <p className="mt-7 max-w-[450px] text-[14px] leading-7 text-[#63666A] sm:text-[15px]">
                Discover the latest fashion, accessories and lifestyle
                essentials curated for modern lifestyles.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-[13px] font-medium text-white transition hover:bg-[#222]"
                >
                  Shop Now

                  <Icon
                    name="arrowRight"
                    size={16}
                  />
                </Link>

                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3.5 text-[13px] font-medium text-black transition hover:border-black/30"
                >
                  Explore Collection
                </Link>

              </div>

              <div className="mt-9 flex items-center gap-3">

                <div className="flex -space-x-2">

                  {customers.map(
                    (customer, index) => (
                      <img
                        key={customer}
                        src={customer}
                        alt={`Customer ${
                          index + 1
                        }`}
                        className="h-8 w-8 rounded-full border-2 border-[#f4f4f2] object-cover"
                      />
                    )
                  )}

                </div>

                <div>

                  <div className="flex items-center gap-1.5">

                    <Stars rating={5} />

                    <span className="text-[11px] font-medium">
                      4.9/5
                    </span>

                  </div>

                  <p className="mt-0.5 text-[11px] text-[#808080]">
                    Loved by 2,000+ customers worldwide
                  </p>

                </div>

              </div>

            </div>

            <div className="relative min-h-[470px] overflow-hidden sm:min-h-[560px] lg:min-h-[650px]">

              {/* =================================================
                  RESPONSIVE HERO IMAGE

                  Desktop:
                  images/hero-image1.png

                  Mobile:
                  images/hero-mobile.png
              ================================================== */}

              <picture className="absolute inset-0 block h-full w-full">
                <source
                  media="(max-width: 767px)"
                  srcSet="images/hero-image-mobile1.png"
                />

                <img
                  src="images/hero-image1.png"
                  alt="Fashion collection"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              <div className="absolute left-5 top-7 hidden w-[130px] overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:block">

                <div className="aspect-square overflow-hidden rounded-xl bg-[#f4f4f2]">

                  <img
                    src={newArrivals[1].image}
                    alt={newArrivals[1].name}
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="px-1 pb-1 pt-2">

                  <p className="truncate text-[10px] font-medium">
                    {newArrivals[1].name}
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold">
                    {formatPrice(
                      newArrivals[1].price
                    )}
                  </p>

                </div>

              </div>

              <div className="absolute bottom-6 left-5 hidden w-[150px] overflow-hidden rounded-2xl bg-white p-2 shadow-xl md:block">

                <div className="aspect-[1.15] overflow-hidden rounded-xl bg-[#f4f4f2]">

                  <img
                    src={newArrivals[4].image}
                    alt={newArrivals[4].name}
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="px-1 pb-1 pt-2">

                  <p className="truncate text-[10px] font-medium">
                    {newArrivals[4].name}
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold">
                    {formatPrice(
                      newArrivals[4].price
                    )}
                  </p>

                </div>

              </div>

              <div className="absolute bottom-6 right-5 hidden w-[150px] overflow-hidden rounded-2xl bg-white p-2 shadow-xl md:block">

                <div className="aspect-[1.15] overflow-hidden rounded-xl bg-[#f4f4f2]">

                  <img
                    src={newArrivals[5].image}
                    alt={newArrivals[5].name}
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="px-1 pb-1 pt-2">

                  <p className="truncate text-[10px] font-medium">
                    {newArrivals[5].name}
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold">
                    {formatPrice(
                      newArrivals[5].price
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ====================================================== */}

        <section className="border-y border-black/[0.07]">

          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "truck",
                title: "Fast Delivery",
                text: "Quick and reliable shipping",
              },
              {
                icon: "lock",
                title: "Secure Payments",
                text: "100% secure checkout",
              },
              {
                icon: "refresh",
                title: "Easy Returns",
                text: "30-day return policy",
              },
              {
                icon: "headset",
                title: "24/7 Support",
                text: "Always here to help",
              },
            ].map((item, index) => (

              <div
                key={item.title}
                className={`flex items-center gap-4 px-5 py-6 sm:px-7 lg:px-8 ${
                  index < 3
                    ? "border-b border-black/[0.07] lg:border-b-0 lg:border-r"
                    : "border-b-0"
                }`}
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">

                  <Icon
                    name={item.icon}
                    size={19}
                  />

                </div>

                <div>

                  <p className="text-[12px] font-semibold">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] text-[#808080]">
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section className="px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex items-end justify-between gap-5">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Explore
                </p>

                <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                  Shop by Categories
                </h2>

              </div>

              <Link
                to="/shop"
                className="hidden items-center gap-1.5 text-[12px] font-medium sm:flex"
              >
                View All Categories

                <Icon
                  name="arrowRight"
                  size={14}
                />
              </Link>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

              {categories.map(
                (category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-lg"
                  >

                    <div className="aspect-square overflow-hidden bg-[#f5f5f3]">

                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                    </div>

                    <div className="p-3.5">

                      <p className="text-[12px] font-semibold">
                        {category.title}
                      </p>

                      <div className="mt-1.5 flex items-center justify-between">

                        <span className="text-[10px] text-[#808080]">
                          {category.subtitle}
                        </span>

                        <Icon
                          name="arrowRight"
                          size={13}
                          strokeWidth={1.5}
                        />

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>

          </div>
        </section>

        {/* =====================================================
            NEW ARRIVALS
        ====================================================== */}

        <section className="bg-[#f7f7f6] px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Just In
                </p>

                <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                  New Arrivals
                </h2>

              </div>

              <Link
                to="/new-arrivals"
                className="flex items-center gap-1.5 text-[12px] font-medium"
              >
                View All New Arrivals

                <Icon
                  name="arrowRight"
                  size={14}
                />
              </Link>

            </div>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-1">

              {categoryFilters.map(
                (category) => (

                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(
                        category
                      );
                      setSearchTerm("");
                    }}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-medium transition ${
                      activeCategory === category
                        ? "bg-black text-white"
                        : "bg-white text-[#63666A] hover:text-black"
                    }`}
                  >
                    {category}
                  </button>

                )
              )}

            </div>

            {filteredNewArrivals.length >
            0 ? (

              <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

                {filteredNewArrivals.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={
                        handleAddToCart
                      }
                      onToggleWishlist={
                        handleToggleWishlist
                      }
                      saved={savedProducts.includes(
                        product.id
                      )}
                    />

                  )
                )}

              </div>

            ) : (

              <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center">

                <p className="text-lg font-semibold">
                  No products found
                </p>

                <p className="mt-2 text-sm text-[#808080]">
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory(
                      "All"
                    );
                  }}
                  className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>
        </section>

        {/* =====================================================
            BEST SELLERS
        ====================================================== */}

        <section className="px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex items-end justify-between gap-5">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Customer Favorites
                </p>

                <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                  Best Sellers
                </h2>

              </div>

              <Link
                to="/best-sellers"
                className="flex items-center gap-1.5 text-[12px] font-medium"
              >
                View All Best Sellers

                <Icon
                  name="arrowRight"
                  size={14}
                />
              </Link>

            </div>

            <div className="mt-8 grid gap-3 lg:grid-cols-3">

              {bestSellers.map(
                (product) => (

                  <article
                    key={product.id}
                    className="group relative overflow-hidden rounded-2xl bg-[#f5f5f3]"
                  >

                    <div className="grid min-h-[300px] grid-cols-[0.95fr_1.05fr]">

                      <div className="relative overflow-hidden">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute left-3 top-3">

                          <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-medium text-white">
                            Bestseller
                          </span>

                        </div>

                      </div>

                      <div className="flex flex-col justify-center p-5 sm:p-7">

                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#808080]">
                          {product.category}
                        </p>

                        <h3 className="mt-2 text-[18px] font-semibold leading-tight tracking-[-0.02em]">
                          {product.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">

                          <Stars
                            rating={
                              product.rating
                            }
                          />

                          <span className="text-[10px] text-[#808080]">
                            ({product.reviews})
                          </span>

                        </div>

                        <p className="mt-3 text-[17px] font-semibold">
                          {formatPrice(
                            product.price
                          )}
                        </p>

                        <div className="mt-5 flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(
                                product
                              )
                            }
                            className="rounded-lg bg-black px-4 py-2.5 text-[11px] font-medium text-white transition hover:bg-[#222]"
                          >
                            Quick Add
                          </button>

                          <Link
                            to={`/product/${slugify(
                              product.name
                            )}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white"
                          >
                            <Icon
                              name="arrowRight"
                              size={15}
                            />
                          </Link>

                        </div>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>
        </section>

        {/* =====================================================
            PROMOTIONAL BANNERS
        ====================================================== */}

        <section className="px-5 pb-14 sm:px-7 sm:pb-16 lg:px-10 lg:pb-20">

          <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-2">

            {/* Flash Sale */}

            <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-[#ef3f24]">

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90"
                alt="Flash sale sneakers"
                className="absolute inset-0 h-full w-full object-cover object-right opacity-80 mix-blend-multiply"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#ef3f24] via-[#ef3f24]/85 to-transparent" />

              <div className="relative z-10 flex h-full max-w-[360px] flex-col justify-center px-6 py-10 text-white sm:px-9">

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Flash Sale
                </span>

                <h3 className="mt-3 text-[33px] font-semibold leading-[0.95] tracking-[-0.05em]">
                  Up To 70% Off
                </h3>

                <div className="mt-5 flex items-center gap-3">

                  {[
                    ["02", "Days"],
                    ["15", "Hours"],
                    ["45", "Mins"],
                    ["30", "Secs"],
                  ].map(
                    ([number, label]) => (

                      <div key={label}>

                        <p className="text-[17px] font-semibold">
                          {number}
                        </p>

                        <p className="text-[8px] uppercase tracking-wide opacity-75">
                          {label}
                        </p>

                      </div>
                    )
                  )}

                </div>

                <Link
                  to="/shop?sale=true"
                  className="mt-6 inline-flex w-fit rounded-lg bg-white px-5 py-3 text-[11px] font-semibold text-black"
                >
                  Shop Sale Now
                </Link>

              </div>
            </div>

            {/* New Collection */}

            <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-black">

              <img
                src="images/hero-image3.png"
                alt="New fashion collection"
                className="absolute inset-0 h-full w-full object-cover opacity-85"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

              <div className="relative z-10 flex h-full max-w-[350px] flex-col justify-center px-6 py-10 text-white sm:px-9">

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                  New Collection
                </span>

                <h3 className="mt-3 text-[33px] font-semibold leading-[0.95] tracking-[-0.05em]">
                  Modern
                  <br />
                  Essentials
                </h3>

                <p className="mt-4 text-[12px] leading-6 text-white/75">
                  Discover the latest pieces designed around everyday
                  elegance and effortless style.
                </p>

                <Link
                  to="/new-arrivals"
                  className="mt-6 inline-flex w-fit rounded-lg bg-white px-5 py-3 text-[11px] font-semibold text-black"
                >
                  Shop Collection
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            TRUST / QUALITY
        ====================================================== */}

        <section className="border-y border-black/[0.07] bg-[#fafafa]">

          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "check",
                title: "Premium Quality",
                text: "Guaranteed quality materials",
              },
              {
                icon: "truck",
                title: "Fast Delivery",
                text: "Quick and reliable shipping",
              },
              {
                icon: "lock",
                title: "Secure Checkout",
                text: "Your data is protected",
              },
              {
                icon: "heart",
                title: "Customer Satisfaction",
                text: "Loved by our customers",
              },
            ].map(
              (item, index) => (

                <div
                  key={item.title}
                  className={`flex items-center gap-4 px-5 py-7 sm:px-7 lg:px-8 ${
                    index < 3
                      ? "border-b border-black/[0.07] lg:border-b-0 lg:border-r"
                      : ""
                  }`}
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10">

                    <Icon
                      name={item.icon}
                      size={17}
                    />

                  </div>

                  <div>

                    <p className="text-[12px] font-semibold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-[#808080]">
                      {item.text}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>
        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}

    </div>
  );
}