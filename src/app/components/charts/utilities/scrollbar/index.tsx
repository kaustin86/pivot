import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './index.scss'

const Scrollbar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
    null
  );
  const [initialScrollLeft, setInitialScrollLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientWidth, scrollWidth } = ref;
    setThumbWidth(Math.max((clientWidth / scrollWidth) * trackSize, 20));
  }

  function handleScrollButton(direction: 'left' | 'right') {
    const { current } = contentRef;
    if (current) {
      const scrollAmount = direction === 'right' ? 200 : -200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const handleTrackClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientX } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackLeft = rect.left;
        const thumbOffset = -(thumbWidth / 2);
        const clickRatio =
          (clientX - trackLeft + thumbOffset) / trackCurrent.clientWidth;
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollWidth
        );
        contentCurrent.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbWidth]
  );

  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
      contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;
    let newLeft = (+contentLeft / +contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);
    const thumb = scrollThumbRef.current;
    thumb.style.left = `${newLeft}px`;
  }, []);

  const handleThumbMousedown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current) setInitialScrollLeft(contentRef.current.scrollLeft);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const {
          scrollLeft: contentScrollWidth,
          offsetLeft: contentOffsetWidth,
        } = contentRef.current;

        const deltaX =
          (e.clientX - scrollStartPosition) *
          (contentOffsetWidth / thumbWidth);
        const newScrollLeft = Math.min(
          initialScrollLeft+ deltaX,
          contentScrollWidth - contentOffsetWidth
        );

        contentRef.current.scrollLeft= newScrollLeft;
      }
    },
    [isDragging, scrollStartPosition, thumbWidth]
  );

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust Width of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientWidth: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
  }, []);

  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <div className="custom-scrollbars__container">
      <div className="custom-scrollbars__content" ref={contentRef} {...props}>
        {children}
      </div>
      <div className="custom-scrollbars__scrollbar">
        <button
          className="custom-scrollbars__button"
          onClick={() => handleScrollButton('left')}
        >
        <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <div className="custom-scrollbars__track-and-thumb">
          <div
            className="custom-scrollbars__track"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging && 'grabbing' }}
          ></div>
          <div
            className="custom-scrollbars__thumb"
            ref={scrollThumbRef}
            onMouseDown={handleThumbMousedown}
            style={{
              width: `${thumbWidth}px`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          ></div>
        </div>
        <button
          className="custom-scrollbars__button"
          onClick={() => handleScrollButton('right')}
        >
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
        
      </div>
    </div>
  );
};

export default Scrollbar;
