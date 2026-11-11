import React, { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import SectionHeading from "../../../Components/SectionHeading";
import Lightbox from "../../../Components/Lightbox";
import { GALLERY } from "../../../Data/content";
import { GALLERY_IMAGES } from "../../../Data/images";

/* Bento spans per index (lg 12-col grid) */
const SPANS = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleImageError = (e) => {
    // Graceful gradient fallback if a remote image fails
    e.currentTarget.style.display = "none";
    e.currentTarget.parentElement.classList.add("img-fallback");
  };

  return (
    <section className="bg-canvas py-12 md:py-20" aria-label="Academy gallery">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={GALLERY.badge}
          title={GALLERY.title}
          highlight=""
          subtitle={GALLERY.subtitle}
        />

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-12 lg:auto-rows-[220px]">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 5) * 0.07 }}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Enlarge image: ${image.alt}`}
              className={`group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:ring-4 focus-visible:ring-brand/40 ${
                SPANS[index] || "lg:col-span-4"
              } ${index === 0 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onError={handleImageError}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* hover overlay */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* caption */}
              <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-4">
                <span className="text-left text-sm font-bold text-white drop-shadow">
                  {image.caption}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={14} aria-hidden="true" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default Gallery;
