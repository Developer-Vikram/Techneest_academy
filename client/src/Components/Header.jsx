import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ICONS */
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Home,
  LogIn,
  LogOut,
  Mail,
  Menu,
  ShoppingBag,
  User,
  UserPlus,
  X,
} from "lucide-react";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

// Brand gradient (isko badal do to poora header change ho jayega)
const GRADIENT = "bg-gradient-to-r from-purple-600 to-[#00C6FF]";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const loginRedirect = `/login?redirect=${encodeURIComponent(
    `${location.pathname}${location.search}${location.hash}`,
  )}`;

  const { user } = useSelector((state) => state.auth);

  const fullName = user
    ? [user.firstname, user.lastname].filter(Boolean).join(" ")
    : "Guest User";
  const initial = user?.firstname?.[0]?.toUpperCase() || "U";

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Courses", path: "/courses", icon: BookOpen },
    { name: "Products", path: "/digital-product", icon: ShoppingBag },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "My Courses", path: "/my-courses", icon: GraduationCap },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  /* Scroll state */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Body lock when drawer open */
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  /* Route change pe sab close */
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  /* Click outside (profile dropdown + drawer) */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Esc se close */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate("/", { replace: true });
    scrollToTop();
  };

  return (
    <>
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-200/70 bg-white/80 shadow-[0_10px_30px_-15px_rgba(88,28,135,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[105rem] px-4 sm:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? "h-16 md:h-[72px]" : "h-16 md:h-20"
            }`}
          >
            {/* LOGO */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="relative z-10 flex shrink-0 items-center"
            >
              <motion.img
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                src="/techneest-logo.png"
                alt="Techneest Academy"
                className={`w-auto transition-all duration-300 ${
                  scrolled ? "h-10 md:h-20" : "h-11 md:h-16"
                }`}
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-1 rounded-full bg-gray-100/80 p-1.5 ring-1 ring-gray-200/60 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/") scrollToTop();
                      setIsProfileOpen(false);
                    }}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 xl:px-5 xl:text-[15px] ${
                      active
                        ? "text-purple-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_-2px_rgba(88,28,135,0.25)] ring-1 ring-black/5"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                /* ---------- PROFILE DROPDOWN (md+) ---------- */
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen((p) => !p)}
                    aria-expanded={isProfileOpen}
                    className={`flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3 transition-all duration-300 ${
                      isProfileOpen
                        ? "border-purple-200 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-md shadow-purple-500/30 ${GRADIENT}`}
                    >
                      {initial}
                    </span>
                    <span className="hidden max-w-[110px] truncate text-sm font-semibold capitalize text-gray-800 xl:block">
                      {user.firstname}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 top-full mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-purple-900/10"
                      >
                        <div className="border-b border-gray-100 bg-gradient-to-br from-purple-50 to-cyan-50 px-4 py-4">
                          <p className="truncate text-sm font-bold capitalize text-gray-900">
                            {fullName}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>

                        <div className="p-2">
                          <Link
                            to="/my-courses/profile"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                          >
                            <User size={17} />
                            My Profile
                          </Link>
                          <Link
                            to="/my-courses"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                          >
                            <GraduationCap size={17} />
                            My Courses
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            <LogOut size={17} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ---------- LOGIN / REGISTER (md+) ---------- */
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    to={loginRedirect}
                    className="group/login flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-purple-700"
                  >
                    <LogIn
                      size={17}
                      className="transition-transform duration-300 group-hover/login:-rotate-12"
                    />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className={`group/register relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/40 ${GRADIENT}`}
                  >
                    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/register:translate-x-full" />
                    <UserPlus size={17} className="relative z-10" />
                    <span className="relative z-10">Register</span>
                    <ArrowRight
                      size={16}
                      className="relative z-10 -ml-1 w-0 opacity-0 transition-all duration-300 group-hover/register:ml-0 group-hover/register:w-4 group-hover/register:opacity-100"
                    />
                  </Link>
                </div>
              )}

              {/* MOBILE / TABLET MENU BUTTON */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 lg:hidden"
              >
                <Menu size={21} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${GRADIENT} ${
            scrolled ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        />
      </motion.header>

      {/* ========================================= */}
      {/* MOBILE DRAWER */}
      {/* ========================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 240 }}
              className="relative flex h-full w-[88vw] max-w-[380px] flex-col overflow-y-auto rounded-l-3xl bg-white shadow-2xl"
            >
              {/* DRAWER HEADER */}
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-600 to-[#00C6FF] px-5 pb-6 pt-5 sm:px-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <img
                    src="/techneest-logo.png"
                    alt="Techneest Academy"
                    className="h-16 w-auto brightness-0 invert"
                  />
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                  >
                    <X size={20} className="text-white" />
                  </motion.button>
                </div>

                {/* User card */}
                <div className="relative mt-5 flex items-center gap-3 rounded-2xl bg-white/15 p-3 ring-1 ring-white/25 backdrop-blur-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-purple-700 shadow-md">
                    {user ? initial : <User size={20} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold capitalize text-white">
                      {fullName}
                    </p>
                    <p className="truncate text-xs text-white/80">
                      {user ? user.email : "Login to access your courses"}
                    </p>
                  </div>
                </div>
              </div>

              {/* NAV LINKS */}
              <div className="flex-1 px-3 py-4">
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Menu
                </p>
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const active = isActive(link.path);
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05 + 0.1,
                          type: "spring",
                          stiffness: 220,
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => {
                            setIsOpen(false);
                            if (link.path === "/") scrollToTop();
                          }}
                          className={`flex items-center justify-between rounded-2xl px-3 py-3 transition-all duration-300 ${
                            active
                              ? `${GRADIENT} text-white shadow-lg shadow-purple-500/30`
                              : "text-gray-700 hover:bg-purple-50"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                                active
                                  ? "bg-white/20"
                                  : "bg-purple-50 text-purple-600"
                              }`}
                            >
                              <Icon size={17} />
                            </span>
                            <span className="truncate text-sm font-semibold">
                              {link.name}
                            </span>
                          </div>
                          <ChevronRight
                            size={16}
                            className={active ? "text-white" : "text-gray-300"}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="sticky bottom-0 border-t border-gray-100 bg-white/95 p-5 backdrop-blur">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={loginRedirect}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-purple-300 hover:text-purple-700"
                    >
                      <LogIn size={16} />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 ${GRADIENT}`}
                    >
                      <UserPlus size={16} />
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/my-courses/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-purple-300 hover:text-purple-700"
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-gray-500">
                  Join <span className="font-bold text-purple-600">2500+</span>{" "}
                  students already learning
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
