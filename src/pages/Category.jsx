import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
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
    sliders: (
      <>
        <path d="M4 6h16" />
        <circle cx="9" cy="6" r="2" />
        <path d="M4 12h16" />
        <circle cx="15" cy="12" r="2" />
        <path d="M4 18h16" />
        <circle cx="11" cy="18" r="2" />
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
        <path d="M20 14h-3v5h2a1 1 0 0 1 1-1v-4Z" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
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

const categoryMap = {
  "womens-bags": {
    title: "Women's Bags",
    shortTitle: "Bags",
    description:
      "Discover handbags, shoulder bags and everyday styles designed to complete every look.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=90",
  },
  watches: {
    title: "Watches",
    shortTitle: "Watches",
    description:
      "Shop refined wristwatches that bring timeless design and everyday elegance together.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=90",
  },
  clothing: {
    title: "Clothing",
    shortTitle: "Clothing",
    description:
      "Explore modern clothing essentials made for effortless everyday style.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=90",
  },
  shoes: {
    title: "Shoes",
    shortTitle: "Shoes",
    description:
      "From clean everyday sneakers to polished footwear, find pairs made to move with you.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=90",
  },
  jewelry: {
    title: "Jewelry",
    shortTitle: "Jewelry",
    description:
      "Add the finishing touch with understated jewelry selected for modern wardrobes.",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=90",
  },
  accessories: {
    title: "Accessories",
    shortTitle: "Accessories",
    description:
      "Complete your style with versatile accessories designed for everyday use.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=90",
  },
};

const allProducts = [
  {
    id: "classic-leather-handbag",
    name: "Classic Leather Handbag",
    category: "womens-bags",
    categoryLabel: "Women's Bags",
    price: 89900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 126,
    color: "Brown",
    size: [],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "premium-shoulder-bag",
    name: "Premium Shoulder Bag",
    category: "womens-bags",
    categoryLabel: "Women's Bags",
    price: 109900,
    oldPrice: 129900,
    discount: "-15%",
    badge: null,
    rating: 4.8,
    reviews: 72,
    color: "Black",
    size: [],
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "structured-mini-bag",
    name: "Structured Mini Bag",
    category: "womens-bags",
    categoryLabel: "Women's Bags",
    price: 67900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.7,
    reviews: 81,
    color: "Brown",
    size: [],
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "soft-leather-tote",
    name: "Soft Leather Tote",
    category: "womens-bags",
    categoryLabel: "Women's Bags",
    price: 119900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.9,
    reviews: 94,
    color: "Black",
    size: [],
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: "minimal-leather-watch",
    name: "Minimal Leather Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 129900,
    oldPrice: 149900,
    discount: "-13%",
    badge: null,
    rating: 4.8,
    reviews: 87,
    color: "Brown",
    size: [],
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "silver-minimal-watch",
    name: "Silver Minimal Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 114900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 72,
    color: "Silver",
    size: [],
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "classic-steel-watch",
    name: "Classic Steel Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 154900,
    oldPrice: 174900,
    discount: "-11%",
    badge: null,
    rating: 4.7,
    reviews: 64,
    color: "Silver",
    size: [],
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "modern-classic-watch",
    name: "Modern Classic Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 139900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 53,
    color: "Black",
    size: [],
    image:
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    category: "clothing",
    categoryLabel: "Clothing",
    price: 8900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 104,
    color: "White",
    size: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "classic-oversized-hoodie",
    name: "Classic Oversized Hoodie",
    category: "clothing",
    categoryLabel: "Clothing",
    price: 8000,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 120,
    color: "Black",
    size: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "essential-cotton-shirt",
    name: "Essential Cotton Shirt",
    category: "clothing",
    categoryLabel: "Clothing",
    price: 45900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 91,
    color: "White",
    size: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "modern-knit-cardigan",
    name: "Modern Knit Cardigan",
    category: "clothing",
    categoryLabel: "Clothing",
    price: 72900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.7,
    reviews: 43,
    color: "Gray",
    size: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: "air-motion-sneakers",
    name: "Air Motion Sneakers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 14200,
    oldPrice: 94900,
    discount: "-21%",
    badge: null,
    rating: 4.7,
    reviews: 98,
    color: "White",
    size: ["39", "40", "41", "42", "43", "44"],
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "classic-leather-loafers",
    name: "Classic Leather Loafers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 84900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.8,
    reviews: 52,
    color: "Brown",
    size: ["39", "40", "41", "42", "43"],
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "premium-fashion-sneakers",
    name: "Premium Fashion Sneakers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 119900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 84,
    color: "White",
    size: ["39", "40", "41", "42", "43", "44"],
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "studio-runner-sneakers",
    name: "Studio Runner Sneakers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 89900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 112,
    color: "Black",
    size: ["39", "40", "41", "42", "43"],
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: "minimal-gold-necklace",
    name: "Minimal Gold Necklace",
    category: "jewelry",
    categoryLabel: "Jewelry",
    price: 36900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 76,
    color: "Gold",
    size: [],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "classic-silver-ring",
    name: "Classic Silver Ring",
    category: "jewelry",
    categoryLabel: "Jewelry",
    price: 22900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 58,
    color: "Silver",
    size: [],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "everyday-gold-bracelet",
    name: "Everyday Gold Bracelet",
    category: "jewelry",
    categoryLabel: "Jewelry",
    price: 31900,
    oldPrice: 38900,
    discount: "-18%",
    badge: null,
    rating: 4.7,
    reviews: 49,
    color: "Gold",
    size: [],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    category: "jewelry",
    categoryLabel: "Jewelry",
    price: 27900,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 42,
    color: "White",
    size: [],
    image:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "classic-frame-sunglasses",
    name: "Classic Frame Sunglasses",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 44900,
    oldPrice: 49900,
    discount: "-10%",
    badge: null,
    rating: 4.7,
    reviews: 113,
    color: "Black",
    size: [],
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 12500,
    oldPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 156,
    color: "Black",
    size: [],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=90",
  },
];

const categoryLinks = [
  ["Women's Bags", "womens-bags"],
  ["Watches", "watches"],
  ["Clothing", "clothing"],
  ["Shoes", "shoes"],
  ["Jewelry", "jewelry"],
  ["Accessories", "accessories"],
];

const priceOptions = [
  { label: "All Prices", value: "all" },
  { label: "Under ₦50,000", value: "under-50" },
  { label: "₦50,000 – ₦100,000", value: "50-100" },
  { label: "₦100,000 – ₦150,000", value: "100-150" },
  { label: "₦150,000+", value: "150-plus" },
];

const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Rated", value: "rated" },
];

/* =========================================================
   STARS
========================================================= */

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Icon
        key={star}
        name="star"
        size={12}
        strokeWidth={1.5}
        className={
          star <= Math.round(rating)
            ? "fill-black text-black"
            : "fill-transparent text-black/20"
        }
      />
    ))}
  </div>
);

/* =========================================================
   PRODUCT CARD
========================================================= */

const ProductCard = ({ product, onAddToCart, saved, onToggleSaved }) => (
  <article className="group min-w-0">
    <div className="relative aspect-[4/4.9] overflow-hidden rounded-2xl bg-[#f5f5f3]">
      {(product.badge || product.discount) && (
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {(product.badge || product.discount) && (
            <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-white">
              {product.badge || product.discount}
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        aria-label={saved ? "Remove product from saved" : "Save product"}
        onClick={() => onToggleSaved(product)}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:text-black ${
          saved ? "text-black" : "text-[#63666A]"
        }`}
      >
        <Icon
          name="heart"
          size={17}
          strokeWidth={1.7}
          className={saved ? "fill-current" : ""}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block h-full">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full rounded-xl bg-black px-4 py-3 text-[11px] font-medium text-white transition hover:bg-[#222]"
        >
          Quick Add
        </button>
      </div>
    </div>

    <div className="pt-3.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#808080]">
        {product.categoryLabel}
      </p>

      <Link
        to={`/product/${product.id}`}
        className="mt-1 block text-[14px] font-medium tracking-[-0.01em] transition hover:opacity-60"
      >
        {product.name}
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[15px] font-semibold">
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
        <span className="text-[10px] text-[#808080]">
          ({product.reviews})
        </span>
      </div>
    </div>
  </article>
);

/* =========================================================
   FILTER SECTION
========================================================= */

const FilterSection = ({ title, open, onToggle, children }) => (
  <div className="border-b border-black/[0.08] py-5">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between"
    >
      <span className="text-[12px] font-semibold">{title}</span>
      <Icon
        name={open ? "chevronUp" : "chevronDown"}
        size={15}
        strokeWidth={1.7}
      />
    </button>

    {open && <div className="mt-4">{children}</div>}
  </div>
);

/* =========================================================
   CATEGORY PAGE
========================================================= */

export default function Category() {
  const { category } = useParams();
  const { addToCart, toggleSavedProduct, isSaved, totalItems } = useCart();

  const currentCategory = categoryMap[category];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [
      mobileCategoriesOpen,
      setMobileCategoriesOpen,
    ] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [toast, setToast] = useState("");

  const [openFilters, setOpenFilters] = useState({
    price: true,
    availability: true,
  });

  const [selectedStock, setSelectedStock] = useState("All");

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__novaCategoryToast);
    window.__novaCategoryToast = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const filteredProducts = useMemo(() => {
    if (!currentCategory) return [];

    const query = searchTerm.trim().toLowerCase();

    let filtered = allProducts.filter(
      (product) => product.category === category
    );

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.categoryLabel.toLowerCase().includes(query)
      );
    }

    if (selectedPrice !== "all") {
      filtered = filtered.filter((product) => {
        switch (selectedPrice) {
          case "under-50":
            return product.price < 50000;
          case "50-100":
            return product.price >= 50000 && product.price <= 100000;
          case "100-150":
            return product.price > 100000 && product.price <= 150000;
          case "150-plus":
            return product.price > 150000;
          default:
            return true;
        }
      });
    }

    if (selectedStock !== "All") {
      filtered = filtered.filter(() => selectedStock === "In Stock");
    }

    return [...filtered].sort((a, b) => {
      const aIndex = allProducts.findIndex((item) => item.id === a.id);
      const bIndex = allProducts.findIndex((item) => item.id === b.id);

      switch (sortBy) {
        case "oldest":
          return bIndex - aIndex;
        case "rated":
          return b.rating - a.rating;
        case "recent":
        default:
          return aIndex - bIndex;
      }
    });
  }, [
    category,
    currentCategory,
    searchTerm,
    selectedPrice,
    selectedStock,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPrice("all");
    setSelectedStock("All");
    setSortBy("recent");
  };

  const handleAddToCart = (product) => {
    addToCart(product, {
      selectedColor: product.color || null,
      selectedSize: product.size?.[0] || null,
      quantity: 1,
    });
    showToast(`${product.name} added to cart`);
  };

  const handleToggleSaved = (product) => {
    const added = toggleSavedProduct(product);
    showToast(added ? "Product saved" : "Removed from saved products");
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white font-sans text-black">
        <header className="border-b border-black/[0.07] bg-white">
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
            <Link
              to="/"
              className="text-[22px] font-semibold tracking-[-0.05em]"
            >
              KC <span className="text-[#63666A]">Store</span>
            </Link>
            <Link
              to="/shop"
              className="rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white"
            >
              Back to Shop
            </Link>
          </div>
        </header>

        <main className="mx-auto flex min-h-[65vh] max-w-[900px] items-center justify-center px-5 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#808080]">
              Category
            </p>
            <h1 className="mt-3 text-[42px] font-semibold tracking-[-0.05em]">
              Category not found
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-[#63666A]">
              The category you are trying to view does not exist.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white"
            >
              Return Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const activeFilterCount =
    (selectedPrice !== "all" ? 1 : 0) +
    (selectedStock !== "All" ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
          <Link
            to="/"
            className="text-[22px] font-semibold tracking-[-0.05em]"
          >
            KC <span className="text-[#63666A]">Store</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              to="/"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="relative py-2 text-[13px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
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

            <div className="relative group/categories">
              <button
                type="button"
                className="flex items-center gap-1 py-2 text-[13px] font-medium text-black"
              >
                Categories
                <Icon name="chevronDown" size={13} />
              </button>

              <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[245px] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover/categories:pointer-events-auto group-hover/categories:visible group-hover/categories:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl">
                  <div className="border-b border-black/[0.07] px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                      Shop Categories
                    </p>
                  </div>

                  <div className="py-2">
                    {categoryLinks.map(([label, slug]) => (
                      <Link
                        key={slug}
                        to={`/categories/${slug}`}
                        className={`flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6] ${
                          slug === category ? "text-black" : ""
                        }`}
                      >
                        <span>{label}</span>
                        <Icon name="arrowRight" size={14} strokeWidth={1.5} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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

          <div className="flex items-center gap-1">
            <Link
              to="/search"
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
            >
              <Icon name="search" size={20} />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
            >
              <Icon name="bag" size={20} />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] lg:hidden"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-black/[0.06] bg-white">
            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-7 lg:px-10">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center text-[#808080]">
                  <Icon name="search" size={18} />
                </span>

                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={`Search ${currentCategory.shortTitle.toLowerCase()}...`}
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f6] py-4 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#808080] focus:border-black"
                />

                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] hover:text-black"
                >
                  <Icon name="close" size={18} />
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
            CATEGORY HERO
        ==================================================== */}

        <section className="px-5 pb-8 pt-7 sm:px-7 sm:pt-10 lg:px-10 lg:pb-10 lg:pt-12">
          <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#f4f4f2] lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-20">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#808080]">
                <Link to="/" className="hover:text-black">
                  Home
                </Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-black">
                  Shop
                </Link>
                <span>/</span>
                <span className="text-black">{currentCategory.title}</span>
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#63666A]">
                Collection
              </p>

              <h1 className="mt-3 max-w-[620px] text-[44px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]">
                {currentCategory.title}
              </h1>

              <p className="mt-6 max-w-[500px] text-[14px] leading-7 text-[#63666A] sm:text-[15px]">
                {currentCategory.description}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <span className="rounded-full bg-black px-3 py-2 text-[10px] font-medium text-white">
                  {filteredProducts.length} Products
                </span>
                <span className="text-[11px] text-[#808080]">
                  Curated for everyday style
                </span>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden sm:min-h-[440px] lg:min-h-[540px]">
              <img
                src={currentCategory.image}
                alt={currentCategory.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="px-5 pt-2 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-[520px]">
                <span className="pointer-events-none absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center text-[#808080]">
                  <Icon name="search" size={18} />
                </span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={`Search ${currentCategory.shortTitle.toLowerCase()}...`}
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#f7f7f6] pl-11 pr-4 text-[13px] outline-none placeholder:text-[#808080] focus:border-black"
                />
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="text-[11px] text-[#808080]">
                  Showing <span className="font-medium text-black">{filteredProducts.length}</span> products
                </p>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex h-11 items-center gap-2 rounded-xl border border-black/10 px-4 text-[11px] font-semibold uppercase tracking-[0.1em] lg:hidden"
                >
                  <Icon name="sliders" size={15} />
                  Filters
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    aria-label="Sort products"
                    className="h-11 min-w-[155px] appearance-none rounded-xl border border-black/10 bg-white pl-4 pr-10 text-[11px] font-medium outline-none focus:border-black"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevronDown"
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[240px_1fr]">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-[100px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="sliders" size={15} className="text-[#808080]" />
                    <h2 className="text-[13px] font-semibold">Filters</h2>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-[10px] font-medium text-[#808080] hover:text-black"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <FilterSection
                  title="Price"
                  open={openFilters.price}
                  onToggle={() =>
                    setOpenFilters((current) => ({
                      ...current,
                      price: !current.price,
                    }))
                  }
                >
                  <div className="flex flex-col gap-2">
                    {priceOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedPrice(option.value)}
                        className="flex items-center gap-3 text-left text-[11px]"
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            selectedPrice === option.value
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                          }`}
                        >
                          {selectedPrice === option.value && (
                            <Icon name="check" size={10} strokeWidth={2} />
                          )}
                        </span>
                        <span
                          className={
                            selectedPrice === option.value
                              ? "font-medium"
                              : "text-[#63666A]"
                          }
                        >
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Availability"
                  open={openFilters.availability}
                  onToggle={() =>
                    setOpenFilters((current) => ({
                      ...current,
                      availability: !current.availability,
                    }))
                  }
                >
                  <div className="flex flex-col gap-2.5">
                    {["All", "In Stock"].map((stock) => (
                      <button
                        key={stock}
                        type="button"
                        onClick={() => setSelectedStock(stock)}
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
                            <Icon name="check" size={10} strokeWidth={2} />
                          )}
                        </span>
                        <span
                          className={
                            selectedStock === stock
                              ? "font-medium"
                              : "text-[#63666A]"
                          }
                        >
                          {stock}
                        </span>
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <div className="mt-5 rounded-2xl bg-[#f7f7f6] p-5">
                  <p className="text-[11px] font-semibold">Need help choosing?</p>
                  <p className="mt-2 text-[10px] leading-5 text-[#808080]">
                    Contact our store for product details, availability and styling questions.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex text-[10px] font-medium underline underline-offset-4"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      saved={isSaved(product.id)}
                      onToggleSaved={handleToggleSaved}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-[#f7f7f6] px-6 text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">
                      <Icon name="search" size={22} />
                    </div>
                    <h3 className="mt-5 text-[18px] font-semibold">
                      No products found
                    </h3>
                    <p className="mx-auto mt-2 max-w-[400px] text-[12px] leading-6 text-[#808080]">
                      We couldn't find any products in this category matching your current filters.
                    </p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-5 rounded-xl bg-black px-5 py-3 text-[11px] font-medium text-white transition hover:bg-[#222]"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            CATEGORY NAVIGATION
        ==================================================== */}

        <section className="border-y border-black/[0.07] bg-[#fafafa] px-5 py-12 sm:px-7 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Keep Shopping
                </p>
                <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] sm:text-[30px]">
                  Explore More Categories
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium"
              >
                View All Products
                <Icon name="arrowRight" size={14} />
              </Link>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {categoryLinks.map(([label, slug]) => (
                <Link
                  key={slug}
                  to={`/categories/${slug}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                    slug === category
                      ? "bg-black text-white"
                      : "bg-white text-[#63666A] hover:text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      

        <section className="border-b border-black/[0.07]">
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
                text: "100% secure payment process",
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
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
                  <Icon name={item.icon} size={19} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold">{item.title}</p>
                  <p className="mt-1 text-[10px] text-[#808080]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-[400px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-5">
              <div>
                <h2 className="text-[15px] font-semibold">Filters</h2>
                {activeFilterCount > 0 && (
                  <p className="mt-1 text-[10px] text-[#808080]">
                    {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} applied
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f3]"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <FilterSection
                title="Price"
                open={openFilters.price}
                onToggle={() =>
                  setOpenFilters((current) => ({
                    ...current,
                    price: !current.price,
                  }))
                }
              >
                <div className="flex flex-col gap-2.5">
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedPrice(option.value)}
                      className="flex items-center gap-3 text-left text-[11px]"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          selectedPrice === option.value
                            ? "border-black bg-black text-white"
                            : "border-black/20"
                        }`}
                      >
                        {selectedPrice === option.value && (
                          <Icon name="check" size={10} strokeWidth={2} />
                        )}
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Availability"
                open={openFilters.availability}
                onToggle={() =>
                  setOpenFilters((current) => ({
                    ...current,
                    availability: !current.availability,
                  }))
                }
              >
                <div className="flex flex-col gap-2.5">
                  {["All", "In Stock"].map((stock) => (
                    <button
                      key={stock}
                      type="button"
                      onClick={() => setSelectedStock(stock)}
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
                          <Icon name="check" size={10} strokeWidth={2} />
                        )}
                      </span>
                      <span>{stock}</span>
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>

            <div className="border-t border-black/[0.08] p-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-[11px] font-medium"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 rounded-xl bg-black px-4 py-3 text-[11px] font-medium text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}
