import { Link } from "react-router";

const About = () => {
  return (
    <main className="bg-white text-black">
      {/* =========================================================
          HERO SECTION
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#f7f7f5]">
        <div className="mx-auto grid min-h-[680px] max-w-[1600px] lg:grid-cols-2">
          {/* Hero content */}
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                About KC store
              </p>

              <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl xl:text-7xl">
                Shop products at amazing deals
              </h1>

              <p className="mt-8 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
               KC Store is a modern marketplace built around
                discovering products that fit your style, your lifestyle, and
                the way you want to express yourself.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    rounded-md
                    bg-black
                    px-7
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-gray-800
                  "
                >
                  Shop Collection
                </Link>

                <Link
                  to="/new-arrivals"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-black/15
                    bg-white
                    px-7
                    text-sm
                    font-medium
                    text-black
                    transition
                    hover:border-black
                  "
                >
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[500px] lg:min-h-full">
            <img
              src="/images/hero-image3.png"
              alt="NovaTrend fashion collection"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              Our Story
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Built for modern shoppers.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-gray-600">
            <p>
              KC Store was created with a simple idea: shopping for products
              should be inspiring, convenient, and personal.
            </p>

            <p>
              Instead of overwhelming shoppers with endless products and
              complicated interfaces, we focus on making discovery simple.
              From everyday essentials to statement pieces, our marketplace
              brings together fashion, accessories, watches, bags, clothing, gadgets
              and other products in one carefully designed experience.
            </p>

            <p>
              At KC Store, we make shopping so easy for you, 
              we provide quality products, seemless payment process,
              and fast delivery. We also provide 24hr customer support 
              for our customers to make their shopping experience seemless.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE + PHILOSOPHY
      ========================================================== */}
      <section className="bg-[#f7f7f5]">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[520px] lg:min-h-[700px]">
            <img
              src="/images/man-wearing-glasses.jpg"
              alt="Fashion accessories"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                What We Believe
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Less noise.
                <br />
                More style.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
                <p>
                  Great shopping experiences don't need to be complicated. We
                  believe thoughtful design, quality products, and useful
                  information should work together naturally.
                </p>

                <p>
                  Our platform is designed to give products room to speak for
                  themselves while giving shoppers the tools they need to
                  discover, compare, save, and purchase with confidence.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/shop"
                  className="inline-flex items-center text-sm font-medium text-black underline decoration-black/30 underline-offset-8 transition hover:decoration-black"
                >
                  Explore the collection
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Our Values
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            The principles behind the experience.
          </h2>
        </div>

        <div className="mt-16 grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-4">
          {/* Value 01 */}
          <article className="border-b border-black/10 py-8 md:border-r md:px-8 lg:px-6 lg:first:pl-0">
            <span className="text-xs font-medium text-gray-400">01</span>

            <h3 className="mt-8 text-lg font-medium tracking-[-0.02em]">
              Quality
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              We aim to make discovering well-presented and thoughtfully
              selected products a central part of the experience.
            </p>
          </article>

          {/* Value 02 */}
          <article className="border-b border-black/10 py-8 md:px-8 lg:border-r lg:px-6">
            <span className="text-xs font-medium text-gray-400">02</span>

            <h3 className="mt-8 text-lg font-medium tracking-[-0.02em]">
              Simplicity
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              From product discovery to checkout, every interaction should
              feel clear and straightforward.
            </p>
          </article>

          {/* Value 03 */}
          <article className="border-b border-black/10 py-8 md:border-r md:px-8 lg:px-6">
            <span className="text-xs font-medium text-gray-400">03</span>

            <h3 className="mt-8 text-lg font-medium tracking-[-0.02em]">
              Connection
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Customers should have a direct way to communicate with dealers
              and get useful information about products.
            </p>
          </article>

          {/* Value 04 */}
          <article className="border-b border-black/10 py-8 md:px-8 lg:px-6 lg:pr-0">
            <span className="text-xs font-medium text-gray-400">04</span>

            <h3 className="mt-8 text-lg font-medium tracking-[-0.02em]">
              Experience
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Every part of the platform should make shopping feel more
              enjoyable, intuitive, and personal.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES / WHAT WE OFFER
      ========================================================== */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                What You'll Find
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                A collection made for different styles.
              </h2>
            </div>

            <div>
              <div className="grid border-t border-white/15 sm:grid-cols-2">
                <Link
                  to="/categories/bags"
                  className="group border-b border-white/15 py-7 sm:border-r sm:pr-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Bags</span>

                    <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    Everyday bags, statement pieces, and accessories.
                  </p>
                </Link>

                <Link
                  to="/categories/watches"
                  className="group border-b border-white/15 py-7 sm:pl-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Watches</span>

                    <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    Timepieces designed to complement your style.
                  </p>
                </Link>

                <Link
                  to="/categories/clothing"
                  className="group border-b border-white/15 py-7 sm:border-r sm:pr-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Clothing</span>

                    <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    Pieces for everyday looks and special occasions.
                  </p>
                </Link>

                <Link
                  to="/categories/accessories"
                  className="group border-b border-white/15 py-7 sm:pl-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Accessories</span>

                    <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    Finishing touches that complete your look.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CUSTOMER EXPERIENCE
      ========================================================== */}

      {/* =========================================================
          EDITORIAL IMAGE SECTION
      ========================================================== */}
      <section className="relative min-h-[560px] overflow-hidden">
        <img
          src="/images/hero-image1.png"
          alt="NovaTrend editorial fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/65">
              Your next favorite piece
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Find something that feels like you.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
              Explore our latest collection and discover products curated for
              modern lifestyles.
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
        </div>
      </section>

      {/* =========================================================
          FAQ / INFORMATION
      ========================================================== */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10 lg:py-32">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Frequently Asked
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            About KC Store
          </h2>
        </div>

        <div className="mt-14 border-t border-black/10">
          {/* FAQ 1 */}
          <details className="group border-b border-black/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
              <span className="text-sm font-medium sm:text-base">
                What is KC Store?
              </span>

              <span className="text-xl font-light transition-transform group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="max-w-3xl pb-6 pr-10 text-sm leading-6 text-gray-500">
               KC Store is a modern marketplace built around
                discovering products that fit your style, your lifestyle, and
                the way you want to express yourself.
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group border-b border-black/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
              <span className="text-sm font-medium sm:text-base">
                Can I contact a dealer before purchasing?
              </span>

              <span className="text-xl font-light transition-transform group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="max-w-3xl pb-6 pr-10 text-sm leading-6 text-gray-500">
              Yes. Product pages are designed to allow authenticated customers
              to start a conversation with the dealer about a product before
              completing a purchase.
            </div>
          </details>

          {/* FAQ 4 */}
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="border-t border-black/10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 lg:py-32">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Start Exploring
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            Your next favorite piece is waiting.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore new arrivals, discover your favorite categories, and find
            products that fit your style.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                rounded-md
                bg-black
                px-7
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
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

export default About;