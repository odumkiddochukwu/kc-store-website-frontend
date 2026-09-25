import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/dashboard/overview", {
        replace: true,
      });
    } catch (error) {
      setError(
        error?.message || "Unable to sign in. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side - Brand / Visual */}
        <section className="relative hidden overflow-hidden bg-black lg:flex">
          {/* Background image */}
          <img
            src="/images/hero-image3.png"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Brand content */}
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              to="/"
              className="text-2xl font-semibold tracking-[-0.04em] text-white"
            >
              NOVATREND
            </Link>

            <div className="max-w-lg pb-8">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                Your style. Your collection.
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Discover fashion that feels like you.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
                Sign in to access your saved products, orders, conversations,
                and personalized shopping experience.
              </p>
            </div>
          </div>
        </section>

        {/* Right side - Login */}
        <section className="flex min-h-screen flex-col">
          {/* Mobile header */}
          <header className="flex items-center justify-between border-b border-black/10 px-6 py-5 lg:hidden">
            <Link
              to="/"
              className="text-xl font-semibold tracking-[-0.04em]"
            >
              NOVATREND
            </Link>

            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition hover:text-black"
            >
              Back to store
            </Link>
          </header>

          <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Access your orders, saved products, and conversations.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={isLoading}
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
                      disabled:cursor-not-allowed
                      disabled:bg-gray-50
                    "
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-gray-500 transition hover:text-black"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                      className="
                        h-12
                        w-full
                        rounded-md
                        border
                        border-black/15
                        bg-white
                        px-4
                        pr-20
                        text-sm
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-black
                        focus:ring-1
                        focus:ring-black
                        disabled:cursor-not-allowed
                        disabled:bg-gray-50
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isLoading}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-xs
                        font-medium
                        text-gray-500
                        transition
                        hover:text-black
                        disabled:cursor-not-allowed
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="
                      h-4
                      w-4
                      cursor-pointer
                      rounded
                      border-black/20
                      accent-black
                    "
                  />

                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-black/10" />

                <span className="text-xs text-gray-400">OR</span>

                <div className="h-px flex-1 bg-black/10" />
              </div>

              {/* Create account */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="font-medium text-black underline underline-offset-4 transition hover:text-gray-600"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              {/* Continue shopping */}
              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-500 transition hover:text-black"
                >
                  ← Continue shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-black/10 px-6 py-5 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} NovaTrend. All rights reserved.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
