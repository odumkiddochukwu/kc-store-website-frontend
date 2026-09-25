import { Link } from "react-router";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Contact form API will be connected here later.
    console.log("Contact form data:", formData);
  };

  return (
    <main className="bg-white text-black">
      {/* =========================================================
          HERO SECTION
      ========================================================== */}
      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              Contact KC Store
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              We'd love to hear from you.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Have a question about a product, an order, shipping, or
              something else? Send us a message and our team will get back to
              you.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CONTENT
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* =====================================================
              LEFT — CONTACT INFORMATION
          ====================================================== */}
          <div>
            <div className="max-w-sm">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                Get in Touch
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                How can we help?
              </h2>

              <p className="mt-5 text-sm leading-6 text-gray-500">
                Choose the most relevant option or send us a message directly.
                We're here to help with your shopping experience.
              </p>
            </div>

            {/* Contact options */}
            <div className="mt-12 border-t border-black/10">
              {/* Customer support */}
              <div className="border-b border-black/10 py-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Customer Support
                </p>

                <h3 className="mt-3 text-base font-medium">
                  Questions about your order?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Contact us for help with orders, delivery, returns, or
                  account-related questions.
                </p>

                <a
                  href="mailto:support@novatrend.com"
                  className="mt-4 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  support@kcstore.com
                </a>
              </div>

              {/* Dealer enquiries */}
              <div className="border-b border-black/10 py-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Dealer Enquiries
                </p>

                <h3 className="mt-3 text-base font-medium">
                  Interested in selling with us?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  If you're a retailer or dealer interested in selling our
                  products, reach out to us
                </p>

                <a
                  href="mailto:dealers@novatrend.com"
                  className="mt-4 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  dealers@kcstore.com
                </a>
              </div>

              {/* General enquiries */}
              <div className="border-b border-black/10 py-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  General Enquiries
                </p>

                <h3 className="mt-3 text-base font-medium">
                  Something else?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  For partnerships, feedback, or other enquiries,
                  contact our general team.
                </p>

                <a
                  href="mailto:hello@novatrend.com"
                  className="mt-4 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  hello@kcstore.com
                </a>
              </div>
            </div>

            {/* Shopping links */}
            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                Looking to shop?
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  to="/shop"
                  className="text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  Shop
                </Link>

                <Link
                  to="/new-arrivals"
                  className="text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  New Arrivals
                </Link>

                <Link
                  to="/best-sellers"
                  className="text-sm font-medium underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  Best Sellers
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — CONTACT FORM
          ====================================================== */}
          <div className="rounded-xl border border-black/10 p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                Send a Message
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Tell us how we can help.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  className="
                    h-12
                    w-full
                    rounded-md
                    border
                    border-black/15
                    bg-white
                    px-4
                    text-sm
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-black
                    focus:ring-1
                    focus:ring-black
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    h-12
                    w-full
                    rounded-md
                    border
                    border-black/15
                    bg-white
                    px-4
                    text-sm
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-black
                    focus:ring-1
                    focus:ring-black
                  "
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="
                    h-12
                    w-full
                    appearance-none
                    rounded-md
                    border
                    border-black/15
                    bg-white
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-black
                    focus:ring-1
                    focus:ring-black
                  "
                >
                  <option value="" disabled>
                    Select a subject
                  </option>

                  <option value="order">Order assistance</option>
                  <option value="product">Product question</option>
                  <option value="shipping">Shipping & delivery</option>
                  <option value="return">Returns & refunds</option>
                  <option value="account">Account support</option>
                  <option value="dealer">Dealer enquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="general">General enquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={7}
                  required
                  className="
                    w-full
                    resize-none
                    rounded-md
                    border
                    border-black/15
                    bg-white
                    px-4
                    py-3
                    text-sm
                    leading-6
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-black
                    focus:ring-1
                    focus:ring-black
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-md
                  bg-black
                  px-6
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-gray-800
                  active:scale-[0.99]
                "
              >
                Send Message
              </button>

              <p className="text-center text-xs leading-5 text-gray-400">
                By submitting this form, you agree that KC store may use your
                information to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUPPORT FEATURES
      ========================================================== */}
      <section className="border-y border-black/10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid md:grid-cols-3">
            {/* Support */}
            <div className="border-b border-black/10 py-8 md:border-b-0 md:border-r md:pr-10">
              <span className="text-xs font-medium text-gray-400">01</span>

              <h3 className="mt-6 text-lg font-medium">
                Customer Support
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Need help with an order, product, or payment?
                We're here to help.
              </p>

              <a
                href="mailto:support@novatrend.com"
                className="mt-5 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4"
              >
                Contact Support
              </a>
            </div>

            {/* Dealer */}
            <div className="border-b border-black/10 py-8 md:border-b-0 md:border-r md:px-10">
              <span className="text-xs font-medium text-gray-400">02</span>

              <h3 className="mt-6 text-lg font-medium">
                Become a Dealer
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Are you a retailer or store owner? Learn how you can 
                sell our products and Earn
              </p>

              <a
                href="mailto:dealers@novatrend.com"
                className="mt-5 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4"
              >
                Dealer Enquiries
              </a>
            </div>

            {/* FAQ */}
            <div className="py-8 md:pl-10">
              <span className="text-xs font-medium text-gray-400">03</span>

              <h3 className="mt-6 text-lg font-medium">
                Frequently Asked Questions
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Find quick answers to common questions about shopping,
                shipping, payments, and orders.
              </p>

              <Link
                to="/faq"
                className="mt-5 inline-block text-sm font-medium underline decoration-black/20 underline-offset-4"
              >
                Visit FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT / LOCATION SECTION
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Information */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              KC Store
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Stay connected.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500">
              Follow our latest collections, product launches, and updates.
              We're building a marketplace where discovering great products
              feels simple and personal.
            </p>

            <div className="mt-10 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Email
                </p>

                <a
                  href="mailto:hello@novatrend.com"
                  className="mt-2 inline-block text-sm font-medium"
                >
                  hello@kcstore.com
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Phone
                </p>

                <a
                  href="tel:+2349137278545"
                  className="mt-2 inline-block text-sm font-medium"
                >
                  +2349137278545
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Hours
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Monday — Friday
                  <br />
                  8:00 AM — 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Social / quick links */}
          <div className="flex items-end lg:justify-end">
            <div className="w-full max-w-md border-t border-black/10">
              <Link
                to="/about"
                className="group flex items-center justify-between border-b border-black/10 py-6"
              >
                <span className="text-sm font-medium">About KC Store</span>

                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              </Link>

              <Link
                to="/shop"
                className="group flex items-center justify-between border-b border-black/10 py-6"
              >
                <span className="text-sm font-medium">Explore the Shop</span>

                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Ready to explore?
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            Find your next favorite piece.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
            Explore our latest products and discover fashion, accessories, and
            lifestyle pieces curated for you.
          </p>

          <div className="mt-10">
            <Link
              to="/shop"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                rounded-md
                bg-white
                px-7
                text-sm
                font-medium
                text-black
                transition
                hover:bg-gray-100
              "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;