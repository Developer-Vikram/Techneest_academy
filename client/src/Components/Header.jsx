import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ICONS */
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Phone,
  User,
  UserPlus,
  X,
} from "lucide-react";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

/* CONTENT */
import { NAV_LINKS } from "../Data/content";

/* Icon per nav path (presentation only) */
const NAV_ICONS = {
  "/": Home,
  "/courses": BookOpen,
  "/internship": Briefcase,
  "/about": Info,
  "/contact": Phone,
};

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
            ? "border-b border-line bg-white/90 shadow-[0_10px_30px_-15px_rgba(10,21,48,0.2)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[95rem] px-4 sm:px-6 lg:px-8">
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
              aria-label="Techneest Academy — home"
            >
              <img
                src="/techneest-logo.png"
                alt="Techneest Academy"
                className={`w-auto transition-all duration-300 ${
                  scrolled ? "h-10 md:h-12" : "h-11 md:h-14"
                }`}
              />
            </Link>

            {/* DESKTOP NAV — icon + label per link */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path);
                const Icon = NAV_ICONS[link.path] || BookOpen;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/") scrollToTop();
                      setIsProfileOpen(false);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-muted hover:bg-soft hover:text-navy"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-gradient shadow-md shadow-brand/30"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon size={15} className="relative z-10" aria-hidden="true" />
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
                    type="button"
                    onClick={() => setIsProfileOpen((p) => !p)}
                    aria-expanded={isProfileOpen}
                    aria-haspopup="menu"
                    className={`flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3 transition-all duration-300 ${
                      isProfileOpen
                        ? "border-softdeep bg-soft"
                        : "border-line bg-white hover:border-softdeep hover:bg-soft/50"
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-md shadow-brand/30">
                      {initial}
                    </span>
                    <span className="hidden max-w-[110px] truncate text-sm font-semibold capitalize text-navy xl:block">
                      {user.firstname}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-muted transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 top-full mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-navy/10"
                      >
                        <div className="border-b border-line bg-soft px-4 py-4">
                          <p className="truncate text-sm font-bold capitalize text-navy">
                            {fullName}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {user.email}
                          </p>
                        </div>

                        <div className="p-2">
                          <Link
                            role="menuitem"
                            to="/my-courses/profile"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-soft hover:text-brand"
                          >
                            <User size={17} />
                            My Profile
                          </Link>
                          <Link
                            role="menuitem"
                            to="/my-courses"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-soft hover:text-brand"
                          >
                            <GraduationCap size={17} />
                            My Courses
                          </Link>
                          <button
                            type="button"
                            role="menuitem"
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
                /* ---------- REGISTER + STUDENT LOGIN (md+) ---------- */
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    to="/register"
                    className="flex items-center gap-2 rounded-full border border-navy/25 px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  >
                    <UserPlus size={16} aria-hidden="true" />
                    Register
                  </Link>

                  <Link
                    to={loginRedirect}
                    className="group/login flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/40"
                  >
                    <LogIn size={16} aria-hidden="true" />
                    Student Login
                    <ArrowRight
                      size={15}
                      className="-ml-1 w-0 opacity-0 transition-all duration-300 group-hover/login:ml-0 group-hover/login:w-4 group-hover/login:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              )}

              {/* MOBILE / TABLET MENU BUTTON */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-softdeep hover:bg-soft hover:text-brand lg:hidden"
              >
                <Menu size={21} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar (logo gradient) */}
        <motion.div
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-brand-gradient transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.header>

      {/* ========================================= */}
      {/* MOBILE DRAWER */}
      {/* ========================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            <div
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={menuRef}
              role="dialog"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 240 }}
              className="relative flex h-full w-[88vw] max-w-[380px] flex-col overflow-y-auto bg-white shadow-2xl"
            >
              {/* DRAWER HEADER */}
              <div className="relative overflow-hidden bg-navy px-5 pb-6 pt-5 sm:px-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/40 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-aqua/20 blur-3xl"
                />

                <div className="relative flex items-center justify-between">
                  <img
                    src="/techneest-logo-dark.png"
                    alt="Techneest Academy"
                    className="h-12 w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User card */}
                <div className="glass relative mt-5 flex items-center gap-3 rounded-2xl p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-brand shadow-md">
                    {user ? initial : <User size={20} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold capitalize text-white">
                      {fullName}
                    </p>
                    <p className="truncate text-xs text-white/70">
                      {user ? user.email : "Sign in to access your courses"}
                    </p>
                  </div>
                </div>
              </div>

              {/* NAV LINKS — icons shown on mobile too */}
              <nav aria-label="Mobile navigation" className="flex-1 px-3 py-4">
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted/60">
                  Menu
                </p>
                <div className="space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const Icon = NAV_ICONS[link.path] || BookOpen;
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
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between rounded-2xl px-3 py-3 transition-all duration-300 ${
                            active
                              ? "bg-brand-gradient text-white shadow-lg shadow-brand/30"
                              : "text-navy hover:bg-soft"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                                active ? "bg-white/20" : "bg-soft text-brand"
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
                            className={active ? "text-white" : "text-line"}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* ACTION BUTTONS */}
              <div className="sticky bottom-0 border-t border-line bg-white p-5">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={loginRedirect}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-navy/25 px-4 py-3 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                    >
                      <LogIn size={16} />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30"
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
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-semibold text-navy transition-all hover:border-brand hover:text-brand"
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-muted">
                  Every course includes a{" "}
                  <span className="font-bold text-gradient">real internship</span>
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
