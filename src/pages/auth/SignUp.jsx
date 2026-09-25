import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      });

      navigate("/dashboard/overview", {
        replace: true,
      });
    } catch (error) {
      setError(
        error?.message || "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ========================================================= 
            LEFT SIDE — BRAND / VISUAL 
        ========================================================== */}
        <section className="relative hidden overflow-hidden bg-black lg:flex">
          {/* Fashion image */}
          <img
            src="/images/hero-image3.png"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Brand content */}
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-semibold tracking-[-0.04em] text-white"
            >
              NOVATREND
            </Link>

            {/* Message */}
            <div className="max-w-lg pb-8">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                Join the community
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Your style starts here.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
                Create an account to save your favorite products, manage your
                orders, chat with dealers, and enjoy a personalized shopping
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= 
            RIGHT SIDE — REGISTRATION 
        ========================================================== */}
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

          {/* Form container */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                  Create account
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Join NovaTrend and start discovering products you'll love.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Registration form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First name / Last name */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium"
                    >
                      First name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      autoComplete="given-name"
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

                  {/* Last name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Last name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      autoComplete="family-name"
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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      minLength={8}
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

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                      minLength={8}
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
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
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
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      cursor-pointer
                      rounded
                      border-black/20
                      accent-black
                    "
                  />

                  <span className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-black underline underline-offset-4"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-black underline underline-offset-4"
                    >
                      Privacy Policy
                    </Link>
                    .
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
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </form>

              {/* Existing account */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="font-medium text-black underline underline-offset-4 transition hover:text-gray-600"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Continue shopping */}
              <div className="mt-6 text-center">
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

export default SignUp;