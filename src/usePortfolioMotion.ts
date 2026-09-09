import { useEffect, type RefObject } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const easeOut = "cubic-bezier(.22, 1, .36, 1)";

/** Progressive enhancement: content remains visible without JS or observers. */
export function usePortfolioMotion(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia(reducedMotion);
    const seen = new Set<Element>();
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    function observe() {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer?.unobserve(entry.target);
            seen.add(entry.target);
            // A keyboard destination is always immediately readable.
            if (entry.target.contains(document.activeElement)) continue;
            const animation = entry.target.animate(
              [
                { opacity: 0.35, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 520, easing: easeOut },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
        },
        { threshold: 0.12 },
      );

      root!.querySelectorAll("[data-reveal]").forEach((element) => {
        if (seen.has(element)) return;
        const rect = element.getBoundingClientRect();
        // Never fade initially visible content or delay the first paint.
        if (rect.top < window.innerHeight && rect.bottom > 0) seen.add(element);
        else observer?.observe(element);
      });
    }

    function onFocus(event: FocusEvent) {
      const target = (event.target as Element).closest("[data-reveal]");
      target?.getAnimations().forEach((animation) => animation.finish());
    }

    function onPreferenceChange() {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
      observe();
    }

    observe();
    root.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      root.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [rootRef]);
}

/** Animate only detail copy, preserving the focused pagination controls. */
export function animateDetails(dialog: HTMLDialogElement) {
  const preference = window.matchMedia(reducedMotion);
  if (preference.matches) return () => {};
  const animations = Array.from(
    dialog.querySelectorAll(
      ".detail-copy > :not(.detail-pagination), .writing-detail > *",
    ),
  ).map((element, index) =>
    element.animate(
      [
        { opacity: 0.3, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 320,
        delay: Math.min(index * 22, 110),
        easing: easeOut,
        fill: "backwards",
      },
    ),
  );
  const cancel = () => animations.forEach((animation) => animation.cancel());
  preference.addEventListener("change", cancel);
  return () => {
    cancel();
    preference.removeEventListener("change", cancel);
  };
}
