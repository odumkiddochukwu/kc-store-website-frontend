import { useMemo, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router";
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

/* =========================================================
   CATEGORY DATA
========================================================= */

const categoryMap = {
  "womens-bags": {
    title: "Women's Bags",
    shortTitle: "Bags",
    description:
      "Discover handbags, shoulder bags and everyday styles designed to complete every look.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868725/WhatsApp_Image_2026-10-01_at_15.43.22.jpg",
  },

  watches: {
    title: "Watches",
    shortTitle: "Watches",
    description:
      "Shop refined wristwatches that bring timeless design and everyday elegance together.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889669/IMG_1383.jpg",
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
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889432/IMG_1306.jpg",
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
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=90",
  },
};

/* =========================================================
   CATEGORY SUBCATEGORIES
========================================================= */

const bagSubcategories = [
  {
    slug: "chanel",
    title: "Chanel Bags",
    shortTitle: "Chanel",
    description: "Explore Chanel bags from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941310/IMG_1424.jpg",
  },

  {
    slug: "gucci",
    title: "Gucci Bags",
    shortTitle: "Gucci",
    description: "Explore Gucci bags from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941008/IMG_1692.jpg",
  },

  {
    slug: "louis-vuitton",
    title: "Louis Vuitton Bags",
    shortTitle: "Louis Vuitton",
    description: "Explore Louis Vuitton bags from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790864895/WhatsApp_Image_2026-10-01_at_14.32.48_3.jpg",
  },

  {
    slug: "celine",
    title: "Celine Bags",
    shortTitle: "Celine",
    description: "Explore Celine bags from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940985/IMG_1756.jpg",
  },

  {
    slug: "saint-laurent",
    title: "Saint Laurent Bags",
    shortTitle: "Saint Laurent",
    description: "Explore Saint Laurent bags from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940965/IMG_1793.jpg",
  },

];

const watchSubcategories = [
  {
    slug: "rolex",
    title: "Rolex Watches",
    shortTitle: "Rolex",
    description: "Explore Rolex watches from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2062.jpg",
  },

  {
    slug: "longines",
    title: "Longines Watches",
    shortTitle: "Longines",
    description: "Explore Longines watches from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2059.jpg",
  },

  {
    slug: "hublot",
    title: "Hublot Watches",
    shortTitle: "Hublot",
    description: "Explore Hublot watches from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2048.jpg",
  },

  {
    slug: "patek-philippe",
    title: "Patek Philippe Watches",
    shortTitle: "Patek Philippe",
    description: "Explore Patek Philippe watches from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2056.jpg",
  },

  {
    slug: "cartier",
    title: "Cartier Watches",
    shortTitle: "Cartier",
    description: "Explore Cartier watches from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889667/IMG_1392.jpg",
  },

];

const shoeSubcategories = [
  {
    slug: "gucci",
    title: "Gucci Shoes",
    shortTitle: "Gucci",
    description: "Explore Gucci shoes from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943163/IMG_1966.jpg",
  },

  {
    slug: "louis-vuitton",
    title: "Louis Vuitton Shoes",
    shortTitle: "Louis Vuitton",
    description: "Explore Louis Vuitton shoes from the collection.",
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943225/IMG_1829.jpg",
  },

];

const categorySubcategories = {
  "womens-bags": bagSubcategories,
  watches: watchSubcategories,
  shoes: shoeSubcategories,
  clothing: [],
  jewelry: [],
  accessories: [],
};

/* =========================================================
   PRODUCTS
========================================================= */

const allProducts = [
  {
    id: "chanel-classic-quilted-chain-bag",
    slug: "chanel-classic-quilted-chain-bag",
    name: "Chanel Classic Quilted Chain Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 133700,
    oldPrice: 151900,
    discount: "-12%",
    badge: "Limited",
    rating: 4.7,
    reviews: 152,
    color: "Orange",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941310/IMG_1424.jpg",
  },
  {
    id: "chanel-quilted-flap-shoulder-bag",
    slug: "chanel-quilted-flap-shoulder-bag",
    name: "Chanel Quilted Flap Shoulder Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 106000,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 225,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941323/IMG_1397.jpg",
  },
  {
    id: "gucci-compact-flap-backpack",
    slug: "gucci-compact-flap-backpack",
    name: "Gucci Compact Flap Backpack",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 149400,
    oldPrice: 213400,
    discount: "-30%",
    badge: "Bestseller",
    rating: 4.5,
    reviews: 183,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941008/IMG_1692.jpg",
  },
  {
    id: "chanel-compact-quilted-handbag",
    slug: "chanel-compact-quilted-handbag",
    name: "Chanel Compact Quilted Handbag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 143700,
    oldPrice: 169100,
    discount: "-15%",
    badge: "Bestseller",
    rating: 4.4,
    reviews: 22,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941163/IMG_1529.jpg",
  },
  {
    id: "chanel-small-quilted-crossbody-bag",
    slug: "chanel-small-quilted-crossbody-bag",
    name: "Chanel Small Quilted Crossbody Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 132400,
    oldPrice: 176500,
    discount: "-25%",
    badge: "Limited",
    rating: 4.4,
    reviews: 209,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941186/IMG_1518.jpg",
  },
  {
    id: "chanel-slim-chain-shoulder-bag",
    slug: "chanel-slim-chain-shoulder-bag",
    name: "Chanel Slim Chain Shoulder Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 58000,
    oldPrice: 70700,
    discount: "-18%",
    badge: null,
    rating: 4.5,
    reviews: 353,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941165/IMG_1528.jpg",
  },
  {
    id: "louis-vuitton-speedy-trunk-pillow-shoulder-bag",
    slug: "louis-vuitton-speedy-trunk-pillow-shoulder-bag",
    name: "Louis Vuitton Speedy Trunk Pillow Shoulder Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 53400,
    oldPrice: 76300,
    discount: "-30%",
    badge: null,
    rating: 4.7,
    reviews: 293,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868716/WhatsApp_Image_2026-10-01_at_15.43.16.jpg",
  },
  {
    id: "gucci-backpack",
    slug: "gucci-backpack",
    name: "Gucci Backpack",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 146500,
    oldPrice: 178700,
    discount: "-18%",
    badge: null,
    rating: 4.5,
    reviews: 187,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941022/IMG_1679.jpg",
  },
  {
    id: "gucci-classic-flap-handbag",
    slug: "gucci-classic-flap-handbag",
    name: "Gucci Classic Flap Handbag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 140900,
    oldPrice: null,
    discount: null,
    badge: "Bestseller",
    rating: 4.4,
    reviews: 126,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941107/IMG_1550.jpg",
  },
  {
    id: "gucci-medium-quilted-flap-bag",
    slug: "gucci-medium-quilted-flap-bag",
    name: "Gucci Medium Quilted Flap Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 137200,
    oldPrice: 167300,
    discount: "-18%",
    badge: "Limited",
    rating: 4.4,
    reviews: 115,
    color: "Blue",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941074/IMG_1592.jpg",
  },
  {
    id: "gucci-modern-bag",
    slug: "gucci-modern-bag",
    name: "Gucci Modern Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 103800,
    oldPrice: 118000,
    discount: "-12%",
    badge: "New",
    rating: 4.8,
    reviews: 121,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941035/IMG_1656.jpg",
  },
  {
    id: "gucci-mini-bag",
    slug: "gucci-mini-bag",
    name: "Gucci Mini Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 45000,
    oldPrice: 56200,
    discount: "-20%",
    badge: "Limited",
    rating: 4.4,
    reviews: 243,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941086/IMG_1570.jpg",
  },
  {
    id: "celine-quilted-classic-handbag",
    slug: "celine-quilted-classic-handbag",
    name: "Celine Classic Handbag",
    category: "womens-bags",
    subCategory: "celine",
    categoryLabel: "Celine Bags",
    price: 120000,
    oldPrice: 136400,
    discount: "-12%",
    badge: "New",
    rating: 4.7,
    reviews: 263,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940985/IMG_1756.jpg",
  },
  {
    id: "chanel-soft-quilted-shoulder-satchel",
    slug: "chanel-soft-quilted-shoulder-satchel",
    name: "Chanel Soft Quilted Shoulder Satchel",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 61300,
    oldPrice: 76600,
    discount: "-20%",
    badge: null,
    rating: 4.5,
    reviews: 129,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941245/IMG_1451.jpg",
  },
  {
    id: "celine-classic-quilted-shoulder-bag",
    slug: "celine-classic-quilted-shoulder-bag",
    name: "Celine Classic Quilted Shoulder Bag",
    category: "womens-bags",
    subCategory: "celine",
    categoryLabel: "Celine Bags",
    price: 89200,
    oldPrice: 111500,
    discount: "-20%",
    badge: null,
    rating: 4.6,
    reviews: 201,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940985/IMG_1756.jpg",
  },
  {
    id: "chanel-classic-chain-shoulder-bag",
    slug: "chanel-classic-chain-shoulder-bag",
    name: "Chanel Classic Chain Shoulder Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 124800,
    oldPrice: 146800,
    discount: "-15%",
    badge: "New",
    rating: 4.7,
    reviews: 287,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941226/IMG_1480.jpg",
  },
  {
    id: "chanel-structured-chain-bag",
    slug: "chanel-structured-chain-bag",
    name: "Chanel Structured Chain Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 160800,
    oldPrice: 178700,
    discount: "-10%",
    badge: null,
    rating: 4.7,
    reviews: 141,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941191/IMG_1509.jpg",
  },
  {
    id: "louis-vuitton-side-trunk-pm-soft-box-bag",
    slug: "louis-vuitton-side-trunk-pm-soft-box-bag",
    name: "Louis Vuitton Side Trunk PM Soft Box Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 184800,
    oldPrice: 246400,
    discount: "-25%",
    badge: "Limited",
    rating: 4.8,
    reviews: 170,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868802/WhatsApp_Image_2026-10-01_at_15.44.17.jpg",
  },
  {
    id: "gucci-quilted-leather-top-handle-bag",
    slug: "gucci-quilted-leather-top-handle-bag",
    name: "Gucci Quilted Leather Top-Handle Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 182300,
    oldPrice: 227900,
    discount: "-20%",
    badge: null,
    rating: 4.5,
    reviews: 201,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941136/IMG_1545.jpg",
  },
  {
    id: "chanel-quilted-evening-bag",
    slug: "chanel-quilted-evening-bag",
    name: "Chanel Quilted Evening Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 77200,
    oldPrice: 87700,
    discount: "-12%",
    badge: null,
    rating: 4.8,
    reviews: 102,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941218/IMG_1489.jpg",
  },
  {
    id: "louis-vuitton-floral-lockme-style-backpack",
    slug: "louis-vuitton-floral-lockme-style-backpack",
    name: "Louis Vuitton Floral Lockme-Style Backpack",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 76500,
    oldPrice: 86900,
    discount: "-12%",
    badge: "New",
    rating: 4.8,
    reviews: 116,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868695/WhatsApp_Image_2026-10-01_at_15.43.01_1.jpg",
  },
  {
    id: "celine-small-flap-chain-bag",
    slug: "celine-small-flap-chain-bag",
    name: "Celine Small Flap Chain Bag",
    category: "womens-bags",
    subCategory: "celine",
    categoryLabel: "Celine Bags",
    price: 53500,
    oldPrice: 71300,
    discount: "-25%",
    badge: "Bestseller",
    rating: 4.6,
    reviews: 56,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940972/IMG_1780.jpg",
  },
  {
    id: "chanel-soft-quilted-shoulder-bag",
    slug: "chanel-soft-quilted-shoulder-bag",
    name: "Chanel Soft Quilted Shoulder Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 168400,
    oldPrice: 198100,
    discount: "-15%",
    badge: null,
    rating: 4.3,
    reviews: 237,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941234/IMG_1469.jpg",
  },
  {
    id: "gucci-compact-chain-crossbody-bag",
    slug: "gucci-compact-chain-crossbody-bag",
    name: "Gucci Compact Chain Crossbody Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 92000,
    oldPrice: 131400,
    discount: "-30%",
    badge: "Bestseller",
    rating: 4.5,
    reviews: 274,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941072/IMG_1610.jpg",
  },
  {
    id: "louis-vuitton-structured-full-leather-bucket-bag",
    slug: "louis-vuitton-structured-full-leather-bucket-bag",
    name: "Louis Vuitton Structured Full-Leather Bucket Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 110600,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 309,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868772/WhatsApp_Image_2026-10-01_at_15.43.51.jpg",
  },
  {
    id: "louis-vuitton-camouflage-keepall-travel-bag",
    slug: "louis-vuitton-camouflage-keepall-travel-bag",
    name: "Louis Vuitton Keepall Bandoulière Camouflage Travel Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 111900,
    oldPrice: 127200,
    discount: "-12%",
    badge: "Limited",
    rating: 4.6,
    reviews: 52,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868748/WhatsApp_Image_2026-10-01_at_15.43.32.jpg",
  },
  {
    id: "gucci-jackie-style-quilted-flap-bag",
    slug: "gucci-jackie-style-quilted-flap-bag",
    name: "Gucci Jackie Style Quilted Flap Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 110400,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.2,
    reviews: 348,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941043/IMG_1643.jpg",
  },
  {
    id: "gucci-diamond-quilted-shoulder-bag",
    slug: "gucci-diamond-quilted-shoulder-bag",
    name: "Gucci Diamond-Quilted Shoulder Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 68700,
    oldPrice: 80800,
    discount: "-15%",
    badge: null,
    rating: 4.5,
    reviews: 51,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941086/IMG_1570.jpg",
  },
  {
    id: "saint-laurent-structured-chain-shoulder-bag",
    slug: "saint-laurent-structured-chain-shoulder-bag",
    name: "Saint Laurent Structured Chain Shoulder Bag",
    category: "womens-bags",
    subCategory: "saint-laurent",
    categoryLabel: "Saint Laurent Bags",
    price: 138200,
    oldPrice: 184300,
    discount: "-25%",
    badge: "Limited",
    rating: 4.7,
    reviews: 26,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940965/IMG_1793.jpg",
  },
  {
    id: "louis-vuitton-pochette-papillon-compact-shoulder-bag",
    slug: "louis-vuitton-pochette-papillon-compact-shoulder-bag",
    name: "Louis Vuitton Pochette Papillon Compact Shoulder Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 108200,
    oldPrice: 135200,
    discount: "-20%",
    badge: null,
    rating: 4.7,
    reviews: 274,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868805/WhatsApp_Image_2026-10-01_at_15.44.09.jpg",
  },
  {
    id: "chanel-small-quilted-handbag",
    slug: "chanel-small-quilted-handbag",
    name: "Chanel Small Quilted Handbag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 133000,
    oldPrice: 162200,
    discount: "-18%",
    badge: null,
    rating: 4.2,
    reviews: 122,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941022/IMG_1672.jpg",
  },
  {
    id: "gucci-minimal-chain-shoulder-bag",
    slug: "gucci-minimal-chain-shoulder-bag",
    name: "Gucci Minimal Chain Shoulder Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 109900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 305,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940997/IMG_1703.jpg",
  },
  {
    id: "chanel-mini-quilted-top-handle-bag",
    slug: "chanel-mini-quilted-top-handle-bag",
    name: "Chanel Mini Quilted Top-Handle Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 118000,
    oldPrice: 143900,
    discount: "-18%",
    badge: "Limited",
    rating: 4.7,
    reviews: 33,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941270/IMG_1443.jpg",
  },
  {
    id: "celine-medium-chain-shoulder-bag",
    slug: "celine-medium-chain-shoulder-bag",
    name: "Celine Medium Chain Shoulder Bag",
    category: "womens-bags",
    subCategory: "celine",
    categoryLabel: "Celine Bags",
    price: 176800,
    oldPrice: 221000,
    discount: "-20%",
    badge: "Limited",
    rating: 4.4,
    reviews: 155,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940990/IMG_1734.jpg",
  },
  {
    id: "celine-classic-quilted-crossbody",
    slug: "celine-classic-quilted-crossbody",
    name: "Celine Classic Quilted Crossbody",
    category: "womens-bags",
    subCategory: "celine",
    categoryLabel: "Celine Bags",
    price: 169400,
    oldPrice: 199300,
    discount: "-15%",
    badge: null,
    rating: 4.3,
    reviews: 151,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790940994/IMG_1710.jpg",
  },
  {
    id: "louis-vuitton-express-leather-pillow-shoulder-bag",
    slug: "louis-vuitton-express-leather-pillow-shoulder-bag",
    name: "Louis Vuitton Express Leather Pillow Shoulder Bag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 116800,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 139,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868668/WhatsApp_Image_2026-10-01_at_15.42.51.jpg",
  },
  {
    id: "chanel-chain-strap-shoulder-bag",
    slug: "chanel-chain-strap-shoulder-bag",
    name: "Chanel Chain Strap Shoulder Bag",
    category: "womens-bags",
    subCategory: "chanel",
    categoryLabel: "Chanel Bags",
    price: 102900,
    oldPrice: 121100,
    discount: "-15%",
    badge: null,
    rating: 4.9,
    reviews: 46,
    color: "Brown",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941226/IMG_1480.jpg",
  },
  {
    id: "louis-vuitton-capucines-souple-mm-handbag",
    slug: "louis-vuitton-capucines-souple-mm-handbag",
    name: "Louis Vuitton Capucines Souple MM Handbag",
    category: "womens-bags",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Bags",
    price: 74400,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.3,
    reviews: 33,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790868725/WhatsApp_Image_2026-10-01_at_15.43.22.jpg",
  },
  {
    id: "gucci--mini-quilted-shoulder-bag",
    slug: "gucci--mini-quilted-shoulder-bag",
    name: "Gucci Mini Quilted Shoulder Bag",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 125900,
    oldPrice: 136800,
    discount: "-8%",
    badge: "Bestseller",
    rating: 4.2,
    reviews: 222,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941055/IMG_1624.jpg",
  },
  {
    id: "gucci-quilted-shoulder-satchel",
    slug: "gucci-quilted-shoulder-satchel",
    name: "Gucci Quilted Shoulder Satchel",
    category: "womens-bags",
    subCategory: "gucci",
    categoryLabel: "Gucci Bags",
    price: 122200,
    oldPrice: 162900,
    discount: "-25%",
    badge: "Limited",
    rating: 4.3,
    reviews: 288,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790941014/IMG_1686.jpg",
  },

  {
    id: "rolex-sport-steel-bracelet-watch",
    slug: "rolex-sport-steel-bracelet-watch",
    name: "Rolex Sport Steel Bracelet Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 210200,
    oldPrice: null,
    discount: null,
    badge: "Bestseller",
    rating: 4.8,
    reviews: 203,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2062.jpg",
  },
  {
    id: "rolex-silver-bezel-dress-watch",
    slug: "rolex-silver-bezel-dress-watch",
    name: "Rolex Silver Bezel Dress Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 155300,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.7,
    reviews: 331,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2061.jpg",
  },
  {
    id: "longines-silver-dial-steel-watch",
    slug: "longines-silver-dial-steel-watch",
    name: "Longines Silver Dial Steel Watch",
    category: "watches",
    subCategory: "longines",
    categoryLabel: "Longines Watches",
    price: 244400,
    oldPrice: 349100,
    discount: "-30%",
    badge: null,
    rating: 4.5,
    reviews: 332,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2059.jpg",
  },
  {
    id: "hublot-modern-steel-link-watch",
    slug: "hublot-modern-steel-link-watch",
    name: "Hublot Modern Steel Link Watch",
    category: "watches",
    subCategory: "hublot",
    categoryLabel: "Hublot Watches",
    price: 77200,
    oldPrice: 110300,
    discount: "-30%",
    badge: "New",
    rating: 4.8,
    reviews: 336,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2048.jpg",
  },
  {
    id: "hublot-stainless-case-quartz-watch",
    slug: "hublot-stainless-case-quartz-watch",
    name: "Hublot Stainless Case Quartz Watch",
    category: "watches",
    subCategory: "hublot",
    categoryLabel: "Hublot Watches",
    price: 160900,
    oldPrice: 182800,
    discount: "-12%",
    badge: "Bestseller",
    rating: 4.5,
    reviews: 84,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2051.jpg",
  },
  {
    id: "patek-philippe-classic-steel-mesh-watch",
    slug: "patek-philippe-classic-steel-mesh-watch",
    name: "Patek Philippe Classic Steel Mesh Watch",
    category: "watches",
    subCategory: "patek-philippe",
    categoryLabel: "Patek Philippe Watches",
    price: 65800,
    oldPrice: 71500,
    discount: "-8%",
    badge: null,
    rating: 4.2,
    reviews: 98,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2056.jpg",
  },
  {
    id: "patek-philippe-classic-steel-link-watch",
    slug: "patek-philippe-classic-steel-link-watch",
    name: "Patek Philippe Classic Steel Link Watch",
    category: "watches",
    subCategory: "patek-philippe",
    categoryLabel: "Patek Philippe Watches",
    price: 237700,
    oldPrice: null,
    discount: null,
    badge: "Bestseller",
    rating: 4.8,
    reviews: 65,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2055.jpg",
  },
  {
    id: "patek-philippe-slim-steel-dial-watch",
    slug: "patek-philippe-slim-steel-dial-watch",
    name: "Patek Philippe Slim Steel Dial Watch",
    category: "watches",
    subCategory: "patek-philippe",
    categoryLabel: "Patek Philippe Watches",
    price: 137100,
    oldPrice: 155800,
    discount: "-12%",
    badge: null,
    rating: 4.5,
    reviews: 331,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2057.jpg",
  },
  {
    id: "cartier-classic-metal-bracelet-watch",
    slug: "cartier-classic-metal-bracelet-watch",
    name: "Cartier Classic Metal Bracelet Watch",
    category: "watches",
    subCategory: "cartier",
    categoryLabel: "Cartier Watches",
    price: 159800,
    oldPrice: 213100,
    discount: "-25%",
    badge: null,
    rating: 4.4,
    reviews: 219,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889667/IMG_1392.jpg",
  },
  {
    id: "longines-polished-steel-dress-watch",
    slug: "longines-polished-steel-dress-watch",
    name: "Longines Polished Steel Dress Watch",
    category: "watches",
    subCategory: "longines",
    categoryLabel: "Longines Watches",
    price: 200800,
    oldPrice: 244900,
    discount: "-18%",
    badge: "New",
    rating: 4.6,
    reviews: 311,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2060.jpg",
  },
  {
    id: "rolex-signature-dial-dress-watch",
    slug: "rolex-signature-dial-dress-watch",
    name: "Rolex Signature Dial Dress Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 121000,
    oldPrice: 137500,
    discount: "-12%",
    badge: null,
    rating: 4.3,
    reviews: 140,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889789/IMG_1371.jpg",
  },
  {
    id: "rolex-minimal-leather-strap-watch",
    slug: "rolex-minimal-leather-strap-watch",
    name: "Rolex Minimal Leather Strap Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 90800,
    oldPrice: 103200,
    discount: "-12%",
    badge: null,
    rating: 4.4,
    reviews: 242,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889792/IMG_1369.jpg",
  },
  {
    id: "rolex-minimal-leather-strap-watch-2",
    slug: "rolex-minimal-leather-strap-watch-2",
    name: "Rolex Minimal Leather Strap Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 95000,
    oldPrice: 105600,
    discount: "-10%",
    badge: "Limited",
    rating: 4.4,
    reviews: 175,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889785/IMG_1376.jpg",
  },
  {
    id: "rolex-brushed-steel-dress-watch",
    slug: "rolex-brushed-steel-dress-watch",
    name: "Rolex Brushed Steel Dress Watch",
    category: "watches",
    subCategory: "rolex",
    categoryLabel: "Rolex Watches",
    price: 198900,
    oldPrice: 284100,
    discount: "-30%",
    badge: "Bestseller",
    rating: 4.6,
    reviews: 143,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889669/IMG_1383.jpg",
  },
  {
    id: "hublot-steel-bracelet-date-watch",
    slug: "hublot-steel-bracelet-date-watch",
    name: "Hublot Steel Bracelet Date Watch",
    category: "watches",
    subCategory: "hublot",
    categoryLabel: "Hublot Watches",
    price: 214600,
    oldPrice: 243900,
    discount: "-12%",
    badge: null,
    rating: 4.5,
    reviews: 80,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2052.jpg",
  },
  {
    id: "patek-philippe-stainless-steel-chronograph-watch",
    slug: "patek-philippe-stainless-steel-chronograph-watch",
    name: "Patek Philippe Stainless Steel Chronograph Watch",
    category: "watches",
    subCategory: "patek-philippe",
    categoryLabel: "Patek Philippe Watches",
    price: 171200,
    oldPrice: 194500,
    discount: "-12%",
    badge: null,
    rating: 4.8,
    reviews: 79,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2054.jpg",
  },
  {
    id: "patek-philippe-minimal-steel-case-watch",
    slug: "patek-philippe-minimal-steel-case-watch",
    name: "Patek Philippe Minimal Steel Case Watch",
    category: "watches",
    subCategory: "patek-philippe",
    categoryLabel: "Patek Philippe Watches",
    price: 75500,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 379,
    color: "Silver",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2058.jpg",
  },
  {
    id: "hublot-two-tone-steel-watch",
    slug: "hublot-two-tone-steel-watch",
    name: "Hublot Two-Tone Steel Watch",
    category: "watches",
    subCategory: "hublot",
    categoryLabel: "Hublot Watches",
    price: 102600,
    oldPrice: 111500,
    discount: "-8%",
    badge: null,
    rating: 4.7,
    reviews: 69,
    color: "Black",
    size: [],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2050.jpg",
  },

  {
    id: "gucci-classic-men-shoes",
    slug: "gucci-classic-men-shoes",
    name: "Gucci Classic Men's Shoes",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 142300,
    oldPrice: 177900,
    discount: "-20%",
    badge: null,
    rating: 4.6,
    reviews: 177,
    color: "Brown",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943163/IMG_1966.jpg",
  },
  {
    id: "louis-vuitton-monogram-ace-style-sneakers",
    slug: "louis-vuitton-monogram-ace-style-sneakers",
    name: "Louis Vuitton Monogram Ace-Style Sneakers",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 105400,
    oldPrice: 128500,
    discount: "-18%",
    badge: "New",
    rating: 4.4,
    reviews: 386,
    color: "White",
    size: ["38", "39", "40", "41", "42", "43"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943225/IMG_1829.jpg",
  },
  {
    id: "gucci-interlocking-g-style-low-top-heels",
    slug: "gucci-interlocking-g-style-low-top-heels",
    name: "Gucci Interlocking-G Style Low-Top Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 108200,
    oldPrice: 144300,
    discount: "-25%",
    badge: null,
    rating: 4.9,
    reviews: 20,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889911/IMG_1344.jpg",
  },
  {
    id: "gucci-retro-stripe-heels",
    slug: "gucci-retro-stripe-heels",
    name: "Gucci Retro Stripe Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 126300,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 220,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44", "45"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943210/IMG_1878.jpg",
  },
  {
    id: "gucci-retro-runner-shoe",
    slug: "gucci-retro-runner-shoe",
    name: "Gucci Retro Runner Shoe",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 132200,
    oldPrice: 188900,
    discount: "-30%",
    badge: "Limited",
    rating: 4.7,
    reviews: 196,
    color: "Black",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889906/IMG_1354.jpg",
  },
  {
    id: "gucci-classic-leather-heels",
    slug: "gucci-classic-leather-heels",
    name: "Gucci Classic Leather Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 60500,
    oldPrice: 73800,
    discount: "-18%",
    badge: null,
    rating: 4.8,
    reviews: 99,
    color: "White",
    size: ["38", "39", "40", "41", "42", "43"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943212/IMG_1871.jpg",
  },
  {
    id: "louis-vuitton-clasic-heels",
    slug: "louis-vuitton-clasic-heels",
    name: "Louis Vuitton Classic Heels",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 142200,
    oldPrice: 154600,
    discount: "-8%",
    badge: "New",
    rating: 4.2,
    reviews: 236,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943232/IMG_1812.jpg",
  },
  {
    id: "louis-vuitton-air-motion-low-top-shoe",
    slug: "louis-vuitton-air-motion-low-top-shoe",
    name: "Louis Vuitton Air Motion Low-Top Shoe",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 86900,
    oldPrice: 108600,
    discount: "-20%",
    badge: null,
    rating: 4.8,
    reviews: 289,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44", "45"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889915/IMG_1329.jpg",
  },
  {
    id: "louis-vuitton-monogram-court-sneakers",
    slug: "louis-vuitton-monogram-court-sneakers",
    name: "Louis Vuitton Monogram Court Sneakers",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 71000,
    oldPrice: 77200,
    discount: "-8%",
    badge: null,
    rating: 4.6,
    reviews: 189,
    color: "White",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889432/IMG_1306.jpg",
  },
  {
    id: "gucci-leather-stripe-shoe",
    slug: "gucci-leather-stripe-shoe",
    name: "Gucci Leather Stripe Shoe",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 75400,
    oldPrice: 100500,
    discount: "-25%",
    badge: "Bestseller",
    rating: 4.2,
    reviews: 173,
    color: "White",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943121/IMG_2035.jpg",
  },
  {
    id: "gucci-classic-heels",
    slug: "gucci-classic-heels",
    name: "Gucci Classic Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 145800,
    oldPrice: 208300,
    discount: "-30%",
    badge: null,
    rating: 4.7,
    reviews: 88,
    color: "Black",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889913/IMG_1338.jpg",
  },
  {
    id: "gucci-men-classic-shoes",
    slug: "gucci-men-classic-shoes",
    name: "Gucci Men's Classic Shoes",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 103600,
    oldPrice: 117700,
    discount: "-12%",
    badge: null,
    rating: 4.6,
    reviews: 373,
    color: "White",
    size: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943121/IMG_2013.jpg",
  },
  {
    id: "gucci-vintage-heels",
    slug: "gucci-vintage-heels",
    name: "Gucci Vintage Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 127300,
    oldPrice: 169700,
    discount: "-25%",
    badge: null,
    rating: 4.3,
    reviews: 166,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44", "45"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943136/IMG_2039.jpg",
  },
  {
    id: "gucci-men-classic-shoe",
    slug: "gucci-men-classic-shoe",
    name: "Gucci Men's Classic Shoe",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 133400,
    oldPrice: 162700,
    discount: "-18%",
    badge: null,
    rating: 4.8,
    reviews: 311,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943173/IMG_1957.jpg",
  },
  {
    id: "louis-vuitton-embroidered-bee-style-heels",
    slug: "louis-vuitton-embroidered-bee-style-heels",
    name: "Louis Vuitton Embroidered-Bee Style Heels",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 73300,
    oldPrice: 89400,
    discount: "-18%",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 112,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44", "45"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943229/IMG_1821.jpg",
  },
  {
    id: "louis-vuitton-chunky-logo-sneakers",
    slug: "louis-vuitton-chunky-logo-sneakers",
    name: "Louis Vuitton Chunky Logo Sneakers",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 148800,
    oldPrice: 165300,
    discount: "-10%",
    badge: "Bestseller",
    rating: 4.2,
    reviews: 40,
    color: "Black",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943214/IMG_1857.jpg",
  },
  {
    id: "gucci-classic-heels-2",
    slug: "gucci-classic-heels-2",
    name: "Gucci Classic Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 120200,
    oldPrice: 130700,
    discount: "-8%",
    badge: "Bestseller",
    rating: 4.7,
    reviews: 149,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943152/IMG_1975.jpg",
  },
  {
    id: "gucci-classic-heels-3",
    slug: "gucci-classic-heels-3",
    name: "Gucci Classic Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 140200,
    oldPrice: 175200,
    discount: "-20%",
    badge: "New",
    rating: 4.4,
    reviews: 263,
    color: "White",
    size: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943143/IMG_1985.jpg",
  },
  {
    id: "gucci-classic-heels-4",
    slug: "gucci-classic-heels-4",
    name: "Gucci Classic Heels",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 56700,
    oldPrice: 70900,
    discount: "-20%",
    badge: null,
    rating: 4.3,
    reviews: 39,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943207/IMG_1887.jpg",
  },
  {
    id: "louis-vuitton-vintage-runner-sneakers",
    slug: "louis-vuitton-vintage-runner-sneakers",
    name: "Louis Vuitton Vintage Runner Sneakers",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 108500,
    oldPrice: 155000,
    discount: "-30%",
    badge: null,
    rating: 4.8,
    reviews: 315,
    color: "Black",
    size: ["38", "39", "40", "41", "42", "43", "44", "45"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943219/IMG_1842.jpg",
  },
  {
    id: "gucci-classic-Shoe",
    slug: "gucci-classic-Shoe",
    name: "Gucci Classic Shoe",
    category: "shoes",
    subCategory: "gucci",
    categoryLabel: "Gucci Shoes",
    price: 152300,
    oldPrice: 173100,
    discount: "-12%",
    badge: null,
    rating: 4.4,
    reviews: 137,
    color: "Black",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790943192/IMG_1912.jpg",
  },
  {
    id: "louis-vuitton-classic-heels",
    slug: "louis-vuitton-classic-heels",
    name: "Louis Vuitton Classic Heels",
    category: "shoes",
    subCategory: "louis-vuitton",
    categoryLabel: "Louis Vuitton Shoes",
    price: 115800,
    oldPrice: 128700,
    discount: "-10%",
    badge: "Limited",
    rating: 4.7,
    reviews: 231,
    color: "Black",
    size: ["38", "39", "40", "41", "42"],
    image: "https://res.cloudinary.com/st6vzres/image/upload/v1790889580/IMG_1299.jpg",
  },
];

/* =========================================================
   NAVIGATION DATA
========================================================= */

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

const ProductCard = ({
  product,
  onAddToCart,
  saved,
  onToggleSaved,
}) => (
  <article className="group min-w-0">
    <div className="relative aspect-[4/4.9] overflow-hidden rounded-2xl bg-[#f5f5f3]">
      {(product.badge || product.discount) && (
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-white">
            {product.badge || product.discount}
          </span>
        </div>
      )}

      <button
        type="button"
        aria-label={
          saved ? "Remove product from saved" : "Save product"
        }
        onClick={() => onToggleSaved(product)}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:text-black ${saved ? "text-black" : "text-[#63666A]"
          }`}
      >
        <Icon
          name="heart"
          size={17}
          strokeWidth={1.7}
          className={saved ? "fill-current" : ""}
        />
      </button>

      <Link
        to={`/product/${product.id}`}
        className="block h-full"
      >
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

const FilterSection = ({
  title,
  open,
  onToggle,
  children,
}) => (
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
   BAG SUBCATEGORY CARD
========================================================= */

const BagSubcategoryCard = ({ category, subcategory }) => (
  <Link
    to={`/categories/${category}?subcategory=${subcategory.slug}`}
    className="group block"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f3]">
      <img
        src={subcategory.image}
        alt={subcategory.title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Collection
        </p>

        <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-white sm:text-[24px]">
          {subcategory.title}
        </h3>

        <p className="mt-2 max-w-[300px] text-[11px] leading-5 text-white/75">
          {subcategory.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-white">
          Shop Collection
          <Icon name="arrowRight" size={13} />
        </div>
      </div>
    </div>
  </Link>
);

/* =========================================================
   CATEGORY PAGE
========================================================= */

export default function Category() {
  const { category } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    addToCart,
    toggleSavedProduct,
    isSaved,
    totalItems,
  } = useCart();

  const currentCategory = categoryMap[category];

  const currentSubcategories =
    categorySubcategories[category] || [];

  const selectedSubcategorySlug =
    searchParams.get("subcategory");

  const selectedSubcategory =
    currentSubcategories.find(
      (item) => item.slug === selectedSubcategorySlug
    );

  const hasSelectedSubcategory =
    Boolean(selectedSubcategory);

  const pageTitle =
    hasSelectedSubcategory
      ? selectedSubcategory.title
      : currentCategory?.title;

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileCategoriesOpen, setMobileCategoriesOpen] =
    useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [selectedPrice, setSelectedPrice] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("recent");

  const [toast, setToast] = useState("");

  const [openFilters, setOpenFilters] = useState({
    price: true,
    availability: true,
  });

  const [selectedStock, setSelectedStock] =
    useState("All");

  /* =====================================================
     TOAST
  ====================================================== */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__novaCategoryToast
    );

    window.__novaCategoryToast =
      window.setTimeout(() => {
        setToast("");
      }, 2500);
  };

  /* =====================================================
     FILTERED PRODUCTS
  ====================================================== */

  const filteredProducts = useMemo(() => {
    if (!currentCategory) return [];

    /*
      Categories with brand subcategories do not show
      products until a subcategory has been selected.
    */
    if (
      currentSubcategories.length > 0 &&
      !selectedSubcategory
    ) {
      return [];
    }

    const query = searchTerm
      .trim()
      .toLowerCase();

    let filtered = allProducts.filter(
      (product) => product.category === category
    );

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) =>
          product.subCategory ===
          selectedSubcategory.slug
      );
    }

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.categoryLabel
            .toLowerCase()
            .includes(query)
      );
    }

    if (selectedPrice !== "all") {
      filtered = filtered.filter((product) => {
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

    if (selectedStock !== "All") {
      /*
        The current product data does not contain
        stock information, so existing behavior is kept.
      */
      filtered = filtered.filter(
        () => selectedStock === "In Stock"
      );
    }

    return [...filtered].sort((a, b) => {
      const aIndex = allProducts.findIndex(
        (item) => item.id === a.id
      );

      const bIndex = allProducts.findIndex(
        (item) => item.id === b.id
      );

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
    currentSubcategories,
    selectedSubcategory,
    searchTerm,
    selectedPrice,
    selectedStock,
    sortBy,
  ])

  /* =====================================================
     CLEAR FILTERS
  ====================================================== */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPrice("all");
    setSelectedStock("All");
    setSortBy("recent");
  };

  /* =====================================================
     RETURN TO CATEGORY SUBCATEGORIES
  ====================================================== */

  const handleBackToCategorySubcategories = () => {
    setSearchParams({});
    clearFilters();
    setSearchOpen(false);
  };

  /* =====================================================
     ADD TO CART
  ====================================================== */

  const handleAddToCart = (product) => {
    addToCart(product, {
      selectedColor: product.color || null,
      selectedSize: product.size?.[0] || null,
      quantity: 1,
    });

    showToast(
      `${product.name} added to cart`
    );
  };

  /* =====================================================
     TOGGLE SAVED
  ====================================================== */

  const handleToggleSaved = (product) => {
    const added =
      toggleSavedProduct(product);

    showToast(
      added
        ? "Product saved"
        : "Removed from saved products"
    );
  };

  /* =====================================================
     CATEGORY NOT FOUND
  ====================================================== */

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white font-sans text-black">
        <header className="border-b border-black/[0.07] bg-white">
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

  /* =====================================================
     FILTER COUNT
  ====================================================== */

  const activeFilterCount =
    (selectedPrice !== "all" ? 1 : 0) +
    (selectedStock !== "All" ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0);

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/95 backdrop-blur">
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
                <Icon
                  name="chevronDown"
                  size={13}
                />
              </button>

              <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[245px] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover/categories:pointer-events-auto group-hover/categories:visible group-hover/categories:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl">
                  <div className="border-b border-black/[0.07] px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                      Shop Categories
                    </p>
                  </div>

                  <div className="py-2">
                    {categoryLinks.map(
                      ([label, slug]) => (
                        <Link
                          key={slug}
                          to={`/categories/${slug}`}
                          className={`flex items-center justify-between px-5 py-3.5 text-[12px] font-medium transition hover:bg-[#f7f7f6] ${slug === category
                              ? "text-black"
                              : ""
                            }`}
                        >
                          <span>
                            {label}
                          </span>

                          <Icon
                            name="arrowRight"
                            size={14}
                            strokeWidth={1.5}
                          />
                        </Link>
                      )
                    )}
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
              <Icon
                name="search"
                size={20}
              />
            </Link>

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

        {/* SEARCH PANEL */}

        {searchOpen && (
          <div className="border-t border-black/[0.06] bg-white">
            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-7 lg:px-10">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center text-[#808080]">
                  <Icon
                    name="search"
                    size={18}
                  />
                </span>

                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder={`Search ${pageTitle?.toLowerCase()}...`}
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

      {/* ===================================================
          MOBILE NAV
      ==================================================== */}

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
                  <span>Categories</span>

                  <Icon
                    name="arrowDown"
                    size={16}
                  />
                </button>

                {mobileCategoriesOpen && (
                  <div className="pb-3 pl-3">
                    {categoryLinks.map(
                      ([label, slug]) => (
                        <Link
                          key={slug}
                          to={`/categories/${slug}`}
                          onClick={() =>
                            setMobileMenuOpen(
                              false
                            )
                          }
                          className="flex items-center justify-between rounded-lg px-4 py-3 text-[14px] text-[#63666A] hover:bg-[#f7f7f6] hover:text-black"
                        >
                          {label}

                          <Icon
                            name="arrowRight"
                            size={14}
                          />
                        </Link>
                      )
                    )}
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
            CATEGORY HERO
        ==================================================== */}

        <section className="px-5 pb-8 pt-7 sm:px-7 sm:pt-10 lg:px-10 lg:pb-10 lg:pt-12">
          <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#f4f4f2] lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-20">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#808080]">
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

                {selectedSubcategory ? (
                  <>
                    <Link
                      to={`/categories/${category}`}
                      className="hover:text-black"
                    >
                      {currentCategory.title}
                    </Link>

                    <span>/</span>

                    <span className="text-black">
                      {selectedSubcategory.title}
                    </span>
                  </>
                ) : (
                  <span className="text-black">
                    {currentCategory.title}
                  </span>
                )}
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#63666A]">
                Collection
              </p>

              <h1 className="mt-3 max-w-[620px] text-[44px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]">
                {pageTitle}
              </h1>

              <p className="mt-6 max-w-[500px] text-[14px] leading-7 text-[#63666A] sm:text-[15px]">
                {hasSelectedSubcategory
                  ? selectedSubcategory.description
                  : currentCategory.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                {currentSubcategories.length > 0 &&
                  !hasSelectedSubcategory ? (
                  <span className="rounded-full bg-black px-3 py-2 text-[10px] font-medium text-white">
                    {currentSubcategories.length} Collections
                  </span>
                ) : (
                  <span className="rounded-full bg-black px-3 py-2 text-[10px] font-medium text-white">
                    {filteredProducts.length} Products
                  </span>
                )}

                <span className="text-[11px] text-[#808080]">
                  Curated for everyday style
                </span>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden sm:min-h-[440px] lg:min-h-[540px]">
              <img
                src={
                  hasSelectedSubcategory
                    ? selectedSubcategory.image
                    : currentCategory.image
                }
                alt={pageTitle}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ===================================================
            CATEGORY SUBCATEGORIES
        ==================================================== */}

        {currentSubcategories.length > 0 &&
          !hasSelectedSubcategory && (
            <section className="px-5 pb-12 sm:px-7 sm:pb-14 lg:px-10 lg:pb-16">
              <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                      {currentCategory.title}
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] sm:text-[34px]">
                      Shop by Brand
                    </h2>

                    <p className="mt-3 max-w-[600px] text-[12px] leading-6 text-[#808080]">
                      Choose a collection to explore products from your preferred brand.
                    </p>
                  </div>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                  >
                    View All Products
                    <Icon
                      name="arrowRight"
                      size={14}
                    />
                  </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {currentSubcategories.map(
                    (subcategory) => (
                      <BagSubcategoryCard
                        key={subcategory.slug}
                        category={category}
                        subcategory={subcategory}
                      />
                    )
                  )}
                </div>
              </div>
            </section>
          )}

        {/* ===================================================
            PRODUCT SEARCH + SORT
        ==================================================== */}

        {(currentSubcategories.length === 0 ||
          hasSelectedSubcategory) && (
            <section className="px-5 pt-2 sm:px-7 lg:px-10">
              <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="relative w-full lg:max-w-[520px]">
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
                      placeholder={`Search ${pageTitle.toLowerCase()}...`}
                      className="h-12 w-full rounded-xl border border-black/10 bg-[#f7f7f6] pl-11 pr-4 text-[13px] outline-none placeholder:text-[#808080] focus:border-black"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <p className="text-[11px] text-[#808080]">
                      Showing{" "}
                      <span className="font-medium text-black">
                        {
                          filteredProducts.length
                        }
                      </span>{" "}
                      products
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setMobileFiltersOpen(
                          true
                        )
                      }
                      className="flex h-11 items-center gap-2 rounded-xl border border-black/10 px-4 text-[11px] font-semibold uppercase tracking-[0.1em] lg:hidden"
                    >
                      <Icon
                        name="sliders"
                        size={15}
                      />
                      Filters
                    </button>

                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(event) =>
                          setSortBy(
                            event.target.value
                          )
                        }
                        aria-label="Sort products"
                        className="h-11 min-w-[155px] appearance-none rounded-xl border border-black/10 bg-white pl-4 pr-10 text-[11px] font-medium outline-none focus:border-black"
                      >
                        {sortOptions.map(
                          (option) => (
                            <option
                              key={option.value}
                              value={
                                option.value
                              }
                            >
                              {option.label}
                            </option>
                          )
                        )}
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
          )}

        {/* ===================================================
            PRODUCTS
        ==================================================== */}

        {(currentSubcategories.length === 0 ||
          hasSelectedSubcategory) && (
            <section className="px-5 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
              <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[240px_1fr]">
                {/* DESKTOP FILTERS */}

                <aside className="hidden lg:block">
                  <div className="sticky top-[100px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          name="sliders"
                          size={15}
                          className="text-[#808080]"
                        />

                        <h2 className="text-[13px] font-semibold">
                          Filters
                        </h2>
                      </div>

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

                    <FilterSection
                      title="Price"
                      open={openFilters.price}
                      onToggle={() =>
                        setOpenFilters(
                          (current) => ({
                            ...current,
                            price: !current.price,
                          })
                        )
                      }
                    >
                      <div className="flex flex-col gap-2">
                        {priceOptions.map(
                          (option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                setSelectedPrice(
                                  option.value
                                )
                              }
                              className="flex items-center gap-3 text-left text-[11px]"
                            >
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded border ${selectedPrice ===
                                    option.value
                                    ? "border-black bg-black text-white"
                                    : "border-black/20"
                                  }`}
                              >
                                {selectedPrice ===
                                  option.value && (
                                    <Icon
                                      name="check"
                                      size={10}
                                      strokeWidth={2}
                                    />
                                  )}
                              </span>

                              <span
                                className={
                                  selectedPrice ===
                                    option.value
                                    ? "font-medium"
                                    : "text-[#63666A]"
                                }
                              >
                                {option.label}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </FilterSection>

                    <FilterSection
                      title="Availability"
                      open={
                        openFilters.availability
                      }
                      onToggle={() =>
                        setOpenFilters(
                          (current) => ({
                            ...current,
                            availability:
                              !current.availability,
                          })
                        )
                      }
                    >
                      <div className="flex flex-col gap-2.5">
                        {["All", "In Stock"].map(
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
                                className={`flex h-4 w-4 items-center justify-center rounded border ${selectedStock ===
                                    stock
                                    ? "border-black bg-black text-white"
                                    : "border-black/20"
                                  }`}
                              >
                                {selectedStock ===
                                  stock && (
                                    <Icon
                                      name="check"
                                      size={10}
                                      strokeWidth={2}
                                    />
                                  )}
                              </span>

                              <span
                                className={
                                  selectedStock ===
                                    stock
                                    ? "font-medium"
                                    : "text-[#63666A]"
                                }
                              >
                                {stock}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </FilterSection>

                    <div className="mt-5 rounded-2xl bg-[#f7f7f6] p-5">
                      <p className="text-[11px] font-semibold">
                        Need help choosing?
                      </p>

                      <p className="mt-2 text-[10px] leading-5 text-[#808080]">
                        Contact our store for product
                        details, availability and
                        styling questions.
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

                {/* PRODUCT GRID */}

                <div>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">
                      {filteredProducts.map(
                        (product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={
                              handleAddToCart
                            }
                            saved={isSaved(
                              product.id
                            )}
                            onToggleSaved={
                              handleToggleSaved
                            }
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
                          We couldn't find any
                          products matching your
                          current filters.
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
            </section>
          )}

        {/* ===================================================
            SUBCATEGORY BACK NAVIGATION
        ==================================================== */}

        {hasSelectedSubcategory && (
          <section className="px-5 pb-8 sm:px-7 lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <button
                type="button"
                onClick={
                  handleBackToCategorySubcategories
                }
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-[11px] font-medium transition hover:border-black hover:bg-black hover:text-white"
              >
                <span className="text-[15px]">
                  ←
                </span>

                Back to {currentCategory.title}
              </button>
            </div>
          </section>
        )}

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
                <Icon
                  name="arrowRight"
                  size={14}
                />
              </Link>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {categoryLinks.map(
                ([label, slug]) => (
                  <Link
                    key={slug}
                    to={`/categories/${slug}`}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-medium transition ${slug === category
                        ? "bg-black text-white"
                        : "bg-white text-[#63666A] hover:text-black"
                      }`}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            SERVICE BENEFITS
        ==================================================== */}

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
                className={`flex items-center gap-4 px-5 py-6 sm:px-7 lg:px-8 ${index < 3
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
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* ===================================================
          MOBILE FILTER DRAWER
      ==================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFiltersOpen(false)
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
                    {activeFilterCount} filter
                    {activeFilterCount > 1
                      ? "s"
                      : ""}{" "}
                    applied
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
              <FilterSection
                title="Price"
                open={openFilters.price}
                onToggle={() =>
                  setOpenFilters(
                    (current) => ({
                      ...current,
                      price: !current.price,
                    })
                  )
                }
              >
                <div className="flex flex-col gap-2.5">
                  {priceOptions.map(
                    (option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setSelectedPrice(
                            option.value
                          )
                        }
                        className="flex items-center gap-3 text-left text-[11px]"
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${selectedPrice ===
                              option.value
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                            }`}
                        >
                          {selectedPrice ===
                            option.value && (
                              <Icon
                                name="check"
                                size={10}
                                strokeWidth={2}
                              />
                            )}
                        </span>

                        <span>
                          {option.label}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </FilterSection>

              <FilterSection
                title="Availability"
                open={
                  openFilters.availability
                }
                onToggle={() =>
                  setOpenFilters(
                    (current) => ({
                      ...current,
                      availability:
                        !current.availability,
                    })
                  )
                }
              >
                <div className="flex flex-col gap-2.5">
                  {["All", "In Stock"].map(
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
                          className={`flex h-4 w-4 items-center justify-center rounded border ${selectedStock ===
                              stock
                              ? "border-black bg-black text-white"
                              : "border-black/20"
                            }`}
                        >
                          {selectedStock ===
                            stock && (
                              <Icon
                                name="check"
                                size={10}
                                strokeWidth={2}
                              />
                            )}
                        </span>

                        <span>{stock}</span>
                      </button>
                    )
                  )}
                </div>
              </FilterSection>
            </div>

            <div className="border-t border-black/[0.08] p-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-[11px] font-medium"
                >
                  Clear Filters
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      false
                    )
                  }
                  className="flex-1 rounded-xl bg-black px-4 py-3 text-[11px] font-medium text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          TOAST
      ==================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}