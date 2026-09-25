import { useState } from "react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5500/api"
).replace(/\/$/, "");

const STATUS_STEPS = [
  {
    key: "pending",
    title: "Order Placed",
    description: "Your order has been received.",
  },
  {
    key: "processing",
    title: "Processing",
    description: "Your order is being prepared.",
  },
  {
    key: "shipped",
    title: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
  },
];

const normalizeStatus = (status) => {
  const normalized = String(status || "").trim().toLowerCase();

  if (normalized === "cancelled" || normalized === "canceled") {
    return "cancelled";
  }

  if (normalized === "delivered") {
    return "delivered";
  }

  if (normalized === "shipped") {
    return "shipped";
  }

  if (normalized === "processing") {
    return "processing";
  }

  return "pending";
};

const getStatusIndex = (status) => {
  const normalizedStatus = normalizeStatus(status);

  return STATUS_STEPS.findIndex(
    (step) => step.key === normalizedStatus
  );
};

const formatPrice = (amount, currency = "NGN") => {
  const numericAmount = Number(amount) || 0;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
};

const getPaymentLabel = (paymentStatus) => {
  const normalized = String(paymentStatus || "").toLowerCase();

  switch (normalized) {
    case "paid":
    case "confirmed":
    case "successful":
    case "success":
      return "Payment Confirmed";

    case "failed":
      return "Payment Failed";

    case "pending":
      return "Payment Pending";

    default:
      return paymentStatus || "Pending";
  }
};

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (event) => {
    event.preventDefault();

    const cleanedTrackingId = trackingId.trim();

    if (!cleanedTrackingId) {
      setError("Please enter your tracking ID.");
      setOrder(null);
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/track/${encodeURIComponent(
          cleanedTrackingId
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "We could not find an order with that tracking ID."
        );
      }

      const trackedOrder = data?.order || data?.data || data;

      if (!trackedOrder || typeof trackedOrder !== "object") {
        throw new Error("Invalid order information was returned.");
      }

      setOrder(trackedOrder);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while tracking your order."
      );
    } finally {
      setLoading(false);
    }
  };

  const normalizedStatus = normalizeStatus(order?.status);
  const currentStatusIndex = getStatusIndex(order?.status);
  const isCancelled = normalizedStatus === "cancelled";

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero / Search */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#63666A]">
              Order Tracking
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Track Your Order
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#63666A] sm:text-base">
              Enter the tracking ID you received after placing your order
              to see the latest delivery progress.
            </p>

            <form
              onSubmit={handleTrackOrder}
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={trackingId}
                onChange={(event) => setTrackingId(event.target.value)}
                placeholder="Enter your tracking ID"
                autoComplete="off"
                spellCheck="false"
                className="min-h-12 flex-1 rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <button
                type="submit"
                disabled={loading}
                className="min-h-12 rounded-md bg-black px-7 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>

            {error && (
              <div className="mx-auto mt-4 max-w-2xl rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Order Result */}
      {order && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Order Header */}
          <div className="flex flex-col gap-5 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#808080]">
                Tracking ID
              </p>

              <h2 className="mt-2 break-all text-xl font-semibold sm:text-2xl">
                {order.trackingToken || trackingId}
              </h2>

              <p className="mt-2 text-sm text-[#63666A]">
                Order placed {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#808080]">
                Current Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                  isCancelled
                    ? "bg-red-50 text-red-700"
                    : "bg-gray-100 text-black"
                }`}
              >
                {isCancelled
                  ? "Order Cancelled"
                  : STATUS_STEPS[currentStatusIndex]?.title ||
                    "Order Placed"}
              </span>
            </div>
          </div>

          {/* Cancelled */}
          {isCancelled ? (
            <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-900">
                This order has been cancelled
              </h3>

              <p className="mt-2 text-sm leading-6 text-red-700">
                The order associated with this tracking ID has been
                cancelled. Please contact the store if you need more
                information.
              </p>
            </div>
          ) : (
            <>
              {/* Progress Timeline */}
              <div className="mt-10 rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-8">
                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div
                        key={step.key}
                        className="relative flex gap-4"
                      >
                        {index < STATUS_STEPS.length - 1 && (
                          <div
                            className={`absolute left-[15px] top-9 h-[calc(100%+32px)] w-px ${
                              index < currentStatusIndex
                                ? "bg-black"
                                : "bg-gray-200"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                            isCompleted
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white text-[#808080]"
                          }`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </div>

                        <div className="flex-1 pb-1">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <h3
                              className={`text-sm font-medium ${
                                isCurrent
                                  ? "text-black"
                                  : isCompleted
                                  ? "text-black"
                                  : "text-[#808080]"
                              }`}
                            >
                              {step.title}
                            </h3>

                            {isCurrent && (
                              <span className="text-xs font-medium text-[#63666A]">
                                Current status
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm leading-6 text-[#63666A]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Status */}
              <div className="mt-6 rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#808080]">
                      Payment Status
                    </p>

                    <p className="mt-2 text-sm font-medium text-black">
                      {getPaymentLabel(order.paymentStatus)}
                    </p>
                  </div>

                  <p className="text-sm text-[#63666A]">
                    Last updated: {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6 rounded-lg border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                  <h3 className="text-lg font-semibold">
                    Order Summary
                  </h3>

                  <span className="text-sm text-[#63666A]">
                    {Array.isArray(order.items)
                      ? `${order.items.length} ${
                          order.items.length === 1 ? "item" : "items"
                        }`
                      : "Order"}
                  </span>
                </div>

                <div className="divide-y divide-gray-200">
                  {Array.isArray(order.items) &&
                    order.items.map((item, index) => (
                      <div
                        key={`${item.productId || item.slug || "item"}-${index}`}
                        className="flex gap-4 py-5"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 sm:h-24 sm:w-24">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-[#808080]">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-black">
                            {item.name || "Product"}
                          </h4>

                          <div className="mt-2 space-y-1 text-xs text-[#63666A]">
                            <p>
                              Quantity: {Number(item.quantity) || 0}
                            </p>

                            {item.selectedColor && (
                              <p>
                                Color: {item.selectedColor}
                              </p>
                            )}

                            {item.selectedSize && (
                              <p>
                                Size: {item.selectedSize}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-medium">
                            {formatPrice(
                              (Number(item.price) || 0) *
                                (Number(item.quantity) || 0),
                              order.currency || "NGN"
                            )}
                          </p>

                          <p className="mt-1 text-xs text-[#808080]">
                            {formatPrice(
                              item.price,
                              order.currency || "NGN"
                            )}{" "}
                            each
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="ml-auto max-w-sm space-y-3 text-sm">
                    <div className="flex justify-between gap-4 text-[#63666A]">
                      <span>Subtotal</span>

                      <span>
                        {formatPrice(
                          order.subtotal,
                          order.currency || "NGN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-[#63666A]">
                      <span>Shipping</span>

                      <span>
                        {Number(order.shipping) > 0
                          ? formatPrice(
                              order.shipping,
                              order.currency || "NGN"
                            )
                          : "Free"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-[#63666A]">
                      <span>Discount</span>

                      <span>
                        {Number(order.discount) > 0
                          ? `-${formatPrice(
                              order.discount,
                              order.currency || "NGN"
                            )}`
                          : formatPrice(
                              0,
                              order.currency || "NGN"
                            )}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-base font-semibold text-black">
                      <span>Total</span>

                      <span>
                        {formatPrice(
                          order.total,
                          order.currency || "NGN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Search Again */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                setOrder(null);
                setError("");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="text-sm font-medium text-black underline underline-offset-4 transition hover:text-[#63666A]"
            >
              Track another order
            </button>
          </div>
        </section>
      )}
    </main>
  );
}