import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SmartImage from "./SmartImage";

/**
 * Shared inner-page header: full-width background image, navy-to-indigo
 * gradient overlay, breadcrumb trail, badge/title/subtitle.
 * props: image, badge, title, subtitle, crumb (current page label)
 */
const PageHeader = ({ image, badge, title, subtitle, crumb }) => {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <SmartImage
          src={image}
          alt=""
          ratioClass="h-full w-full"
          imgClassName="object-cover"
        />
      </div>
      {/* Gradient overlay: navy → indigo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-iris/70"
      />

      <div className="mx-auto max-w-[95rem] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center gap-2 text-xs font-semibold text-white/60">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={13} className="text-white/40" />
            </li>
            <li aria-current="page" className="text-aqua">
              {crumb}
            </li>
          </ol>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-3xl"
        >
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden="true" />
              {badge}
            </span>
          )}

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default PageHeader;
