import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import UserLayout from "../../Layouts/UserLayout";

import {
  Link,
} from "react-router-dom";

/* REDUX */
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAllCourses,
  resetCourse,
} from "../../redux/slices/courseSlice";

import {
  getAllCategories,
} from "../../redux/slices/categoryCourseSlice";

import { getPurchasesByUser } from "../../redux/slices/purchaseSlice";

/* ICONS */
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  ArrowRight,
  X,
  CheckCircle,
  Briefcase,
  Star,
} from "lucide-react";

/* Framer Motion */
import { motion } from "framer-motion";

/* CONTENT + SHARED */
import { COURSES_PAGE } from "../../Data/content";
import { COURSES_IMAGES, PAGE_HEADER_IMAGES } from "../../Data/images";
import PageHeader from "../../Components/PageHeader";
import SmartImage from "../../Components/SmartImage";

export default function Courses() {
  const dispatch = useDispatch();

  // =========================================
  // REDUX
  // =========================================

  const {
    courses = [],
    loading,
  } = useSelector(
    (state) =>
      state.courses
  );

  const {
    categories = [],
  } = useSelector(
    (state) =>
      state.categoryCourse
  );

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
  // STATES
  // =========================================

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const [
    visibleCourses,
    setVisibleCourses,
  ] = useState([]);

  const [page, setPage] =
    useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const loaderRef =
    useRef(null);

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    dispatch(
      resetCourse()
    );

    dispatch(
      getAllCourses()
    );

    dispatch(
      getAllCategories()
    );

    dispatch(getPurchasesByUser());
  }, [dispatch]);

  // =========================================
  // FILTER COURSES
  // =========================================

  const filteredCourses =
    useMemo(() => {
      if (
        !courses.length ||
        !categories.length
      )
        return [];

      return courses
        .filter((course) =>
          categories.some(
            (cat) =>
              cat._id ===
              course.category_id
          )
        )
        .filter((course) => {
          const category =
            categories.find(
              (cat) =>
                cat._id ===
                course.category_id
            );

          const matchesSearch =
            course.title
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          const matchesCategory =
            selectedCategory ===
            "all" ||
            category?._id ===
            selectedCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        });
    }, [
      courses,
      categories,
      searchTerm,
      selectedCategory,
    ]);

  // =========================================
  // LOAD MORE
  // =========================================

  useEffect(() => {
    setVisibleCourses(
      filteredCourses.slice(
        0,
        page * 6
      )
    );
  }, [
    filteredCourses,
    page,
  ]);

  // =========================================
  // RESET PAGINATION
  // =========================================

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selectedCategory,
  ]);

  // =========================================
  // INFINITE SCROLL
  // =========================================

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0]
              .isIntersecting &&
            !loadingMore &&
            visibleCourses.length <
            filteredCourses.length
          ) {
            setLoadingMore(
              true
            );

            setTimeout(() => {
              setPage(
                (prev) =>
                  prev + 1
              );

              setLoadingMore(
                false
              );
            }, 500);
          }
        },
        {
          threshold: 0.1,
        }
      );

    if (
      loaderRef.current
    ) {
      observer.observe(
        loaderRef.current
      );
    }

    return () =>
      observer.disconnect();
  }, [
    visibleCourses.length,
    filteredCourses.length,
    loadingMore,
  ]);

  return (
    <UserLayout>
      <div className="min-h-screen bg-canvas">

        {/* ========================================= */}
        {/* PAGE HEADER WITH IMAGE + BREADCRUMB */}
        {/* ========================================= */}

        <PageHeader
          image={PAGE_HEADER_IMAGES.courses}
          badge={COURSES_PAGE.badge}
          title={COURSES_PAGE.title}
          subtitle={COURSES_PAGE.subtitle}
          crumb={COURSES_PAGE.breadcrumb}
        />

        {/* ========================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================= */}

        <div className="mx-auto max-w-[95rem] px-4 py-8 sm:px-6 md:py-12 lg:px-8">

          {/* ========================================= */}
          {/* SEARCH + FILTER CHIPS */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 hidden rounded-2xl border border-line bg-white p-4 shadow-card md:block md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">

              {/* SEARCH */}
              <div className="relative flex-1">
                <label htmlFor="course-search" className="sr-only">
                  Search courses
                </label>
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  id="course-search"
                  type="text"
                  placeholder="Search by course name…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-line bg-canvas py-3 pl-10 pr-4 text-sm text-navy placeholder:text-muted/50 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                />
              </div>

              {/* CATEGORY CHIPS */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  aria-pressed={selectedCategory === "all"}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedCategory === "all"
                      ? "bg-brand-gradient text-white shadow-md shadow-brand/30"
                      : "border border-line bg-white text-muted hover:border-brand hover:text-brand"
                    }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    aria-pressed={selectedCategory === cat._id}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedCategory === cat._id
                        ? "bg-brand-gradient text-white shadow-md shadow-brand/30"
                        : "border border-line bg-white text-muted hover:border-brand hover:text-brand"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* MOBILE SEARCH */}
          {/* ========================================= */}

          <div className="mb-6 space-y-3 md:hidden">
            <div className="relative">
              <label htmlFor="course-search-mobile" className="sr-only">
                Search courses
              </label>
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50"
                size={18}
                aria-hidden="true"
              />
              <input
                id="course-search-mobile"
                type="text"
                placeholder="Search by course name…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm text-navy placeholder:text-muted/50 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              <Filter size={18} aria-hidden="true" /> Filter Courses
            </button>
          </div>

          {/* ========================================= */}
          {/* MOBILE FILTER MODAL */}
          {/* ========================================= */}

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                onClick={() => setIsFilterOpen(false)}
                aria-hidden="true"
              />
              <div
                role="dialog"
                aria-label="Filter courses"
                className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white"
              >
                <div className="sticky top-0 flex items-center justify-between border-b border-line bg-white p-4">
                  <h3 className="text-lg font-bold text-navy">Filter Courses</h3>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    aria-label="Close filters"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-navy"
                  >
                    <X size={22} />
                  </button>
                </div>
                <div className="space-y-3 p-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsFilterOpen(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left font-semibold transition-colors ${selectedCategory === "all"
                        ? "bg-brand-gradient text-white"
                        : "bg-canvas text-navy hover:bg-soft"
                      }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat._id}
                      onClick={() => {
                        setSelectedCategory(cat._id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full rounded-xl px-4 py-3 text-left font-semibold transition-colors ${selectedCategory === cat._id
                          ? "bg-brand-gradient text-white"
                          : "bg-canvas text-navy hover:bg-soft"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* RESULT COUNT */}
          {/* ========================================= */}

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted">
              Showing{" "}
              <span className="font-bold text-brand">
                {visibleCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-navy">
                {filteredCourses.length}
              </span>{" "}
              courses
            </p>
          </div>

          {/* ========================================= */}
          {/* LOADING — skeleton cards */}
          {/* ========================================= */}

          {(loading || purchasesLoading) && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                >
                  <div className="aspect-[16/10] animate-pulse bg-softdeep/60" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-softdeep/60" />
                    <div className="h-3 w-full animate-pulse rounded-full bg-soft/80" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-soft/80" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================= */}
          {/* NO COURSES */}
          {/* ========================================= */}

          {!loading && !purchasesLoading &&
            filteredCourses.length === 0 && (
              <div className="rounded-2xl border border-line bg-white py-20 text-center shadow-card">
                <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-soft text-brand">
                  <BookOpen size={30} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-navy">
                  Nothing matches that search
                </h3>
                <p className="text-sm text-muted">
                  Try a different keyword, or browse all courses.
                </p>
              </div>
            )}

          {/* ========================================= */}
          {/* COURSES GRID */}
          {/* ========================================= */}

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleCourses.map((item, index) => {
              const categoryName =
                categories.find((cat) => cat._id === item.category_id)?.name || "Course";
              const isPurchased = enrolledCourseIds.has(item._id);
              const hasRating = item.average_rating && Number(item.average_rating) > 0;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Link
                    to={`/course-info/${item._id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-softdeep hover:shadow-lift"
                  >
                    {/* IMAGE */}
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

                      {/* TITLE */}
                      <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-base font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                        {item.title}
                      </h3>

                      {/* SUMMARY */}
                      {item.short_description && (
                        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted">
                          {item.short_description}
                        </p>
                      )}

                      {/* META — real data only */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-muted">
                        {hasRating && (
                          <span className="inline-flex items-center gap-1">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
                            {Number(item.average_rating).toFixed(1)}
                            {item.review_count > 0 && ` (${item.review_count})`}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} aria-hidden="true" /> Lifetime access
                        </span>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-auto border-t border-line pt-4">
                        <div className="flex flex-col gap-4">

                          {/* PRICE */}
                          <div className="min-h-[2.75rem]">
                            {isPurchased ? (
                              <div className="flex w-full items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5">
                                <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
                                <span className="text-sm font-bold text-green-700">
                                  You're enrolled
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                {Number(item.price) === 0 ? (
                                  <p className="text-2xl font-extrabold text-brand">Free</p>
                                ) : (
                                  <>
                                    <p className="text-2xl font-extrabold text-navy">
                                      ₹{item.discount_price || item.price}
                                    </p>
                                    {item.discount_price && (
                                      <p className="text-sm text-muted/60 line-through">
                                        ₹{item.price}
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="min-h-[3rem]">
                            <span
                              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 ${isPurchased
                                  ? "bg-navy group-hover:bg-brand"
                                  : "bg-brand-gradient shadow-md shadow-brand/25"
                                }`}
                            >
                              {isPurchased ? "Continue Learning" : "View details"}
                              <ArrowRight
                                size={14}
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================= */}
          {/* LOAD MORE */}
          {/* ========================================= */}

          {loadingMore && (
            <div className="flex justify-center py-8">
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-softdeep border-t-brand"
                role="status"
                aria-label="Loading more courses"
              />
            </div>
          )}

          {/* Observer */}
          {visibleCourses.length < filteredCourses.length && !loadingMore && (
            <div ref={loaderRef} className="h-10"></div>
          )}

          {/* ========================================= */}
          {/* BOTTOM CTA */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mt-16 overflow-hidden rounded-2xl bg-navy px-6 py-12 text-center md:px-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-iris/30 blur-3xl"
            />

            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                {COURSES_PAGE.bottomCta.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 md:text-base">
                {COURSES_PAGE.bottomCta.subtitle}
              </p>
              <Link
                to={COURSES_PAGE.bottomCta.path}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/50"
              >
                {COURSES_PAGE.bottomCta.label}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
}
