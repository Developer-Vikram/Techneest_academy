import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, Mail, MessageCircle, Phone } from "lucide-react";
import SmartImage from "../../../Components/SmartImage";
import { HOME_FINAL_CTA, SITE } from "../../../Data/content";
import { CTA_IMAGES } from "../../../Data/images";

const FinalCTA = () => {
  return (
    <section aria-label="Get started" className="bg-canvas px-4 pb-12 sm:px-6 md:pb-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-[95rem] overflow-hidden rounded-2xl"
      >
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <SmartImage
            src={CTA_IMAGES.band}
            alt=""
            ratioClass="h-full w-full"
          />
        </div>

        {/* Gradient overlay: navy → blue → indigo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-iris/70"
        />

        <div className="relative z-10 px-6 py-14 text-center md:px-12 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <Headphones size={14} aria-hidden="true" />
            Start today
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            {HOME_FINAL_CTA.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {HOME_FINAL_CTA.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={HOME_FINAL_CTA.primaryCta.path}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/50"
            >
              {HOME_FINAL_CTA.primaryCta.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to={HOME_FINAL_CTA.secondaryCta.path}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-navy"
            >
              {HOME_FINAL_CTA.secondaryCta.label}
            </Link>
          </div>

          {/* Support cards */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <a
              href={`mailto:${SITE.contact.email}`}
              className="glass flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/20"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-md">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-white/70">
                  Email support
                </span>
                <span className="block truncate text-sm font-bold text-white">
                  {SITE.contact.email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${SITE.contact.phoneHref}`}
              className="glass flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/20"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-md">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-white/70">
                  Call support
                </span>
                <span className="block truncate text-sm font-bold text-white">
                  {SITE.contact.phone}
                </span>
              </span>
            </a>

            <Link
              to="/contact"
              className="glass flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 hover:bg-white/20"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-md">
                <MessageCircle size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-white/70">
                  Chat with us
                </span>
                <span className="block truncate text-sm font-bold text-white">
                  Send an enquiry
                </span>
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
