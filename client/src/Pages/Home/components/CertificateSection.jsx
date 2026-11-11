import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Download,
  ShieldCheck,
} from "lucide-react";

// APNI PDF YAHAN IMPORT KARO
import SampleCertificate from "../../../assets/certificatePDF.pdf"; // <-- APNI PDF KA PATH DALO
import SmartImage from "../../../Components/SmartImage";
import { CERTIFICATE_IMAGES } from "../../../Data/images";

const CertificateSection = () => {
  // PDF DOWNLOAD FUNCTION
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = SampleCertificate;
    link.download = "Techneest_Academy_Certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const features = [
    {
      icon: BadgeCheck,
      title: "Recognised achievement",
      description:
        "An official Techneest certificate that validates your skills, projects and commitment — issued when you complete your course requirements.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Career & freelance ready",
      description:
        "Backed by deployed projects and internship experience, it strengthens your résumé, portfolio and professional profile.",
    },
    {
      icon: ShieldCheck,
      title: "Proof of practical work",
      description:
        "Employers see evidence of hands-on training — code you wrote, products you shipped, reviews you passed.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-canvas py-12 md:py-20"
      aria-label="Certification"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-softdeep/70 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-softdeep bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
              <Award size={14} aria-hidden="true" />
              Certification with substance
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
              A certificate that means{" "}
              <span className="text-gradient">you built something</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Every Techneest graduate leaves with more than a PDF — you leave
              with live projects, reviewed code and an internship record. The
              certificate is the cover page of that story.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-5">
              {features.map((feature) => (
                <div key={feature.title} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-card transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <feature.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BUTTON - PDF DOWNLOAD */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gradient hover:shadow-xl"
            >
              <Download size={18} aria-hidden="true" />
              Preview a sample certificate (PDF)
            </button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              {/* glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-2xl"
              />

              {/* CERTIFICATE PREVIEW CARD */}
              <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-2xl">
                <img
                  src="https://i.ibb.co/wNLSTbRD/certificate-ssss-jpg.jpg"
                  alt="Sample Techneest Academy certificate of completion"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.outerHTML =
                      '<div class="img-fallback aspect-[4/3] rounded-xl" role="img" aria-label="Certificate preview"></div>';
                  }}
                  className="w-full rounded-xl object-cover"
                />
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                  <Award size={12} aria-hidden="true" /> Sample certificate
                </span>
              </div>

              {/* celebration photo */}
              <div className="relative mt-4 w-44 sm:w-56">
                <SmartImage
                  src={CERTIFICATE_IMAGES.celebration}
                  alt="Student celebrating after completing a course"
                  ratioClass="aspect-[4/3] rounded-2xl ring-4 ring-white"
                  className="shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
