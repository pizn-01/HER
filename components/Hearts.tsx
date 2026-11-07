/*
 * Hearts drifting up behind the last screen. Fixed values, not Math.random(),
 * so server and client render the same thing. CSS-only, and hidden entirely
 * when reduced motion is on.
 */
const HEARTS = [
  { left: 6, size: 14, duration: 11, delay: 0, color: "#f0c4cc" },
  { left: 15, size: 20, duration: 14, delay: 3, color: "#e2a4b1" },
  { left: 24, size: 12, duration: 10, delay: 6, color: "#c9748a" },
  { left: 36, size: 17, duration: 13, delay: 1.5, color: "#f0c4cc" },
  { left: 48, size: 11, duration: 12, delay: 8, color: "#e2a4b1" },
  { left: 60, size: 19, duration: 15, delay: 4, color: "#c9748a" },
  { left: 71, size: 13, duration: 11, delay: 9, color: "#f0c4cc" },
  { left: 80, size: 22, duration: 16, delay: 2, color: "#e2a4b1" },
  { left: 89, size: 12, duration: 12, delay: 7, color: "#c9748a" },
  { left: 95, size: 16, duration: 14, delay: 5, color: "#f0c4cc" },
];

export function Hearts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <svg
          key={i}
          className="rising-heart"
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <path
            d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.7 1.3 4.6 2.7.3.5 1.1.5 1.4 0 .9-1.4 2.4-2.7 4.6-2.7 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z"
            fill={h.color}
          />
        </svg>
      ))}
    </div>
  );
}
