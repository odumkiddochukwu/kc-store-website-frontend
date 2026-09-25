import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

/* =========================================================
   ICONS
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

    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </>
    ),

    bag: (
      <>
        <path d="M6 8h12l1 13H5L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
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
        <path d="m18 6-6 12" />
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
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

/* =========================================================
   PRODUCT DATA
   Keep this synchronized with your Product page.

   Later this can be replaced with:
   GET /api/products?search=query
========================================================= */

const products = [
  {
    id: 1,
    slug: "classic-leather-handbag",
    name: "Classic Leather Handbag",
    category: "Bags",
    price: 89900,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 2,
    slug: "premium-shoulder-bag",
    name: "Premium Shoulder Bag",
    category: "Bags",
    price: 109900,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 3,
    slug: "structured-mini-bag",
    name: "Structured Mini Bag",
    category: "Bags",
    price: 67900,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 4,
    slug: "soft-leather-tote",
    name: "Soft Leather Tote",
    category: "Bags",
    price: 119900,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 5,
    slug: "minimal-leather-watch",
    name: "Minimal Leather Watch",
    category: "Watches",
    price: 129900,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 6,
    slug: "modern-stainless-watch",
    name: "Modern Stainless Watch",
    category: "Watches",
    price: 179900,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 7,
    slug: "classic-metal-watch",
    name: "Classic Metal Watch",
    category: "Watches",
    price: 149900,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 8,
    slug: "signature-dial-watch",
    name: "Signature Dial Watch",
    category: "Watches",
    price: 219900,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 9,
    slug: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    category: "Clothing",
    price: 29900,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 10,
    slug: "relaxed-fit-cotton-shirt",
    name: "Relaxed Fit Cotton Shirt",
    category: "Clothing",
    price: 44900,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 11,
    slug: "premium-knit-dress",
    name: "Premium Knit Dress",
    category: "Clothing",
    price: 79900,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 12,
    slug: "everyday-cargo-pants",
    name: "Everyday Cargo Pants",
    category: "Clothing",
    price: 54900,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 13,
    slug: "air-motion-sneakers",
    name: "Air Motion Sneakers",
    category: "Shoes",
    price: 74900,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 14,
    slug: "studio-runner-sneakers",
    name: "Studio Runner Sneakers",
    category: "Shoes",
    price: 89900,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 15,
    slug: "everyday-court-sneakers",
    name: "Everyday Court Sneakers",
    category: "Shoes",
    price: 64900,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=90",
  },

  {
    id: 16,
    slug: "premium-fashion-sneakers",
    name: "Premium Fashion Sneakers",
    category: "Shoes",
    price: 119900,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=90",
  },
];

/* =========================================================
   SEARCH PAGE
========================================================= */

export default function Search() {

  const { cartItems, addToCart } = useCart();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { totalItems } = useCart();

  const inputRef = useRef(null);

  const initialQuery =
    searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] =
    useState(initialQuery);

    
      const [categoryMenuOpen, setCategoryMenuOpen] =
        useState(false);

         const [searchOpen, setSearchOpen] =
            useState(false);
        


  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

     const [
        mobileCategoriesOpen,
        setMobileCategoriesOpen,
      ] = useState(false);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState(-1);

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
     FOCUS INPUT WHEN PAGE OPENS
  ======================================================= */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* =======================================================
     NORMALIZE SEARCH
  ======================================================= */

  const normalizedQuery = searchTerm
    .trim()
    .toLowerCase();

  /* =======================================================
     FIND MATCHING PRODUCTS
  ======================================================= */

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const words = normalizedQuery
      .split(/\s+/)
      .filter(Boolean);

    return products
      .map((product) => {
        const productName =
          product.name.toLowerCase();

        const category =
          product.category.toLowerCase();

        const slug =
          product.slug.toLowerCase();

        let score = 0;

        /* Exact product name */

        if (
          productName ===
          normalizedQuery
        ) {
          score += 1000;
        }

        /* Product starts with search */

        if (
          productName.startsWith(
            normalizedQuery
          )
        ) {
          score += 500;
        }

        /* Product contains full search */

        if (
          productName.includes(
            normalizedQuery
          )
        ) {
          score += 300;
        }

        /* Category match */

        if (
          category.includes(
            normalizedQuery
          )
        ) {
          score += 100;
        }

        /* Slug match */

        if (
          slug.includes(
            normalizedQuery
          )
        ) {
          score += 50;
        }

        /* Individual word matches */

        words.forEach((word) => {
          if (productName.includes(word)) {
            score += 20;
          }

          if (category.includes(word)) {
            score += 10;
          }
        });

        return {
          product,
          score,
        };
      })
      .filter(
        (result) =>
          result.score > 0
      )
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.product.name.localeCompare(
          b.product.name
        );
      })
      .slice(0, 7)
      .map(
        (result) => result.product
      );
  }, [normalizedQuery]);

  /* =======================================================
     RESET SELECTED SUGGESTION WHEN USER TYPES
  ======================================================= */

  useEffect(() => {
    setSelectedSuggestion(-1);
  }, [searchTerm]);

  /* =======================================================
     OPEN PRODUCT
  ======================================================= */

  const openProduct = (product) => {
    if (!product) {
      return;
    }

    navigate(
      `/product/${product.slug}`
    );
  };

  /* =======================================================
     ENTER / SUBMIT SEARCH
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (suggestions.length === 0) {
      return;
    }

    /*
      If the user selected a suggestion
      with the keyboard, use it.

      Otherwise use the highest-ranked
      search result.
    */

    const product =
      selectedSuggestion >= 0
        ? suggestions[
            selectedSuggestion
          ]
        : suggestions[0];

    openProduct(product);
  };

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      if (!suggestions.length) {
        return;
      }

      event.preventDefault();

      setSelectedSuggestion(
        (current) => {
          if (
            current >=
            suggestions.length - 1
          ) {
            return 0;
          }

          return current + 1;
        }
      );

      return;
    }

    if (event.key === "ArrowUp") {
      if (!suggestions.length) {
        return;
      }

      event.preventDefault();

      setSelectedSuggestion(
        (current) => {
          if (current <= 0) {
            return (
              suggestions.length - 1
            );
          }

          return current - 1;
        }
      );

      return;
    }

    if (event.key === "Escape") {
      setSelectedSuggestion(-1);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">

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
      
                  {/* MOBILE CART / SAVED */}
                </div>
              </div>
            )}
      

      {/* =====================================================
          SEARCH CONTENT
      ====================================================== */}

      <main>

        <section className="px-5 pb-20 pt-10 sm:px-7 sm:pb-24 sm:pt-14 lg:px-10 lg:pt-16">

          <div className="mx-auto max-w-[1000px]">

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
                Search
              </span>

            </div>

            {/* Heading */}

            <div className="mt-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#808080]">
                KC Store Search
              </p>

              <h1 className="mt-3 text-[40px] font-semibold tracking-[-0.055em] sm:text-[56px]">
                What are you looking for?
              </h1>

              <p className="mt-4 max-w-[650px] text-[13px] leading-6 text-[#63666A] sm:text-[14px]">
                Search for a specific product and
                open its product details directly.
              </p>

            </div>

            {/* =================================================
                SEARCH INPUT
            ================================================== */}

            <div className="relative mt-9">

              <form
                onSubmit={handleSubmit}
                className="relative"
              >

                <Icon
                  name="search"
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#808080]"
                />

                <input
                  ref={inputRef}
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Search for a product..."
                  autoComplete="off"
                  className="h-16 w-full rounded-2xl border border-black/10 bg-[#f7f7f6] pl-14 pr-28 text-sm outline-none transition placeholder:text-[#808080] focus:border-black"
                />

                <button
                  type="submit"
                  disabled={
                    suggestions.length === 0
                  }
                  className="absolute right-2 top-2 flex h-12 items-center justify-center rounded-xl bg-black px-5 text-[11px] font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Search
                </button>

              </form>

              {/* =================================================
                  SUGGESTIONS DROPDOWN
              ================================================== */}

              {normalizedQuery && (
                <div className="absolute left-0 right-0 top-[72px] z-40 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl">

                  {suggestions.length > 0 ? (

                    <>

                      <div className="border-b border-black/[0.07] px-5 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#808080]">
                          Product Suggestions
                        </p>
                      </div>

                      <div>

                        {suggestions.map(
                          (product, index) => (

                            <Link
                              key={product.id}
                              to={`/product/${product.slug}`}
                              onMouseEnter={() =>
                                setSelectedSuggestion(
                                  index
                                )
                              }
                              className={`flex items-center gap-4 border-b border-black/[0.06] px-5 py-4 transition last:border-b-0 ${
                                selectedSuggestion ===
                                index
                                  ? "bg-[#f7f7f6]"
                                  : "hover:bg-[#f7f7f6]"
                              }`}
                            >

                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-12 w-12 shrink-0 rounded-xl object-cover"
                              />

                              <div className="min-w-0 flex-1">

                                <p className="truncate text-[12px] font-medium">
                                  {product.name}
                                </p>

                                <div className="mt-1 flex items-center gap-2">

                                  <span className="text-[10px] text-[#808080]">
                                    {product.category}
                                  </span>

                                  <span className="text-[#B0B0B0]">
                                    •
                                  </span>

                                  <span className="text-[10px] font-medium">
                                    {formatPrice(
                                      product.price
                                    )}
                                  </span>

                                </div>

                              </div>

                              <Icon
                                name="arrowRight"
                                size={15}
                                className="shrink-0 text-[#808080]"
                              />

                            </Link>

                          )
                        )}

                      </div>

                      <div className="border-t border-black/[0.07] bg-[#fafafa] px-5 py-3">

                        <p className="text-[10px] text-[#808080]">
                          Use ↑ ↓ to select a product,
                          then press Enter.
                        </p>

                      </div>

                    </>

                  ) : (

                    <div className="px-5 py-5">

                      <p className="text-[12px] font-medium">
                        No products found.
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-[#808080]">
                        Try another product name such
                        as "leather bag", "watch",
                        "shirt", or "sneakers".
                      </p>

                    </div>

                  )}

                </div>
              )}

            </div>

            {/* =================================================
                POPULAR SEARCHES
            ================================================== */}

            {!normalizedQuery && (

              <div className="mt-8">

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                  Popular Searches
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {[
                    "leather bag",
                    "watch",
                    "shirt",
                    "sneakers",
                  ].map((term) => (

                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchTerm(term);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-black/10 px-4 py-2 text-[10px] font-medium transition hover:border-black hover:bg-black hover:text-white"
                    >
                      {term}
                    </button>

                  ))}

                </div>

              </div>

            )}

          </div>
        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer/>

    </div>
  );
}