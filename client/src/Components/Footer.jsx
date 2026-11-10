import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const theme = {
    darkerNavy: "#050914",
  };

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

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const supportLinks = [
    { name: "FAQs", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Refund Policy", path: "/refund" },
  ];

  return (
    <footer
      style={{ backgroundColor: theme.darkerNavy }}
      className="text-white font-sans overflow-hidden relative"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-[#0072FF]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#00C6FF]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* ================= NEWSLETTER SECTION ================= */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-6 md:p-8 shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0072FF]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:max-w-md">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">
                  Join Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">
                    Newsletter
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">
                  Get latest course updates and learning resources straight to
                  your inbox.
                </p>
              </div>

              <form
                className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md relative"
                onSubmit={handleSubscribe}
              >
                <div className="relative flex-1 group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00C6FF] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#0b1120]/80 backdrop-blur-sm border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#00C6FF]/50 focus:ring-4 focus:ring-[#00C6FF]/10 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_-5px_rgba(0,198,255,0.5)] hover:shadow-[0_8px_30px_-5px_rgba(0,198,255,0.7)] flex items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {subscribed ? (
                    "Subscribed 🎉"
                  ) : (
                    <>
                      Subscribe <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* ================= MAIN FOOTER GRID ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Column 1: Logo & Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <Link to="/" className="mb-4 block group">
              <img
                alt="Techneest Logo"
                src="/techneest-logo-dark.png"
                className="h-14 md:h-16 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Learn practical digital skills with mentorship, real-world
              projects, and industry-recognized certifications to build a
              successful career.
            </p>

            {/* SOCIAL LINKS (No Background — Only Icon, Brand-Color on Hover) */}
            <div className="flex flex-wrap gap-2">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="group w-10 h-10 rounded-lg bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-[#E1306C] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(225,48,108,0.4)]"
              >
                <svg
                  className="w-6 h-6 fill-[#E1306C] group-hover:fill-white transition-colors duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="group w-10 h-10 rounded-lg bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-black hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
              >
                <svg
                  className="w-[20px] h-[20px] fill-white group-hover:fill-white transition-colors duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="group w-10 h-10 rounded-lg bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-[#0A66C2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(10,102,194,0.4)]"
              >
                <svg
                  className="w-[20px] h-[20px] fill-[#0A66C2] group-hover:fill-white transition-colors duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="group w-10 h-10 rounded-lg bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-[#FF0000] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,0,0,0.4)]"
              >
                <svg
                  className="w-[24px] h-[24px] fill-[#FF0000] group-hover:fill-white transition-colors duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Column 2 & 3: Links */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 grid grid-cols-2 gap-6 lg:pl-4"
          >
            <div>
              <h4 className="text-white font-bold text-[15px] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF]"></span>{" "}
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 text-gray-400 hover:text-[#00C6FF] text-[13px] font-medium transition-all duration-300"
                    >
                      <span className="w-0 h-[1.5px] bg-[#00C6FF] group-hover:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-[15px] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF]"></span>{" "}
                Support
              </h4>
              <ul className="space-y-2.5">
                {supportLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 text-gray-400 hover:text-[#00C6FF] text-[13px] font-medium transition-all duration-300"
                    >
                      <span className="w-0 h-[1.5px] bg-[#00C6FF] group-hover:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-white font-bold text-[15px] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF]"></span>{" "}
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 group">
                <div className="w-7 h-7 rounded-md bg-[#1e293b] flex items-center justify-center shrink-0 group-hover:bg-[#0072FF] transition-colors">
                  <MapPin className="text-[#00C6FF] group-hover:text-white w-3.5 h-3.5" />
                </div>
                <span className="text-gray-400 text-[13px] leading-snug group-hover:text-gray-200 transition-colors mt-0.5">
                  T3-331, 3rd Floor, Golden I, Tech Zone 4, Greater Noida, U.P.
                  (201318)
                </span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-md bg-[#1e293b] flex items-center justify-center shrink-0 group-hover:bg-[#0072FF] transition-colors">
                  <Phone className="text-[#00C6FF] group-hover:text-white w-3.5 h-3.5" />
                </div>
                <a
                  href="tel:+918595973101"
                  className="text-gray-400 text-[13px] font-medium group-hover:text-gray-200 transition-colors"
                >
                  +91 8595973101
                </a>
              </li>
              <li className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-md bg-[#1e293b] flex items-center justify-center shrink-0 group-hover:bg-[#0072FF] transition-colors">
                  <Mail className="text-[#00C6FF] group-hover:text-white w-3.5 h-3.5" />
                </div>
                <a
                  href="mailto:Manager@techneest.com"
                  className="text-gray-400 text-[13px] font-medium group-hover:text-gray-200 transition-colors"
                >
                  Manager@techneest.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ================= BOTTOM BAR ================= */}
        <motion.div
          className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-gray-500 font-medium">
            <p>© {currentYear} Techneest Academy. All rights reserved.</p>
            <div className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> Global
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back To Top
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
