import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attaches a high-performance IntersectionObserver to elements with the `.reveal-on-scroll` class.
 * When an element approaches or enters the viewport, it receives `.is-visible` and unobserves.
 * Immediately applies visibility if `prefers-reduced-motion` is active or if elements are already visible.
 *
 * @param {Array} dependencies - optional re-run triggers (e.g. data arrays)
 */
export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Respect user's motion preferences immediately
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        rootMargin: '250px 0px 250px 0px', // Pre-trigger 250px before entering viewport for seamless UX
        threshold: 0.01,
      }
    );

    elements.forEach((el) => {
      // If already in viewport on initial mount, mark visible immediately
      const rect = el.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 150) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
