import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOTP, googleLogin } from "../../redux/slices/authSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Mail,
  UserPlus,
} from "lucide-react";
import { AUTH } from "../../Data/content";
import { AUTH_IMAGES } from "../../Data/images";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, otpSent, otpVerified } = useSelector(
    (state) => state.auth
  );

  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dialCode: "+91",
    mobile: "",
    password: "",
    password_confirmation: "",
    agree: false,
    referral_code: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [toast, setToast] = useState("");

  /* ================= GET REF + COURSE ================= */

  useEffect(() => {
    const ref = searchParams.get("ref");
    const course = searchParams.get("course");

    if (course) {
      localStorage.setItem("referral_course", course);
    }

    if (ref) {
      setFormData((prev) => ({
        ...prev,
        referral_code: ref,
      }));
    }
  }, [searchParams]);

  /* ================= OTP EFFECT ================= */

  useEffect(() => {
    if (otpSent) {
      setToast("OTP sent to your email");
      setShowOtpInput(true);
    }
  }, [otpSent]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  /* ================= PASSWORD VALIDATION ================= */

  const getPasswordError = () => {
    const p = formData.password;

    if (p.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(p)) return "Add at least 1 uppercase letter";
    if (!/[a-z]/.test(p)) return "Add at least 1 lowercase letter";
    if (!/[0-9]/.test(p)) return "Add at least 1 number";
    if (!/[^A-Za-z0-9]/.test(p))
      return "Add at least 1 special character";

    return "";
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";

    if (!formData.lastname.trim())
      newErrors.lastname = "Last name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.mobile)
      newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    const passErr = getPasswordError();
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";

    if (!formData.agree)
      newErrors.agree = "Please accept terms & conditions";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= GOOGLE LOGIN/REGISTER ================= */
  const handleGoogleRegister = () => {
    dispatch(googleLogin());
  };

  /* ================= REGISTER ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(
      registerUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: Number(formData.mobile),
        dial_code: formData.dialCode,
        password: formData.password,
        i_agree: true,
        referral_code: formData.referral_code,
      })
    );
  };

  /* ================= OTP VERIFY ================= */

  const verifyOtpFromBackend = () => {
    if (otp.length !== 6) {
      setOtpError("Enter valid 6-digit OTP");
      return;
    }

    setOtpError("");

    dispatch(verifyOTP(otp));
  };

  /* ================= REDIRECT AFTER VERIFY ================= */

  useEffect(() => {
    if (otpVerified) {
      const course = localStorage.getItem("referral_course");

      if (course) {
        navigate(`/course-info/${course}`);
        localStorage.removeItem("referral_course");
      } else {
        navigate("/");
      }
    }
  }, [otpVerified, navigate]);

  /* ================= UI ================= */
  return (
    <UserLayout>
      <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-navy">
        {/* ========================================= */}
        {/* FULL-SCREEN BACKGROUND IMAGE + OVERLAY */}
        {/* ========================================= */}
        <img
          src={AUTH_IMAGES.register}
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
          className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand/25 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-aqua/15 blur-[110px]"
        />

        {/* ========================================= */}
        {/* CENTERED GLASS CARD */}
        {/* ========================================= */}
        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
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
                  <UserPlus size={22} aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {AUTH.register.formTitle}
                </h1>
                <p className="mt-2 text-sm text-white/70">
                  {AUTH.register.formSubtitle}
                </p>

                {/* Benefit highlights */}
                <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  {AUTH.register.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-2 text-xs font-medium text-white/80"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                        <Check size={11} aria-hidden="true" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
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
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* live region for screen readers */}
                <div aria-live="polite" className="sr-only">
                  {Object.values(errors).filter(Boolean).join(". ")}
                  {otpError}
                </div>

                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="register-firstname"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      First name
                    </label>
                    <input
                      id="register-firstname"
                      name="firstname"
                      placeholder="First name"
                      onChange={handleChange}
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstname}
                      className={`glass-input ${errors.firstname ? "input-error" : ""}`}
                    />
                    {errors.firstname && <p className="glass-error">{errors.firstname}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="register-lastname"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      Last name
                    </label>
                    <input
                      id="register-lastname"
                      name="lastname"
                      placeholder="Last name"
                      onChange={handleChange}
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastname}
                      className={`glass-input ${errors.lastname ? "input-error" : ""}`}
                    />
                    {errors.lastname && <p className="glass-error">{errors.lastname}</p>}
                  </div>
                </div>

                {/* Email & Mobile */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="register-email"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      Email address
                    </label>
                    <input
                      id="register-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      className={`glass-input ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && <p className="glass-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="register-mobile"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      Mobile number
                    </label>
                    <input
                      id="register-mobile"
                      name="mobile"
                      value={formData.mobile}
                      placeholder="10-digit mobile"
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "mobile",
                            value: e.target.value.replace(/\D/g, ""),
                          },
                        })
                      }
                      maxLength="10"
                      inputMode="numeric"
                      autoComplete="tel"
                      aria-invalid={!!errors.mobile}
                      className={`glass-input ${errors.mobile ? "input-error" : ""}`}
                    />
                    {errors.mobile && <p className="glass-error">{errors.mobile}</p>}
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="register-password"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="register-password"
                        type={showPassword.password ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                        autoComplete="new-password"
                        aria-invalid={!!errors.password}
                        className={`glass-input pr-12 ${errors.password ? "input-error" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        aria-label={showPassword.password ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-aqua"
                      >
                        {showPassword.password ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="glass-error">{errors.password}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="register-password-confirmation"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="register-password-confirmation"
                        type={showPassword.confirm ? "text" : "password"}
                        name="password_confirmation"
                        placeholder="Repeat password"
                        onChange={handleChange}
                        autoComplete="new-password"
                        aria-invalid={!!errors.password_confirmation}
                        className={`glass-input pr-12 ${errors.password_confirmation ? "input-error" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-aqua"
                      >
                        {showPassword.confirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                    </div>
                    {errors.password_confirmation && <p className="glass-error">{errors.password_confirmation}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div>
                  <label
                    htmlFor="register-agree"
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <input
                      id="register-agree"
                      type="checkbox"
                      name="agree"
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 accent-aqua"
                    />
                    <span className="text-sm leading-relaxed text-white/75">
                      I agree to the{" "}
                      <Link
                        to="/terms-and-conditions"
                        className="font-semibold text-aqua hover:underline"
                      >
                        Terms &amp; Conditions
                      </Link>
                    </span>
                  </label>
                  {errors.agree && <p className="glass-error">{errors.agree}</p>}
                </div>

                {/* OTP Section */}
                <AnimatePresence mode="wait">
                  {!showOtpInput ? (
                    <motion.button
                      key="register-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      type="submit"
                      disabled={loading}
                      className="h-12 w-full rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:shadow-xl hover:shadow-iris/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Please wait…" : "Create my account"}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="otp-section"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        role="status"
                        className="flex items-center gap-3 rounded-2xl border border-green-300/30 bg-green-400/15 p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-400/25">
                          <Mail size={20} className="text-green-200" aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-bold text-green-100">
                            Check your inbox
                          </span>
                          <span className="mt-0.5 block text-xs text-green-200/80">
                            We sent a 6-digit code to{" "}
                            <span className="font-semibold">{formData.email}</span>
                          </span>
                        </span>
                        <CheckCircle size={18} className="text-green-300" aria-hidden="true" />
                      </motion.div>

                      <div>
                        <label htmlFor="register-otp" className="sr-only">
                          One-time password
                        </label>
                        <input
                          id="register-otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          maxLength="6"
                          placeholder="Enter 6-digit OTP"
                          inputMode="numeric"
                          className="glass-input text-center text-lg font-semibold tracking-[0.4em]"
                        />
                        {otpError && (
                          <p className="glass-error mt-2 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" />
                            {otpError}
                          </p>
                        )}
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setOtp("");
                            setOtpError("");
                            dispatch(
                              registerUser({
                                firstname: formData.firstname,
                                lastname: formData.lastname,
                                email: formData.email,
                                mobile: Number(formData.mobile),
                                dial_code: formData.dialCode,
                                password: formData.password,
                                i_agree: true,
                                referral_code: formData.referral_code,
                              })
                            );
                          }}
                          className="text-sm font-semibold text-aqua transition-colors hover:text-white hover:underline"
                        >
                          Didn't receive the code? Resend
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={verifyOtpFromBackend}
                        className="h-12 w-full rounded-xl bg-white text-sm font-bold text-navy transition-all duration-300 hover:bg-aqua hover:text-navy"
                      >
                        Verify OTP
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-white/70">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-bold text-aqua transition-colors hover:text-white hover:underline"
                >
                  Sign in
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

          .input-error {
            border-color: #fca5a5;
          }

          .glass-error {
            color: #fecaca;
            font-size: 0.75rem;
            margin-top: 6px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
        `}</style>
      </main>
    </UserLayout>
  );
};

export default Register;
