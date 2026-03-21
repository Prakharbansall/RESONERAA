import React from "react";

/**
 * CTAButton - Radiant Rose design system
 *
 * Variants:
 *   "primary"  - filled rose, white label  (main actions)
 *   "outline"  - rose border + label, transparent fill  (secondary actions)
 *   "ghost"    - no border, rose label  (tertiary / inline actions)
 *
 * Props:
 *   children, variant, href, onClick, className, size ("md" | "lg")
 */
export default function CTAButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "md",
}) {
  const Tag = href ? "a" : "button";

  return (
    <>
      <Tag
        href={href}
        onClick={onClick}
        className={`cta ${variant} ${size} ${className}`}
      >
        <span className="cta-label">{children}</span>
        <span className="cta-arrow" aria-hidden="true">
          {/* Inline SVG arrow - scales cleanly at any font size */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Tag>

      <style>{`
        /* ── Tokens (inherit from global sheet or override here) ── */
        .cta {
          --rose-500:   #e8294c;
          --rose-600:   #c41f3e;
          --rose-50:    #fff5f7;
          --rose-100:   #ffe4ea;
          --rose-200:   #ffc1cc;

          /* component-level */
          display:        inline-flex;
          align-items:    center;
          gap:            8px;
          border-radius:  10px;
          font-family:    'DM Sans', system-ui, sans-serif;
          font-weight:    600;
          letter-spacing: -0.01em;
          text-decoration: none;
          white-space:    nowrap;
          cursor:         pointer;
          border:         none;
          position:       relative;
          transition:
            background   0.18s ease,
            color        0.18s ease,
            box-shadow   0.18s ease,
            transform    0.16s ease,
            border-color 0.18s ease;
        }

        /* ── Sizes ─────────────────────────────────────── */
        .cta.md {
          padding:   13px 26px;
          font-size: 0.925rem;
        }

        .cta.lg {
          padding:   16px 34px;
          font-size: 1rem;
        }

        /* ── Primary ────────────────────────────────────── */
        .cta.primary {
          background: var(--rose-500);
          color:      #fff;
          box-shadow:
            0 1px 2px rgba(232,41,76,0.18),
            0 4px 12px rgba(232,41,76,0.16);
        }

        .cta.primary:hover {
          background: var(--rose-600);
          box-shadow:
            0 2px 4px rgba(232,41,76,0.22),
            0 8px 20px rgba(232,41,76,0.22);
          transform: translateY(-1px);
        }

        .cta.primary:active {
          transform: translateY(0);
          box-shadow:
            0 1px 2px rgba(232,41,76,0.18);
        }

        /* ── Outline ────────────────────────────────────── */
        .cta.outline {
          background:  transparent;
          color:       var(--rose-500);
          border:      1.5px solid var(--rose-200);
        }

        .cta.outline:hover {
          background:    var(--rose-50);
          border-color:  var(--rose-500);
          transform:     translateY(-1px);
        }

        .cta.outline:active {
          transform:    translateY(0);
          background:   var(--rose-100);
        }

        /* ── Ghost ──────────────────────────────────────── */
        .cta.ghost {
          background: transparent;
          color:      var(--rose-500);
          padding-left:  8px;
          padding-right: 8px;
        }

        .cta.ghost:hover {
          background: var(--rose-50);
        }

        .cta.ghost:active {
          background: var(--rose-100);
        }

        /* ── Arrow animation ────────────────────────────── */
        .cta-arrow {
          display:     flex;
          align-items: center;
          transition:  transform 0.2s ease;
          flex-shrink: 0;
        }

        .cta:hover .cta-arrow {
          transform: translateX(3px);
        }

        /* ── Focus ring (accessibility) ─────────────────── */
        .cta:focus-visible {
          outline:        2.5px solid var(--rose-500);
          outline-offset: 3px;
        }

        /* ── Disabled state ─────────────────────────────── */
        .cta:disabled,
        .cta[aria-disabled="true"] {
          opacity:        0.45;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}