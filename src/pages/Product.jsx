import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

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
        <path d="m6 18 12-12" />
      </>
    ),

    chevronLeft: <path d="m15 18-6-6 6-6" />,

    chevronRight: <path d="m9 18 6-6-6-6" />,

    check: <path d="m5 12 4 4L19 6" />,

    star: (
      <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    ),

    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    minus: <path d="M5 12h14" />,

    shield: (
      <>
        <path d="M12 3 20 6v5c0 5.2-3.4 8.6-8 10-4.6-1.4-8-4.8-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),

    message: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.2 8.2 0 0 1-3.3-.7L4 20l1.7-4.1A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        <path d="M8 11h.01" />
        <path d="M12 11h.01" />
        <path d="M16 11h.01" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   MOCK PRODUCT DATA
   Replace with:
   GET /api/products/:slug
========================================================= */

const productData = {
  "classic-leather-handbag": {
    id: 1,
    slug: "classic-leather-handbag",
    name: "Classic Leather Handbag",
    category: "Bags",
    categorySlug: "womens-bags",

    price: 89900,
    oldPrice: null,
    discount: null,

    badge: "New",

    rating: 4.9,
    reviewCount: 126,

    description:
      "A refined everyday handbag designed with a clean silhouette, spacious interior and timeless finish. Easy to style for work, weekends and evening occasions.",

    shortDescription:
      "A timeless leather handbag designed for everyday elegance.",

    colors: [
      {
        name: "Black",
        value: "#111111",
      },
      {
        name: "Brown",
        value: "#7A4E34",
      },
      {
        name: "Beige",
        value: "#D7C5AC",
      },
    ],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Material", "Premium leather"],
      ["Interior", "Cotton lining"],
      ["Closure", "Magnetic closure"],
      ["Dimensions", "30 × 22 × 12 cm"],
      ["Weight", "0.65 kg"],
      ["Style", "Shoulder / Handbag"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-001",
      name: "Nova Fashion Store",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      verified: true,
      responseTime: "Usually responds within an hour",
      products: 148,
    },
  },

  "minimal-leather-watch": {
    id: 2,
    slug: "minimal-leather-watch",
    name: "Minimal Leather Watch",
    category: "Watches",
    categorySlug: "watches",

    price: 129900,
    oldPrice: 149900,
    discount: "-13%",

    badge: null,

    rating: 4.8,
    reviewCount: 87,

    description:
      "A minimalist timepiece with a refined leather strap and clean dial. Designed for versatile everyday wear with a sophisticated modern finish.",

    shortDescription:
      "A clean and sophisticated watch for everyday wear.",

    colors: [
      {
        name: "Black",
        value: "#111111",
      },
      {
        name: "Brown",
        value: "#7A4E34",
      },
    ],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Movement", "Quartz"],
      ["Strap", "Genuine leather"],
      ["Case", "Stainless steel"],
      ["Dial", "Mineral glass"],
      ["Water resistance", "3 ATM"],
      ["Style", "Minimal / Everyday"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-002",
      name: "Nova Watch Store",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      responseTime: "Usually responds within 2 hours",
      products: 92,
    },
  },

  "oversized-essential-tee": {
    id: 3,
    slug: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    category: "Clothing",
    categorySlug: "clothing",

    price: 29900,
    oldPrice: null,
    discount: null,

    badge: "New",

    rating: 4.7,
    reviewCount: 93,

    description:
      "A relaxed oversized silhouette made for everyday comfort. The clean design makes it an easy foundation for layered and casual looks.",

    shortDescription:
      "Relaxed proportions and everyday comfort in one clean silhouette.",

    colors: [
      {
        name: "Black",
        value: "#111111",
      },
      {
        name: "White",
        value: "#F8F8F8",
      },
      {
        name: "Beige",
        value: "#D7C5AC",
      },
    ],

    sizes: ["S", "M", "L", "XL"],

    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Material", "100% cotton"],
      ["Fit", "Oversized"],
      ["Neck", "Crew neck"],
      ["Sleeve", "Short sleeve"],
      ["Care", "Machine washable"],
      ["Style", "Casual / Everyday"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unworn and has its original tags.",

    dealer: {
      id: "dealer-003",
      name: "Nova Apparel",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      responseTime: "Usually responds within an hour",
      products: 210,
    },
  },

  "air-motion-sneakers": {
    id: 4,
    slug: "air-motion-sneakers",
    name: "Air Motion Sneakers",
    category: "Shoes",
    categorySlug: "shoes",

    price: 74900,
    oldPrice: 94900,
    discount: "-21%",

    badge: null,

    rating: 4.8,
    reviewCount: 154,

    description:
      "Lightweight everyday sneakers designed around comfort and clean contemporary styling. Built for daily movement without compromising on appearance.",

    shortDescription:
      "Lightweight everyday sneakers built for comfort and movement.",

    colors: [
      {
        name: "White",
        value: "#F7F7F7",
      },
      {
        name: "Black",
        value: "#111111",
      },
    ],

    sizes: ["39", "40", "41", "42", "43", "44"],

    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Upper", "Synthetic mesh"],
      ["Sole", "Rubber"],
      ["Insole", "Memory foam"],
      ["Closure", "Lace-up"],
      ["Weight", "0.7 kg"],
      ["Style", "Everyday / Casual"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the shoes are unworn and in their original packaging.",

    dealer: {
      id: "dealer-004",
      name: "Nova Footwear",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      responseTime: "Usually responds within 2 hours",
      products: 126,
    },
  },

  "classic-oversized-hoodie": {
    id: "classic-oversized-hoodie",
    slug: "classic-oversized-hoodie",
    name: "Classic Oversized Hoodie",
    category: "Clothing",
    categorySlug: "clothing",

    price: 8000,
    oldPrice: null,
    discount: null,
    badge: "New",

    rating: 4.8,
    reviewCount: 120,

    description:
      "Classic oversized hoodie designed for comfortable everyday wear with a relaxed silhouette.",

    shortDescription:
      "A relaxed oversized hoodie for everyday comfort.",

    colors: [],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Category", "Clothing"],
      ["Style", "Oversized Hoodie"],
      ["Fit", "Relaxed"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-003",
      name: "Nova Apparel",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=90",
      verified: true,
      responseTime: "Usually responds within an hour",
      products: 210,
    },
  },

  "premium-wireless-headphones": {
    id: "premium-wireless-headphones",
    slug: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    category: "Accessories",
    categorySlug: "accessories",

    price: 12500,
    oldPrice: null,
    discount: null,
    badge: "New",

    rating: 4.9,
    reviewCount: 156,

    description:
      "Premium wireless headphones designed for everyday listening with a clean modern design.",

    shortDescription:
      "Modern wireless headphones for everyday listening.",

    colors: [],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Category", "Accessories"],
      ["Type", "Wireless Headphones"],
      ["Connectivity", "Bluetooth"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-accessories",
      name: "KC Accessories",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=90",
      verified: true,
      responseTime: "Usually responds within an hour",
      products: 96,
    },
  },

  "minimal-series-watch": {
    id: "minimal-series-watch",
    slug: "minimal-series-watch",
    name: "Minimal Series Watch",
    category: "Watches",
    categorySlug: "watches",

    price: 129900,
    oldPrice: 149900,
    discount: "-13%",
    badge: null,

    rating: 4.8,
    reviewCount: 87,

    description:
      "A minimalist timepiece with a refined leather strap and clean dial. Designed for versatile everyday wear with a sophisticated modern finish.",

    shortDescription:
      "A clean and sophisticated watch for everyday wear.",

    colors: [
      {
        name: "Black",
        value: "#111111",
      },
      {
        name: "Brown",
        value: "#7A4E34",
      },
    ],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Movement", "Quartz"],
      ["Strap", "Genuine leather"],
      ["Case", "Stainless steel"],
      ["Dial", "Mineral glass"],
      ["Water resistance", "3 ATM"],
      ["Style", "Minimal / Everyday"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-002",
      name: "KC Store",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=90",
      verified: true,
      responseTime: "Usually responds within 2 hours",
      products: 92,
    },
  },

  "luxury-sunglasses": {
    id: "luxury-sunglasses",
    slug: "luxury-sunglasses",
    name: "Luxury Sunglasses",
    category: "Accessories",
    categorySlug: "accessories",

    price: 24900,
    oldPrice: null,
    discount: null,
    badge: "New",

    rating: 4.6,
    reviewCount: 76,

    description:
      "Luxury sunglasses with a clean contemporary silhouette designed for everyday styling.",

    shortDescription:
      "Contemporary sunglasses designed for everyday style.",

    colors: [],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=90",
    ],

    specifications: [
      ["Category", "Accessories"],
      ["Type", "Sunglasses"],
      ["Style", "Luxury / Everyday"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-accessories",
      name: "Nova Accessories",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=90",
      verified: true,
      responseTime: "Usually responds within an hour",
      products: 96,
    },
  },

  "rolex-wristwatch": {
    id: "rolex-wristwatch",
    slug: "rolex-wristwatch",
    name: "Rolex Wristwatch",
    category: "Accessories",
    categorySlug: "accessories",

    price: 320000,
    oldPrice: 370000,
    discount: "-10%",
    badge: null,

    rating: 4.7,
    reviewCount: 113,

    description:
      "A premium wristwatch with a refined design created for sophisticated everyday styling.",

    shortDescription:
      "A refined wristwatch designed for sophisticated everyday wear.",

    colors: [],

    sizes: [],

    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=90",
    ],

    specifications: [
      ["Category", "Accessories"],
      ["Type", "Wristwatch"],
      ["Style", "Luxury / Everyday"],
    ],

    shipping: {
      free: false,
      delivery: "2–5 business days",
      processing: "Ships within 24 hours",
    },

    returns:
      "Returns are accepted within 30 days of delivery provided the item is unused and in its original condition.",

    dealer: {
      id: "dealer-002",
      name: "Nova Watch Store",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=90",
      verified: true,
      responseTime: "Usually responds within 2 hours",
      products: 92,
    },
  },
};

/* =========================================================
   PRODUCT LIST FOR RECOMMENDATIONS
========================================================= */

const allProducts = [
  {
    id: 1,
    slug: "classic-leather-handbag",
    name: "Classic Leather Handbag",
    category: "Bags",
    price: 89900,
    rating: 4.9,
    reviews: 126,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 2,
    slug: "premium-shoulder-bag",
    name: "Premium Shoulder Bag",
    category: "Bags",
    price: 109900,
    rating: 4.9,
    reviews: 72,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 3,
    slug: "structured-mini-bag",
    name: "Structured Mini Bag",
    category: "Bags",
    price: 67900,
    rating: 4.7,
    reviews: 81,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 4,
    slug: "soft-leather-tote",
    name: "Soft Leather Tote",
    category: "Bags",
    price: 119900,
    rating: 4.9,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 5,
    slug: "minimal-leather-watch",
    name: "Minimal Leather Watch",
    category: "Watches",
    price: 129900,
    rating: 4.8,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 6,
    slug: "modern-stainless-watch",
    name: "Modern Stainless Watch",
    category: "Watches",
    price: 179900,
    rating: 4.7,
    reviews: 68,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 7,
    slug: "classic-metal-watch",
    name: "Classic Metal Watch",
    category: "Watches",
    price: 149900,
    rating: 4.8,
    reviews: 105,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 8,
    slug: "signature-dial-watch",
    name: "Signature Dial Watch",
    category: "Watches",
    price: 219900,
    rating: 4.9,
    reviews: 73,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 9,
    slug: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    category: "Clothing",
    price: 29900,
    rating: 4.7,
    reviews: 93,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 10,
    slug: "relaxed-fit-cotton-shirt",
    name: "Relaxed Fit Cotton Shirt",
    category: "Clothing",
    price: 44900,
    rating: 4.6,
    reviews: 58,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 11,
    slug: "premium-knit-dress",
    name: "Premium Knit Dress",
    category: "Clothing",
    price: 79900,
    rating: 4.9,
    reviews: 144,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 12,
    slug: "everyday-cargo-pants",
    name: "Everyday Cargo Pants",
    category: "Clothing",
    price: 54900,
    rating: 4.7,
    reviews: 48,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 13,
    slug: "air-motion-sneakers",
    name: "Air Motion Sneakers",
    category: "Shoes",
    price: 74900,
    rating: 4.8,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 14,
    slug: "studio-runner-sneakers",
    name: "Studio Runner Sneakers",
    category: "Shoes",
    price: 89900,
    rating: 4.8,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 15,
    slug: "everyday-court-sneakers",
    name: "Everyday Court Sneakers",
    category: "Shoes",
    price: 64900,
    rating: 4.6,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=90",
  },

  {
    id: 16,
    slug: "premium-fashion-sneakers",
    name: "Premium Fashion Sneakers",
    category: "Shoes",
    price: 119900,
    rating: 4.8,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=90",
  },
];

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

function Stars({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          size={size}
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
}

/* =========================================================
   PRODUCT RECOMMENDATION CARD
========================================================= */

function RecommendationCard({
  product,
  onAddToCart,
  onSave,
  isSaved,
}) {
  return (
    <article className="group">
      <div className="relative aspect-[4/4.9] overflow-hidden rounded-2xl bg-[#f5f5f3]">
        <button
          type="button"
          onClick={() => onSave(product)}
          aria-label={
            isSaved
              ? "Remove saved product"
              : "Save product"
          }
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#63666A] shadow-sm transition hover:text-black"
        >
          <Icon name="heart" size={17} />
        </button>

        <Link
          to={`/product/${product.slug}`}
          className="block h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-xl bg-black px-4 py-3 text-[11px] font-medium text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>

      <div className="pt-3.5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[#808080]">
          {product.category}
        </p>

        <Link
          to={`/product/${product.slug}`}
          className="mt-1 block text-[14px] font-medium hover:opacity-60"
        >
          {product.name}
        </Link>

        <p className="mt-2 text-[15px] font-semibold">
          {formatPrice(product.price)}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-[10px] text-[#808080]">
            ({product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PRODUCT PAGE
========================================================= */

export default function Product() {
  const { slug } = useParams();

  /* =======================================================
     ACTIONS
  ======================================================= */

  const {
    addToCart,
    toggleSavedProduct,
    isSaved,
    totalItems,
  } = useCart();

  const product = productData[slug];

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [selectedColor, setSelectedColor] =
    useState(
      product?.colors?.[0]?.name || ""
    );

  const [selectedSize, setSelectedSize] =
    useState(product?.sizes?.[0] || "");

  const [quantity, setQuantity] =
    useState(1);

  const [categoryMenuOpen, setCategoryMenuOpen] =
    useState(false);

  const [
    mobileCategoriesOpen,
    setMobileCategoriesOpen,
  ] = useState(false);

  const [activeTab, setActiveTab] =
    useState("description");

  const [toast, setToast] =
    useState("");

  /* =======================================================
     GUEST REVIEW STATE
  ======================================================= */

  const [reviewModalOpen, setReviewModalOpen] =
    useState(false);

  const [reviewName, setReviewName] =
    useState("");

  const [reviewRating, setReviewRating] =
    useState(5);

  const [reviewText, setReviewText] =
    useState("");

  const [submittedReviews, setSubmittedReviews] =
    useState([]);

  const saved = product ? isSaved(product.id) : false;

  /* =======================================================
     RECOMMENDATIONS
  ======================================================= */

  const recommendations = useMemo(() => {
    if (!product) {
      return [];
    }

    const sameCategory =
      allProducts.filter(
        (item) =>
          item.category ===
            product.category &&
          item.slug !== product.slug
      );

    const otherProducts =
      allProducts.filter(
        (item) =>
          item.category !==
            product.category &&
          item.slug !== product.slug
      );

    return [
      ...sameCategory,
      ...otherProducts,
    ].slice(0, 4);
  }, [product]);

  /* =======================================================
     INVALID PRODUCT
  ======================================================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-sans text-black">
        <header className="border-b border-black/[0.07]">
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
            <Link
              to="/"
              className="text-[22px] font-semibold tracking-[-0.05em]"
            >
              KC{" "}
              <span className="text-[#63666A]">
                Store
              </span>
            </Link>

            <Link
              to="/shop"
              className="rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white"
            >
              Back to Shop
            </Link>
          </div>
        </header>

        <main className="flex min-h-[70vh] items-center justify-center px-5 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#808080]">
              404
            </p>

            <h1 className="mt-3 text-[38px] font-semibold tracking-[-0.05em]">
              Product Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-6 text-[#63666A]">
              We couldn't find the product you are
              looking for.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 text-[12px] font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =======================================================
     GUEST REVIEW SUBMISSION
  ======================================================= */

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const trimmedName = reviewName.trim();
    const trimmedText = reviewText.trim();

    if (!trimmedName) {
      showToast("Please enter your name");
      return;
    }

    if (!trimmedText) {
      showToast("Please write your review");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: trimmedName,
      date: "Just now",
      text: trimmedText,
      rating: reviewRating,
    };

    setSubmittedReviews((current) => [
      newReview,
      ...current,
    ]);

    setReviewName("");
    setReviewRating(5);
    setReviewText("");
    setReviewModalOpen(false);

    showToast("Review submitted successfully");
  };

  const handleAddToCart = (product) => {
    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const handleWishlist = () => {
    const added = toggleSavedProduct(
      product
    );

    showToast(
      added
        ? "Product saved"
        : "Removed from saved products"
    );
  };

  const increaseQuantity = () => {
    setQuantity(
      (current) =>
        Math.min(current + 1, 10)
    );
  };

  const decreaseQuantity = () => {
    setQuantity(
      (current) =>
        Math.max(current - 1, 1)
    );
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
            {/* HOME - INACTIVE */}

            <a
              href="/"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Home
            </a>

            {/* SHOP - ACTIVE */}

            <a
              href="/shop"
              className="relative py-2 text-[13px] font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
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

            {/* CART */}

            <Link
              to="/cart"
              aria-label={`Cart with ${totalItems} ${
                totalItems === 1
                  ? "item"
                  : "items"
              }`}
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

      <main>
        {/* ===================================================
            BREADCRUMB
        ==================================================== */}

        <section className="px-5 pt-7 sm:px-7 sm:pt-10 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#808080]">
              <Link
                to="/"
                className="hover:text-black"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/shop"
                className="hover:text-black"
              >
                Shop
              </Link>

              <span>/</span>

              <Link
                to={`/categories/${product.categorySlug}`}
                className="hover:text-black"
              >
                {product.category}
              </Link>

              <span>/</span>

              <span className="text-black">
                {product.name}
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            PRODUCT MAIN
        ==================================================== */}

        <section className="px-5 py-7 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14">
              {/* IMAGE GALLERY */}

              <div>
                <div className="grid gap-3 sm:grid-cols-[92px_1fr]">
                  {/* Thumbnails */}

                  <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
                    {product.images.map(
                      (image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() =>
                            setSelectedImage(
                              index
                            )
                          }
                          className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3] sm:h-[82px] sm:w-[82px] ${
                            selectedImage ===
                            index
                              ? "ring-2 ring-black ring-offset-2"
                              : ""
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} view ${
                              index + 1
                            }`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      )
                    )}
                  </div>

                  {/* Main Image */}

                  <div className="relative order-1 aspect-[4/4.7] overflow-hidden rounded-2xl bg-[#f5f5f3] sm:order-2">
                    <img
                      src={
                        product.images[
                          selectedImage
                        ]
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    {/* Badge */}

                    {product.badge && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-medium text-white">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {product.discount && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-medium text-white">
                          {product.discount}
                        </span>
                      </div>
                    )}

                    {/* Save */}

                    <button
                      type="button"
                      onClick={handleWishlist}
                      aria-label={
                        saved
                          ? "Remove from saved products"
                          : "Save product"
                      }
                      className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition ${
                        saved
                          ? "text-black"
                          : "text-[#63666A] hover:text-black"
                      }`}
                    >
                      <Icon
                        name="heart"
                        size={20}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRODUCT INFORMATION */}

              <div className="lg:pt-1">
                {/* Category */}

                <Link
                  to={`/categories/${product.categorySlug}`}
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080] hover:text-black"
                >
                  {product.category}
                </Link>

                {/* Title */}

                <h1 className="mt-3 max-w-[680px] text-[36px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[46px] lg:text-[52px]">
                  {product.name}
                </h1>

                {/* Rating */}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Stars
                      rating={product.rating}
                      size={13}
                    />

                    <span className="text-[12px] font-medium">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-[#B0B0B0]">
                    |
                  </span>

                  <a
                    href="#reviews"
                    className="text-[12px] text-[#63666A] underline underline-offset-2"
                  >
                    {product.reviewCount} reviews
                  </a>
                </div>

                {/* Price */}

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-[25px] font-semibold tracking-tight">
                    {formatPrice(
                      product.price
                    )}
                  </span>

                  {product.oldPrice && (
                    <span className="pb-0.5 text-[14px] text-[#808080] line-through">
                      {formatPrice(
                        product.oldPrice
                      )}
                    </span>
                  )}

                  {product.discount && (
                    <span className="rounded-full bg-[#f0f0ee] px-2.5 py-1 text-[10px] font-medium">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Description */}

                <p className="mt-5 max-w-[620px] text-[13px] leading-7 text-[#63666A] sm:text-[14px]">
                  {product.description}
                </p>

                {/* Divider */}

                <div className="my-7 border-t border-black/[0.08]" />

                {/* Colors */}

                {product.colors.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-[13px] font-semibold">
                        Color
                      </h2>

                      <span className="text-[11px] text-[#808080]">
                        {selectedColor}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-3">
                      {product.colors.map(
                        (color) => (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() =>
                              setSelectedColor(
                                color.name
                              )
                            }
                            aria-label={`Select ${color.name}`}
                            className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                              selectedColor ===
                              color.name
                                ? "border-black"
                                : "border-transparent"
                            }`}
                          >
                            <span
                              className="h-6 w-6 rounded-full border border-black/10"
                              style={{
                                backgroundColor:
                                  color.value,
                              }}
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Sizes */}

                {product.sizes.length > 0 && (
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[13px] font-semibold">
                        Size
                      </h2>

                      <button
                        type="button"
                        className="text-[10px] text-[#63666A] underline underline-offset-2"
                      >
                        Size Guide
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.sizes.map(
                        (size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSize(
                                size
                              )
                            }
                            className={`flex h-11 min-w-12 items-center justify-center rounded-lg border px-4 text-[11px] font-medium transition ${
                              selectedSize ===
                              size
                                ? "border-black bg-black text-white"
                                : "border-black/10 hover:border-black"
                            }`}
                          >
                            {size}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Quantity */}

                <div className="mt-7">
                  <h2 className="text-[13px] font-semibold">
                    Quantity
                  </h2>

                  <div className="mt-3 flex h-12 w-[140px] items-center rounded-xl border border-black/10">
                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      className="flex h-full w-11 items-center justify-center text-[#63666A] hover:text-black"
                    >
                      <Icon
                        name="minus"
                        size={15}
                      />
                    </button>

                    <span className="flex flex-1 items-center justify-center text-[13px] font-medium">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      className="flex h-full w-11 items-center justify-center text-[#63666A] hover:text-black"
                    >
                      <Icon
                        name="plus"
                        size={15}
                      />
                    </button>
                  </div>
                </div>

                {/* Add cart / save */}

                <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_52px]">
                  <button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    className="flex min-h-[54px] items-center justify-center rounded-xl bg-black px-7 text-[13px] font-medium text-white transition hover:bg-[#222]"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleWishlist
                    }
                    aria-label="Save product"
                    className={`flex min-h-[54px] items-center justify-center rounded-xl border ${
                      saved
                        ? "border-black bg-black text-white"
                        : "border-black/10 hover:border-black"
                    }`}
                  >
                    <Icon
                      name="heart"
                      size={20}
                    />
                  </button>
                </div>

                {/* Product shipping cards */}

                <div className="mt-8 divide-y divide-black/[0.07] border-y border-black/[0.07]">
                  <div className="flex items-start gap-4 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
                      <Icon
                        name="truck"
                        size={18}
                      />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold">
                        Shipping Information
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                        {product.shipping.delivery}
                        .{" "}
                        {product.shipping.processing}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
                      <Icon
                        name="refresh"
                        size={18}
                      />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold">
                        Easy Returns
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                        30-day returns on eligible
                        items.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
                      <Icon
                        name="shield"
                        size={18}
                      />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold">
                        Secure Checkout
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-[#808080]">
                        Secure payment and protected
                        customer information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            PRODUCT DETAILS TABS
        ==================================================== */}

        <section className="border-y border-black/[0.07]">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-7 lg:px-10">
            <div className="flex overflow-x-auto border-b border-black/[0.07]">
              {[
                ["description", "Description"],
                ["specifications", "Specifications"],
                ["shipping", "Shipping"],
                ["returns", "Returns"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setActiveTab(value)
                  }
                  className={`relative whitespace-nowrap px-5 py-5 text-[12px] font-medium transition first:pl-0 ${
                    activeTab === value
                      ? "text-black"
                      : "text-[#808080] hover:text-black"
                  }`}
                >
                  {label}

                  {activeTab === value && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[210px] max-w-[850px] py-10">
              {activeTab ===
                "description" && (
                <div>
                  <p className="text-[14px] leading-7 text-[#63666A]">
                    {product.description}
                  </p>

                  <p className="mt-5 text-[14px] leading-7 text-[#63666A]">
                    Designed with attention to
                    everyday usability and a refined
                    aesthetic, this product fits
                    naturally into a modern wardrobe.
                  </p>
                </div>
              )}

              {activeTab ===
                "specifications" && (
                <div className="grid max-w-[700px] sm:grid-cols-2">
                  {product.specifications.map(
                    ([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between gap-5 border-b border-black/[0.07] py-4 text-[12px]"
                      >
                        <span className="text-[#808080]">
                          {label}
                        </span>

                        <span className="text-right font-medium">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[13px] font-semibold">
                      Delivery
                    </h3>

                    <p className="mt-2 text-[13px] leading-6 text-[#63666A]">
                      Estimated delivery:
                      {" "}
                      {product.shipping.delivery}.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold">
                      Processing
                    </h3>

                    <p className="mt-2 text-[13px] leading-6 text-[#63666A]">
                      {product.shipping.processing}.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold">
                      Shipping Cost
                    </h3>

                    <p className="mt-2 text-[13px] leading-6 text-[#63666A]">
                      {product.shipping.free
                        ? "Free shipping is available for this product."
                        : "Shipping costs are calculated at checkout."}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "returns" && (
                <div>
                  <h3 className="text-[13px] font-semibold">
                    30-Day Return Policy
                  </h3>

                  <p className="mt-3 max-w-[760px] text-[13px] leading-7 text-[#63666A]">
                    {product.returns}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            REVIEWS
        ==================================================== */}

        <section
          id="reviews"
          className="px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Customer Feedback
                </p>

                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] sm:text-[34px]">
                  Customer Reviews
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[32px] font-semibold tracking-[-0.04em]">
                    {product.rating}
                  </p>

                  <Stars
                    rating={product.rating}
                    size={13}
                  />

                  <p className="mt-1 text-[10px] text-[#808080]">
                    {product.reviewCount +
                      submittedReviews.length}{" "}
                    reviews
                  </p>
                </div>

                <div className="h-16 w-px bg-black/10" />

                <button
                  type="button"
                  onClick={() =>
                    setReviewModalOpen(true)
                  }
                  className="rounded-xl border border-black/10 px-5 py-3 text-[11px] font-medium hover:border-black"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review summary */}

            <div className="mt-10 grid gap-5 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
              <div className="rounded-2xl bg-[#f7f7f6] p-6">
                {[
                  ["5", 92],
                  ["4", 6],
                  ["3", 1],
                  ["2", 1],
                  ["1", 0],
                ].map(
                  ([star, percentage]) => (
                    <div
                      key={star}
                      className="mb-3 flex items-center gap-3 last:mb-0"
                    >
                      <span className="w-3 text-[10px]">
                        {star}
                      </span>

                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span className="w-7 text-right text-[10px] text-[#808080]">
                        {percentage}%
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Reviews */}

              <div className="space-y-4">
                {[
                  ...submittedReviews,
                  {
                    name: "Sarah M.",
                    date: "2 days ago",
                    text: "Beautiful quality and exactly as pictured. The finish feels premium and the size is perfect for everyday use.",
                    rating: 5,
                  },
                  {
                    name: "Amaka O.",
                    date: "1 week ago",
                    text: "Very happy with my purchase. Delivery was quick and the product arrived well packaged.",
                    rating: 5,
                  },
                  {
                    name: "Jennifer K.",
                    date: "2 weeks ago",
                    text: "The design is clean and elegant. I've already received several compliments.",
                    rating: 5,
                  },
                ].map((review) => (
                  <article
                    key={`${review.name}-${review.date}-${review.id || review.text}`}
                    className="rounded-2xl border border-black/[0.07] p-5 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[12px] font-semibold">
                          {review.name}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Stars
                            rating={
                              review.rating ||
                              5
                            }
                          />

                          <span className="text-[9px] text-[#808080]">
                            {review.date ===
                            "Just now"
                              ? "Guest Review"
                              : "Verified Purchase"}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-[#808080]">
                        {review.date}
                      </span>
                    </div>

                    <p className="mt-4 text-[12px] leading-6 text-[#63666A]">
                      {review.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SIMILAR PRODUCTS
        ==================================================== */}

        <section className="bg-[#f7f7f6] px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  More To Explore
                </p>

                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] sm:text-[34px]">
                  You May Also Like
                </h2>
              </div>

              <Link
                to={`/categories/${product.categorySlug}`}
                className="flex items-center gap-1.5 text-[11px] font-medium"
              >
                View Category

                <Icon
                  name="arrowRight"
                  size={14}
                />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
              {recommendations.map(
                (recommendation) => (
                  <RecommendationCard
                    key={
                      recommendation.id
                    }
                    product={
                      recommendation
                    }
                    onAddToCart={(item) => {
                      addToCart(item);

                      showToast(
                        `${item.name} added to cart`
                      );
                    }}
                    onSave={(item) => {
                      const added =
                        toggleSavedProduct(item);

                      showToast(
                        added
                          ? "Product saved"
                          : "Removed from saved products"
                      );
                    }}
                    isSaved={isSaved(
                      recommendation.id
                    )}
                  />
                )
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            FINAL SHIPPING TRUST SECTION
        ==================================================== */}

        <section className="border-y border-black/[0.07]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
            {[
              [
                "truck",
                "Fast Delivery",
                "Quick and reliable shipping",
              ],
              [
                "shield",
                "Secure Payments",
                "Protected checkout",
              ],
              [
                "refresh",
                "Easy Returns",
                "Simple 30-day returns",
              ],
              [
                "message",
                "Dealer Support",
                "Chat with the seller",
              ],
            ].map(
              ([icon, title, text]) => (
                <div
                  key={title}
                  className="flex items-center gap-4 border-black/[0.07] px-5 py-7 even:border-l lg:border-l"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
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

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* =====================================================
          REVIEW MODAL
      ====================================================== */}

      {reviewModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setReviewModalOpen(false)
            }
          />

          <div className="relative z-10 w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Customer Feedback
                </p>

                <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.04em]">
                  Write a Review
                </h2>

                <p className="mt-2 text-[12px] leading-5 text-[#808080]">
                  Share your experience with this
                  product.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setReviewModalOpen(false)
                }
                aria-label="Close review form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3] text-[#63666A] transition hover:text-black"
              >
                <Icon
                  name="close"
                  size={17}
                />
              </button>
            </div>

            <form
              onSubmit={handleSubmitReview}
              className="mt-7"
            >
              {/* Name */}

              <div>
                <label
                  htmlFor="review-name"
                  className="text-[11px] font-semibold"
                >
                  Your Name
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={reviewName}
                  onChange={(event) =>
                    setReviewName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] outline-none transition placeholder:text-[#999] focus:border-black"
                />
              </div>

              {/* Rating */}

              <div className="mt-5">
                <label className="text-[11px] font-semibold">
                  Rating
                </label>

                <div className="mt-3 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(
                    (rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setReviewRating(
                            rating
                          )
                        }
                        aria-label={`Give ${rating} star${
                          rating > 1
                            ? "s"
                            : ""
                        }`}
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                          rating <=
                          reviewRating
                            ? "bg-black text-white"
                            : "bg-[#f5f5f3] text-[#808080]"
                        }`}
                      >
                        <Icon
                          name="star"
                          size={15}
                          strokeWidth={1.5}
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Review text */}

              <div className="mt-5">
                <label
                  htmlFor="review-text"
                  className="text-[11px] font-semibold"
                >
                  Your Review
                </label>

                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(event) =>
                    setReviewText(
                      event.target.value
                    )
                  }
                  placeholder="Tell us about your experience..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] leading-5 outline-none transition placeholder:text-[#999] focus:border-black"
                />
              </div>

              {/* Buttons */}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setReviewModalOpen(false)
                  }
                  className="flex-1 rounded-xl border border-black/10 px-5 py-3.5 text-[11px] font-medium transition hover:border-black"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-black px-5 py-3.5 text-[11px] font-medium text-white transition hover:bg-[#222]"
                >
                  Submit Review
                </button>
              </div>

              <p className="mt-4 text-center text-[10px] text-[#808080]">
                You can submit a review without
                creating an account.
              </p>
            </form>
          </div>
        </div>
      )}

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