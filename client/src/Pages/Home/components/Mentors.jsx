import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  Code2,
  Database,
  GraduationCap,
  Play,
  Server,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const navigate = useNavigate();

  const handleLearnClick = () => {
    navigate("/courses");
  };

  const mentor = {
    name: "Juli Thakur",
    role: "Full Stack Developer",
    company: "Techneest Academy",
    experience: "4+ years",
    students: "1200+",
    rating: 4.9,
    desc: "Learn modern Full Stack Development from frontend to backend, including responsive website development, APIs, databases, authentication systems, and deployment strategies used by professional developers.",
    fullDesc:
      "Build real-world web applications using industry-standard technologies and gain practical experience through hands-on projects that prepare you for freelance, startup, and corporate opportunities. Whether you're a beginner or aspiring developer, this course will help you develop the skills needed to create scalable and high-performing web applications.",
    image: "https://i.ibb.co/6RMVhNfT/Juli-1.jpg",
    expertise: [
      "Full Stack Development",
      "Node.js",
      "React.js",
      "MongoDB",
      "REST APIs",
      "Web App Development",
    ],
    features: [
      "Live Sessions",
      "Real-world Projects",
      "Career Guidance",
      "Portfolio Development",
      "Reviews & Mentorship",
    ],
    button: "Learn with Juli",
  };

  const stats = [
    { value: mentor.experience, label: "Experience" },
    { value: mentor.students, label: "Students Trained" },
    { value: mentor.rating, label: "Mentor Rating" },
  ];

  return (
    <section className="relative w-full bg-white py-14 md:py-20 overflow-hidden">
      {/* Background: soft blobs + dotted pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      ></div>
      <div className="pointer-events-none absolute top-10 right-0 w-80 h-80 bg-cyan-200/50 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl"></div>

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* IMAGE SIDE */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] px-3 sm:px-0">
              {/* Dashed decorative ring */}
              <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full border-2 border-dashed border-purple-300/70"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-2 border-dashed border-cyan-300/80"></div>

              {/* Tilted gradient backing */}
              <div className="absolute inset-0 rotate-[5deg] scale-[0.97] rounded-[2rem] bg-gradient-to-br from-purple-600 to-[#00C6FF] opacity-90"></div>
              <div className="absolute inset-0 -rotate-[3deg] scale-[0.97] rounded-[2rem] bg-white border border-gray-200 shadow-lg"></div>

              {/* Photo card */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl ring-1 ring-black/5">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>

                {/* Rating pill (top right, inside photo) */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full pl-2.5 pr-3 py-1.5 shadow-lg">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-900">
                    {mentor.rating}
                  </span>
                  <span className="text-[10px] text-gray-500">Rating</span>
                </div>

                {/* Bottom glass info bar */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base sm:text-lg">
                      {mentor.name}
                    </h4>
                    <BadgeCheck size={17} className="text-cyan-300" />
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">
                    {mentor.role} · {mentor.company}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-white/90">
                    <span className="font-semibold">
                      {mentor.students} Students
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/60"></span>
                    <span className="font-semibold">
                      {mentor.experience} Exp.
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating tech chips */}
              <div className="absolute top-14 -left-2 sm:-left-8 flex items-center gap-2 bg-white rounded-xl shadow-xl border border-gray-100 px-3 py-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Code2 size={15} className="text-cyan-600" />
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  React.js
                </span>
              </div>

              <div className="absolute top-1/2 -right-2 sm:-right-8 flex items-center gap-2 bg-white rounded-xl shadow-xl border border-gray-100 px-3 py-2">
                <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                  <Server size={15} className="text-green-600" />
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  Node.js
                </span>
              </div>

              <div className="absolute bottom-36 -left-2 sm:-left-8 flex items-center gap-2 bg-white rounded-xl shadow-xl border border-gray-100 px-3 py-2">
                <span className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Database size={15} className="text-purple-600" />
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  MongoDB
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-5">
              <GraduationCap size={14} className="text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                Learn from Industry Experts
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.15]">
              Master Full Stack Development with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-[#00C6FF] bg-clip-text text-transparent">
                {mentor.name}
              </span>
            </h2>

            <p className="mt-5 text-gray-600 text-sm md:text-base leading-relaxed">
              {mentor.desc}
            </p>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed hidden md:block">
              {mentor.fullDesc}
            </p>

            {/* Inline stats */}
            <div className="mt-7 flex items-stretch divide-x divide-gray-200">
              {stats.map((stat, i) => (
                <div key={i} className={`flex-1 ${i === 0 ? "pr-4" : "px-4"}`}>
                  <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-[#00C6FF] bg-clip-text text-transparent leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Expertise */}
            <div className="mt-7">
              <p className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                <Award size={14} className="text-purple-600" />
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:border-purple-300 hover:text-purple-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* What you get */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {mentor.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-[#00C6FF] flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={handleLearnClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-[#00C6FF] text-white font-semibold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base"
              >
                <Play size={16} className="fill-white" />
                {mentor.button}
              </button>

              <button
                onClick={handleLearnClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-gray-800 font-semibold text-sm md:text-base hover:text-purple-600 transition-colors"
              >
                Explore all courses
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
