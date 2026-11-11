import React, { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCourseReviewData } from "../../../redux/slices/courseReviewSlice";

const Testimonials = () => {
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});

  const { reviewData, loading } = useSelector((s) => s.courseReview);

  // Convert data
  const testimonials = Array.isArray(reviewData)
    ? reviewData.flatMap((course) =>
        Array.isArray(course?.reviews)
          ? course.reviews.map((r) => ({
              name: r?.reviewer_name || "Student",
              role: course?.course_title || "Learner",
              company: "Techneest Academy",
              review: r?.review || "Amazing course experience.",
              rating: r?.rating || 5,
            }))
          : [],
      )
    : [];

  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [startIndex, isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    if (startIndex + 1 <= testimonials.length - itemsToShow) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(testimonials.length - itemsToShow);
    }
  };

  const toggleReviewExpand = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Get current visible testimonials
  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsToShow,
  );

  useEffect(() => {
    dispatch(getCourseReviewData());
  }, [dispatch]);

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "S";

  // Compact Review Card Component
  const CompactReviewCard = ({ t, cardIndex }) => {
    const isExpanded = expandedReviews[cardIndex];
    const maxLength = 80;
    const needsExpand = t.review.length > maxLength;

    const displayText = needsExpand && !isExpanded
      ? t.review.substring(0, maxLength) + "..."
      : t.review;

    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-softdeep hover:shadow-lift">
        {/* Top Gradient Border */}
        <div className="h-1 bg-brand-gradient" aria-hidden="true"></div>

        {/* Content */}
        <div className="flex flex-grow flex-col p-5">
          {/* Quote icon */}
          <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-soft text-brand">
            <Quote size={16} aria-hidden="true" />
          </span>

          {/* Review Text with Show More/Show Less */}
          <div className="mb-3">
            <p className="text-xs leading-relaxed text-muted">
              “{displayText}”
            </p>
            {needsExpand && (
              <button
                type="button"
                onClick={() => toggleReviewExpand(cardIndex)}
                className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand transition-colors hover:text-iris"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={10} aria-hidden="true" /></>
                ) : (
                  <>Show More <ChevronDown size={10} aria-hidden="true" /></>
                )}
              </button>
            )}
          </div>

          {/* Rating Stars */}
          <div className="mb-3 flex gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                aria-hidden="true"
                className={`${
                  i < t.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-line"
                }`}
              />
            ))}
          </div>

          {/* User Info Section */}
          <div className="mt-auto flex items-center gap-2.5 border-t border-line pt-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white"
            >
              {initials(t.name)}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-bold text-navy">
                {t.name}
              </h4>
              <p className="truncate text-[10px] text-muted">{t.role}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-canvas py-16" aria-label="Student stories">
        <div className="flex items-center justify-center">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-softdeep border-t-brand"
            role="status"
            aria-label="Loading testimonials"
          ></div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="w-full bg-canvas py-16" aria-label="Student stories">
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-card">
          <p className="text-base font-bold text-navy">
            Student stories are on the way
          </p>
          <p className="mt-2 text-sm text-muted">
            Reviews submitted by students appear here automatically. Be among
            the first to share yours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full overflow-hidden bg-canvas py-12 md:py-16"
      aria-label="Student stories"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
            <Quote size={12} aria-hidden="true" />
            Success stories
          </span>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
            What our <span className="text-gradient">students say</span>
          </h2>

          <p className="text-sm leading-relaxed text-muted md:text-base">
            Verified reviews from students learning and building with Techneest
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-softdeep bg-white px-3 py-1">
            <Users size={12} className="text-brand" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-navy">
              {testimonials.length}+ success stories
            </span>
          </span>
        </motion.div>

        {/* Custom Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          {testimonials.length > itemsToShow && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonials"
                className="absolute left-0 top-1/2 z-10 rounded-full border border-line bg-white p-2 shadow-md transition-all duration-300 hover:bg-brand-gradient hover:text-white md:p-2.5"
                style={{ transform: 'translateY(-50%)' }}
              >
                <ChevronLeft size={18} className="text-navy" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonials"
                className="absolute right-0 top-1/2 z-10 rounded-full border border-line bg-white p-2 shadow-md transition-all duration-300 hover:bg-brand-gradient hover:text-white md:p-2.5"
                style={{ transform: 'translateY(-50%)' }}
              >
                <ChevronRight size={18} className="text-navy" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="mb-5 overflow-hidden px-6 md:px-8">
            <motion.div
              className={`grid gap-4 transition-all duration-500 ease-in-out ${
                itemsToShow === 4
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : itemsToShow === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((t, idx) => {
                  const globalIndex = startIndex + idx;
                  return (
                    <motion.div
                      key={`${startIndex}-${idx}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="h-full pb-4"
                    >
                      <CompactReviewCard t={t} cardIndex={globalIndex} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          {testimonials.length > itemsToShow && (
            <div className="mt-5 text-center">
              <p className="text-[10px] text-muted/70">
                {startIndex + 1} - {Math.min(startIndex + itemsToShow, testimonials.length)} of {testimonials.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
