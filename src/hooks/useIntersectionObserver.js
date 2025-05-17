import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (elementRef, { threshold = 0.1, root = null, rootMargin = '0px' }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, root, rootMargin }
    );

    const { current: currentObserver } = observerRef;
    const currentElement = elementRef.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentObserver && currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
};

export default useIntersectionObserver;