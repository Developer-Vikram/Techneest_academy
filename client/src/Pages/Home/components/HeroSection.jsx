import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Rocket } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { HERO_SLIDES, HERO_CTAS, HERO_FLOATING_CARDS } from "../../../Data/content";
import { HERO_SLIDES_IMAGES } from "../../../Data/images";

const slides = HERO_SLIDES.map((slide, i) => ({
  ...slide,
  image: HERO_SLIDES_IMAGES[i % HERO_SLIDES_IMAGES.length],
}));

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HeroSection = () => {
  const swiperRef = useRef(null);
  const [imgErrors, setImgErrors] = useState({});

  /* Pause auto-play when the hero has keyboard focus */
  useEffect(() => {
    const node = swiperRef.current?.el;
    if (!node) return;

    const pause = () => swiperRef.current?.swiper?.autoplay?.pause();
    const resume = () => {
      if (!prefersReducedMotion()) swiperRef.current?.swiper?.autoplay?.resume();
    };

    node.addEventListener("focusin", pause);
    node.addEventListener("focusout", resume);
    return () => {
      node.removeEventListener("focusin", pause);
      node.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <section aria-label="Highlights" className="relative bg-navy">
      <Swiper
        ref={swiperRef}
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop
        autoplay={
          prefersReducedMotion()
            ? false
            : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={{
          clickable: true,
          bulletClass: "swiper-hero-bullet",
          bulletActiveClass: "swiper-hero-bullet-active",
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title1}>
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px]">
              {/* BACKGROUND IMAGE */}
              {imgErrors[index] ? (
                <div className="img-fallback absolute inset-0" aria-hidden="true" />
              ) : (
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  onError={() => setImgErrors((p) => ({ ...p, [index]: true }))}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* GRADIENT OVERLAY (navy → indigo) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-iris/50"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent"
              />

              {/* CONTENT */}
              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-[95rem] items-center px-4 py-20 sm:px-6 md:min-h-[680px] lg:px-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    <BriefcaseBusiness size={14} aria-hidden="true" />
                    {slide.badge}
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title1}
                    <span className="block text-gradient">{slide.title2}</span>
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                    {slide.text}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      to={HERO_CTAS.primary.path}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/50"
                    >
                      {HERO_CTAS.primary.label}
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      to={HERO_CTAS.secondary.path}
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-navy"
                    >
                      {HERO_CTAS.secondary.label}
                    </Link>
                  </div>
                </div>

                {/* FLOATING GLASS CARDS */}
                <div className="absolute bottom-24 right-8 z-20 hidden flex-col gap-3 xl:flex xl:max-w-xs">
                  {HERO_FLOATING_CARDS.map((card, i) => (
                    <div
                      key={card.title}
                      className={`glass flex items-center gap-3 rounded-2xl p-4 shadow-2xl ${
                        i === 1 ? "translate-x-8" : ""
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                        {i === 0 ? (
                          <BriefcaseBusiness size={18} aria-hidden="true" />
                        ) : (
                          <Rocket size={18} aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white">
                          {card.title}
                        </span>
                        <span className="block text-xs text-white/60">
                          {card.meta}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carousel dots + fallback image style */}
      <style>{`
        .hero-swiper .swiper-hero-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.35);
          margin: 0 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-hero-bullet-active {
          width: 30px;
          background: linear-gradient(90deg, #22D3EE, #1D6BFF);
        }
        .hero-swiper .swiper-pagination-bullets {
          bottom: 22px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
