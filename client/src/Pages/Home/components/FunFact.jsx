import {
  GraduationCap,
  Presentation,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";
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
      className="relative overflow-hidden bg-canvas py-16 md:py-24"
    >
      {/* top brand hairline (hero se clean separation) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand-gradient"
      />

      {/* soft brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-aqua/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-iris/15 blur-[110px]"
      />

      {/* subtle dotted pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#C9D6F5 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* COUNTERS */}
          <div className="order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand shadow-card">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
                aria-hidden="true"
              />
              Techneest by the numbers
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
              Real students. Real classes.{" "}
              <span className="text-gradient">Real momentum.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Hamari growth ka proof hamare students hain — live classes, mentor
              support aur internship ke saath har din aage badhte hue.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift sm:p-5 md:p-6"
                >
                  {/* top accent line on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100"
                  />

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-brand transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white sm:h-11 sm:w-11">
                    <stat.icon size={20} aria-hidden="true" />
                  </span>

                  <p className="mt-4 bg-brand-gradient bg-clip-text text-3xl font-extrabold leading-none text-transparent sm:text-4xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-semibold text-navy/70 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative order-2 mx-auto w-full max-w-xl lg:max-w-none">
            {/* offset gradient frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-[1.75rem] bg-brand-gradient-r opacity-90 sm:-bottom-4 sm:-right-4"
            />
            {/* dotted accent */}
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-2xl border-2 border-dashed border-brand/30 sm:block"
            />

            <SmartImage
              src={INTERNSHIP_IMAGES.teamwork}
              alt="Techneest students collaborating on a real team project"
              ratioClass="aspect-[4/3] rounded-[1.5rem] ring-4 ring-white"
              className="relative shadow-2xl"
            />

            {/* floating badge */}
            <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift sm:-bottom-6 sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Rocket size={18} aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-navy">
                  Project-based learning
                </p>
                <p className="text-xs text-muted">Internship included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
