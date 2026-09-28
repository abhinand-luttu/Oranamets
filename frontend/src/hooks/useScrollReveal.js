import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attaches a high-performance IntersectionObserver to elements with the `.reveal-on-scroll` class.
 * When an element enters the viewport, it receives `.is-visible` and unobserves.
 * Immediately applies visibility if `prefers-reduced-motion` is active.
 *
 * @param {Array} dependencies - optional re-run triggers (e.g. data arrays)
 */
export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Respect user's motion preferences immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px', // Trigger slightly before it hits the bottom
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
