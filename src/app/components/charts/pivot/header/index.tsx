// @ts-nocheck
import React, {useState, useEffect, useRef, forwardRef, useCallback} from 'react';
import SubHeader from '../subheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Header = forwardRef(function (props, contentRef) {

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
        
        setScrollStartPosition(e.clientX)
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
              scrollWidth: contentScrollWidth,
              offsetWidth: contentOffsetWidth,
            } = contentRef.current;
      
            // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
            const deltaX =
              (e.clientX- scrollStartPosition) *
              (contentOffsetWidth / thumbWidth);
            const newScrollLeft = Math.min(
              initialScrollLeft + deltaX,
              contentScrollWidth - contentOffsetWidth
            );
      
            contentRef.current.scrollLeft = newScrollLeft;
          }
        },
        [isDragging, scrollStartPosition, thumbWidth]
      );
    
      // If the content and the scrollbar track exist, use a ResizeObserver to adjust Width of thumb and listen for scroll event to move the thumb
      useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
          const ref = contentRef.current;
          const { clientWidth: trackSize } = scrollTrackRef.current;
          console.log(scrollTrackRef.current);
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

    return(
        <thead className="sticky-top">
            <tr  className='chart-header'>
                <th colSpan={2} className="text-left sticky-left category">{props.xlabel}</th>
                <th colSpan={props.cols.length} className="data sticky-left">
                    <div className="title-container">
                        <div className="title" style={{width:'calc(100vw-200)', display: 'inline-block'}}>
                            <Button $direction='left'  onClick={() => handleScrollButton('left')} className="scroller nav-left" ><FontAwesomeIcon icon={faAngleLeft} /></Button>
                            {props.ylabel}
                            <Button $direction='right' onClick={() => handleScrollButton('right')} className="scroller nav-right"><FontAwesomeIcon icon={faAngleRight}/></Button>
                        </div>
                        <ScrollTrack ref={scrollTrackRef} onClick={handleTrackClick}>
                            <Scrollbar onMouseDown={handleThumbMousedown} className="scrollbar" ref={scrollThumbRef} style={{
                                width: `${thumbWidth}px`,
                                cursor: isDragging ? 'grabbing' : 'grab',
                            }} />
                        </ScrollTrack>
                            
                    </div>
                </th>
            </tr>
            <SubHeader cols={props.cols} scrollpos={scrollStartPosition}/>
        </thead>
    )
})
Header.displayName = 'Header';
const ScrollTrack = styled.div`
    position:relative;
    top:55px;
    height:6px;
`
const Button = styled.button<{$direction: string}>`
    display:inline-block;
    position:absolute;
    ${props=>props.$direction === 'left' ?'left: 0': 'right:0'};
    float:left;
`
const Scrollbar = styled.div<{$width: number, $scrollpos: number}>`
    border-width:2px;
    border-radius:2px;
    position:relative;
    height:4px;
    background:#FFFFFF50;
    width: ${props=> props.$width}px;
    left: ${props=> props.$scrollpos/5}px;
`
export default Header