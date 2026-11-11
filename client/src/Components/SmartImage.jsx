import { useEffect, useState } from "react";

/**
 * Image with a graceful gradient fallback.
 * - `ratioClass` keeps a stable aspect ratio to avoid layout shift
 *   (e.g. "aspect-[16/9]", "aspect-[4/5]").
 * - onError swaps to a brand-gradient block (`.img-fallback`).
 * - First (hero) images pass loading="eager"; everything else is lazy.
 */
const SmartImage = ({
  src,
  alt,
  ratioClass = "",
  imgClassName = "",
  className = "",
  loading = "lazy",
  fetchPriority,
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`img-fallback ${ratioClass} ${className}`}
      />
    );
  }

  return (
    <div className={`overflow-hidden ${ratioClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
};

export default SmartImage;
