import { useEffect, type RefObject } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const easeOut = "cubic-bezier(.22, 1, .36, 1)";

/** Progressive enhancement: content remains visible without JS or observers. */
export function usePortfolioMotion(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia(reducedMotion);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const seen = new Set<Element>();
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let hovered: HTMLElement | null = null;

    function resetTilt(card: HTMLElement | null) {
      card?.style.removeProperty("--tilt-x");
      card?.style.removeProperty("--tilt-y");
    }

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

    function onPointerMove(event: PointerEvent) {
      if (
        preference.matches ||
        !finePointer.matches ||
        event.pointerType !== "mouse"
      )
        return;
      const card = (event.target as Element).closest<HTMLElement>(
        ".project-card",
      );
      if (!card) return;
      if (hovered !== card) resetTilt(hovered);
      hovered = card;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = Math.max(
          -1,
          Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
        );
        const y = Math.max(
          -1,
          Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
        );
        card.style.setProperty("--tilt-x", `${-y * 5}deg`);
        card.style.setProperty("--tilt-y", `${x * 7}deg`);
      });
    }

    function onPointerOut(event: PointerEvent) {
      if (
        !hovered ||
        (event.relatedTarget instanceof Node &&
          hovered.contains(event.relatedTarget))
      )
        return;
      cancelAnimationFrame(frame);
      resetTilt(hovered);
      hovered = null;
    }

    function onFocus(event: FocusEvent) {
      const target = (event.target as Element).closest("[data-reveal]");
      target?.getAnimations().forEach((animation) => animation.finish());
    }

    function onPreferenceChange() {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
        cancelAnimationFrame(frame);
        resetTilt(hovered);
      }
      observe();
    }

    observe();
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerout", onPointerOut);
    root.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      resetTilt(hovered);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerout", onPointerOut);
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
