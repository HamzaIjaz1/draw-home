import { WithClassName } from '@draw-house/common/dist/utils';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { Container, Content, ScrollbarThumb, ScrollbarTrack, ScrollButton } from './styles';

type HorizontalScrollWrapperProps = {
  children: React.ReactNode;
};

export const HorizontalScrollWrapper = ({
  className,
  children,
}: HorizontalScrollWrapperProps & WithClassName) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [thumbWidthPx, setThumbWidthPx] = useState(0);
  const [thumbLeftPx, setThumbLeftPx] = useState(0);

  const updateThumb = () => {
    if (!contentRef.current || !trackRef.current) return;

    const el = contentRef.current;
    const track = trackRef.current;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const trackWidth = track.clientWidth;
    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

    // 24px min so the thumb remains visible even with lots of overflow
    const nextThumbWidth = Math.max(24, Math.round((clientWidth / scrollWidth) * trackWidth));
    const maxThumbLeft = Math.max(0, trackWidth - nextThumbWidth);
    const nextThumbLeft = maxScrollLeft === 0
      ? 0
      : (scrollLeft / maxScrollLeft) * maxThumbLeft;

    setThumbWidthPx(nextThumbWidth);
    setThumbLeftPx(nextThumbLeft);
  };

  const checkScroll = () => {
    if (!contentRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = contentRef.current;

    const hasOverflow = scrollWidth > clientWidth + 1;
    setShowScrollbar(hasOverflow);

    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);

    if (hasOverflow === true) {
      updateThumb();
    }
  };

  useEffect(() => {
    const element = contentRef.current;
    const track = trackRef.current;
    if (!element) return;

    const raf = requestAnimationFrame(() => {
      checkScroll();
    });

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);
    if (track) {
      resizeObserver.observe(track);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (!contentRef.current) return;

    const scrollAmount = 200;
    const newScrollLeft = contentRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    contentRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <Container className={className} $showScrollbar={showScrollbar}>
      {showLeftButton && (
        <ScrollButton
          $position='left'
          onClick={() => scroll('left')}
          aria-label='Scroll left'
        >
          <ChevronLeftIcon />
        </ScrollButton>
      )}

      <Content
        ref={contentRef}
        onScroll={checkScroll}
      >
        {children}
      </Content>

      {showScrollbar === true && (
        <ScrollbarTrack ref={trackRef}>
          <ScrollbarThumb
            style={{ width: `${thumbWidthPx}px`, transform: `translateX(${thumbLeftPx}px)` }}
          />
        </ScrollbarTrack>
      )}

      {showRightButton && (
        <ScrollButton
          $position='right'
          onClick={() => scroll('right')}
          aria-label='Scroll right'
        >
          <ChevronRightIcon />
        </ScrollButton>
      )}
    </Container>
  );
};
