import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCart } from "../../context/CartContext";


/* =========================================================
   MOCK ORDER DATA
   Replace this with your API response later.
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
        <path d="m18 6-6 12" />
      </>
    ),

    chevronLeft: <path d="m15 18-6-6 6-6" />,

    chevronRight: <path d="m9 18 6-6-6-6" />,

    check: <path d="m5 12 4 4L19 6" />,
  };

  return <svg {...common}>{icons[name]}</svg>;
};

const orders = {
  "NT-20260919-001": {
    id: "NT-20260919-001",
    status: "shipped",
    orderDate: "September 19, 2026",
    estimatedDelivery: "September 24 – 26, 2026",
    trackingNumber: "KC123456789NG",
    courier: "KC Store Delivery",
    paymentMethod: "Card Payment",
    shippingMethod: "Standard Delivery",

    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
    },

    shippingAddress: {
      name: "John Doe",
      address: "12 Garki Avenue",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
    },

    items: [
      {
        id: "classic-leather-handbag",
        slug: "classic-leather-handbag",
        name: "Classic Leather Handbag",
        category: "Women's Bags",
        color: "Black",
        size: null,
        quantity: 1,
        price: 149900,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=85",
      },
      {
        id: "minimal-leather-watch",
        slug: "minimal-leather-watch",
        name: "Minimal Leather Watch",
        category: "Watches",
        color: "Brown",
        size: null,
        quantity: 1,
        price: 129900,
        image:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=85",
      },
    ],

    subtotal: 279800,
    shipping: 0,
    discount: 10000,
    total: 269800,
  },
};

/* =========================================================
   TRACKING STEPS
   ========================================================= */

const trackingSteps = [
  {
    id: "placed",
    title: "Order Placed",
    description: "Your order has been successfully placed.",
  },
  {
    id: "confirmed",
    title: "Payment Confirmed",
    description: "Your payment has been confirmed.",
  },
  {
    id: "processing",
    title: "Processing",
    description: "The dealer is preparing your order.",
  },
  {
    id: "shipped",
    title: "Shipped",
    description: "Your order has left the seller and is on its way.",
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    description: "Your order is on the way to your delivery address.",
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
  },
];

const statusOrder = [
  "placed",
  "confirmed",
  "processing",
  "shipped",
  "out-for-delivery",
  "delivered",
];

const formatPrice = (price) => {
  return `₦${price.toLocaleString("en-NG")}`;
};

export default function OrderTracking() {
  const { id } = useParams();
  const { totalItems } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [toast, setToast] = useState("");

  const order = orders[id];

  /* =========================================================
     HELPERS
     ========================================================= */

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const getStepState = (stepId) => {
    if (!order) return "upcoming";

    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) {
      return "completed";
    }

    if (stepIndex === currentIndex) {
      return "current";
    }

    return "upcoming";
  };

  const handleCopyTrackingNumber = async () => {
    if (!order?.trackingNumber) return;

    try {
      await navigator.clipboard.writeText(order.trackingNumber);
      showToast("Tracking number copied");
    } catch {
      showToast("Unable to copy tracking number");
    }
  };

  /* =========================================================
     HEADER
     ========================================================= */

  const Header = () => (
    <>
      {/* Announcement Bar */}
      <div className="bg-black px-4 py-2.5 text-center text-[11px] font-medium tracking-[0.14em] text-white sm:text-xs">
        FREE SHIPPING ON ORDERS OVER ₦150,000
      </div>

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
                className="text-[13px] text-[#63666A] transition hover:text-black"
              >
                Best Sellers
              </Link>

              {/* Categories */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((current) => !current)}
                  className="flex items-center gap-1 rounded-lg py-2 text-[13px] text-[#63666A] transition hover:text-black"
                >
                  Categories
                  <Icon name="arrowDown" size={13} />
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
                    ].map(([label, slug]) => (
                      <Link
                        key={slug}
                        to={`/categories/${slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-[13px] text-[#63666A] transition hover:bg-[#f6f6f4] hover:text-black"
                      >
                        <span>{label}</span>
                        <Icon name="arrowRight" size={13} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/search"
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
              >
                <Icon name="search" size={19} />
              </Link>

              <Link
                to="/dashboard/saved"
                aria-label="Saved products"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black sm:flex"
              >
                <Icon name="heart" size={19} />
              </Link>

              <Link
                to="/dashboard/overview"
                aria-label="Account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black sm:flex"
              >
                <Icon name="user" size={19} />
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] hover:text-black"
              >
                <Icon name="bag" size={19} />

                {totalItems > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#63666A] transition hover:bg-[#f5f5f3] lg:hidden"
              >
                <Icon name={mobileMenuOpen ? "x" : "menu"} size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-black/10 py-5 lg:hidden">
              <div className="flex flex-col">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-black/5 py-3 text-sm text-[#63666A]"
                >
                  Home
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-black/5 py-3 text-sm text-[#63666A]"
                >
                  Shop
                </Link>

                <Link
                  to="/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-black/5 py-3 text-sm text-[#63666A]"
                >
                  New Arrivals
                </Link>

                <Link
                  to="/best-sellers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-black/5 py-3 text-sm text-[#63666A]"
                >
                  Best Sellers
                </Link>

                <div className="border-b border-black/5 py-3">
                  <p className="mb-3 text-sm font-medium text-black">
                    Categories
                  </p>

                  <div className="grid grid-cols-2 gap-x-6">
                    {[
                      ["Women's Bags", "womens-bags"],
                      ["Watches", "watches"],
                      ["Clothing", "clothing"],
                      ["Shoes", "shoes"],
                      ["Jewelry", "jewelry"],
                      ["Accessories", "accessories"],
                    ].map(([label, slug]) => (
                      <Link
                        key={slug}
                        to={`/categories/${slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg py-2 text-[13px] text-[#63666A]"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex gap-2">
                  <Link
                    to="/dashboard/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 py-3 text-sm text-black transition hover:border-black"
                  >
                    <Icon name="heart" size={16} />
                    Saved
                  </Link>

                  <Link
                    to="/dashboard/overview"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 py-3 text-sm text-black transition hover:border-black"
                  >
                    <Icon name="user" size={16} />
                    Account
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );

  /* =========================================================
     NOT FOUND
     ========================================================= */

  if (!order) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />

        <main className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
          <div className="w-full max-w-[520px] rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f3]">
              <Icon name="bag" size={22} />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#808080]">
              Order Tracking
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Order not found
            </h1>

            <p className="mx-auto mt-4 max-w-[400px] text-[13px] leading-6 text-[#808080]">
              We couldn't find an order matching this tracking link. Please
              check your order number and try again.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard/orders"
                className="rounded-xl bg-black px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#252525]"
              >
                View My Orders
              </Link>

              <Link
                to="/shop"
                className="rounded-xl border border-black/10 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition hover:border-black"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-black text-white">
          <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-2 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} KC Store. All rights reserved.
              </p>

              <Link to="/" className="transition hover:text-white">
                Back to Store
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* =====================================================
         PAGE HEADER
         ===================================================== */}
      <main>
        <section className="border-b border-black/10 bg-[#f5f5f3]">
          <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                  <Link to="/" className="transition hover:text-black">
                    Home
                  </Link>

                  <span>/</span>

                  <Link
                    to="/dashboard/orders"
                    className="transition hover:text-black"
                  >
                    My Orders
                  </Link>

                  <span>/</span>

                  <span className="text-black">Track Order</span>
                </div>

                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#808080]">
                  ORDER TRACKING
                </p>

                <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                  Track your order
                </h1>

                <p className="mt-4 max-w-[610px] text-[14px] leading-7 text-[#63666A]">
                  Follow your order from confirmation to delivery and see the
                  latest progress of your shipment.
                </p>
              </div>

              <Link
                to="/dashboard/orders"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-black transition hover:border-black"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================
           ORDER OVERVIEW
           =================================================== */}
        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            {/* Tracking Status */}
            <div className="rounded-3xl border border-black/10 bg-white p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-start">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                    Order Number
                  </p>

                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                    #{order.id}
                  </h2>

                  <p className="mt-1 text-[12px] text-[#808080]">
                    Placed on {order.orderDate}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {order.status === "out-for-delivery"
                    ? "Out for Delivery"
                    : order.status}
                </span>
              </div>

              {/* Tracking Number */}
              <div className="mt-6 rounded-2xl bg-[#f5f5f3] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#808080]">
                      Tracking Number
                    </p>

                    <p className="mt-2 break-all text-sm font-semibold tracking-[0.04em]">
                      {order.trackingNumber}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyTrackingNumber}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition hover:border-black"
                  >
                    Copy Tracking Number
                  </button>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]">
                      <Icon name="truck" size={18} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#808080]">
                        Estimated Delivery
                      </p>

                      <p className="mt-1 text-[13px] font-semibold">
                        {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]">
                      <Icon name="shield" size={18} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#808080]">
                        Delivery Method
                      </p>

                      <p className="mt-1 text-[13px] font-semibold">
                        {order.shippingMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                      Shipment Progress
                    </p>

                    <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                      Your order is moving
                    </h3>
                  </div>
                </div>

                <div className="space-y-0">
                  {trackingSteps.map((step, index) => {
                    const state = getStepState(step.id);

                    return (
                      <div key={step.id} className="relative flex gap-4">
                        {/* Connector */}
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`absolute left-[19px] top-[42px] h-[calc(100%-16px)] w-px ${
                              state === "completed"
                                ? "bg-black"
                                : "bg-black/10"
                            }`}
                          />
                        )}

                        {/* Step Icon */}
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                            state === "completed"
                              ? "border-black bg-black text-white"
                              : state === "current"
                                ? "border-black bg-white text-black ring-4 ring-black/5"
                                : "border-black/10 bg-white text-[#a0a0a0]"
                          }`}
                        >
                          {state === "completed" ? (
                            <Icon name="check" size={15} />
                          ) : state === "current" ? (
                            <Icon name="truck" size={16} />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-[#c8c8c8]" />
                          )}
                        </div>

                        {/* Step Content */}
                        <div
                          className={`flex-1 pb-8 ${
                            index === trackingSteps.length - 1
                              ? "pb-1"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <h4
                              className={`text-[13px] font-semibold ${
                                state === "upcoming"
                                  ? "text-[#9a9a9a]"
                                  : "text-black"
                              }`}
                            >
                              {step.title}
                            </h4>

                            {state === "current" && (
                              <span className="w-fit rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                                Current
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-1 max-w-[560px] text-[12px] leading-6 ${
                              state === "upcoming"
                                ? "text-[#b0b0b0]"
                                : "text-[#808080]"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="h-fit rounded-3xl border border-black/10 bg-white p-5 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
                Order Summary
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"}
              </h2>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    className="flex gap-3 rounded-2xl border border-black/10 p-3 transition hover:border-black/25"
                  >
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-black">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[11px] text-[#808080]">
                        {item.category}
                      </p>

                      {item.color && (
                        <p className="mt-1 text-[11px] text-[#808080]">
                          Color: {item.color}
                        </p>
                      )}

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-[#808080]">
                          Qty: {item.quantity}
                        </span>

                        <span className="text-[12px] font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="my-6 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#808080]">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[12px]">
                  <span className="text-[#808080]">Shipping</span>
                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : formatPrice(order.shipping)}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="mt-3 flex items-center justify-between text-[12px]">
                    <span className="text-[#808080]">Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                  <span className="text-sm font-semibold">Total</span>

                  <span className="text-lg font-semibold tracking-[-0.02em]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <Link
                to="/dashboard/orders"
                className="flex w-full items-center justify-center rounded-xl bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#252525]"
              >
                View Order Details
              </Link>
            </aside>
          </div>
        </section>

        {/* ===================================================
           DELIVERY INFORMATION
           =================================================== */}
        <section className="border-y border-black/10 bg-[#f5f5f3]">
          <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Delivery Address */}
              <div className="rounded-2xl bg-white p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]">
                  <Icon name="user" size={17} />
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#808080]">
                  Delivering To
                </p>

                <h3 className="mt-2 text-[14px] font-semibold">
                  {order.shippingAddress.name}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </div>

              {/* Payment */}
              <div className="rounded-2xl bg-white p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]">
                  <Icon name="shield" size={17} />
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#808080]">
                  Payment
                </p>

                <h3 className="mt-2 text-[14px] font-semibold">
                  {order.paymentMethod}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Your payment has been securely processed and confirmed for
                  this order.
                </p>
              </div>

              {/* Courier */}
              <div className="rounded-2xl bg-white p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3]">
                  <Icon name="truck" size={17} />
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#808080]">
                  Delivery Partner
                </p>

                <h3 className="mt-2 text-[14px] font-semibold">
                  {order.courier}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#808080]">
                  Tracking number:{" "}
                  <span className="font-medium text-black">
                    {order.trackingNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
           NEED HELP
           =================================================== */}
        <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
          <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3]">
                  <Icon name="headset" size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#808080]">
                    NEED HELP?
                  </p>

                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                    Have a question about your order?
                  </h2>

                  <p className="mt-2 max-w-[600px] text-[13px] leading-6 text-[#808080]">
                    Contact the dealer or our support team if you need help
                    with your delivery, product or order.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/dashboard/messages?order=${order.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#252525]"
                >
                  Chat With Dealer
                  <Icon name="arrowRight" size={14} />
                </Link>

                <Link
                  to="/dashboard/orders"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition hover:border-black"
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
         FOOTER
         ===================================================== */}
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="text-[24px] font-semibold tracking-[-0.04em]"
              >
                KC Store
              </Link>

              <p className="mt-5 max-w-[330px] text-[13px] leading-7 text-white/55">
                Curated fashion, accessories and everyday essentials designed
                for modern living.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white"
              >
                Shop Now
                <Icon name="arrowRight" size={14} />
              </Link>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Shop
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/shop"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  All Products
                </Link>

                <Link
                  to="/new-arrivals"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  New Arrivals
                </Link>

                <Link
                  to="/best-sellers"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Best Sellers
                </Link>

                <Link
                  to="/categories/womens-bags"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Women's Bags
                </Link>

                <Link
                  to="/categories/watches"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Watches
                </Link>
              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Help
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/dashboard/messages"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Contact Dealer
                </Link>

                <Link
                  to="/dashboard/orders"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Track Order
                </Link>

                <Link
                  to="/dashboard/addresses"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Shipping Address
                </Link>

                <Link
                  to="/dashboard/settings"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Account Settings
                </Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Account
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/sign-in"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/sign-up"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Create Account
                </Link>

                <Link
                  to="/dashboard/saved"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Saved Products
                </Link>

                <Link
                  to="/cart"
                  className="text-[13px] text-white/55 transition hover:text-white"
                >
                  Cart
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-3 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} KC Store. All rights reserved.
              </p>

              <div className="flex gap-5">
                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

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