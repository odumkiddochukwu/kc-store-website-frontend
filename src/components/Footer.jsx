import { Link } from "react-router";

const Footer= () => {
    return (
        <footer className="bg-black text-white">

        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-7 lg:px-10 lg:py-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

            <div>
             <Link
                         to="/"
                         className="text-[22px] font-semibold tracking-[-0.05em]"
                       >
                         KC{" "}
                         <span className="text-[#63666A]">
                           Store
                         </span>
                       </Link>
              <p className="mt-5 max-w-[330px] text-[12px] leading-6 text-white/55">
                Modern fashion, accessories and lifestyle essentials
                curated for people who appreciate effortless style.
              </p>

            </div>

            <div>

              <h4 className="text-[12px] font-semibold">
                Shop
              </h4>

              <div className="mt-4 flex flex-col gap-3">

                <a
                  href="/shop"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  Shop All
                </a>

                <a
                  href="/new-arrivals"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  New Arrivals
                </a>

                <a
                  href="/best-sellers"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  Best Sellers
                </a>
              </div>

            </div>

            <div>

              <div className="mt-4 flex flex-col gap-3">

                <a
                  href="/about"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  About Us
                </a>

                <a
                  href="/contact"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  Contact
                </a>
                <a
                  href="/track-order"
                  className="text-[11px] text-white/55 hover:text-white"
                >
                  Track Order
                </a>

              </div>

            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-[10px] text-white/40">
            © {new Date().getFullYear()} KC Store. All rights reserved.
          </div>

        </div>
      </footer>
    )
}

export default Footer;
