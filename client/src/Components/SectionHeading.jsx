import React from "react";

/**
 * Shared section heading used across all public pages.
 * badge    — small pill label above the title (optional)
 * title    — main heading (navy)
 * highlight — part of the title rendered with the brand gradient (optional)
 * subtitle — supporting paragraph (muted, optional)
 * align    — "center" (default) or "left"
 * light    — set true on navy/dark backgrounds
 */
const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  light = false,
}) => {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {badge && (
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
            light ? "bg-white/10 text-white" : "bg-soft text-brand"
          }`}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
            aria-hidden="true"
          />
          {badge}
        </span>
      )}

      <h2
        className={`text-3xl font-extrabold leading-tight tracking-tight md:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}{" "}
        {highlight && (
          <span className={light ? "text-aqua" : "text-gradient"}>
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-base leading-relaxed md:text-lg ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
