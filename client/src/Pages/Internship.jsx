import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  ListChecks,
  MessageCircleQuestion,
} from "lucide-react";
import UserLayout from "../Layouts/UserLayout";
import SectionHeading from "../Components/SectionHeading";
import PageHeader from "../Components/PageHeader";
import SmartImage from "../Components/SmartImage";
import { INTERNSHIP_PAGE } from "../Data/content";
import { INTERNSHIP_IMAGES, PAGE_HEADER_IMAGES } from "../Data/images";

/* Purely presentational public page — no API calls, no auth. */
const Internship = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <UserLayout>
      <main className="bg-canvas">
        {/* ========================================= */}
        {/* PAGE HEADER */}
        {/* ========================================= */}
        <PageHeader
          image={PAGE_HEADER_IMAGES.internship}
          badge={INTERNSHIP_PAGE.badge}
          title={INTERNSHIP_PAGE.title}
          subtitle={INTERNSHIP_PAGE.subtitle}
          crumb={INTERNSHIP_PAGE.breadcrumb}
        />

        {/* header CTAs */}
        <div className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-[95rem] flex-col items-center justify-center gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
            <Link
              to={INTERNSHIP_PAGE.primaryCta.path}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/40"
            >
              {INTERNSHIP_PAGE.primaryCta.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to={INTERNSHIP_PAGE.secondaryCta.path}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy px-7 py-3.5 text-sm font-bold text-navy transition-all duration-300 hover:bg-navy hover:text-white"
            >
              {INTERNSHIP_PAGE.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* ========================================= */}
        {/* HOW IT WORKS */}
        {/* ========================================= */}
        <section className="py-12 md:py-20" aria-label="How the internship works">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The process"
              title={INTERNSHIP_PAGE.howItWorks.title}
              subtitle={INTERNSHIP_PAGE.howItWorks.subtitle}
            />

            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {INTERNSHIP_PAGE.howItWorks.steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                  className="relative rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-softdeep hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-lg font-extrabold text-white shadow-md shadow-brand/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {index < INTERNSHIP_PAGE.howItWorks.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-4 top-11 hidden h-0.5 w-6 bg-gradient-to-r from-aqua to-iris lg:block"
                    />
                  )}

                  <h3 className="mt-4 text-base font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ========================================= */}
        {/* BENEFITS + REQUIREMENTS (with images) */}
        {/* ========================================= */}
        <section className="bg-white py-12 md:py-20" aria-label="Benefits and requirements">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* BENEFITS */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-line bg-canvas p-8 md:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md shadow-brand/30">
                  <ListChecks size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold text-navy">
                  {INTERNSHIP_PAGE.benefits.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Everything below is included with your course — there is no
                  separate internship fee.
                </p>

                <ul className="mt-6 space-y-3">
                  {INTERNSHIP_PAGE.benefits.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors duration-300 hover:border-softdeep"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-navy">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 overflow-hidden rounded-2xl">
                  <SmartImage
                    src={INTERNSHIP_IMAGES.review}
                    alt="A mentor reviewing an intern's work during a one-to-one session"
                    ratioClass="aspect-[16/9]"
                  />
                </div>
              </motion.div>

              {/* REQUIREMENTS */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-line bg-canvas p-8 md:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-md">
                  <ClipboardList size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold text-navy">
                  {INTERNSHIP_PAGE.requirements.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  The bar is simple: finish the work, show up ready to learn.
                </p>

                <ul className="mt-6 space-y-3">
                  {INTERNSHIP_PAGE.requirements.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors duration-300 hover:border-softdeep"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-navy">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 overflow-hidden rounded-2xl">
                  <SmartImage
                    src={INTERNSHIP_IMAGES.teamwork}
                    alt="Interns collaborating on a development task together"
                    ratioClass="aspect-[16/9]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* FAQ */}
        {/* ========================================= */}
        <section className="py-12 md:py-20" aria-label="Internship questions">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Questions"
              title="Internship FAQ"
              subtitle="The things students ask us most. Anything else — the contact page is one click away."
            />

            <div className="mx-auto mt-12 max-w-3xl space-y-3">
              {INTERNSHIP_PAGE.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                      isOpen ? "border-brand" : "border-line"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <MessageCircleQuestion
                          size={18}
                          className="shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-bold text-navy md:text-base">
                          {faq.question}
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-brand" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <p className="px-6 pb-5 pl-[3.4rem] text-sm leading-relaxed text-muted">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CTA */}
        {/* ========================================= */}
        <section aria-label="Get started" className="px-4 pb-12 sm:px-6 md:pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-[95rem] overflow-hidden rounded-2xl bg-navy px-6 py-14 text-center md:px-12 md:py-20"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-iris/30 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                {INTERNSHIP_PAGE.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                {INTERNSHIP_PAGE.cta.subtitle}
              </p>
              <Link
                to={INTERNSHIP_PAGE.cta.path}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/50"
              >
                {INTERNSHIP_PAGE.cta.label}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </UserLayout>
  );
};

export default Internship;
