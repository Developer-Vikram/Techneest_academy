import { CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import AnimatedButton from "../../../Components/AnimatedButton";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getCoursesByCategoryId,
} from "../../../redux/slices/categoryCourseSlice";

import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Skills = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  // =========================================
  // REDUX STATE
  // =========================================

  const { categories = [], loadingCategories } = useSelector(
    (state) => state.categoryCourse,
  );

  // =========================================
  // FETCH CATEGORIES
  // =========================================

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // =========================================
  // HANDLE CLICK
  // =========================================

  const handleCategoryClick = (id) => {
    dispatch(getCoursesByCategoryId(id));
  };

  // =========================================
  // 3D TILT LOGIC
  // =========================================
  const cardRefs = useRef([]);
  const [tilt, setTilt] = useState({});

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt((prev) => ({
      ...prev,
      [index]: { rotateX, rotateY, x, y },
    }));
  };

  const handleMouseLeave = (index) => {
    setTilt((prev) => ({
      ...prev,
      [index]: { rotateX: 0, rotateY: 0, x: 0, y: 0 },
    }));
  };

  // =========================================
  // CARD - REDUX DATA + NEW THEME
  // =========================================
  const CategoryCard = ({ category, index = 0, enableTilt = false }) => {
    const tiltData = tilt[index] || { rotateX: 0, rotateY: 0, x: 0, y: 0 };

    return (
      <div
        ref={enableTilt ? (el) => (cardRefs.current[index] = el) : undefined}
        onMouseMove={enableTilt ? (e) => handleMouseMove(e, index) : undefined}
        onMouseLeave={enableTilt ? () => handleMouseLeave(index) : undefined}
        className="custom-skill-card p-5 md:p-6 h-full flex flex-col mb-4"
        style={
          enableTilt
            ? {
                transform: `perspective(1000px) rotateX(${tiltData.rotateX}deg) rotateY(${tiltData.rotateY}deg)`,
              }
            : undefined
        }
      >
        {/* Image + Courses Count */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
            <img
              src={
                category.image ||
                "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg"
              }
              alt={category.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg";
              }}
            />
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 text-center flex flex-col justify-center min-w-[80px]">
            <p className="text-[10px] text-gray-500 font-medium mb-0.5">
              Courses
            </p>
            <p className="text-xs font-bold text-gray-900 leading-none">
              {category.totalCourses > 0
                ? `${category.totalCourses}+`
                : "Coming Soon"}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {category.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">
          {category.desc ||
            "Master industry-ready practical skills with real-world projects."}
        </p>

        {/* Full Description */}
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {category.fulldesc ||
            "Premium learning experience designed for career growth."}
        </p>

        {/* Course Titles */}
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {category?.courses?.length > 0
            ? category.courses
                .slice(0, 2)
                .map((course) => course.title)
                .join(" • ")
            : "Premium Courses Available"}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1 bg-[#eff6ff] text-[#0066ff] text-[12px] px-2.5 py-1 rounded-md font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff]" />
            Industry Ready
          </span>
          <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#16a34a] text-[12px] px-2.5 py-1 rounded-md font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />
            High Demand
          </span>
        </div>

        {/* Button - Always at bottom */}
        <div className="mt-auto">
          <Link
            to={`/courses/${category._id}`}
            onClick={() => handleCategoryClick(category._id)}
            className="block w-full"
          >
            <AnimatedButton text="Explore Program" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
                /* Clean Card - no hover effects */
                .custom-skill-card {
                    background: #ffffff;
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid #f1f5f9;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    transform-style: preserve-3d;
                    will-change: transform;
                    transition: transform 0.15s ease-out;
                }

                /* Static gradient top bar */
                .custom-skill-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 5px;
                    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6);
                    background-size: 300% 100%;
                    z-index: 6;
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                .sparkle {
                    animation: twinkle 3s infinite ease-in-out;
                }

                .skills-swiper {
                    padding-bottom: 0 !important;
                }
                .skills-swiper .swiper-pagination {
                    display: none;
                }
                .skills-swiper .swiper-slide {
                    height: auto !important;
                }
            `}</style>

      <section
        className="w-full relative overflow-hidden py-2 md:py-6"
        style={{
          background: `
                        linear-gradient(180deg, #eaf2fb 0%, #f0f6fc 30%, #f7fafd 65%, #ffffff 100%),
                        radial-gradient(ellipse 120% 20% at 20% 35%, transparent 55%, rgba(255,255,255,0.5) 56%, transparent 58%),
                        radial-gradient(ellipse 130% 25% at 60% 50%, transparent 55%, rgba(255,255,255,0.6) 56%, transparent 58%),
                        radial-gradient(ellipse 140% 20% at 90% 30%, transparent 55%, rgba(255,255,255,0.45) 56%, transparent 58%),
                        radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 20%),
                        radial-gradient(circle at 80% 40%, rgba(255,255,255,0.3) 0%, transparent 25%)
                    `,
        }}
      >
        {/* Hex grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%233b82f6' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Sparkle dots */}
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-blue-300/60 rounded-full sparkle" />
        <div
          className="absolute top-[15%] left-[30%] w-2 h-2 bg-blue-300/50 rounded-full sparkle"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-[8%] right-[20%] w-1.5 h-1.5 bg-blue-300/60 rounded-full sparkle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[25%] right-[10%] w-2 h-2 bg-blue-300/50 rounded-full sparkle"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-[30%] left-[40%] w-1 h-1 bg-blue-300/60 rounded-full sparkle"
          style={{ animationDelay: "0.2s" }}
        />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <Zap className="w-[14px] h-[14px] text-blue-600 fill-blue-600/20" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                CAREER-FOCUSED COURSES
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Master Job-Ready{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">
                Digital Skills
              </span>{" "}
              For The Future
            </h2>

            <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Learn Web Development, Digital Marketing, Graphic Design, Video
              Editing, AI Tools, and other in-demand skills through practical
              projects and industry-focused training.
            </p>
          </div>

          {/* LOADER */}
          {loadingCategories && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* EMPTY */}
          {!loadingCategories && categories?.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-800">
                No Categories Found
              </h3>
              <p className="text-gray-500 mt-2">Please check back later.</p>
            </div>
          )}

          {/* CARDS */}
          {!loadingCategories && categories?.length > 0 && (
            <>
              {/* Desktop Swiper */}
              <div
                className="hidden md:block mt-8"
                style={{ perspective: "1200px" }}
              >
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                  navigation={false}
                  pagination={{ clickable: true }}
                  className="skills-swiper"
                >
                  {categories.map((category, index) => (
                    <SwiperSlide key={category._id} className="mb-3">
                      <CategoryCard
                        category={category}
                        index={index}
                        enableTilt={true}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => swiperRef.current?.swiper?.slidePrev()}
                    className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center text-blue-600 border border-gray-200"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => swiperRef.current?.swiper?.slideNext()}
                    className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center text-blue-600 border border-gray-200"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Mobile Grid */}
              <div className="block md:hidden mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={category._id}
                      category={category}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;
