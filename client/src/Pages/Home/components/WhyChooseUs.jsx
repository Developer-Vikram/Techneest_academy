import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  Hammer,
  Headset,
} from "lucide-react";
import CountUp from "../../../Components/CountUp";
import SmartImage from "../../../Components/SmartImage";
import { WHY_REASONS } from "../../../Data/content";
import { WHY_IMAGES } from "../../../Data/images";

const REASON_ICONS = [Code2, BriefcaseBusiness, Hammer, Headset, Award];

/* Real academy numbers (same source as the stats band) */
const HIGHLIGHTS = [
  { value: 1525, suffix: "+", label: "Students enrolled" },
  { value: 1050, suffix: "+", label: "Classes completed" },
  { value: 10, suffix: "+", label: "Expert instructors" },
];

const WhyChooseUs = () => {
  return (
    <section
      className="relative overflow-hidden bg-white py-12 md:py-20"
      aria-label="Why choose Techneest Academy"
    >
      {/* decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-softdeep/60 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- IMAGE COLLAGE ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* main image */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-20 blur-lg"
              />
              <SmartImage
                src={WHY_IMAGES.main}
                alt="Mentor reviewing code with students during a strategy session"
                ratioClass="aspect-[4/3] rounded-2xl ring-1 ring-line"
                className="relative shadow-xl"
              />
            </div>

            {/* small overlapping images */}
            <div className="absolute -bottom-8 -left-4 hidden w-44 sm:block md:w-56">
              <SmartImage
                src={WHY_IMAGES.top}
                alt="Student writing code on a laptop"
                ratioClass="aspect-[4/3] rounded-2xl ring-4 ring-white"
                className="shadow-xl"
              />
            </div>
            <div className="absolute -right-4 -top-8 hidden w-40 md:block md:w-48">
              <SmartImage
                src={WHY_IMAGES.bottom}
                alt="Students learning together in a group session"
                ratioClass="aspect-[4/3] rounded-2xl ring-4 ring-white"
                className="shadow-xl"
              />
            </div>

            {/* floating internship badge */}
            <div className="glass absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-navy/80 p-4 shadow-2xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">
                  Internship included
                </span>
                <span className="block text-xs text-white/60">
                  after course completion
                </span>
              </span>
            </div>
          </motion.div>

          {/* ---------- REASONS ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              Why students choose Techneest
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
              Training that ends <span className="text-gradient">on a real team</span>
            </h2>

            <ul className="mt-8 space-y-6">
              {WHY_REASONS.map((reason, index) => {
                const Icon = REASON_ICONS[index] || Code2;
                return (
                  <li key={reason.title} className="group flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-soft text-brand transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {reason.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* stat highlights with count-up */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {HIGHLIGHTS.map((stat) => (
                <div key={stat.label}>
                  <p className="bg-brand-gradient bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
