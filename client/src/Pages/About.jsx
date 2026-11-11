import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Eye, Handshake, ShieldCheck, Target } from "lucide-react";
import UserLayout from "../Layouts/UserLayout";
import SectionHeading from "../Components/SectionHeading";
import PageHeader from "../Components/PageHeader";
import SmartImage from "../Components/SmartImage";
import { ABOUT_PAGE, SITE } from "../Data/content";
import { ABOUT_IMAGES, PAGE_HEADER_IMAGES, TEAM_IMAGES } from "../Data/images";

const VALUE_ICONS = [Compass, ShieldCheck, Handshake];

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <UserLayout>
      <main className="bg-canvas">
        {/* ========================================= */}
        {/* PAGE HEADER */}
        {/* ========================================= */}
        <PageHeader
          image={PAGE_HEADER_IMAGES.about}
          badge={ABOUT_PAGE.badge}
          title={ABOUT_PAGE.title}
          subtitle={ABOUT_PAGE.subtitle}
          crumb={ABOUT_PAGE.breadcrumb}
        />

        {/* ========================================= */}
        {/* STORY */}
        {/* ========================================= */}
        <section className="py-12 md:py-20" aria-label="Our story">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-20 blur-lg"
                />
                <SmartImage
                  src={ABOUT_IMAGES.story}
                  alt="A developer's workspace with laptop and notebook at Techneest Academy"
                  ratioClass="aspect-[4/3] rounded-2xl ring-1 ring-line"
                  className="relative shadow-xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                  <Compass size={14} aria-hidden="true" />
                  Our story
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
                  {ABOUT_PAGE.story.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {ABOUT_PAGE.story.body}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* MISSION + VISION */}
        {/* ========================================= */}
        <section className="bg-white py-12 md:py-20" aria-label="Mission and vision">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.article
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-line bg-canvas p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card md:p-10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
                  <Target size={26} aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-navy">
                  {ABOUT_PAGE.mission.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {ABOUT_PAGE.mission.body}
                </p>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="rounded-2xl border border-line bg-canvas p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card md:p-10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md shadow-brand/30">
                  <Eye size={26} aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-navy">
                  {ABOUT_PAGE.vision.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {ABOUT_PAGE.vision.body}
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* VALUES */}
        {/* ========================================= */}
        <section className="py-12 md:py-20" aria-label="Our values">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Values"
              title={ABOUT_PAGE.values.title}
              subtitle="The rules we hold ourselves to — in every lesson, review and internship assignment."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {ABOUT_PAGE.values.items.map((item, index) => {
                const Icon = VALUE_ICONS[index] || Compass;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    className="group rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-softdeep hover:shadow-lift"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-brand transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* TEAM STRIP (real team photos) */}
        {/* ========================================= */}
        <section className="bg-white py-12 md:py-20" aria-label="Team">
          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="People"
              title={ABOUT_PAGE.team.title}
              subtitle={ABOUT_PAGE.team.subtitle}
            />

            <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]">
              {TEAM_IMAGES.map((member, index) => (
                <motion.figure
                  key={member.src}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl border border-line shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                  }`}
                >
                  <img
                    src={member.src}
                    alt={member.alt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add("img-fallback");
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-base font-bold text-white lg:text-lg">
                      {member.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
                      {member.desc}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CTA */}
        {/* ========================================= */}
        <section aria-label="Next step" className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto flex max-w-[95rem] flex-col items-center gap-6 overflow-hidden rounded-2xl bg-navy px-6 py-14 text-center md:flex-row md:justify-between md:px-12 md:text-left"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-iris/30 blur-3xl"
            />

            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                {ABOUT_PAGE.cta.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
                Questions about the academy? Write to us at{" "}
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="font-semibold text-aqua underline decoration-brand underline-offset-4"
                >
                  {SITE.contact.email}
                </a>
                .
              </p>
            </div>

            <Link
              to={ABOUT_PAGE.cta.path}
              className="group relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/50"
            >
              {ABOUT_PAGE.cta.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </section>
      </main>
    </UserLayout>
  );
};

export default About;
