import { motion } from "framer-motion";
import {
  ArrowUp,
  BookOpen,
  Briefcase,
  Home,
  Info,
  Mail,
  MapPin,
  Phone,
  Send,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FOOTER_LINKS, SITE } from "../Data/content";

/* Icons for quick links (presentation only) */
const QUICK_ICONS = {
  "/": Home,
  "/courses": BookOpen,
  "/internship": Briefcase,
  "/digital-product": ShoppingBag,
  "/about": Info,
  "/contact": Mail,
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    hover: "hover:bg-[#E1306C]",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "X (Twitter)",
    href: "#",
    hover: "hover:bg-navy",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#",
    hover: "hover:bg-[#0A66C2]",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "YouTube",
    href: "#",
    hover: "hover:bg-[#FF0000]",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-iris/20 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 py-12 sm:px-6 lg:px-8">
        {/* ================= NEWSLETTER STRIP ================= */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-md">
              <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl">
                Course updates, straight to your inbox
              </h3>
              <p className="text-sm text-white/60">
                New batches, internship news and free resources. No spam —
                unsubscribe anytime.
              </p>
            </div>

            <form
              className="relative flex w-full flex-col gap-3 sm:flex-row md:max-w-md"
              onSubmit={handleSubscribe}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="group relative flex-1">
                <Mail
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-aqua"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/15 bg-navy/60 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-aqua/60 focus:ring-4 focus:ring-brand/25"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-gradient px-6 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-iris/40 active:scale-[0.98]"
              >
                {subscribed ? (
                  "Subscribed"
                ) : (
                  <>
                    Subscribe <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ================= MAIN FOOTER GRID ================= */}
        <motion.div
          className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Column 1: Brand */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start lg:col-span-4"
          >
            <Link to="/" onClick={scrollToTop} className="mb-4 block">
              <img
                alt="Techneest Academy"
                src="/techneest-logo-dark.png"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.tagline}
            </p>

            {/* Social icons */}
            <div className="mb-6 flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:-translate-y-1 ${social.hover}`}
                >
                  <svg
                    className="h-[18px] w-[18px] fill-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden="true" />
              Internship included with every course
            </span>
          </motion.div>

          {/* Columns 2 & 3: Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 lg:col-span-5 lg:pl-4"
          >
            <nav aria-label="Footer quick links">
              <h4 className="mb-4 text-[15px] font-bold text-white">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.quick.map((link) => {
                  const Icon = QUICK_ICONS[link.path] || BookOpen;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                      >
                        <Icon
                          size={13}
                          className="text-aqua/80 transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav aria-label="Footer support links">
              <h4 className="mb-4 text-[15px] font-bold text-white">Support</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="h-[1.5px] w-0 rounded-full bg-aqua transition-all duration-300 group-hover:w-3"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="mb-4 text-[15px] font-bold text-white">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="group flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10 transition-colors group-hover:bg-brand">
                  <MapPin className="h-3.5 w-3.5 text-aqua group-hover:text-white" aria-hidden="true" />
                </div>
                <span className="mt-0.5 text-[13px] leading-snug text-white/60 transition-colors group-hover:text-white/85">
                  {SITE.contact.address}
                </span>
              </li>
              <li className="group flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10 transition-colors group-hover:bg-brand">
                  <Phone className="h-3.5 w-3.5 text-aqua group-hover:text-white" aria-hidden="true" />
                </div>
                <a
                  href={`tel:${SITE.contact.phoneHref}`}
                  className="text-[13px] font-medium text-white/60 transition-colors group-hover:text-white/85"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="group flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10 transition-colors group-hover:bg-brand">
                  <Mail className="h-3.5 w-3.5 text-aqua group-hover:text-white" aria-hidden="true" />
                </div>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-[13px] font-medium text-white/60 transition-colors group-hover:text-white/85"
                >
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ================= BOTTOM BAR ================= */}
        <motion.div
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[11px] font-medium text-white/50">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white"
          >
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
            Back to top
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
