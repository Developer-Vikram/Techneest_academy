import { GraduationCap, Presentation, TrendingUp, Users } from "lucide-react";
import CountUp from "../../../Components/CountUp";
import SmartImage from "../../../Components/SmartImage";
import { INTERNSHIP_IMAGES } from "../../../Data/images";

/* Real academy numbers — restored from the original FunFact section. */
const STATS = [
  { icon: Users, value: 1525, suffix: "+", label: "Students enrolled" },
  { icon: Presentation, value: 1050, suffix: "+", label: "Classes completed" },
  { icon: TrendingUp, value: 800, suffix: "+", label: "Learners report" },
  { icon: GraduationCap, value: 10, suffix: "+", label: "Top instructors" },
];

export default function FunFact() {
  return (
    <section
      aria-label="Academy statistics"
      className="relative overflow-hidden bg-navy py-14 md:py-20"
    >
      {/* brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-iris/25 blur-[110px]"
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-25 blur-xl"
            />
            <SmartImage
              src={INTERNSHIP_IMAGES.teamwork}
              alt="Techneest students collaborating on a real team project"
              ratioClass="aspect-[4/3] rounded-2xl ring-1 ring-white/15"
              className="relative shadow-2xl"
            />
          </div>

          {/* COUNTERS */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden="true" />
              Techneest by the numbers
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Real students. Real classes.{" "}
              <span className="text-gradient">Real momentum.</span>
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-aqua/40 md:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <stat.icon size={18} aria-hidden="true" />
                  </span>
                  <p className="mt-4 bg-brand-gradient bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
