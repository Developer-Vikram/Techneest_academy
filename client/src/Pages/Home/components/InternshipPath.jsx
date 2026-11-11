import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Hammer, BadgeCheck, BriefcaseBusiness } from "lucide-react";
import SmartImage from "../../../Components/SmartImage";
import { PATH_STEPS } from "../../../Data/content";
import { INTERNSHIP_IMAGES } from "../../../Data/images";

const STEP_ICONS = [ShoppingCart, Hammer, BadgeCheck, BriefcaseBusiness];

const InternshipPath = () => {
  return (
    <section className="bg-white py-12 md:py-20" aria-label="Four-step path">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-2"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-20 blur-lg"
            />
            <SmartImage
              src={INTERNSHIP_IMAGES.path}
              alt="A mentor welcoming a student into their first professional assignment"
              ratioClass="aspect-[4/3] rounded-2xl ring-1 ring-line"
              className="relative shadow-xl"
            />
            <div className="glass absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-navy/80 p-4 shadow-2xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">
                  Internship included
                </span>
                <span className="block text-xs text-white/60">
                  with every course purchase
                </span>
              </span>
            </div>
          </motion.div>

          {/* STEPS SIDE */}
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              Your path
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
              From enrolment to internship <span className="text-gradient">in four steps</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              No mystery about what happens next — here is exactly how a
              Techneest student moves from day one to real work.
            </p>

            <ol className="relative mt-10 space-y-6">
              {/* connecting line */}
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-gradient-to-b from-aqua via-brand to-iris"
              />

              {PATH_STEPS.map((step, index) => {
                const Icon = STEP_ICONS[index] || BadgeCheck;
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="relative flex gap-5"
                  >
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-navy text-white shadow-md">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div className="rounded-2xl border border-line bg-canvas p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-softdeep hover:bg-white hover:shadow-card flex-1">
                      <h3 className="text-base font-bold text-navy">
                        <span className="mr-2 bg-brand-gradient bg-clip-text text-sm font-extrabold text-transparent">
                          0{index + 1}
                        </span>
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <div className="mt-10">
              <Link
                to="/internship"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-navy px-7 py-3.5 text-sm font-bold text-navy transition-all duration-300 hover:bg-navy hover:text-white"
              >
                How the internship works
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipPath;
