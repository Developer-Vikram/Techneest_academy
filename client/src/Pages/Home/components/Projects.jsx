import React, { useState, useRef } from 'react'
import { ExternalLink, Eye, Briefcase, Award, TrendingUp, Star, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Projects = () => {
    const projects = [
        {
            title: "Travel Website Development",
            desc: "Modern responsive frontend interfaces with premium UI/UX experience.",
            image: "https://i.ibb.co/DP1rk7KR/img1-jpg.jpg",
            category: "Full Stack",
            link: "https://www.yorkerindia.com/",
            tech: ["React", "Tailwind CSS", "JavaScript"],
            outcome: "Boosted travel inquiries & online bookings 180%",
            student: {
                name: "Anil Yadav",
                image: "https://i.ibb.co/dJDW12Hs/anil-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 45,
                rating: 5,
                enrolledDate: "2024-01-15"
            }
        },
        {
            title: "Backend Oriented Devtool",
            desc: "A backend-oriented developer tool that streamlines API management, automation, data processing, and system monitoring for efficient development workflows.",
            image: "https://i.ibb.co/SwPkGJ2m/image-2-jpg.jpg",
            category: "Backend",
            tech: ["Node.js", "PostgreSQL", "Express.js"],
            link: "https://www.devxnexus.com/",
            outcome: "Accelerating API testing by 76%",
            student: {
                name: "Aalok Kumar",
                image: "https://i.ibb.co/RGg6Pg3J/alok-jpg.jpg",
                role: "Backend Engineer",
                daysToComplete: 60,
                rating: 5,
                enrolledDate: "2024-01-10"
            }
        },
        {
            title: "Flights Booking Website With Real API",
            desc: "A flight booking platform integrated with real-time APIs for searching, comparing, and booking flights with live pricing and availability.",
            image: "https://i.ibb.co/Hf254hq7/image-3-jpg.jpg",
            category: "API Handling",
            tech: ["React.js", "Amadeus API", "Duffel API", "Razorpay", "Node Js", "Tailwind"],
            link: "https://chipo.air.allindemo.site/",
            outcome: "Generated 3x ROI within 90 days",
            student: {
                name: "Vikram Thakur",
                image: "https://i.ibb.co/3yv9p7Ty/vikram-jpg.jpg",
                role: "Full Stack Developer",
                daysToComplete: 75,
                rating: 5,
                enrolledDate: "2024-01-05"
            }
        },
        {
            title: "Real Estate Full Stack Project",
            desc: "A full-stack real estate platform for listing, searching, managing, and connecting buyers, sellers, and agents through a seamless property marketplace.",
            image: "https://i.ibb.co/PzC9vQ8w/image-4-jpg.jpg",
            category: "Design & Development",
            tech: ["React", "CSS", "Node.js", "MongoDB"],
            link: "https://mninfratech.com/",
            outcome: "Increased Client engagement by 120%",
            student: {
                name: "Aayush Kumar",
                image: "https://i.ibb.co/zhNJRXGB/IMG-20260613-180630-jpg.jpg",
                role: "UI/UX Developer",
                daysToComplete: 30,
                rating: 5,
                enrolledDate: "2024-02-01"
            }
        },
        {
            title: "Healthcare Portal",
            desc: "A modern hospital management website that enables patients to book appointments, access healthcare services, and connect with medical professionals seamlessly.",
            image: "https://i.ibb.co/cSwjG7pv/Screenshot-2026-06-12-at-2-13-43-PM.png",
            category: "Full Stack",
            tech: ["MERN", "Socket.io", "JWT", "Tailwind"],
            link: "https://example.com/learning-platform",
            outcome: "Seamless appointment booking and patient management",
            student: {
                name: "Taushif Raza",
                image: "https://i.ibb.co/W4yrGQH7/tausif-jpg.jpg",
                role: "MERN Stack Developer",
                daysToComplete: 90,
                rating: 5,
                enrolledDate: "2024-01-20"
            }
        },
        {
            title: "QUICKBITE food delivery",
            desc: "A fast and user-friendly food delivery platform for discovering restaurants, ordering meals, and tracking deliveries in real time.",
            image: "https://i.ibb.co/wrPY9rZB/image-5-jpg.jpg",
            category: "Frontend",
            tech: ["React", "Tailwind", "CSS",],
            link: "https://quickbite.allindemo.site/",
            outcome: "30+ restaurants onboarded",
            student: {
                name: "Sangeeta Kashyap",
                image: "https://i.ibb.co/yn5bW4N5/sangeeta-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 85,
                rating: 5,
                enrolledDate: "2024-01-12"
            }
        },
        {
            title: "Data Scrapping Tool",
            desc: "A powerful data scraping platform that extracts, filters, and exports business data from multiple sources with automated processing and Google Sheets integration.",
            image: "https://i.ibb.co/LXw40YsZ/image-6-jpg.jpg",
            category: "Data Mining",
            tech: ["Google Map API", "N8N", "Node.js", "MongoDB", "Razorpay"],
            link: "https://scrapper.allindemo.site/",
            outcome: "Reduced manual lead generation time by 90%",
            student: {
                name: "Naushad",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
                role: "React Native Developer",
                daysToComplete: 70,
                rating: 5,
                enrolledDate: "2024-01-25"
            }
        },
        {
            title: "Delhi Metro Route Planner",
            desc: "Travel Delhi Seamlessly with Smart Route Planning",
            image: "https://i.ibb.co/8nf6g6BQ/image-7-jpg.jpg",
            category: "Web Application",
            tech: ["React.js", "Node.js", "MongoDB", "Google Maps API", "Tailwind CSS"],
            link: "https://mydelhimetro.in/",
            outcome: "Find optimal routes with fare Faster and Smoother",
            student: {
                name: "Vishal Rai",
                image: "https://i.ibb.co/4ZZDWsQM/visal-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 40,
                rating: 5,
                enrolledDate: "2024-02-10"
            }
        }
    ]

    const [, setHoveredIndex] = useState(null)
    const swiperRef = useRef(null)

    // Function to format days
    const formatDays = (days) => {
        if (days === 1) return `${days} day`
        return `${days} days`
    }

    // Function to get completion badge color based on days
    const getCompletionColor = (days) => {
        if (days <= 30) return 'bg-green-100 text-green-700'
        if (days <= 60) return 'bg-blue-100 text-blue-700'
        if (days <= 90) return 'bg-purple-100 text-purple-700'
        return 'bg-orange-100 text-orange-700'
    }

    // Function to get completion icon based on days
    const getCompletionIcon = (days) => {
        if (days <= 30) return <Award size={12} />
        if (days <= 60) return <TrendingUp size={12} />
        if (days <= 90) return <Clock size={12} />
        return <Calendar size={12} />
    }

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev()
        }
    }

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext()
        }
    }

    return (
        <section className="w-full overflow-hidden bg-white py-12 md:py-20">
            <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                        <Briefcase size={14} aria-hidden="true" />
                        Student success showcase
                    </span>

                    <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
                        Live projects built by{' '}
                        <span className="text-gradient">our students</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                        Real products, real users, real deployments — designed and
                        developed by Techneest students during their hands-on
                        training and portfolio-building journey.
                    </p>
                </div>

                {/* Projects Swiper Carousel */}
                <div className="relative px-0 md:px-12">
                    {/* Custom Navigation Buttons */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-white p-3 shadow-lg transition-all duration-300 hover:bg-brand-gradient hover:text-white md:-left-6"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={22} className="text-navy group-hover:text-white transition-colors" />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-white p-3 shadow-lg transition-all duration-300 hover:bg-brand-gradient hover:text-white md:-right-6"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={22} className="text-navy transition-colors" />
                    </button>

                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: '.swiper-pagination-custom'
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        className="projects-swiper"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-softdeep hover:shadow-lift"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Image Container */}
                                    <div className="relative flex-shrink-0 overflow-hidden">
                                        <div className="aspect-[16/10] w-full bg-soft">
                                            <img
                                                src={project.image}
                                                alt={`${project.title} — built by ${project.student.name}`}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                }}
                                            />
                                        </div>
                                        {/* Gradient Overlay */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        {/* Category Badge */}
                                        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-md backdrop-blur-sm">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-grow flex-col p-5">
                                        {/* Student Info Section */}
                                        <div className="mb-3 flex items-center gap-3 border-b border-line pb-3">
                                            <img
                                                src={project.student.image}
                                                alt={project.student.name}
                                                className="h-11 w-11 flex-shrink-0 rounded-full border-2 border-softdeep object-cover"
                                                loading="lazy"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate text-sm font-bold text-navy">
                                                    {project.student.name}
                                                </h4>
                                                <p className="truncate text-xs text-muted">{project.student.role}</p>
                                            </div>
                                            <div className="flex flex-shrink-0 gap-0.5" aria-label="Rated 5 out of 5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-navy transition-colors group-hover:text-brand">
                                            {project.title}
                                        </h3>

                                        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted">
                                            {project.desc}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="mb-3 flex flex-wrap gap-1.5">
                                            {project.tech.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-navy">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-semibold text-brand">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Result Badge */}
                                        <div className='mb-3 flex flex-col gap-2'>
                                            <span className="flex w-fit items-center gap-1.5 rounded-lg bg-green-50 px-2 py-1.5 text-xs font-semibold text-green-600">
                                                <TrendingUp size={12} aria-hidden="true" />
                                                <span>{project.outcome}</span>
                                            </span>

                                            <span className={`${getCompletionColor(project.student.daysToComplete)} flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold shadow-sm`}>
                                                {getCompletionIcon(project.student.daysToComplete)}
                                                <span>Completed in {formatDays(project.student.daysToComplete)}</span>
                                            </span>
                                        </div>

                                        {/* CTA Button */}
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                                            <span className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-navy py-2.5 text-sm font-bold text-white transition-all duration-300 group-hover:bg-brand-gradient">
                                                <Eye size={16} aria-hidden="true" />
                                                <span>View Project</span>
                                                <ExternalLink size={14} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom mt-8 flex justify-center gap-2"></div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 text-center">
                    <p className="mb-4 text-sm text-muted md:text-base">
                        Want to build projects like these and showcase them in your portfolio?
                    </p>
                    <Link to="/courses">
                        <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-navy px-8 py-3 text-sm font-bold text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-lg">
                            Start Your First Project Today
                            <ExternalLink size={16} aria-hidden="true" />
                        </span>
                    </Link>
                </div>

            </div>

            {/* Custom CSS for Swiper */}
            <style>{`
                .projects-swiper {
                    padding: 10px 0 !important;
                }

                .projects-swiper .swiper-slide {
                    height: auto;
                }

                .swiper-pagination-custom .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: #D9E4FF;
                    opacity: 1;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .swiper-pagination-custom .swiper-pagination-bullet-active {
                    background: linear-gradient(90deg, #22D3EE, #1D6BFF);
                    width: 24px;
                    border-radius: 4px;
                }

                @media (max-width: 768px) {
                    .projects-swiper {
                        padding: 5px 0 !important;
                    }
                }
            `}</style>
        </section>
    )
}

export default Projects
