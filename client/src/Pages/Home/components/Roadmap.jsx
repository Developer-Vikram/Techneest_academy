import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Code2,
  FolderKanban,
  Rocket,
  Target,
} from "lucide-react";

const Roadmap = () => {
  const steps = [
    {
      title: "Learn In-Demand Skills",
      desc: "Master industry-relevant concepts through expert-led training and practical lessons.",
      fullDesc:
        "Get hands-on training with industry experts. Learn the latest tools and technologies through live sessions and recorded lectures.",
      icon: BookOpen,
      duration: "4-6 weeks",
      skills: ["Web Development", "Digital Marketing"],
      outcome: "Build Strong Foundations",
      iconBg: "bg-gradient-to-r from-[#00C6FF] to-[#0072FF]",
    },
    {
      title: "Build Real Projects",
      desc: "Apply your knowledge by working on practical projects that simulate real-world scenarios.",
      fullDesc:
        "Build 5+ industry-grade projects that solve real problems. Get code reviews from mentors and improve your skills.",
      icon: Code2,
      duration: "6-8 weeks",
      skills: ["Live Projects", "Hands-On Practice"],
      outcome: "Portfolio Ready",
      iconBg: "bg-gradient-to-r from-[#0072FF] to-[#0F172A]",
    },
    {
      title: "Create Your Portfolio",
      desc: "Showcase your best work with a professional portfolio that highlights your skills and achievements.",
      fullDesc:
        "Build an impressive portfolio website that highlights your best projects. Learn to present your work professionally.",
      icon: FolderKanban,
      duration: "2-3 weeks",
      skills: ["Portfolio Website", "Case Studies"],
      outcome: "Stand out to employers",
      iconBg: "bg-gradient-to-r from-[#4F46E5] to-[#00C6FF]",
    },
    {
      title: "Start Freelancing Or Get Hired",
      desc: "Leverage your skills, portfolio, and certification to secure clients or land your dream job.",
      fullDesc:
        "Get placement assistance, interview preparation, and freelancing tips. Start earning within 2 months of completion.",
      icon: Rocket,
      duration: "Ongoing",
      skills: ["Interview Preparation", "Career Guidance"],
      outcome: "Start Your Career Journey",
      iconBg: "bg-gradient-to-r from-[#0F172A] to-[#0072FF]",
    },
  ];

  return (
    <section className="relative w-full bg-white py-4 md:py-8 overflow-hidden font-sans">
      {/* ================= BACKGROUND EFFECTS (from Code 1) ================= */}

      {/* 1. Background Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white pointer-events-none z-0"></div>

      {/* 2. Dotted Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* 3. Soft Colored Lights */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00C6FF]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0072FF]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Mini badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Target className="w-[14px] h-[14px] text-[#0072FF]" />
            <span className="text-xs font-semibold text-[#0072FF] uppercase tracking-wide">
              YOUR CAREER JOURNEY STARTS HERE
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">
            Your Path To{" "}
            <span className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] bg-clip-text text-transparent">
              Digital Success
            </span>
          </h2>

          <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">
            Follow a structured learning roadmap designed to help you gain
            valuable skills, build real projects, create a professional
            portfolio, and start your career with confidence.
            <span className="block text-sm text-[#0072FF] font-semibold mt-2">
              Step-By-Step Learning To Career Growth
            </span>
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative cursor-pointer"
                >
                  {/* Connector Line Desktop (with hover) */}
                  {index !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[28px] left-[85%] w-[32%] h-[2px] bg-gradient-to-r from-cyan-200 to-blue-200 z-0 transition-colors duration-500 group-hover:from-cyan-300 group-hover:to-blue-300"></div>
                  )}

                  <div
                    className="relative z-10 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-500 ease-out h-full flex flex-col
                                            group-hover:shadow-[0_25px_50px_-12px_rgba(0,114,255,0.25)]
                                            group-hover:-translate-y-2
                                            group-hover:border-blue-200
                                            overflow-hidden"
                  >
                    {/* Hover Shimmer (Top Light) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0072FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Inner subtle glow on hover */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Top: Icon + Step Number */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}
                      >
                        <Icon size={22} className="text-white" />
                      </div>

                      <div className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-[#0072FF] group-hover:border-blue-100 transition-colors duration-300">
                        Step {index + 1}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#0072FF] transition-colors duration-300 relative z-10">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow relative z-10 group-hover:text-gray-600 transition-colors">
                      {step.desc}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                      {step.skills.slice(0, 2).map((skill, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 bg-blue-50/50 border border-blue-100/50 rounded-md text-[#0072FF] group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom: Outcome + Duration */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto relative z-10 group-hover:border-blue-100 transition-colors">
                      <div className="flex items-center gap-1 text-[11px] text-[#0072FF] font-bold uppercase tracking-wide">
                        <Award className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                        {step.outcome}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
