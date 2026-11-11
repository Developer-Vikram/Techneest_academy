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
    <section
      className="relative w-full overflow-hidden bg-canvas py-14 md:py-20"
      aria-label="Mentors"
    >
      {/* Background: dotted pattern + brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#E3E8F5 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      ></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-aqua/20 blur-3xl"
      ></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-iris/15 blur-3xl"
      ></div>

      <div className="relative mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* SECTION INTRO — mentorship paragraph */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
            <GraduationCap size={14} aria-hidden="true" />
            Mentorship at Techneest
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
            You never learn <span className="text-gradient">alone</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Videos can teach syntax; only a developer can teach judgement.
            Techneest mentors review your code, run live doubt-solving sessions
            and guide your internship work — the same professional feedback loop
            real engineering teams run every day.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE SIDE */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-[340px] px-3 sm:max-w-[400px] sm:px-0 lg:max-w-[430px]">
              {/* Dashed decorative rings */}
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-44 w-44 rounded-full border-2 border-dashed border-softdeep"
              ></div>
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border-2 border-dashed border-aqua/60"
              ></div>

              {/* Tilted gradient backing */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rotate-[5deg] scale-[0.97] rounded-[2rem] bg-brand-gradient opacity-90"
              ></div>
              <div
                aria-hidden="true"
                className="absolute inset-0 -rotate-[3deg] scale-[0.97] rounded-[2rem] border border-line bg-white shadow-lg"
              ></div>

              {/* Photo card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-soft shadow-2xl ring-1 ring-navy/5">
                <img
                  src={mentor.image}
                  alt={`${mentor.name}, ${mentor.role} at ${mentor.company}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent"
                ></div>

                {/* Rating pill */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 py-1.5 pl-2.5 pr-3 shadow-lg backdrop-blur-md">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-navy">
                    {mentor.rating}
                  </span>
                  <span className="text-[10px] text-muted">Rating</span>
                </div>

                {/* Bottom glass info bar */}
                <div className="glass absolute bottom-3 left-3 right-3 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {mentor.name}
                    </h3>
                    <BadgeCheck size={17} className="text-aqua" aria-hidden="true" />
                  </div>
                  <p className="mt-0.5 text-xs text-white/80">
                    {mentor.role} · {mentor.company}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-white/90">
                    <span className="font-semibold">
                      {mentor.students} Students
                    </span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/60"></span>
                    <span className="font-semibold">
                      {mentor.experience} Exp.
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating tech chips */}
              <div className="absolute -left-2 top-14 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-xl sm:-left-8">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-soft">
                  <Code2 size={15} className="text-brand" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-navy">React.js</span>
              </div>

              <div className="absolute -right-2 top-1/2 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-xl sm:-right-8">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50">
                  <Server size={15} className="text-green-600" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-navy">Node.js</span>
              </div>

              <div className="absolute -left-2 bottom-36 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-xl sm:-left-8">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-soft">
                  <Database size={15} className="text-iris" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-navy">MongoDB</span>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="order-2 mt-8 lg:order-1 lg:mt-0">
            <h3 className="text-3xl font-extrabold leading-[1.15] text-navy sm:text-4xl xl:text-5xl">
              Master web development with{" "}
              <span className="text-gradient">{mentor.name}</span>
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              {mentor.desc}
            </p>
            <p className="mt-3 hidden text-sm leading-relaxed text-muted md:block">
              {mentor.fullDesc}
            </p>

            {/* Inline stats */}
            <div className="mt-7 flex items-stretch divide-x divide-line">
              {stats.map((stat, i) => (
                <div key={i} className={`flex-1 ${i === 0 ? "pr-4" : "px-4"}`}>
                  <p className="bg-brand-gradient bg-clip-text text-2xl font-extrabold leading-none text-transparent md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] text-muted md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Expertise */}
            <div className="mt-7">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                <Award size={14} className="text-brand" aria-hidden="true" />
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-navy shadow-sm transition-colors hover:border-brand hover:text-brand sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* What you get */}
            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {mentor.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-navy">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                    <Check size={12} className="text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleLearnClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-iris/40 md:text-base sm:w-auto"
              >
                <Play size={16} className="fill-white" aria-hidden="true" />
                {mentor.button}
              </button>

              <button
                type="button"
                onClick={handleLearnClick}
                className="group inline-flex w-full items-center justify-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-navy transition-colors hover:text-brand md:text-base sm:w-auto"
              >
                Explore all courses
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
