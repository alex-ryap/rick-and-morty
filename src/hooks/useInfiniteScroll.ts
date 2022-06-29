import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (cb: () => void, isActive: Boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry) {
        return;
      }

      if (entry.isIntersecting && isActive) {
        cb();
      }
    },
    [cb, isActive]
  );

  const infiniteScrollRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(handleObserver);
      observer.current.observe(node);
    },
    [handleObserver]
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return infiniteScrollRef;
};
