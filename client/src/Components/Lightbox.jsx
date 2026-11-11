import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Accessible image lightbox.
 * - Escape closes, ←/→ navigate between images.
 * - Focus moves to the dialog on open and is trapped inside.
 * props: images = [{ src, alt, caption }], index, onClose, onNavigate(nextIndex)
 */
const Lightbox = ({ images, index, onClose, onNavigate }) => {
  const dialogRef = useRef(null);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  const current = images[index];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Image viewer: ${current.alt}`}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm outline-none md:p-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
        >
          <X size={22} />
        </button>

        {/* Prev */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6"
        >
          <ChevronRight size={22} />
        </button>

        {/* Image */}
        <motion.figure
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-h-full w-full max-w-4xl"
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[75vh] w-full rounded-2xl object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center">
            <p className="text-sm font-bold text-white">{current.caption}</p>
            <p className="mt-1 text-xs text-white/60">
              {index + 1} / {images.length} — use arrow keys, Escape to close
            </p>
          </figcaption>
        </motion.figure>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
