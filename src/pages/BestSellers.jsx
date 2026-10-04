import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

/* =========================================================
   BEST SELLER PRODUCTS
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

    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),

    shield: (
      <path d="M12 3 4.5 6v5.4c0 4.7 3.2 8.9 7.5 10.1 4.3-1.2 7.5-5.4 7.5-10.1V6L12 3Z" />
    ),

    sliders: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <circle
          cx="8"
          cy="6"
          r="2"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="15"
          cy="12"
          r="2"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="10"
          cy="18"
          r="2"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),

    chevronDown: <path d="m6 9 6 6 6-6" />,

    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

const bestSellerProducts = [
  {
    id: "gucci-compact-flap-backpack",
    slug: "gucci-compact-flap-backpack",
    name: "Gucci Compact Flap Backpack",
    category: "Women's Bags",
    price: 149400,
    oldPrice: 213400,
    discount: "-30%",
    badge: "Best Seller",
    rating: 4.5,
    reviews: 183,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941008/IMG_1692.jpg",
    colors: ["Black", "Beige"],
    popularRank: 1,
  },
  {
    id: "chanel-compact-quilted-handbag",
    slug: "chanel-compact-quilted-handbag",
    name: "Chanel Compact Quilted Handbag",
    category: "Women's Bags",
    price: 143700,
    oldPrice: 169100,
    discount: "-15%",
    badge: "Best Seller",
    rating: 4.4,
    reviews: 22,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941163/IMG_1529.jpg",
    colors: ["Black", "Red", "Cream"],
    popularRank: 2,
  },
  {
    id: "rolex-sport-steel-bracelet-watch",
    slug: "rolex-sport-steel-bracelet-watch",
    name: "Rolex Sport Steel Bracelet Watch",
    category: "Watches",
    price: 210200,
    oldPrice: null,
    discount: null,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 203,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2062.jpg",
    colors: ["Black", "Gold"],
    popularRank: 3,
  },
  {
    id: "gucci-classic-flap-handbag",
    slug: "gucci-classic-flap-handbag",
    name: "Gucci Classic Flap Handbag",
    category: "Women's Bags",
    price: 140900,
    oldPrice: null,
    discount: null,
    badge: "Best Seller",
    rating: 4.4,
    reviews: 126,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941107/IMG_1550.jpg",
    colors: ["Black", "Brown"],
    popularRank: 4,
  },
  {
    id: "hublot-stainless-case-quartz-watch",
    slug: "hublot-stainless-case-quartz-watch",
    name: "Hublot Stainless Case Quartz Watch",
    category: "Watches",
    price: 160900,
    oldPrice: 182800,
    discount: "-12%",
    badge: "Best Seller",
    rating: 4.5,
    reviews: 84,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2051.jpg",
    colors: ["Silver", "Gold", "Black"],
    popularRank: 5,
  },
  {
    id: "gucci-leather-stripe-shoe",
    slug: "gucci-leather-stripe-shoe",
    name: "Gucci Leather Stripe Shoe",
    category: "Shoes",
    price: 75400,
    oldPrice: 100500,
    discount: "-25%",
    badge: "Best Seller",
    rating: 4.2,
    reviews: 173,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943121/IMG_2035.jpg",
    colors: ["White", "Black", "Grey", "Red"],
    sizes: ["38", "39", "40", "41", "42"],
    popularRank: 6,
  },
  {
    id: "patek-philippe-classic-steel-link-watch",
    slug: "patek-philippe-classic-steel-link-watch",
    name: "Patek Philippe Classic Steel Link Watch",
    category: "Watches",
    price: 237700,
    oldPrice: null,
    discount: null,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 65,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2055.jpg",
    colors: ["Silver", "Black"],
    popularRank: 7,
  },
  {
    id: "celine-small-flap-chain-bag",
    slug: "celine-small-flap-chain-bag",
    name: "Celine Small Flap Chain Bag",
    category: "Women's Bags",
    price: 53500,
    oldPrice: 71300,
    discount: "-25%",
    badge: "Best Seller",
    rating: 4.6,
    reviews: 56,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940972/IMG_1780.jpg",
    colors: ["Brown", "Black"],
    popularRank: 8,
  },
  {
    id: "gucci-compact-chain-crossbody-bag",
    slug: "gucci-compact-chain-crossbody-bag",
    name: "Gucci Compact Chain Crossbody Bag",
    category: "Women's Bags",
    price: 92000,
    oldPrice: 131400,
    discount: "-30%",
    badge: "Best Seller",
    rating: 4.5,
    reviews: 274,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941072/IMG_1610.jpg",
    colors: ["Black", "Cream"],
    popularRank: 9,
  },
  {
    id: "louis-vuitton-embroidered-bee-style-heels",
    slug: "louis-vuitton-embroidered-bee-style-heels",
    name: "Louis Vuitton Embroidered-Bee Style Heels",
    category: "Shoes",
    price: 73300,
    oldPrice: 89400,
    discount: "-18%",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 112,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943229/IMG_1821.jpg",
    colors: ["Black", "Grey", "White"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    popularRank: 10,
  },
  {
    id: "louis-vuitton-chunky-logo-sneakers",
    slug: "louis-vuitton-chunky-logo-sneakers",
    name: "Louis Vuitton Chunky Logo Sneakers",
    category: "Shoes",
    price: 148800,
    oldPrice: 165300,
    discount: "-10%",
    badge: "Best Seller",
    rating: 4.2,
    reviews: 40,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943214/IMG_1857.jpg",
    colors: ["Black", "White", "Grey", "Green"],
    sizes: ["38", "39", "40", "41", "42"],
    popularRank: 11,
  },
  {
    id: "gucci-classic-heels-2",
    slug: "gucci-classic-heels-2",
    name: "Gucci Classic Heels",
    category: "Shoes",
    price: 120200,
    oldPrice: 130700,
    discount: "-8%",
    badge: "Best Seller",
    rating: 4.7,
    reviews: 149,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943152/IMG_1975.jpg",
    colors: ["Black", "Brown"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    popularRank: 12,
  },
  {
    id: "rolex-brushed-steel-dress-watch",
    slug: "rolex-brushed-steel-dress-watch",
    name: "Rolex Brushed Steel Dress Watch",
    category: "Watches",
    price: 198900,
    oldPrice: 284100,
    discount: "-30%",
    badge: "Best Seller",
    rating: 4.6,
    reviews: 143,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889669/IMG_1383.jpg",
    colors: ["Silver", "Gold", "Black"],
    popularRank: 13,
  },
  {
    id: "gucci--mini-quilted-shoulder-bag",
    slug: "gucci--mini-quilted-shoulder-bag",
    name: "Gucci Mini Quilted Shoulder Bag",
    category: "Women's Bags",
    price: 125900,
    oldPrice: 136800,
    discount: "-8%",
    badge: "Best Seller",
    rating: 4.2,
    reviews: 222,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941055/IMG_1624.jpg",
    colors: ["Black", "Beige", "Pink", "Red"],
    popularRank: 14,
  },
];

const categories = [
  "All",
  "Women's Bags",
  "Watches",
  "Clothing",
  "Shoes",
  "Jewelry",
  "Accessories",
];

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₦50,000", value: "under-50" },
  { label: "₦50,000 – ₦100,000", value: "50-100" },
  { label: "₦100,000 – ₦150,000", value: "100-150" },
  { label: "₦150,000+", value: "150-plus" },
];

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Highest Rated", value: "rating" },
];

const formatPrice = (price) => {
  return `₦${price.toLocaleString("en-NG")}`;
};

export default function BestSellers() {
  const {
    addToCart,
    toggleSavedProduct,
    isSaved,
    totalItems,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [categoriesOpen, setCategoriesOpen] =
    useState(false);

  const [mobileCategoriesOpen, setMobileCategoriesOpen] =
    useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPrice, setSelectedPrice] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("popular");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [toast, setToast] =
    useState("");

  /* =========================================================
     FILTER + SORT
     ========================================================= */

  const filteredProducts = useMemo(() => {
    let products = [...bestSellerProducts];

    if (selectedCategory !== "All") {
      products = products.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    if (selectedPrice !== "all") {
      products = products.filter((product) => {
        switch (selectedPrice) {
          case "under-50":
            return product.price < 50000;

          case "50-100":
            return (
              product.price >= 50000 &&
              product.price <= 100000
            );

          case "100-150":
            return (
              product.price > 100000 &&
              product.price <= 150000
            );

          case "150-plus":
            return product.price > 150000;

          default:
            return true;
        }
      });
    }

    if (searchTerm.trim()) {
      const query =
        searchTerm.toLowerCase().trim();

      products = products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query)
      );
    }

    switch (sortBy) {
      case "price-low":
        products.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        products.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        products.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "newest":
        products.sort(
          (a, b) =>
            b.popularRank - a.popularRank
        );
        break;

      case "popular":
      default:
        products.sort(
          (a, b) =>
            a.popularRank - b.popularRank
        );
        break;
    }

    return products;
  }, [
    selectedCategory,
    selectedPrice,
    sortBy,
    searchTerm,
  ]);

  /* =========================================================
     ACTIONS
     ========================================================= */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__bestSellerToastTimer
    );

    window.__bestSellerToastTimer =
      window.setTimeout(() => {
        setToast("");
      }, 2200);
  };

  const handleQuickAdd = (product) => {
    addToCart(product, {
      quantity: 1,
    });

    showToast(
      `${product.name} added to your cart`
    );
  };

  const handleSave = (product) => {
    toggleSavedProduct(product);

    if (isSaved(product.id)) {
      showToast(
        `${product.name} removed from saved items`
      );
    } else {
      showToast(`${product.name} saved`);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPrice("all");
    setSearchTerm("");
    setSortBy("popular");
  };

  /* =========================================================
     HEADER
     ========================================================= */

  const Header = () => (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              className="shrink-0 text-[22px] font-semibold tracking-[-0.04em] text-black"
            >
              KC Store
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden items-center gap-8 lg:flex">

              <Link
                to="/"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                Shop
              </Link>

              <Link
                to="/new-arrivals"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                New Arrivals
              </Link>

              <Link
                to="/best-sellers"
                className="relative text-[13px] font-medium text-black after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-black after:content-['']"
              >
                Best Sellers
              </Link>

              {/* Categories Dropdown */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setCategoriesOpen(
                      (current) => !current
                    )
                  }
                  className="flex items-center gap-1 rounded-lg py-2 text-[13px] text-[#63666A] transition hover:text-black"
                >
                  Categories

                  <Icon
                    name="arrowDown"
                    size={13}
                  />
                </button>

                {categoriesOpen && (
                  <div className="absolute left-1/2 top-[calc(100%+10px)] w-[230px] -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.10)]">

                    {[
                      ["Women's Bags", "womens-bags"],
                      ["Watches", "watches"],
                      ["Clothing", "clothing"],
                      ["Shoes", "shoes"],
                      ["Jewelry", "jewelry"],
                      ["Accessories", "accessories"],
                    ].map(
                      ([label, slug]) => (
                        <Link
                          key={slug}
                          to={`/categories/${slug}`}
                          onClick={() =>
                            setCategoriesOpen(
                              false
                            )
                          }
                          className="flex items-center justify-between rounded-xl px-3 py-3 text-[13px] text-[#63666A] transition hover:bg-[#f6f6f4] hover:text-black"
                        >
                          <span>
                            {label}
                          </span>

                          <Icon
                            name="arrowRight"
                            size={13}
                          />
                        </Link>
                      )
                    )}

                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                About
              </Link>

              <Link
                to="/track-order"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                Track Order
              </Link>

              <Link
                to="/contact"
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                Contact
              </Link>

            </nav>

            {/* Header Actions */}

            <div className="flex items-center gap-1 sm:gap-2">

              <Link
                to="/search"
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
              >
                <Icon
                  name="search"
                  size={19}
                />
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
              >
                <Icon
                  name="bag"
                  size={19}
                />

                {totalItems > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                    {totalItems > 99
                      ? "99+"
                      : totalItems}
                  </span>
                )}
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => {
                  setMobileMenuOpen(
                    (current) => !current
                  );
                  setMobileCategoriesOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] lg:hidden"
              >
                <Icon
                  name={
                    mobileMenuOpen
                      ? "x"
                      : "menu"
                  }
                  size={20}
                />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION DRAWER
      ====================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileCategoriesOpen(false);
            }}
            className="absolute inset-0 bg-black/40"
          />

          {/* Mobile Drawer */}

          <aside className="absolute right-0 top-0 flex h-[100dvh] w-[80%] flex-col overflow-hidden bg-white shadow-2xl">

            {/* Drawer Header */}

            <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-6 py-5">

              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="text-[21px] font-semibold tracking-[-0.05em] text-black"
              >
                KC Store
              </Link>

              <button
                type="button"
                aria-label="Close mobile menu"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]"
              >
                <Icon
                  name="x"
                  size={19}
                />
              </button>

            </div>

            {/* Scrollable Mobile Links */}

            <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-8">

              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                Shop
              </Link>

              <Link
                to="/new-arrivals"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                New Arrivals
              </Link>

              <Link
                to="/best-sellers"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="relative shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-black after:content-['']"
              >
                Best Sellers
              </Link>

              {/* Mobile Categories */}

              <div className="shrink-0 border-b border-black/5">

                <button
                  type="button"
                  onClick={() =>
                    setMobileCategoriesOpen(
                      (current) => !current
                    )
                  }
                  aria-expanded={
                    mobileCategoriesOpen
                  }
                  aria-haspopup="menu"
                  className="flex w-full items-center justify-between py-5 text-left text-[17px] font-medium text-black"
                >
                  <span>
                    Categories
                  </span>

                  <Icon
                    name="arrowDown"
                    size={17}
                  />
                </button>

                {mobileCategoriesOpen && (
                  <div className="flex flex-col pb-4 pl-3">

                    <Link
                      to="/categories/womens-bags"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Women's Bags
                      </span>

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/watches"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Watches
                      </span>

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/clothing"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Clothing
                      </span>

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/shoes"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Shoes
                      </span>

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/jewelry"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Jewelry
                      </span>

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </Link>

                    <Link
                      to="/categories/accessories"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[14px] text-[#63666A] transition hover:bg-[#f7f7f6] hover:text-black"
                    >
                      <span>
                        Accessories
                      </span>

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
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                About
              </Link>

              <Link
                to="/track-order"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                Track Order
              </Link>

              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className="shrink-0 border-b border-black/5 py-5 text-[17px] font-medium text-[#63666A] transition hover:text-black"
              >
                Contact
              </Link>

            </nav>

          </aside>

        </div>
      )}
    </>
  );

  /* =========================================================
     PRODUCT CARD
     ========================================================= */

  const ProductCard = ({ product }) => {
    const saved = isSaved(product.id);

    return (
      <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white">

        {/* Product Image */}

        <div className="relative overflow-hidden bg-[#f4f4f2]">

          <Link
            to={`/product/${product.slug}`}
            className="block"
          >
            <div className="aspect-[4/5] overflow-hidden">

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />

            </div>
          </Link>

          {/* Badge */}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">

            {product.badge && (
              <span className="rounded-full bg-black px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white">
                {product.badge}
              </span>
            )}

            {product.discount && (
              <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold tracking-[0.08em] text-black">
                {product.discount}
              </span>
            )}

          </div>

          {/* Wishlist */}

          <button
            type="button"
            aria-label={
              saved
                ? "Remove from saved"
                : "Save product"
            }
            onClick={() =>
              handleSave(product)
            }
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-black shadow-sm transition hover:bg-black hover:text-white"
          >
            <Icon
              name="heart"
              size={17}
              className={
                saved
                  ? "fill-current"
                  : ""
              }
            />
          </button>

          {/* Quick Add */}

          <div className="absolute bottom-3 left-3 right-3">

            <button
              type="button"
              onClick={() =>
                handleQuickAdd(product)
              }
              className="w-full translate-y-0 rounded-xl bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white opacity-100 transition hover:bg-[#252525] sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            >
              Quick Add
            </button>

          </div>

        </div>

        {/* Product Information */}

        <div className="rounded-b-2xl bg-white p-4">

          <Link
            to={`/product/${product.slug}`}
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[#808080]">
              {product.category}
            </p>

            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-black transition hover:text-[#63666A]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-1.5">

            <div className="flex items-center gap-0.5">

              <Icon
                name="star"
                size={13}
                className="fill-current text-black"
              />

              <span className="text-[12px] font-medium text-black">
                {product.rating}
              </span>

            </div>

            <span className="text-[12px] text-[#9a9a9a]">
              ({product.reviews})
            </span>

          </div>

          <div className="mt-2 flex items-center gap-2">

            <span className="text-[15px] font-semibold text-black">
              {formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-[13px] text-[#9a9a9a] line-through">
                {formatPrice(
                  product.oldPrice
                )}
              </span>
            )}

          </div>

        </div>

      </article>
    );
  };

  /* =========================================================
     FILTER PANEL
     ========================================================= */

  const FilterContent = () => (
    <div className="space-y-8">

      {/* Categories */}

      <div className="rounded-2xl border border-black/10 p-4">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-black">
            Category
          </h3>

          <span className="text-[11px] text-[#9a9a9a]">
            {selectedCategory === "All"
              ? "All"
              : selectedCategory}
          </span>

        </div>

        <div className="space-y-1">

          {categories.map(
            (category) => {
              const count =
                category === "All"
                  ? bestSellerProducts.length
                  : bestSellerProducts.filter(
                      (product) =>
                        product.category ===
                        category
                    ).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition ${
                    selectedCategory ===
                    category
                      ? "bg-black font-medium text-white"
                      : "text-[#63666A] hover:bg-[#f5f5f3] hover:text-black"
                  }`}
                >
                  <span>
                    {category}
                  </span>

                  <span
                    className={
                      selectedCategory ===
                      category
                        ? "text-white/70"
                        : "text-[#9a9a9a]"
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}

        </div>

      </div>

      {/* Price */}

      <div className="rounded-2xl border border-black/10 p-4">

        <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-black">
          Price
        </h3>

        <div className="space-y-1">

          {priceRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() =>
                setSelectedPrice(
                  range.value
                )
              }
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition ${
                selectedPrice ===
                range.value
                  ? "bg-black font-medium text-white"
                  : "text-[#63666A] hover:bg-[#f5f5f3] hover:text-black"
              }`}
            >
              <span>
                {range.label}
              </span>

              {selectedPrice ===
                range.value && (
                <Icon
                  name="check"
                  size={14}
                />
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Clear */}

      {(
        selectedCategory !== "All" ||
        selectedPrice !== "all" ||
        searchTerm
      ) && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-xl border border-black px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
        >
          Clear Filters
        </button>
      )}

    </div>
  );

  /* =========================================================
     MAIN
     ========================================================= */

  return (
    <div className="min-h-screen bg-white text-black">

      <Header />

      {/* =====================================================
         PAGE HERO
         ===================================================== */}

      <section className="border-b border-black/10 bg-[#f5f5f3]">

        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">

            <div>

              <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">

                <Link
                  to="/"
                  className="transition hover:text-black"
                >
                  Home
                </Link>

                <span>/</span>

                <span className="text-black">
                  Best Sellers
                </span>

              </div>

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#63666A]">
                CUSTOMER FAVORITES
              </p>

              <h1 className="max-w-[700px] text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Best Sellers
              </h1>

              <p className="mt-5 max-w-[590px] text-[14px] leading-7 text-[#63666A] sm:text-[15px]">
                Discover the pieces our customers keep coming back for.
                Explore the most-loved bags, watches, clothing and shoes from
                KC Store.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#252525]"
                >
                  Shop Best Sellers

                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </a>

                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center rounded-xl border border-black/15 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-black transition hover:border-black"
                >
                  View New Arrivals
                </Link>

              </div>

            </div>

            {/* Hero Image */}

            <div className="relative overflow-hidden rounded-2xl">

              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8e8e5]">

                <img
                  src={bestSellerProducts[0].image}
                  alt="KC Store best sellers"
                  className="h-full w-full object-cover"
                />

              </div>

              <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 sm:bottom-6 sm:left-6">

                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#808080]">
                  Featured
                </p>

                <p className="mt-1 text-sm font-medium">
                  {
                    bestSellerProducts[0]
                      .name
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         FEATURE STRIP
         ===================================================== */}

      <section className="border-b border-black/10">

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          <div className="flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-10">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
              <Icon
                name="star"
                size={17}
              />
            </div>

            <div>

              <p className="text-[12px] font-semibold text-black">
                Customer Favorites
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                Pieces loved by our shoppers
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-10">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
              <Icon
                name="truck"
                size={17}
              />
            </div>

            <div>

              <p className="text-[12px] font-semibold text-black">
                Quick Delivery
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                Reliable delivery services
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-10">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
              <Icon
                name="shield"
                size={17}
              />
            </div>

            <div>

              <p className="text-[12px] font-semibold text-black">
                Secure Checkout
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                Safe and protected payments
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         PRODUCTS SECTION
         ===================================================== */}

      <section
        id="products"
        className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10"
      >

        {/* Section Heading */}

        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#808080]">
              MOST LOVED
            </p>

            <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Shop Best Sellers
            </h2>

          </div>

          <p className="max-w-[480px] text-[13px] leading-6 text-[#808080] lg:text-right">
            Explore the products currently getting the most attention from our
            customers.
          </p>

        </div>

        {/* Search + Category Pills */}

        <div className="mb-8 rounded-2xl border-y border-black/10 py-5">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}

            <div className="relative w-full xl:max-w-[330px]">

              <div className="flex h-11 items-center rounded-xl border border-black/10 bg-white transition focus-within:border-black">

                <Icon
                  name="search"
                  size={17}
                  className="ml-3.5 shrink-0 text-[#808080]"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search best sellers..."
                  aria-label="Search best sellers"
                  className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[13px] text-black outline-none placeholder:text-[#a0a0a0]"
                />

              </div>

            </div>

            {/* Categories */}

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

              {categories.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-[11px] font-medium transition ${
                      selectedCategory ===
                      category
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white text-[#63666A] hover:border-black hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}

            </div>

          </div>

        </div>

        {/* Toolbar */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[12px] text-[#808080]">

            Showing{" "}

            <span className="font-medium text-black">
              {
                filteredProducts.length
              }
            </span>{" "}

            {
              filteredProducts.length === 1
                ? "product"
                : "products"
            }

          </p>

          <div className="flex items-center gap-2">

            {/* Mobile Filter */}

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  true
                )
              }
              className="flex h-10 items-center gap-2 rounded-xl border border-black/10 px-4 text-[11px] font-semibold uppercase tracking-[0.11em] text-black transition hover:border-black hover:bg-[#f7f7f6]"
              aria-label="Open filters"
            >
              <Icon
                name="sliders"
                size={15}
              />

              Filters

            </button>

            {/* Sort */}

            <div className="relative">

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                className="h-10 min-w-[180px] appearance-none rounded-xl border border-black/10 bg-white pl-4 pr-10 text-[12px] text-black outline-none focus:border-black"
                aria-label="Sort products"
              >

                {sortOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

        {/* Desktop Product Area */}

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">

          {/* Desktop Sidebar */}

          <aside className="hidden lg:block">
            <FilterContent />
          </aside>

          {/* Products */}

          <div>

            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">

                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-black/10 px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f3]">

                  <Icon
                    name="search"
                    size={20}
                  />

                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                  No products found
                </h3>

                <p className="mt-2 max-w-[400px] text-[13px] leading-6 text-[#808080]">
                  Try changing your search, category or price filters to see
                  more best-selling products.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#252525]"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* =====================================================
         WHY SHOP WITH US
         ===================================================== */}

      <section className="border-y border-black/10 bg-[#f5f5f3]">

        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">

            <div>

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                THE KC STORE EXPERIENCE
              </p>

              <h2 className="max-w-[480px] text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Products customers keep coming back for.
              </h2>

              <p className="mt-5 max-w-[480px] text-[14px] leading-7 text-[#63666A]">
                From everyday essentials to standout pieces, our best sellers
                bring together the products shoppers consistently choose.
              </p>

              <Link
                to="/shop"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-black bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:bg-black hover:text-white"
              >
                Explore The Shop

                <Icon
                  name="arrowRight"
                  size={15}
                />
              </Link>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-6">

                <Icon
                  name="headset"
                  size={21}
                />

                <h3 className="mt-5 text-[14px] font-semibold">
                  Dealer Support
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Need more details before buying? Chat directly with the
                  dealer from any product page.
                </p>

              </div>

              <div className="rounded-2xl bg-white p-6">

                <Icon
                  name="refresh"
                  size={21}
                />

                <h3 className="mt-5 text-[14px] font-semibold">
                  Easy Returns
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Shop with confidence with our straightforward returns
                  process.
                </p>

              </div>

              <div className="rounded-2xl bg-white p-6">

                <Icon
                  name="truck"
                  size={21}
                />

                <h3 className="mt-5 text-[14px] font-semibold">
                  Flexible Delivery
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Reliable delivery options designed around your shopping
                  needs.
                </p>

              </div>

              <div className="rounded-2xl bg-white p-6">

                <Icon
                  name="shield"
                  size={21}
                />

                <h3 className="mt-5 text-[14px] font-semibold">
                  Secure Payments
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Your checkout information stays protected throughout your
                  purchase.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         FOOTER
         ===================================================== */}

      <Footer />

      {/* =====================================================
         MOBILE FILTER DRAWER
         ===================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer */}

          <aside className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-5">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                  Refine
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                  Filters
                </h3>

              </div>

              <button
                type="button"
                aria-label="Close filters"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
              >
                <Icon
                  name="x"
                  size={18}
                />
              </button>

            </div>

            <FilterContent />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              className="mt-8 w-full rounded-xl bg-black py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white"
            >
              Apply Filters
            </button>

          </aside>

        </div>
      )}

      {/* =====================================================
         TOAST
         ===================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3.5 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}

    </div>
  );
}