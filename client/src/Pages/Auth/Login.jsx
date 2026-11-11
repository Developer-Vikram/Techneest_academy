import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import { Check, LogIn } from "lucide-react";
import { AUTH } from "../../Data/content";
import { AUTH_IMAGES } from "../../Data/images";

const getSafeRedirectPath = (value) => {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/login") || value.startsWith("/register")) return "/";
  return value;
};

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  // Get the page user was trying to visit before login
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const stateFrom = typeof location.state?.from === "string"
    ? location.state.from
    : location.state?.from
      ? `${location.state.from.pathname || ""}${location.state.from.search || ""}${location.state.from.hash || ""}`
      : "";
  const from = getSafeRedirectPath(redirectParam || stateFrom);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= LOGIN SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login: formData.username,
      password: formData.password,
    };

    const res = await dispatch(loginUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      // Redirect to the page user was trying to visit, or home page if none
      navigate(from, { replace: true });
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = () => {
    dispatch(googleLogin()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // Redirect to the page user was trying to visit, or home page if none
        navigate(from, { replace: true });
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <UserLayout>
      <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-navy">
        {/* ========================================= */}
        {/* FULL-SCREEN BACKGROUND IMAGE + OVERLAY */}
        {/* ========================================= */}
        <img
          src={AUTH_IMAGES.login}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-iris/60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand/25 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-aqua/15 blur-[110px]"
        />

        {/* ========================================= */}
        {/* CENTERED GLASS CARD */}
        {/* ========================================= */}
        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="glass rounded-3xl p-6 shadow-2xl sm:p-8 md:p-10">
              {/* Logo */}
              <div className="mb-6 text-center">
                <img
                  src="/techneest-logo-dark.png"
                  alt="Techneest Academy"
                  className="mx-auto h-12"
                />
              </div>

              {/* Heading */}
              <div className="mb-7 text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand/40">
                  <LogIn size={22} aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {AUTH.login.formTitle}
                </h1>
                <p className="mt-2 text-sm text-white/70">
                  {AUTH.login.formSubtitle}
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="mb-5 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/95 text-sm font-semibold text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                <FcGoogle size={20} aria-hidden="true" />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/20" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  or
                </span>
                <div className="h-px flex-1 bg-white/20" aria-hidden="true" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email or Mobile */}
                <div>
                  <label
                    htmlFor="login-username"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Email or mobile
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="you@example.com or 10-digit mobile"
                    autoComplete="username"
                    className="glass-input"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="glass-input pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-aqua"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-remember"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      id="login-remember"
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 accent-aqua"
                    />
                    <span className="text-sm text-white/75">Remember me</span>
                  </label>

                  <Link
                    to="/forgetpassword"
                    className="text-sm font-semibold text-aqua transition-colors hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:shadow-xl hover:shadow-iris/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>

              {/* Benefit highlights */}
              <ul className="mt-7 space-y-2 border-t border-white/15 pt-6">
                {AUTH.login.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2.5 text-xs font-medium text-white/75"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                      <Check size={11} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Register Link */}
              <p className="mt-6 text-center text-sm text-white/70">
                New to Techneest?{" "}
                <Link
                  to="/register"
                  className="font-bold text-aqua transition-colors hover:text-white hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <style>{`
          .glass-input {
            width: 100%;
            height: 52px;
            padding: 0 16px;
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            font-size: 0.875rem;
            color: #ffffff;
            transition: all 0.25s ease;
            outline: none;
          }

          .glass-input::placeholder {
            color: rgba(255, 255, 255, 0.45);
          }

          .glass-input:focus {
            border-color: #22D3EE;
            box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.2);
            background: rgba(255, 255, 255, 0.14);
          }
        `}</style>
      </main>
    </UserLayout>
  );
};

export default Login;
