import { useState, useMemo } from "react";
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
        <path d="m18 6-12 12" />
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

    chevronDown: <path d="m6 9 6 6 6-6" />,

    chevronUp: <path d="m18 15-6-6-6 6" />,

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

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
  };

  return <svg {...common}>{icons[name]}</svg>;
};

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

/* =========================================================
   NEW ARRIVAL PRODUCTS
========================================================= */

const products = [
  {
    id: "classic-oversized-hoodie",
    name: "Classic Oversized Hoodie",
    category: "Clothing",
    price: 59900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 120,
    color: "Black",
    size: ["S", "M", "L", "XL"],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "air-motion-sneakers",
    name: "Air Motion Sneakers",
    category: "Shoes",
    price: 74900,
    oldPrice: 94900,
    discount: "-21%",
    badge: null,
    rating: 4.7,
    reviews: 98,
    color: "White",
    size: ["39", "40", "41", "42", "43", "44"],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    category: "Accessories",
    price: 39900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 156,
    color: "Black",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "minimal-series-watch",
    name: "Minimal Series Watch",
    category: "Watches",
    price: 129900,
    oldPrice: 149900,
    discount: "-13%",
    badge: null,
    rating: 4.8,
    reviews: 87,
    color: "Silver",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "stainless-steel-bottle",
    name: "Stainless Steel Bottle",
    category: "Accessories",
    price: 24900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.6,
    reviews: 76,
    color: "Silver",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "classic-frame-sunglasses",
    name: "Classic Frame Sunglasses",
    category: "Accessories",
    price: 44900,
    oldPrice: 49900,
    discount: "-10%",
    badge: null,
    rating: 4.7,
    reviews: 113,
    color: "Black",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "premium-leather-handbag",
    name: "Premium Leather Handbag",
    category: "Women's Bags",
    price: 89900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 64,
    color: "Brown",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "urban-crossbody-bag",
    name: "Urban Crossbody Bag",
    category: "Women's Bags",
    price: 67900,
    oldPrice: 79900,
    discount: "-15%",
    badge: null,
    rating: 4.7,
    reviews: 58,
    color: "Black",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "essential-cotton-shirt",
    name: "Essential Cotton Shirt",
    category: "Clothing",
    price: 45900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 91,
    color: "White",
    size: ["S", "M", "L", "XL"],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "modern-knit-cardigan",
    name: "Modern Knit Cardigan",
    category: "Clothing",
    price: 72900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.7,
    reviews: 43,
    color: "Gray",
    size: ["S", "M", "L"],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "classic-leather-loafers",
    name: "Classic Leather Loafers",
    category: "Shoes",
    price: 84900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 52,
    color: "Brown",
    size: ["39", "40", "41", "42", "43"],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85",
  },

  {
    id: "silver-minimal-watch",
    name: "Silver Minimal Watch",
    category: "Watches",
    price: 114900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 72,
    color: "Silver",
    size: [],
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=85",
  },
];

/* =========================================================
   STAR RATING
========================================================= */

const Stars = ({ rating }) => (
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

/* =========================================================
   PRODUCT CARD
========================================================= */

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  saved,
}) => {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/4.8] overflow-hidden rounded-2xl bg-[#f5f5f3]">

        {(product.badge || product.discount) && (
          <div className="absolute left-3 top-3 z-10">
            <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
              {product.badge || product.discount}
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label={
            saved
              ? "Remove product from saved products"
              : "Save product"
          }
          onClick={() =>
            onToggleWishlist(product)
          }
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

        <Link
          to={`/product/${product.id}`}
          className="block h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() =>
            onAddToCart(product)
          }
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
          to={`/product/${product.id}`}
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
              {formatPrice(
                product.oldPrice
              )}
            </span>
          )}

        </div>

        <div className="mt-1.5 flex items-center gap-1.5">

          <Stars
            rating={product.rating}
          />

          <span className="text-[11px] text-[#808080]">
            ({product.reviews})
          </span>

        </div>

      </div>
    </article>
  );
};

/* =========================================================
   FILTER SECTION
========================================================= */

const FilterSection = ({
  title,
  children,
  open,
  onToggle,
}) => {
  return (
    <div className="border-b border-black/[0.08] py-5">

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between"
      >

        <span className="text-[12px] font-semibold">
          {title}
        </span>

        <Icon
          name={
            open
              ? "chevronUp"
              : "chevronDown"
          }
          size={15}
          strokeWidth={1.7}
        />

      </button>

      {open && (
        <div className="mt-4">
          {children}
        </div>
      )}

    </div>
  );
};

/* =========================================================
   NEW ARRIVALS PAGE
========================================================= */

export default function NewArrivals() {
  const {
    addToCart,
    toggleSavedProduct,
    isSaved,
    totalItems,
  } = useCart();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [categoryMenuOpen, setCategoryMenuOpen] =
    useState(false);

  const [
    mobileCategoriesOpen,
    setMobileCategoriesOpen,
  ] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedColors, setSelectedColors] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState([]);

  const [selectedStock, setSelectedStock] =
    useState("All");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Most Recent");

  const [openFilters, setOpenFilters] =
    useState({
      category: true,
      price: true,
      color: true,
      size: false,
      availability: false,
    });

  const [toast, setToast] =
    useState("");

  /* =======================================================
     TOAST
  ====================================================== */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__novaNewArrivalsToast
    );

    window.__novaNewArrivalsToast =
      window.setTimeout(() => {
        setToast("");
      }, 2500);
  };

  /* =======================================================
     FILTER DATA
  ====================================================== */

  const categories = [
    "All",
    "Women's Bags",
    "Watches",
    "Clothing",
    "Shoes",
    "Jewelry",
    "Accessories",
  ];

  const colors = [
    "Black",
    "White",
    "Brown",
    "Gray",
    "Silver",
  ];

  const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
  ];

  /* =======================================================
     FILTER PRODUCTS
  ====================================================== */

  const filteredProducts = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    const minimum =
      minPrice === ""
        ? 0
        : Number(minPrice);

    const maximum =
      maxPrice === ""
        ? Infinity
        : Number(maxPrice);

    const filtered =
      products.filter(
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
            selectedCategory ===
              "All" ||
            product.category ===
              selectedCategory;

          const matchesColor =
            selectedColors.length === 0 ||
            selectedColors.includes(
              product.color
            );

          const matchesSize =
            selectedSizes.length === 0 ||
            selectedSizes.some(
              (size) =>
                product.size.includes(
                  size
                )
            );

          const matchesStock =
            selectedStock ===
              "All" ||
            product.stock ===
              selectedStock;

          const matchesPrice =
            product.price >=
              minimum &&
            product.price <=
              maximum;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesColor &&
            matchesSize &&
            matchesStock &&
            matchesPrice
          );
        }
      );

    return [...filtered].sort(
      (a, b) => {
        const aIndex =
          products.indexOf(a);

        const bIndex =
          products.indexOf(b);

        switch (sortBy) {
          case "Oldest":
            return (
              bIndex - aIndex
            );

          case "Most Rated":
            return (
              b.rating - a.rating
            );

          case "Most Recent":
          default:
            return (
              aIndex - bIndex
            );
        }
      }
    );
  }, [
    searchTerm,
    selectedCategory,
    selectedColors,
    selectedSizes,
    selectedStock,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  /* =======================================================
     ACTIVE FILTER COUNT
  ====================================================== */

  const activeFilterCount =
    (selectedCategory !== "All"
      ? 1
      : 0) +
    selectedColors.length +
    selectedSizes.length +
    (selectedStock !== "All"
      ? 1
      : 0) +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" ? 1 : 0);

  /* =======================================================
     TOGGLE HELPERS
  ====================================================== */

  const toggleColor = (color) => {
    setSelectedColors(
      (current) =>
        current.includes(color)
          ? current.filter(
              (item) =>
                item !== color
            )
          : [...current, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(
      (current) =>
        current.includes(size)
          ? current.filter(
              (item) =>
                item !== size
            )
          : [...current, size]
    );
  };

  const toggleFilter = (filter) => {
    setOpenFilters(
      (current) => ({
        ...current,
        [filter]:
          !current[filter],
      })
    );
  };

  /* =======================================================
     CLEAR FILTERS
  ====================================================== */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStock("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("Most Recent");
  };

  /* =======================================================
     ADD TO CART
     Cart state comes from CartContext.
  ====================================================== */

  const handleAddToCart = (
    product
  ) => {
    addToCart(product, {
      selectedColor:
        product.color,
      selectedSize:
        product.size.length > 0
          ? product.size[0]
          : null,
      quantity: 1,
    });

    showToast(
      `${product.name} added to cart`
    );
  };

  /* =======================================================
     WISHLIST
  ====================================================== */

  const handleToggleWishlist = (
    product
  ) => {
    const added =
      toggleSavedProduct(
        product
      );

    showToast(
      added
        ? "Product saved"
        : "Removed from saved products"
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">

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
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
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
              className="relative py-2 text-[13px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
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
                          setCategoryMenuOpen(
                            false
                          )
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
                          setCategoryMenuOpen(
                            false
                          )
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
                          setCategoryMenuOpen(
                            false
                          )
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
                          setCategoryMenuOpen(
                            false
                          )
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
                          setCategoryMenuOpen(
                            false
                          )
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
                          setCategoryMenuOpen(
                            false
                          )
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
              href="/track-order"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Track Order
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

            <a
              href="/cart"
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
            </a>

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

        {/* ===================================================
            PAGE HERO
        ==================================================== */}

        <section className="border-b border-black/[0.07] bg-[#f7f7f6] px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-[1440px]">

            <div className="max-w-[720px]">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#808080]">
                Just In
              </p>

              <h1 className="mt-3 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[55px] lg:text-[64px]">
                New Arrivals
              </h1>

              <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-[#63666A] sm:text-[15px]">
                Discover our latest collection of fashion,
                accessories and everyday essentials, freshly
                added to the store.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white transition hover:bg-[#222]"
                >
                  Shop All Products

                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </Link>

                <span className="text-[11px] text-[#808080]">
                  {products.length} new products
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            SEARCH
        ==================================================== */}

        <section className="px-5 pt-8 sm:px-7 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center text-[#808080]">

                <Icon
                  name="search"
                  size={18}
                />

              </span>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search new arrivals..."
                className="w-full rounded-xl border border-black/10 bg-[#f7f7f6] py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#808080] focus:border-black"
              />

            </div>

          </div>

        </section>

        {/* ===================================================
            CATEGORY TABS
        ==================================================== */}

        <section className="px-5 pt-5 sm:px-7 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex gap-2 overflow-x-auto pb-1">

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
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-[#f5f5f3] text-[#63666A] hover:text-black"
                    }`}
                  >
                    {category}
                  </button>

                )
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            SHOP CONTENT
        ==================================================== */}

        <section className="px-5 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-[12px] text-[#808080]">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "product"
                    : "products"}
                </p>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-1 text-[11px] font-medium underline underline-offset-4"
                  >
                    Clear {activeFilterCount} filters
                  </button>
                )}

              </div>

              <div className="flex items-center gap-2">

                {/* Mobile Filters */}

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      true
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-[11px] font-medium lg:hidden"
                >
                  <Icon
                    name="filter"
                    size={15}
                  />

                  Filters

                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white">
                      {activeFilterCount}
                    </span>
                  )}

                </button>

                {/* Sorting */}

              </div>

            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">

              {/* =================================================
                  DESKTOP FILTER SIDEBAR
              ================================================== */}

              <aside className="hidden lg:block">

                <div className="sticky top-[100px]">

                  <div className="flex items-center justify-between">

                    <h2 className="text-[13px] font-semibold">
                      Filters
                    </h2>

                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={
                          clearFilters
                        }
                        className="text-[10px] font-medium text-[#808080] hover:text-black"
                      >
                        Clear all
                      </button>
                    )}

                  </div>

                  {/* Category */}

                  <FilterSection
                    title="Category"
                    open={
                      openFilters.category
                    }
                    onToggle={() =>
                      toggleFilter(
                        "category"
                      )
                    }
                  >

                    <div className="flex flex-col gap-3">

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
                            className="flex items-center gap-3 text-left text-[11px]"
                          >

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                selectedCategory === category
                                  ? "border-black bg-black text-white"
                                  : "border-black/20"
                              }`}
                            >

                              {selectedCategory === category && (
                                <Icon
                                  name="check"
                                  size={11}
                                  strokeWidth={2}
                                />
                              )}

                            </span>

                            <span
                              className={
                                selectedCategory === category
                                  ? "font-medium"
                                  : "text-[#63666A]"
                              }
                            >
                              {category}
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  </FilterSection>

                  {/* Price */}

                  <FilterSection
                    title="Price"
                    open={
                      openFilters.price
                    }
                    onToggle={() =>
                      toggleFilter("price")
                    }
                  >

                    <div className="grid grid-cols-2 gap-2">

                      <input
                        type="number"
                        value={minPrice}
                        onChange={(event) =>
                          setMinPrice(
                            event.target.value
                          )
                        }
                        placeholder="Min"
                        className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[11px] outline-none focus:border-black"
                      />

                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(event) =>
                          setMaxPrice(
                            event.target.value
                          )
                        }
                        placeholder="Max"
                        className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[11px] outline-none focus:border-black"
                      />

                    </div>

                  </FilterSection>

                  {/* Color */}

                  <FilterSection
                    title="Color"
                    open={
                      openFilters.color
                    }
                    onToggle={() =>
                      toggleFilter("color")
                    }
                  >

                    <div className="flex flex-col gap-3">

                      {colors.map(
                        (color) => (

                          <button
                            key={color}
                            type="button"
                            onClick={() =>
                              toggleColor(
                                color
                              )
                            }
                            className="flex items-center gap-3 text-left text-[11px]"
                          >

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                selectedColors.includes(
                                  color
                                )
                                  ? "border-black bg-black text-white"
                                  : "border-black/20"
                              }`}
                            >

                              {selectedColors.includes(
                                color
                              ) && (
                                <Icon
                                  name="check"
                                  size={11}
                                  strokeWidth={2}
                                />
                              )}

                            </span>

                            <span>
                              {color}
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  </FilterSection>

                  {/* Size */}

                  <FilterSection
                    title="Size"
                    open={
                      openFilters.size
                    }
                    onToggle={() =>
                      toggleFilter("size")
                    }
                  >

                    <div className="flex flex-wrap gap-2">

                      {sizes.map(
                        (size) => (

                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              toggleSize(
                                size
                              )
                            }
                            className={`min-w-9 rounded-lg border px-2.5 py-2 text-[10px] font-medium ${
                              selectedSizes.includes(
                                size
                              )
                                ? "border-black bg-black text-white"
                                : "border-black/10 hover:border-black/30"
                            }`}
                          >
                            {size}
                          </button>

                        )
                      )}

                    </div>

                  </FilterSection>

                  {/* Availability */}

                  <FilterSection
                    title="Availability"
                    open={
                      openFilters.availability
                    }
                    onToggle={() =>
                      toggleFilter(
                        "availability"
                      )
                    }
                  >

                    <div className="flex flex-col gap-3">

                      {[
                        "All",
                        "In Stock",
                      ].map(
                        (stock) => (

                          <button
                            key={stock}
                            type="button"
                            onClick={() =>
                              setSelectedStock(
                                stock
                              )
                            }
                            className="flex items-center gap-3 text-left text-[11px]"
                          >

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                selectedStock === stock
                                  ? "border-black bg-black text-white"
                                  : "border-black/20"
                              }`}
                            >

                              {selectedStock === stock && (
                                <Icon
                                  name="check"
                                  size={11}
                                  strokeWidth={2}
                                />
                              )}

                            </span>

                            {stock}

                          </button>

                        )
                      )}

                    </div>

                  </FilterSection>

                </div>

              </aside>

              {/* =================================================
                  PRODUCTS
              ================================================== */}

              <div>

                {filteredProducts.length > 0 ? (

                  <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">

                    {filteredProducts.map(
                      (product) => (

                        <ProductCard
                          key={product.id}
                          product={
                            product
                          }
                          onAddToCart={
                            handleAddToCart
                          }
                          onToggleWishlist={
                            handleToggleWishlist
                          }
                          saved={isSaved(
                            product.id
                          )}
                        />

                      )
                    )}

                  </div>

                ) : (

                  <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-[#f7f7f6] px-6 text-center">

                    <div>

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">

                        <Icon
                          name="search"
                          size={22}
                        />

                      </div>

                      <h3 className="mt-5 text-[18px] font-semibold">
                        No products found
                      </h3>

                      <p className="mx-auto mt-2 max-w-[400px] text-[12px] leading-6 text-[#808080]">
                        We couldn't find any new arrivals
                        matching your current filters.
                        Try changing your search or
                        clearing some filters.
                      </p>

                      <button
                        type="button"
                        onClick={
                          clearFilters
                        }
                        className="mt-5 rounded-xl bg-black px-5 py-3 text-[11px] font-medium text-white transition hover:bg-[#222]"
                      >
                        Clear Filters
                      </button>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            BENEFITS
        ==================================================== */}

        <section className="border-y border-black/[0.07]">

          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "truck",
                title: "Free Shipping",
                text: "On orders over $50",
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
            ].map(
              (item, index) => (

                <div
                  key={item.title}
                  className={`flex items-center gap-4 px-5 py-6 sm:px-7 lg:px-8 ${
                    index < 3
                      ? "border-b border-black/[0.07] lg:border-b-0 lg:border-r"
                      : ""
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

              )
            )}

          </div>

        </section>

      </main>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFiltersOpen(
                false
              )
            }
          />

          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-[400px] flex-col bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-5">

              <div>

                <h2 className="text-[15px] font-semibold">
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <p className="mt-1 text-[10px] text-[#808080]">
                    {activeFilterCount} active
                  </p>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f3]"
              >
                <Icon
                  name="close"
                  size={18}
                />
              </button>

            </div>

            <div className="flex-1 overflow-y-auto px-5">

              {/* Category */}

              <FilterSection
                title="Category"
                open={
                  openFilters.category
                }
                onToggle={() =>
                  toggleFilter(
                    "category"
                  )
                }
              >

                <div className="flex flex-col gap-3">

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
                        className="flex items-center gap-3 text-left text-[11px]"
                      >

                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            selectedCategory === category
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                          }`}
                        >

                          {selectedCategory === category && (
                            <Icon
                              name="check"
                              size={11}
                              strokeWidth={2}
                            />
                          )}

                        </span>

                        {category}

                      </button>

                    )
                  )}

                </div>

              </FilterSection>

              {/* Price */}

              <FilterSection
                title="Price"
                open={
                  openFilters.price
                }
                onToggle={() =>
                  toggleFilter("price")
                }
              >

                <div className="grid grid-cols-2 gap-2">

                  <input
                    type="number"
                    value={minPrice}
                    onChange={(event) =>
                      setMinPrice(
                        event.target.value
                      )
                    }
                    placeholder="Min"
                    className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[11px] outline-none focus:border-black"
                  />

                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(
                        event.target.value
                      )
                    }
                    placeholder="Max"
                    className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[11px] outline-none focus:border-black"
                  />

                </div>

              </FilterSection>

              {/* Color */}

              <FilterSection
                title="Color"
                open={
                  openFilters.color
                }
                onToggle={() =>
                  toggleFilter("color")
                }
              >

                <div className="flex flex-col gap-3">

                  {colors.map(
                    (color) => (

                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          toggleColor(
                            color
                          )
                        }
                        className="flex items-center gap-3 text-left text-[11px]"
                      >

                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            selectedColors.includes(
                              color
                            )
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                          }`}
                        >

                          {selectedColors.includes(
                            color
                          ) && (
                            <Icon
                              name="check"
                              size={11}
                              strokeWidth={2}
                            />
                          )}

                        </span>

                        {color}

                      </button>

                    )
                  )}

                </div>

              </FilterSection>

              {/* Size */}

              <FilterSection
                title="Size"
                open={
                  openFilters.size
                }
                onToggle={() =>
                  toggleFilter("size")
                }
              >

                <div className="flex flex-wrap gap-2">

                  {sizes.map(
                    (size) => (

                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          toggleSize(
                            size
                          )
                        }
                        className={`min-w-9 rounded-lg border px-2.5 py-2 text-[10px] font-medium ${
                          selectedSizes.includes(
                            size
                          )
                            ? "border-black bg-black text-white"
                            : "border-black/10 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>

                    )
                  )}

                </div>

              </FilterSection>

              {/* Availability */}

              <FilterSection
                title="Availability"
                open={
                  openFilters.availability
                }
                onToggle={() =>
                  toggleFilter(
                    "availability"
                  )
                }
              >

                <div className="flex flex-col gap-3">

                  {[
                    "All",
                    "In Stock",
                  ].map(
                    (stock) => (

                      <button
                        key={stock}
                        type="button"
                        onClick={() =>
                          setSelectedStock(
                            stock
                          )
                        }
                        className="flex items-center gap-3 text-left text-[11px]"
                      >

                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            selectedStock === stock
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                          }`}
                        >

                          {selectedStock === stock && (
                            <Icon
                              name="check"
                              size={11}
                              strokeWidth={2}
                            />
                          )}

                        </span>

                        {stock}

                      </button>

                    )
                  )}

                </div>

              </FilterSection>

            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-black/[0.08] p-5">

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="rounded-xl border border-black/10 px-4 py-3 text-[11px] font-medium"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="rounded-xl bg-black px-4 py-3 text-[11px] font-medium text-white"
              >
                Show {filteredProducts.length} Products
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}

      <Footer />

    </div>
  );
}
