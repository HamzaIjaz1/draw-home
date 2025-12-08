import assert from 'assert';
import { useEffect, useRef } from 'react';
import { isNull } from '@arthurka/ts-utils';

export const useFadingReviews = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = carouselRef.current;
    assert(!isNull(scrollContainer), 'Something went wrong. |b870sk|');

    const cb = (entries: IntersectionObserverEntry[]) => {
      for(const entry of [...entries]) {
        assert(entry.target instanceof HTMLDivElement, 'Something went wrong. |4u43pb|');
        entry.target.style.opacity = entry.isIntersecting === true ? '1' : '0.4';
      }
    };

    const observer = new IntersectionObserver(cb, {
      root: scrollContainer,
      rootMargin: '0px',
      threshold: 0.41,
    });

    for(const child of [...scrollContainer.children]) {
      observer.observe(child);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return carouselRef;
};
