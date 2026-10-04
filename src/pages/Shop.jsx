import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

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

    chevronDown: <path d="m6 9 6 6 6-6" />,

    chevronLeft: <path d="m15 18-6-6 6-6" />,

    chevronRight: <path d="m9 18 6-6-6 6" />,

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
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

    refresh: (
      <>
        <path d="M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16" />
        <path d="M20 20v-4h-4" />
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
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================================
   PRODUCT DATA
   Temporary data.
   Later this will come from:
   GET /api/products
========================================================= */

const products = [
  {
    id: 1,
    slug: "chanel-classic-quilted-chain-bag",
    name: "Chanel Classic Quilted Chain Bag",
    category: "Bags",
    price: 133700,
    oldPrice: 151900,
    discount: '-12%',
    badge: 'Limited',
    rating: 4.7,
    reviews: 152,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941310/IMG_1424.jpg",
  },

  {
    id: 2,
    slug: "gucci-classic-men-shoes",
    name: "Gucci Classic Men's Shoes",
    category: "Shoes",
    price: 142300,
    oldPrice: 177900,
    discount: '-20%',
    badge: null,
    rating: 4.6,
    reviews: 177,
    colors: ['White', 'Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943163/IMG_1966.jpg",
  },

  {
    id: 3,
    slug: "chanel-quilted-flap-shoulder-bag",
    name: "Chanel Quilted Flap Shoulder Bag",
    category: "Bags",
    price: 106000,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 225,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941323/IMG_1397.jpg",
  },

  {
    id: 4,
    slug: "louis-vuitton-monogram-ace-style-sneakers",
    name: "Louis Vuitton Monogram Ace-Style Sneakers",
    category: "Shoes",
    price: 105400,
    oldPrice: 128500,
    discount: '-18%',
    badge: 'New',
    rating: 4.4,
    reviews: 386,
    colors: ['White', 'Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943225/IMG_1829.jpg",
  },

  {
    id: 5,
    slug: "gucci-compact-flap-backpack",
    name: "Gucci Compact Flap Backpack",
    category: "Bags",
    price: 149400,
    oldPrice: 213400,
    discount: '-30%',
    badge: 'Bestseller',
    rating: 4.5,
    reviews: 183,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941008/IMG_1692.jpg",
  },

  {
    id: 6,
    slug: "gucci-interlocking-g-style-low-top-heels",
    name: "Gucci Interlocking-G Style Low-Top Heels",
    category: "Shoes",
    price: 108200,
    oldPrice: 144300,
    discount: '-25%',
    badge: null,
    rating: 4.9,
    reviews: 20,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889911/IMG_1344.jpg",
  },

  {
    id: 7,
    slug: "chanel-compact-quilted-handbag",
    name: "Chanel Compact Quilted Handbag",
    category: "Bags",
    price: 143700,
    oldPrice: 169100,
    discount: '-15%',
    badge: 'Bestseller',
    rating: 4.4,
    reviews: 22,
    colors: ['Black', 'Red', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941163/IMG_1529.jpg",
  },

  {
    id: 8,
    slug: "gucci-retro-stripe-heels",
    name: "Gucci Retro Stripe Heels",
    category: "Shoes",
    price: 126300,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 220,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943210/IMG_1878.jpg",
  },

  {
    id: 9,
    slug: "chanel-small-quilted-crossbody-bag",
    name: "Chanel Small Quilted Crossbody Bag",
    category: "Bags",
    price: 132400,
    oldPrice: 176500,
    discount: '-25%',
    badge: 'Limited',
    rating: 4.4,
    reviews: 209,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941186/IMG_1518.jpg",
  },

  {
    id: 10,
    slug: "rolex-sport-steel-bracelet-watch",
    name: "Rolex Sport Steel Bracelet Watch",
    category: "Watches",
    price: 210200,
    oldPrice: null,
    discount: null,
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 203,
    colors: ['Black', 'Gold'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2062.jpg",
  },

  {
    id: 11,
    slug: "chanel-slim-chain-shoulder-bag",
    name: "Chanel Slim Chain Shoulder Bag",
    category: "Bags",
    price: 58000,
    oldPrice: 70700,
    discount: '-18%',
    badge: null,
    rating: 4.5,
    reviews: 353,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941165/IMG_1528.jpg",
  },

  {
    id: 12,
    slug: "gucci-retro-runner-shoe",
    name: "Gucci Retro Runner Shoe",
    category: "Shoes",
    price: 132200,
    oldPrice: 188900,
    discount: '-30%',
    badge: 'Limited',
    rating: 4.7,
    reviews: 196,
    colors: ['Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889906/IMG_1354.jpg",
  },

  {
    id: 13,
    slug: "louis-vuitton-speedy-trunk-pillow-shoulder-bag",
    name: "Louis Vuitton Speedy Trunk Pillow Shoulder Bag",
    category: "Bags",
    price: 53400,
    oldPrice: 76300,
    discount: '-30%',
    badge: null,
    rating: 4.7,
    reviews: 293,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868716/WhatsApp_Image_2026-10-01_at_15.43.16.jpg",
  },

  {
    id: 14,
    slug: "rolex-silver-bezel-dress-watch",
    name: "Rolex Silver Bezel Dress Watch",
    category: "Watches",
    price: 155300,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.7,
    reviews: 331,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2061.jpg",
  },

  {
    id: 15,
    slug: "gucci-backpack",
    name: "Gucci Backpack",
    category: "Bags",
    price: 146500,
    oldPrice: 178700,
    discount: '-18%',
    badge: null,
    rating: 4.5,
    reviews: 187,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941022/IMG_1679.jpg",
  },

  {
    id: 16,
    slug: "gucci-classic-leather-heels",
    name: "Gucci Classic Leather Heels",
    category: "Shoes",
    price: 60500,
    oldPrice: 73800,
    discount: '-18%',
    badge: null,
    rating: 4.8,
    reviews: 99,
    colors: ['White', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943212/IMG_1871.jpg",
  },

  {
    id: 17,
    slug: "gucci-classic-flap-handbag",
    name: "Gucci Classic Flap Handbag",
    category: "Bags",
    price: 140900,
    oldPrice: null,
    discount: null,
    badge: 'Bestseller',
    rating: 4.4,
    reviews: 126,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941107/IMG_1550.jpg",
  },

  {
    id: 18,
    slug: "louis-vuitton-clasic-heels",
    name: "Louis Vuitton Classic Heels",
    category: "Shoes",
    price: 142200,
    oldPrice: 154600,
    discount: '-8%',
    badge: 'New',
    rating: 4.2,
    reviews: 236,
    colors: ['Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943232/IMG_1812.jpg",
  },

  {
    id: 19,
    slug: "gucci-medium-quilted-flap-bag",
    name: "Gucci Medium Quilted Flap Bag",
    category: "Bags",
    price: 137200,
    oldPrice: 167300,
    discount: '-18%',
    badge: 'Limited',
    rating: 4.4,
    reviews: 115,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941074/IMG_1592.jpg",
  },

  {
    id: 20,
    slug: "longines-silver-dial-steel-watch",
    name: "Longines Silver Dial Steel Watch",
    category: "Watches",
    price: 244400,
    oldPrice: 349100,
    discount: '-30%',
    badge: null,
    rating: 4.5,
    reviews: 332,
    colors: ['Silver', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2059.jpg",
  },

  {
    id: 21,
    slug: "gucci-modern-bag",
    name: "Gucci Modern Bag",
    category: "Bags",
    price: 103800,
    oldPrice: 118000,
    discount: '-12%',
    badge: 'New',
    rating: 4.8,
    reviews: 121,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941035/IMG_1656.jpg",
  },

  {
    id: 22,
    slug: "hublot-modern-steel-link-watch",
    name: "Hublot Modern Steel Link Watch",
    category: "Watches",
    price: 77200,
    oldPrice: 110300,
    discount: '-30%',
    badge: 'New',
    rating: 4.8,
    reviews: 336,
    colors: ['Black', 'Gold'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2048.jpg",
  },

  {
    id: 23,
    slug: "gucci-mini-bag",
    name: "Gucci Mini Bag",
    category: "Bags",
    price: 45000,
    oldPrice: 56200,
    discount: '-20%',
    badge: 'Limited',
    rating: 4.4,
    reviews: 243,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941086/IMG_1570.jpg",
  },

  {
    id: 24,
    slug: "louis-vuitton-air-motion-low-top-shoe",
    name: "Louis Vuitton Air Motion Low-Top Shoe",
    category: "Shoes",
    price: 86900,
    oldPrice: 108600,
    discount: '-20%',
    badge: null,
    rating: 4.8,
    reviews: 289,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889915/IMG_1329.jpg",
  },

  {
    id: 25,
    slug: "celine-quilted-classic-handbag",
    name: "Celine Classic Handbag",
    category: "Bags",
    price: 120000,
    oldPrice: 136400,
    discount: '-12%',
    badge: 'New',
    rating: 4.7,
    reviews: 263,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940985/IMG_1756.jpg",
  },

  {
    id: 26,
    slug: "louis-vuitton-monogram-court-sneakers",
    name: "Louis Vuitton Monogram Court Sneakers",
    category: "Shoes",
    price: 71000,
    oldPrice: 77200,
    discount: '-8%',
    badge: null,
    rating: 4.6,
    reviews: 189,
    colors: ['White', 'Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889432/IMG_1306.jpg",
  },

  {
    id: 27,
    slug: "chanel-soft-quilted-shoulder-satchel",
    name: "Chanel Soft Quilted Shoulder Satchel",
    category: "Bags",
    price: 61300,
    oldPrice: 76600,
    discount: '-20%',
    badge: null,
    rating: 4.5,
    reviews: 129,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941245/IMG_1451.jpg",
  },

  {
    id: 28,
    slug: "hublot-stainless-case-quartz-watch",
    name: "Hublot Stainless Case Quartz Watch",
    category: "Watches",
    price: 160900,
    oldPrice: 182800,
    discount: '-12%',
    badge: 'Bestseller',
    rating: 4.5,
    reviews: 84,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2051.jpg",
  },

  {
    id: 29,
    slug: "celine-classic-quilted-shoulder-bag",
    name: "Celine Classic Quilted Shoulder Bag",
    category: "Bags",
    price: 89200,
    oldPrice: 111500,
    discount: '-20%',
    badge: null,
    rating: 4.6,
    reviews: 201,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940985/IMG_1756.jpg",
  },

  {
    id: 30,
    slug: "gucci-leather-stripe-sneakers",
    name: "Gucci Leather Stripe Sneakers",
    category: "Shoes",
    price: 75400,
    oldPrice: 100500,
    discount: '-25%',
    badge: 'Bestseller',
    rating: 4.2,
    reviews: 173,
    colors: ['White', 'Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943121/IMG_2035.jpg",
  },

  {
    id: 31,
    slug: "chanel-classic-chain-shoulder-bag",
    name: "Chanel Classic Chain Shoulder Bag",
    category: "Bags",
    price: 124800,
    oldPrice: 146800,
    discount: '-15%',
    badge: 'New',
    rating: 4.7,
    reviews: 287,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941226/IMG_1480.jpg",
  },

  {
    id: 32,
    slug: "patek-philippe-classic-steel-mesh-watch",
    name: "Patek Philippe Classic Steel Mesh Watch",
    category: "Watches",
    price: 65800,
    oldPrice: 71500,
    discount: '-8%',
    badge: null,
    rating: 4.2,
    reviews: 98,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2056.jpg",
  },

  {
    id: 33,
    slug: "chanel-structured-chain-bag",
    name: "Chanel Structured Chain Bag",
    category: "Bags",
    price: 160800,
    oldPrice: 178700,
    discount: '-10%',
    badge: null,
    rating: 4.7,
    reviews: 141,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941191/IMG_1509.jpg",
  },

  {
    id: 34,
    slug: "patek-philippe-classic-steel-link-watch",
    name: "Patek Philippe Classic Steel Link Watch",
    category: "Watches",
    price: 237700,
    oldPrice: null,
    discount: null,
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 65,
    colors: ['Silver', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2055.jpg",
  },

  {
    id: 35,
    slug: "louis-vuitton-side-trunk-pm-soft-box-bag-2",
    name: "Louis Vuitton Side Trunk PM Soft Box Bag",
    category: "Bags",
    price: 97100,
    oldPrice: 129500,
    discount: '-25%',
    badge: null,
    rating: 4.6,
    reviews: 43,
    colors: ['Black', 'Red', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868802/WhatsApp_Image_2026-10-01_at_15.44.17.jpg",
  },

  {
    id: 36,
    slug: "gucci-classic-heels",
    name: "Gucci Classic Heels",
    category: "Shoes",
    price: 145800,
    oldPrice: 208300,
    discount: '-30%',
    badge: null,
    rating: 4.7,
    reviews: 88,
    colors: ['Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889913/IMG_1338.jpg",
  },

  {
    id: 37,
    slug: "louis-vuitton-side-trunk-pm-soft-box-bag",
    name: "Louis Vuitton Side Trunk PM Soft Box Bag",
    category: "Bags",
    price: 184800,
    oldPrice: 246400,
    discount: '-25%',
    badge: 'Limited',
    rating: 4.8,
    reviews: 170,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868802/WhatsApp_Image_2026-10-01_at_15.44.17.jpg",
  },

  {
    id: 38,
    slug: "patek-philippe-slim-steel-dial-watch",
    name: "Patek Philippe Slim Steel Dial Watch",
    category: "Watches",
    price: 137100,
    oldPrice: 155800,
    discount: '-12%',
    badge: null,
    rating: 4.5,
    reviews: 331,
    colors: ['Black', 'Gold'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2057.jpg",
  },

  {
    id: 39,
    slug: "gucci-quilted-leather-top-handle-bag",
    name: "Gucci Quilted Leather Top-Handle Bag",
    category: "Bags",
    price: 182300,
    oldPrice: 227900,
    discount: '-20%',
    badge: null,
    rating: 4.5,
    reviews: 201,
    colors: ['Black', 'Red', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941136/IMG_1545.jpg",
  },

  {
    id: 40,
    slug: "gucci-men-classic-shoes",
    name: "Gucci Men's Classic Shoes",
    category: "Shoes",
    price: 103600,
    oldPrice: 117700,
    discount: '-12%',
    badge: null,
    rating: 4.6,
    reviews: 373,
    colors: ['White', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943121/IMG_2013.jpg",
  },

  {
    id: 41,
    slug: "chanel-quilted-evening-bag",
    name: "Chanel Quilted Evening Bag",
    category: "Bags",
    price: 77200,
    oldPrice: 87700,
    discount: '-12%',
    badge: null,
    rating: 4.8,
    reviews: 102,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941218/IMG_1489.jpg",
  },

  {
    id: 42,
    slug: "cartier-classic-metal-bracelet-watch",
    name: "Cartier Classic Metal Bracelet Watch",
    category: "Watches",
    price: 159800,
    oldPrice: 213100,
    discount: '-25%',
    badge: null,
    rating: 4.4,
    reviews: 219,
    colors: ['Silver', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889667/IMG_1392.jpg",
  },

  {
    id: 43,
    slug: "louis-vuitton-floral-lockme-style-backpack",
    name: "Louis Vuitton Floral Lockme-Style Backpack",
    category: "Bags",
    price: 76500,
    oldPrice: 86900,
    discount: '-12%',
    badge: 'New',
    rating: 4.8,
    reviews: 116,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868695/WhatsApp_Image_2026-10-01_at_15.43.01_1.jpg",
  },

  {
    id: 44,
    slug: "gucci-vintage-heels",
    name: "Gucci Vintage Heels",
    category: "Shoes",
    price: 127300,
    oldPrice: 169700,
    discount: '-25%',
    badge: null,
    rating: 4.3,
    reviews: 166,
    colors: ['Black', 'White'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943136/IMG_2039.jpg",
  },

  {
    id: 45,
    slug: "celine-small-flap-chain-bag",
    name: "Celine Small Flap Chain Bag",
    category: "Bags",
    price: 53500,
    oldPrice: 71300,
    discount: '-25%',
    badge: 'Bestseller',
    rating: 4.6,
    reviews: 56,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940972/IMG_1780.jpg",
  },

  {
    id: 46,
    slug: "longines-polished-steel-dress-watch",
    name: "Longines Polished Steel Dress Watch",
    category: "Watches",
    price: 200800,
    oldPrice: 244900,
    discount: '-18%',
    badge: 'New',
    rating: 4.6,
    reviews: 311,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946313/IMG_2060.jpg",
  },

  {
    id: 47,
    slug: "chanel-soft-quilted-shoulder-bag",
    name: "Chanel Soft Quilted Shoulder Bag",
    category: "Bags",
    price: 168400,
    oldPrice: 198100,
    discount: '-15%',
    badge: null,
    rating: 4.3,
    reviews: 237,
    colors: ['Black', 'Red', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941234/IMG_1469.jpg",
  },

  {
    id: 48,
    slug: "gucci-men-classic-shoe",
    name: "Gucci Men's Classic Shoe",
    category: "Shoes",
    price: 133400,
    oldPrice: 162700,
    discount: '-18%',
    badge: null,
    rating: 4.8,
    reviews: 311,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943173/IMG_1957.jpg",
  },

  {
    id: 49,
    slug: "gucci-compact-chain-crossbody-bag",
    name: "Gucci Compact Chain Crossbody Bag",
    category: "Bags",
    price: 92000,
    oldPrice: 131400,
    discount: '-30%',
    badge: 'Bestseller',
    rating: 4.5,
    reviews: 274,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941072/IMG_1610.jpg",
  },

  {
    id: 50,
    slug: "rolex-signature-dial-dress-watch",
    name: "Rolex Signature Dial Dress Watch",
    category: "Watches",
    price: 121000,
    oldPrice: 137500,
    discount: '-12%',
    badge: null,
    rating: 4.3,
    reviews: 140,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889789/IMG_1371.jpg",
  },

  {
    id: 51,
    slug: "unidentified-brand-structured-full-leather-bucket-bag",
    name: "Unidentified Brand Structured Full-Leather Bucket Bag",
    category: "Bags",
    price: 110600,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 309,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868772/WhatsApp_Image_2026-10-01_at_15.43.51.jpg",
  },

  {
    id: 52,
    slug: "louis-vuitton-embroidered-bee-style-heels",
    name: "Louis Vuitton Embroidered-Bee Style Heels",
    category: "Shoes",
    price: 73300,
    oldPrice: 89400,
    discount: '-18%',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 112,
    colors: ['Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943229/IMG_1821.jpg",
  },

  {
    id: 53,
    slug: "louis-vuitton-camouflage-keepall-travel-bag",
    name: "Louis Vuitton Keepall Bandoulière Camouflage Travel Bag",
    category: "Bags",
    price: 111900,
    oldPrice: 127200,
    discount: '-12%',
    badge: 'Limited',
    rating: 4.6,
    reviews: 52,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868748/WhatsApp_Image_2026-10-01_at_15.43.32.jpg",
  },

  {
    id: 54,
    slug: "rolex-minimal-leather-strap-watch",
    name: "Rolex Minimal Leather Strap Watch",
    category: "Watches",
    price: 90800,
    oldPrice: 103200,
    discount: '-12%',
    badge: null,
    rating: 4.4,
    reviews: 242,
    colors: ['Black', 'Gold'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889792/IMG_1369.jpg",
  },

  {
    id: 55,
    slug: "gucci-jackie-style-quilted-flap-bag",
    name: "Gucci Jackie Style Quilted Flap Bag",
    category: "Bags",
    price: 110400,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.2,
    reviews: 348,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941043/IMG_1643.jpg",
  },

  {
    id: 56,
    slug: "louis-vuitton-chunky-logo-sneakers",
    name: "Louis Vuitton Chunky Logo Sneakers",
    category: "Shoes",
    price: 148800,
    oldPrice: 165300,
    discount: '-10%',
    badge: 'Bestseller',
    rating: 4.2,
    reviews: 40,
    colors: ['Black', 'White'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943214/IMG_1857.jpg",
  },

  {
    id: 57,
    slug: "gucci-diamond-quilted-shoulder-bag",
    name: "Gucci Diamond-Quilted Shoulder Bag",
    category: "Bags",
    price: 68700,
    oldPrice: 80800,
    discount: '-15%',
    badge: null,
    rating: 4.5,
    reviews: 51,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941086/IMG_1570.jpg",
  },

  {
    id: 58,
    slug: "gucci-classic-heels",
    name: "Gucci Classic Heels",
    category: "Shoes",
    price: 120200,
    oldPrice: 130700,
    discount: '-8%',
    badge: 'Bestseller',
    rating: 4.7,
    reviews: 149,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943152/IMG_1975.jpg",
  },

  {
    id: 59,
    slug: "chanel-structured-quilted-handbag",
    name: "Chanel Structured Quilted Handbag",
    category: "Bags",
    price: 118300,
    oldPrice: 147900,
    discount: '-20%',
    badge: 'New',
    rating: 4.6,
    reviews: 338,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941207/IMG_1507.jpg",
  },

  {
    id: 60,
    slug: "rolex-minimal-leather-strap-watch-2",
    name: "Rolex Minimal Leather Strap Watch",
    category: "Watches",
    price: 95000,
    oldPrice: 105600,
    discount: '-10%',
    badge: 'Limited',
    rating: 4.4,
    reviews: 175,
    colors: ['Black', 'Gold'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889785/IMG_1376.jpg",
  },

  {
    id: 61,
    slug: "saint-laurent-structured-chain-shoulder-bag",
    name: "Saint Laurent Structured Chain Shoulder Bag",
    category: "Bags",
    price: 138200,
    oldPrice: 184300,
    discount: '-25%',
    badge: 'Limited',
    rating: 4.7,
    reviews: 26,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940965/IMG_1793.jpg",
  },

  {
    id: 62,
    slug: "rolex-brushed-steel-dress-watch",
    name: "Rolex Brushed Steel Dress Watch",
    category: "Watches",
    price: 198900,
    oldPrice: 284100,
    discount: '-30%',
    badge: 'Bestseller',
    rating: 4.6,
    reviews: 143,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889669/IMG_1383.jpg",
  },

  {
    id: 63,
    slug: "louis-vuitton-pochette-papillon-compact-shoulder-bag",
    name: "Louis Vuitton Pochette Papillon Compact Shoulder Bag",
    category: "Bags",
    price: 108200,
    oldPrice: 135200,
    discount: '-20%',
    badge: null,
    rating: 4.7,
    reviews: 274,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868805/WhatsApp_Image_2026-10-01_at_15.44.09.jpg",
  },

  {
    id: 64,
    slug: "gucci-classic-heels",
    name: "Gucci Classic Heels",
    category: "Shoes",
    price: 140200,
    oldPrice: 175200,
    discount: '-20%',
    badge: 'New',
    rating: 4.4,
    reviews: 263,
    colors: ['White', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943143/IMG_1985.jpg",
  },

  {
    id: 65,
    slug: "chanel-small-quilted-handbag",
    name: "Chanel Small Quilted Handbag",
    category: "Bags",
    price: 133000,
    oldPrice: 162200,
    discount: '-18%',
    badge: null,
    rating: 4.2,
    reviews: 122,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941022/IMG_1672.jpg",
  },

  {
    id: 66,
    slug: "gucci-classic-heels",
    name: "Gucci Classic Heels",
    category: "Shoes",
    price: 56700,
    oldPrice: 70900,
    discount: '-20%',
    badge: null,
    rating: 4.3,
    reviews: 39,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943207/IMG_1887.jpg",
  },

  {
    id: 67,
    slug: "gucci-minimal-chain-shoulder-bag",
    name: "Gucci Minimal Chain Shoulder Bag",
    category: "Bags",
    price: 109900,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 305,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940997/IMG_1703.jpg",
  },

  {
    id: 68,
    slug: "hublot-steel-bracelet-date-watch",
    name: "Hublot Steel Bracelet Date Watch",
    category: "Watches",
    price: 214600,
    oldPrice: 243900,
    discount: '-12%',
    badge: null,
    rating: 4.5,
    reviews: 80,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946314/IMG_2052.jpg",
  },

  {
    id: 69,
    slug: "chanel-mini-quilted-top-handle-bag",
    name: "Chanel Mini Quilted Top-Handle Bag",
    category: "Bags",
    price: 118000,
    oldPrice: 143900,
    discount: '-18%',
    badge: 'Limited',
    rating: 4.7,
    reviews: 33,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941270/IMG_1443.jpg",
  },

  {
    id: 70,
    slug: "patek-philippe-stainless-steel-chronograph-watch",
    name: "Patek Philippe Stainless Steel Chronograph Watch",
    category: "Watches",
    price: 171200,
    oldPrice: 194500,
    discount: '-12%',
    badge: null,
    rating: 4.8,
    reviews: 79,
    colors: ['Silver', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2054.jpg",
  },

  {
    id: 71,
    slug: "celine-medium-chain-shoulder-bag",
    name: "Celine Medium Chain Shoulder Bag",
    category: "Bags",
    price: 176800,
    oldPrice: 221000,
    discount: '-20%',
    badge: 'Limited',
    rating: 4.4,
    reviews: 155,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940990/IMG_1734.jpg",
  },

  {
    id: 72,
    slug: "louis-vuitton-vintage-runner-sneakers",
    name: "Louis Vuitton Vintage Runner Sneakers",
    category: "Shoes",
    price: 108500,
    oldPrice: 155000,
    discount: '-30%',
    badge: null,
    rating: 4.8,
    reviews: 315,
    colors: ['Black', 'Grey'],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943219/IMG_1842.jpg",
  },

  {
    id: 73,
    slug: "celine-classic-quilted-crossbody",
    name: "Celine Classic Quilted Crossbody",
    category: "Bags",
    price: 169400,
    oldPrice: 199300,
    discount: '-15%',
    badge: null,
    rating: 4.3,
    reviews: 151,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790940994/IMG_1710.jpg",
  },

  {
    id: 74,
    slug: "patek-philippe-minimal-steel-case-watch",
    name: "Patek Philippe Minimal Steel Case Watch",
    category: "Watches",
    price: 75500,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.6,
    reviews: 379,
    colors: ['Silver', 'Gold', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2058.jpg",
  },

  {
    id: 75,
    slug: "louis-vuitton-express-leather-pillow-shoulder-bag",
    name: "Louis Vuitton Express Leather Pillow Shoulder Bag",
    category: "Bags",
    price: 116800,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.8,
    reviews: 139,
    colors: ['Black', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868668/WhatsApp_Image_2026-10-01_at_15.42.51.jpg",
  },

  {
    id: 76,
    slug: "gucci-classic-Shoe",
    name: "Gucci Classic Shoe",
    category: "Shoes",
    price: 152300,
    oldPrice: 173100,
    discount: '-12%',
    badge: null,
    rating: 4.4,
    reviews: 137,
    colors: ['Black', 'White'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790943192/IMG_1912.jpg",
  },

  {
    id: 77,
    slug: "chanel-chain-strap-shoulder-bag",
    name: "Chanel Chain Strap Shoulder Bag",
    category: "Bags",
    price: 102900,
    oldPrice: 121100,
    discount: '-15%',
    badge: null,
    rating: 4.9,
    reviews: 46,
    colors: ['Brown', 'Black'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941226/IMG_1480.jpg",
  },

  {
    id: 78,
    slug: "louis-vuitton-classic-heels",
    name: "Louis Vuitton Classic Heels",
    category: "Shoes",
    price: 115800,
    oldPrice: 128700,
    discount: '-10%',
    badge: 'Limited',
    rating: 4.7,
    reviews: 231,
    colors: ['Black', 'Brown'],
    sizes: ['38', '39', '40', '41', '42'],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790889580/IMG_1299.jpg",
  },

  {
    id: 79,
    slug: "louis-vuitton-capucines-souple-mm-handbag",
    name: "Louis Vuitton Capucines Souple MM Handbag",
    category: "Bags",
    price: 74400,
    oldPrice: null,
    discount: null,
    badge: null,
    rating: 4.3,
    reviews: 33,
    colors: ['Black', 'Red', 'Cream'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790868725/WhatsApp_Image_2026-10-01_at_15.43.22.jpg",
  },

  {
    id: 80,
    slug: "hublot-two-tone-steel-watch",
    name: "Hublot Two-Tone Steel Watch",
    category: "Watches",
    price: 102600,
    oldPrice: 111500,
    discount: '-8%',
    badge: null,
    rating: 4.7,
    reviews: 69,
    colors: ['Black', 'Brown'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790946315/IMG_2050.jpg",
  },

  {
    id: 81,
    slug: "unidentified-brand-mini-quilted-shoulder-bag",
    name: "Unidentified Brand Mini Quilted Shoulder Bag",
    category: "Bags",
    price: 125900,
    oldPrice: 136800,
    discount: '-8%',
    badge: 'Bestseller',
    rating: 4.2,
    reviews: 222,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941055/IMG_1624.jpg",
  },

  {
    id: 82,
    slug: "gucci-quilted-shoulder-satchel",
    name: "Gucci Quilted Shoulder Satchel",
    category: "Bags",
    price: 122200,
    oldPrice: 162900,
    discount: '-25%',
    badge: 'Limited',
    rating: 4.3,
    reviews: 288,
    colors: ['Black', 'Beige'],
    sizes: [],
    availability: true,
    image:
      "https://res.cloudinary.com/st6vzres/image/upload/v1790941014/IMG_1686.jpg",
  },
];

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  isSaved,
  onToggleWishlist,
  onAddToCart,
}) {
  return (
    <article className="group">
      <div className="relative aspect-[4/4.9] overflow-hidden rounded-2xl bg-[#f5f5f3]">

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
          aria-label={
            isSaved
              ? "Remove from saved products"
              : "Save product"
          }
          onClick={() =>
            onToggleWishlist(product.id)
          }
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition ${
            isSaved
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

        {/* Product Image */}

        <Link
          to={`/product/${product.slug}`}
          className="block h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add */}

        <button
          type="button"
          onClick={() =>
            onAddToCart(product)
          }
          className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-xl bg-black px-4 py-3 text-[12px] font-medium text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#222]"
        >
          Add to Cart
        </button>

      </div>

      {/* Product information */}

      <div className="pt-3.5">

        <p className="text-[10px] uppercase tracking-[0.14em] text-[#808080]">
          {product.category}
        </p>

        <Link
          to={`/product/${product.slug}`}
          className="mt-1 block text-[14px] font-medium leading-5 text-black transition hover:opacity-60"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center gap-2">

          <span className="text-[15px] font-semibold">
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
}

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

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-[11px] text-black"
              : "text-[11px] text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   FILTER SIDEBAR
========================================================= */

function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  priceRange,
  setPriceRange,
  availabilityOnly,
  setAvailabilityOnly,
  onClear,
}) {
  const categories = [
    "All",
    "Bags",
    "Watches",
    "Clothing",
    "Shoes",
    "Accessories",
  ];

  const colors = [
    "Black",
    "White",
    "Brown",
    "Beige",
    "Cream",
    "Grey",
    "Silver",
    "Gold",
    "Red",
    "Blue",
    "Khaki",
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

  const toggleItem = (
    item,
    currentItems,
    setItems
  ) => {
    if (currentItems.includes(item)) {
      setItems(
        currentItems.filter(
          (value) => value !== item
        )
      );
      return;
    }

    setItems([...currentItems, item]);
  };

  return (
    <div className="space-y-8">

      {/* Categories */}

      <div>

        <div className="flex items-center justify-between">

          <h3 className="text-[13px] font-semibold">
            Categories
          </h3>

        </div>

        <div className="mt-4 space-y-2">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[12px] transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "text-[#63666A] hover:bg-[#f5f5f3] hover:text-black"
              }`}
            >
              <span>{category}</span>

              {selectedCategory === category && (
                <span className="text-[10px]">
                  ✓
                </span>
              )}
            </button>
          ))}

        </div>

      </div>

      {/* Price */}

      <div className="border-t border-black/[0.07] pt-7">

        <h3 className="text-[13px] font-semibold">
          Price Range
        </h3>

        <div className="mt-5">

          <div className="flex items-center justify-between gap-3">

            <div className="flex-1">

              <label className="mb-1 block text-[10px] uppercase tracking-wide text-[#808080]">
                Minimum
              </label>

              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(event) =>
                  setPriceRange([
                    Number(
                      event.target.value
                    ),
                    priceRange[1],
                  ])
                }
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-[12px] outline-none focus:border-black"
              />

            </div>

            <span className="mt-5 text-[#808080]">
              —
            </span>

            <div className="flex-1">

              <label className="mb-1 block text-[10px] uppercase tracking-wide text-[#808080]">
                Maximum
              </label>

              <input
                type="number"
                min="0"
                value={priceRange[1]}
                onChange={(event) =>
                  setPriceRange([
                    priceRange[0],
                    Number(
                      event.target.value
                    ),
                  ])
                }
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-[12px] outline-none focus:border-black"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Colors */}

      <div className="border-t border-black/[0.07] pt-7">

        <h3 className="text-[13px] font-semibold">
          Color
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">

          {colors.map((color) => {

            const selected =
              selectedColors.includes(
                color
              );

            return (
              <button
                key={color}
                type="button"
                onClick={() =>
                  toggleItem(
                    color,
                    selectedColors,
                    setSelectedColors
                  )
                }
                className={`rounded-full border px-3 py-1.5 text-[10px] transition ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/10 text-[#63666A] hover:border-black/30"
                }`}
              >
                {color}
              </button>
            );
          })}

        </div>

      </div>

      {/* Sizes */}

      <div className="border-t border-black/[0.07] pt-7">

        <h3 className="text-[13px] font-semibold">
          Size
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">

          {sizes.map((size) => {

            const selected =
              selectedSizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  toggleItem(
                    size,
                    selectedSizes,
                    setSelectedSizes
                  )
                }
                className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-[10px] transition ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/10 text-[#63666A] hover:border-black/30"
                }`}
              >
                {size}
              </button>
            );
          })}

        </div>

      </div>

      {/* Availability */}

      <div className="border-t border-black/[0.07] pt-7">

        <label className="flex cursor-pointer items-center justify-between gap-4">

          <div>

            <p className="text-[13px] font-semibold">
              In Stock Only
            </p>

            <p className="mt-1 text-[10px] text-[#808080]">
              Hide unavailable products
            </p>

          </div>

          <button
            type="button"
            aria-label="Toggle availability filter"
            onClick={() =>
              setAvailabilityOnly(
                (current) => !current
              )
            }
            className={`relative h-6 w-11 rounded-full transition ${
              availabilityOnly
                ? "bg-black"
                : "bg-[#d9d9d7]"
            }`}
          >

            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                availabilityOnly
                  ? "left-6"
                  : "left-1"
              }`}
            />

          </button>

        </label>

      </div>

      {/* Clear */}

      <button
        type="button"
        onClick={onClear}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-[11px] font-medium transition hover:border-black"
      >
        <Icon
          name="refresh"
          size={14}
        />
        Clear All Filters
      </button>

    </div>
  );
}

/* =========================================================
   SHOP PAGE
========================================================= */

export default function Shop() {
  /* =======================================================
     SHARED CART CONTEXT

     The cart is managed globally by CartContext so the
     Home, Shop, Product, Category and Cart pages all
     display the same cart and cart count.
  ======================================================= */

  const {
    addToCart: addProductToCart,
    totalItems,
  } = useCart();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedColors, setSelectedColors] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState([]);

  const [availabilityOnly, setAvailabilityOnly] =
    useState(false);

  const [priceRange, setPriceRange] =
    useState([
      0,
      400000,
    ]);

  const [sortBy, setSortBy] =
    useState("featured");

  const [savedProducts, setSavedProducts] =
    useState([]);

  const [visibleCount, setVisibleCount] =
    useState(12);

  const [toast, setToast] =
    useState("");

  const [categoryMenuOpen, setCategoryMenuOpen] =
    useState(false);

  const [
    mobileCategoriesOpen,
    setMobileCategoriesOpen,
  ] = useState(false);

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = (message) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setToast("");
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toast]);

  /* =======================================================
     RESET VISIBLE PRODUCTS WHEN FILTERS CHANGE
  ======================================================= */

  useEffect(() => {
    setVisibleCount(12);
  }, [
    selectedCategory,
    selectedColors,
    selectedSizes,
    availabilityOnly,
    priceRange,
    sortBy,
    searchTerm,
  ]);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    const filtered = products.filter(
      (product) => {

        const matchesSearch =
          !normalizedSearch ||
          product.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          product.category
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesCategory =
          selectedCategory === "All" ||
          product.category ===
            selectedCategory;

        const matchesPrice =
          product.price >= priceRange[0] &&
          product.price <= priceRange[1];

        const matchesAvailability =
          !availabilityOnly ||
          product.availability;

        const matchesColor =
          selectedColors.length === 0 ||
          selectedColors.some((color) =>
            product.colors.includes(color)
          );

        const matchesSize =
          selectedSizes.length === 0 ||
          selectedSizes.some((size) =>
            product.sizes.includes(size)
          );

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesAvailability &&
          matchesColor &&
          matchesSize
        );
      }
    );

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort(
          (a, b) =>
            a.price - b.price
        );

      case "price-high":
        return [...filtered].sort(
          (a, b) =>
            b.price - a.price
        );

      case "rating":
        return [...filtered].sort(
          (a, b) =>
            b.rating - a.rating
        );

      case "newest":
        return [...filtered].sort(
          (a, b) =>
            b.id - a.id
        );

      default:
        return filtered;
    }
  }, [
    searchTerm,
    selectedCategory,
    selectedColors,
    selectedSizes,
    availabilityOnly,
    priceRange,
    sortBy,
  ]);

  const visibleProducts =
    filteredProducts.slice(
      0,
      visibleCount
    );

  /* =======================================================
     FILTER ACTIONS
  ======================================================= */

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedColors([]);
    setSelectedSizes([]);
    setAvailabilityOnly(false);
    setPriceRange([
      0,
      400000,
    ]);
    setSearchTerm("");
    setSortBy("featured");
  };

  const toggleWishlist = (
    productId
  ) => {
    setSavedProducts(
      (current) => {
        const exists =
          current.includes(productId);

        if (exists) {
          showToast(
            "Removed from saved products"
          );

          return current.filter(
            (id) =>
              id !== productId
          );
        }

        showToast(
          "Product saved"
        );

        return [
          ...current,
          productId,
        ];
      }
    );
  };

  /* =======================================================
     SHARED CART ACTION

     This now updates CartContext rather than creating a
     Shop-specific cart count.
  ======================================================= */

  const handleAddToCart = (
    product
  ) => {
    addProductToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const hasActiveFilters =
    selectedCategory !==
      "All" ||
    selectedColors.length >
      0 ||
    selectedSizes.length >
      0 ||
    availabilityOnly ||
    priceRange[0] !== 0 ||
    priceRange[1] !==
      400000 ||
    searchTerm
      .trim() !== "";

  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-white/95 backdrop-blur">

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

          {/* Desktop navigation */}

          <nav className="hidden items-center gap-7 lg:flex">

            <Link
              to="/"
              className="py-2 text-[13px] text-[#63666A] transition hover:text-black"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="relative py-2 text-[13px] font-medium after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-black"
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

          {/* Header Actions */}

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

        {/* Global Search Panel */}

        {searchOpen && (
          <div className="border-t border-black/[0.06] bg-white">

            <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-7 lg:px-10">

              <div className="relative">

                <Icon
                  name="search"
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]"
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
                  aria-label="Close search"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] transition hover:text-black"
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
          PAGE CONTENT
      ====================================================== */}

      <main>

        {/* Breadcrumb + Heading */}

        <section className="px-5 pb-9 pt-9 sm:px-7 sm:pt-12 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex items-center gap-2 text-[10px] text-[#808080]">

              <Link
                to="/"
                className="transition hover:text-black"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-black">
                Shop
              </span>

            </div>

            <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  Discover
                </p>

                <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.05em] sm:text-[52px]">
                  Shop All
                </h1>

                <p className="mt-3 max-w-[580px] text-[13px] leading-6 text-[#63666A] sm:text-[14px]">
                  Explore our collection of modern
                  fashion, accessories and everyday
                  essentials.
                </p>

              </div>

              <div className="text-[11px] text-[#808080]">
                {filteredProducts.length}{" "}
                products
              </div>

            </div>

          </div>

        </section>

        {/* Category Pills */}

        <section className="border-y border-black/[0.07] px-5 sm:px-7 lg:px-10">

          <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto py-4">

            {[
              "All",
              "Bags",
              "Watches",
              "Clothing",
              "Shoes",
              "Accessories",
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-medium transition ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-[#f5f5f3] text-[#63666A] hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

        </section>

        {/* Products Area */}

        <section className="px-5 py-10 sm:px-7 lg:px-10 lg:py-14">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex gap-8">

              {/* Desktop Sidebar */}

              <aside className="hidden w-[235px] shrink-0 lg:block">

                <div className="sticky top-[105px]">

                  <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-[14px] font-semibold">
                      Filters
                    </h2>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={
                          clearFilters
                        }
                        className="text-[10px] font-medium text-[#808080] underline underline-offset-2 hover:text-black"
                      >
                        Clear
                      </button>
                    )}

                  </div>

                  <FilterSidebar
                    selectedCategory={
                      selectedCategory
                    }
                    setSelectedCategory={
                      setSelectedCategory
                    }
                    selectedColors={
                      selectedColors
                    }
                    setSelectedColors={
                      setSelectedColors
                    }
                    selectedSizes={
                      selectedSizes
                    }
                    setSelectedSizes={
                      setSelectedSizes
                    }
                    priceRange={
                      priceRange
                    }
                    setPriceRange={
                      setPriceRange
                    }
                    availabilityOnly={
                      availabilityOnly
                    }
                    setAvailabilityOnly={
                      setAvailabilityOnly
                    }
                    onClear={
                      clearFilters
                    }
                  />

                </div>

              </aside>

              {/* Products */}

              <div className="min-w-0 flex-1">

                {/* Toolbar */}

                <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.07] pb-5">

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        setMobileFiltersOpen(
                          true
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-[11px] font-medium lg:hidden"
                    >
                      <Icon
                        name="filter"
                        size={15}
                      />
                      Filters
                    </button>

                    {hasActiveFilters && (
                      <span className="hidden text-[11px] text-[#808080] sm:block">
                        Filters applied
                      </span>
                    )}

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="hidden text-[11px] text-[#808080] sm:inline">
                      Sort by
                    </span>

                    <div className="relative">

                      <select
                        value={sortBy}
                        onChange={(event) =>
                          setSortBy(
                            event.target.value
                          )
                        }
                        className="appearance-none rounded-lg border border-black/10 bg-white py-2.5 pl-3 pr-9 text-[11px] font-medium outline-none focus:border-black"
                      >
                        <option value="featured">
                          Featured
                        </option>

                        <option value="newest">
                          Newest
                        </option>

                        <option value="price-low">
                          Price: Low to High
                        </option>

                        <option value="price-high">
                          Price: High to Low
                        </option>

                        <option value="rating">
                          Highest Rated
                        </option>
                      </select>

                      <Icon
                        name="chevronDown"
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                      />

                    </div>

                  </div>

                </div>

                {/* Active filters */}

                {hasActiveFilters && (
                  <div className="mb-6 flex flex-wrap gap-2">

                    {selectedCategory !==
                      "All" && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCategory(
                            "All"
                          )
                        }
                        className="rounded-full bg-black px-3 py-1.5 text-[10px] text-white"
                      >
                        {selectedCategory} ×
                      </button>
                    )}

                    {selectedColors.map(
                      (color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setSelectedColors(
                              (current) =>
                                current.filter(
                                  (item) =>
                                    item !==
                                    color
                                )
                            )
                          }
                          className="rounded-full bg-black px-3 py-1.5 text-[10px] text-white"
                        >
                          {color} ×
                        </button>
                      )
                    )}

                    {selectedSizes.map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            setSelectedSizes(
                              (current) =>
                                current.filter(
                                  (item) =>
                                    item !==
                                    size
                                )
                            )
                          }
                          className="rounded-full bg-black px-3 py-1.5 text-[10px] text-white"
                        >
                          Size {size} ×
                        </button>
                      )
                    )}

                    {searchTerm.trim() && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearchTerm("")
                        }
                        className="rounded-full bg-black px-3 py-1.5 text-[10px] text-white"
                      >
                        Search:{" "}
                        {searchTerm} ×
                      </button>
                    )}

                  </div>
                )}

                {/* Product Grid */}

                {visibleProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">

                      {visibleProducts.map(
                        (product) => (
                          <ProductCard
                            key={
                              product.id
                            }
                            product={
                              product
                            }
                            isSaved={savedProducts.includes(
                              product.id
                            )}
                            onToggleWishlist={
                              toggleWishlist
                            }
                            onAddToCart={
                              handleAddToCart
                            }
                          />
                        )
                      )}

                    </div>

                    {/* Load More */}

                    {visibleCount <
                      filteredProducts.length && (
                      <div className="mt-14 flex justify-center">

                        <button
                          type="button"
                          onClick={() =>
                            setVisibleCount(
                              (current) =>
                                current + 8
                            )
                          }
                          className="rounded-xl border border-black/15 px-7 py-3.5 text-[12px] font-medium transition hover:bg-black hover:text-white"
                        >
                          Load More Products
                        </button>

                      </div>
                    )}

                  </>
                ) : (
                  <div className="rounded-2xl bg-[#f7f7f6] px-6 py-20 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">

                      <Icon
                        name="search"
                        size={22}
                        className="text-[#808080]"
                      />

                    </div>

                    <h3 className="mt-5 text-[20px] font-semibold tracking-tight">
                      No products found
                    </h3>

                    <p className="mx-auto mt-2 max-w-[420px] text-[12px] leading-6 text-[#808080]">
                      We couldn't find products
                      matching your current search
                      and filter settings.
                    </p>

                    <button
                      type="button"
                      onClick={
                        clearFilters
                      }
                      className="mt-6 rounded-xl bg-black px-6 py-3 text-[11px] font-medium text-white"
                    >
                      Clear Filters
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFiltersOpen(
                false
              )
            }
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between border-b border-black/[0.07] pb-5">

              <div>

                <h2 className="text-[19px] font-semibold">
                  Filters
                </h2>

                <p className="mt-1 text-[10px] text-[#808080]">
                  Refine your products
                </p>

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

            <div className="py-6">

              <FilterSidebar
                selectedCategory={
                  selectedCategory
                }
                setSelectedCategory={
                  setSelectedCategory
                }
                selectedColors={
                  selectedColors
                }
                setSelectedColors={
                  setSelectedColors
                }
                selectedSizes={
                  selectedSizes
                }
                setSelectedSizes={
                  setSelectedSizes
                }
                priceRange={
                  priceRange
                }
                setPriceRange={
                  setPriceRange
                }
                availabilityOnly={
                  availabilityOnly
                }
                setAvailabilityOnly={
                  setAvailabilityOnly
                }
                onClear={
                  clearFilters
                }
              />

            </div>

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
              className="w-full rounded-xl bg-black py-4 text-[12px] font-medium text-white"
            >
              Show{" "}
              {filteredProducts.length} Products
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}

      <section className="border-y border-black/[0.07] bg-[#fafafa]">

        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

          {[
            [
              "truck",
              "Premium Quality",
              "Guaranteed quality materials",
            ],
            [
              "lock",
              "Fast Delivery",
              "Quick and reliable shipping",
            ],
            [
              "lock",
              "Secure Checkout",
              "Your data is protected",
            ],
            [
              "refresh",
              "Easy Returns",
              "Simple 30-day returns",
            ],
          ].map(
            ([icon, title, text], index) => (

              <div
                key={title}
                className={`flex items-center gap-4 px-5 py-7 sm:px-7 lg:px-8 ${
                  index < 3
                    ? "border-b border-black/[0.07] lg:border-b-0 lg:border-r"
                    : ""
                }`}
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

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-xl bg-black px-5 py-3 text-[12px] font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}

    </div>
  );
}
