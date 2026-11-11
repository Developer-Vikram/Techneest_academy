import React, { useEffect, useRef } from "react";
import {
  Star,
  Play,
  Clock,
  CheckCircle,
  BookOpen,
  Briefcase,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/slices/courseSlice";
import { getAllCategories } from "../../../redux/slices/categoryCourseSlice";
import { getPurchasesByUser } from "../../../redux/slices/purchaseSlice";

/* SWIPER */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* CONTENT + IMAGES */
import { FEATURED_COURSE } from "../../../Data/content";
import { COURSES_IMAGES } from "../../../Data/images";
import SmartImage from "../../../Components/SmartImage";

// =========================================
// PRICE BLOCK (shared by card + showcase)
// =========================================

const PriceBlock = ({ item, large = false }) => (
  <div className="flex items-center gap-2 flex-wrap">
    {Number(item.price) === 0 ? (
      <p className={`font-extrabold text-brand ${large ? "text-4xl" : "text-2xl"}`}>
        Free
      </p>
    ) : (
      <>
        <p className={`font-extrabold text-navy ${large ? "text-4xl" : "text-2xl"}`}>
          ₹{item.discount_price || item.price}
        </p>
        {item.discount_price && (
          <p className="text-sm text-muted/60 line-through">₹{item.price}</p>
        )}
      </>
    )}
  </div>
);

// =========================================
// SKELETON CARD (loading state)
// =========================================

const SkeletonCard = () => (
  <div className="mb-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
    <div className="aspect-[16/10] animate-pulse bg-softdeep/60" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 animate-pulse rounded-full bg-softdeep/60" />
      <div className="h-3 w-full animate-pulse rounded-full bg-soft/80" />
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-soft/80" />
      <div className="h-10 w-full animate-pulse rounded-xl bg-soft/80" />
    </div>
  </div>
);

export default function Courses() {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  // =========================================
  // REDUX STATE
  // =========================================

  const {
    courses = [],
    loading: coursesLoading,
    error,
  } = useSelector((state) => state.courses);

  const { categories = [] } = useSelector((state) => state.categoryCourse);

  // GET PURCHASES FROM PURCHASE SLICE
  const {
    myPurchases = [],
    loading: purchasesLoading
  } = useSelector((state) => state.purchase || {});

  // Create a Set of purchased/enrolled course IDs
  const enrolledCourseIds = new Set(
    myPurchases
      .filter(purchase => purchase?.enrolled === true)
      .map(purchase => purchase?.course_id?._id)
      .filter(id => id)
  );

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllCategories());
    dispatch(getPurchasesByUser());
  }, [dispatch]);

  // =========================================
  // FILTER COURSES
  // =========================================

  const filteredCourses = courses.filter((course) =>
    categories.some((cat) => cat._id === course.category_id)
  );

  const isLoading = coursesLoading || purchasesLoading;
  const isSingleFeatured = !isLoading && filteredCourses.length === 1;

  // =========================================
  // COURSE CARD (grid / carousel) — render helper
  // =========================================

  const renderCourseCard = (item) => {
    const isPurchased = enrolledCourseIds.has(item._id);
    const categoryName =
      categories.find((cat) => cat._id === item.category_id)?.name || "Course";
    const hasRating = item.average_rating && Number(item.average_rating) > 0;

    return (
      <div className="group mb-10 flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-softdeep hover:shadow-lift">
        {/* THUMBNAIL */}
        <div className="relative flex-shrink-0">
          <SmartImage
            src={item.image || COURSES_IMAGES.fallback}
            alt={item.title}
            ratioClass="aspect-[16/10]"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-sm backdrop-blur-sm">
            {categoryName}
          </span>
          <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
            <Briefcase size={12} aria-hidden="true" />
            Internship included
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-grow flex-col p-5">
          <h3 className="mb-2 line-clamp-2 min-h-[48px] text-base font-bold leading-snug text-navy transition-colors group-hover:text-brand">
            {item.title}
          </h3>

          {item.short_description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted">
              {item.short_description}
            </p>
          )}

          {/* Real review data only — no invented numbers */}
          {hasRating && (
            <div className="mb-3 flex items-center gap-1.5">
              <Star size={14} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="text-sm font-bold text-navy">
                {Number(item.average_rating).toFixed(1)}
              </span>
              {item.review_count > 0 && (
                <span className="text-xs text-muted">
                  ({item.review_count} reviews)
                </span>
              )}
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-brand">
              <Clock size={11} aria-hidden="true" /> Lifetime access
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-brand">
              <CheckCircle size={11} aria-hidden="true" /> Certificate
            </span>
            {item.referral_commission > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-warm">
                <Sparkles size={11} aria-hidden="true" />
                Refer &amp; earn {item.referral_commission}%
              </span>
            )}
          </div>

          {/* FOOTER */}
          <div className="mt-auto border-t border-line pt-4">
            {isPurchased ? (
              <div className="mb-3 flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5">
                <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
                <span className="text-sm font-bold text-green-700">Enrolled</span>
              </div>
            ) : (
              <div className="mb-3">
                <PriceBlock item={item} />
              </div>
            )}

            <Link
              to={`/course-info/${item._id}`}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all duration-300 ${
                isPurchased
                  ? "bg-navy group-hover:bg-brand"
                  : "bg-brand-gradient shadow-md shadow-brand/25"
              }`}
            >
              {isPurchased ? "Continue Learning" : "View course"}
              <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // =========================================
  // FEATURED SHOWCASE (single flagship course) — render helper
  // =========================================

  const renderFeaturedShowcase = (item) => {
    const isPurchased = enrolledCourseIds.has(item._id);
    const categoryName =
      categories.find((cat) => cat._id === item.category_id)?.name || "Course";

    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-card"
      >
        <div className="grid lg:grid-cols-2">
          {/* IMAGE SIDE */}
          <div className="relative">
            <SmartImage
              src={item.image || COURSES_IMAGES.showcase}
              alt={item.title}
              ratioClass="h-full min-h-[320px] lg:min-h-[520px]"
              imgClassName="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r"
            />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy shadow-lg backdrop-blur-sm">
              <Sparkles size={13} className="text-warm" aria-hidden="true" />
              {FEATURED_COURSE.badge} · {categoryName}
            </span>
          </div>

          {/* DETAILS SIDE */}
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <h3 className="text-2xl font-extrabold leading-tight text-navy md:text-3xl">
              {item.title}
            </h3>

            {item.short_description && (
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {item.short_description}
              </p>
            )}

            {/* Curriculum highlights */}
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted/70">
              {FEATURED_COURSE.curriculumTitle}
            </p>
            <ul className="mt-3 space-y-2.5">
              {FEATURED_COURSE.curriculum.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-navy">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft">
                    <Check size={12} className="text-brand" aria-hidden="true" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            {/* Tools */}
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted/70">
              {FEATURED_COURSE.toolsTitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {FEATURED_COURSE.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-navy"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Internship note */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-softdeep bg-soft p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Briefcase size={16} aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-navy">
                {FEATURED_COURSE.internshipNote}
              </p>
            </div>

            {/* Price + CTA */}
            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              {isPurchased ? (
                <span className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                  <CheckCircle size={18} aria-hidden="true" /> You're enrolled
                </span>
              ) : (
                <PriceBlock item={item} large />
              )}

              <Link
                to={`/course-info/${item._id}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/40"
              >
                {isPurchased ? (
                  <>Continue Learning <Play size={14} aria-hidden="true" /></>
                ) : (
                  <>Enroll Now <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></>
                )}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // =========================================
  // SKELETON — see module-level SkeletonCard
  // =========================================

  return (
    <section className="w-full bg-canvas py-12 md:py-20" id="courses">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
            <BookOpen size={14} aria-hidden="true" />
            Learn. Build. Intern.
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
            Courses that end in <span className="text-gradient">experience</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Every programme below is maintained by our team and includes the
            Techneest internship after completion.
          </p>
        </motion.div>

        {/* LOADING — skeleton cards */}
        {isLoading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && !isLoading && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-base font-bold text-red-600">{error}</p>
            <p className="mt-1 text-sm text-red-500">
              Please refresh the page or try again later.
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && !error && filteredCourses.length === 0 && (
          <div className="mt-12 rounded-2xl border border-line bg-white p-12 text-center shadow-card">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-soft text-brand">
              <BookOpen size={30} aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              New courses are on the way
            </h3>
            <p className="mt-2 text-sm text-muted">
              Enrolment opens soon — check back shortly or leave your email via
              the contact page and we will notify you.
            </p>
          </div>
        )}

        {/* SINGLE FLAGSHIP COURSE — featured showcase */}
        {isSingleFeatured && renderFeaturedShowcase(filteredCourses[0])}

        {/* MULTIPLE COURSES — carousel + mobile grid */}
        {!isLoading && !error && filteredCourses.length > 1 && (
          <>
            {/* Desktop Swiper View */}
            <div className="mt-12 mb-3 hidden md:block md:mt-16">
              <Swiper
                ref={swiperRef}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1440: { slidesPerView: 4, spaceBetween: 20 },
                }}
                className="courses-swiper"
              >
                {filteredCourses.map((item) => (
                  <SwiperSlide key={item._id}>
                    {renderCourseCard(item)}
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <div className="-mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                  aria-label="Previous courses"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-brand shadow-md transition-all duration-300 hover:bg-brand-gradient hover:text-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                  aria-label="Next courses"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-brand shadow-md transition-all duration-300 hover:bg-brand-gradient hover:text-white"
                >
                  →
                </button>
              </div>
            </div>

            {/* Mobile Grid View */}
            <div className="mt-12 mb-4 grid gap-6 sm:gap-8 md:hidden">
              {filteredCourses.map((item) => (
                <React.Fragment key={item._id}>
                  {renderCourseCard(item)}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
