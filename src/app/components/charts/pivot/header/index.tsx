import React, {useState, useEffect, useRef} from 'react';
import SubHeader from '../subheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {

    const [scrollpos, setscrollpos]  = useState(0);
    const [scrollwidth, setscrollwidth] = useState(0);
    const titleContainer = useRef(null)
    const scrollbar = useRef(null);
    const headerContainer = useRef(null);
    useEffect( () => {
        calcScrollWidth()
    })
    const calcScrollWidth = function () {
        const refWidth = window.innerWidth;
        if(!scrollbar.current || !headerContainer.current) {
            return false
        }
        const width = refWidth/headerContainer.current.offsetWidth*1000;
        setscrollwidth(width);
    }

    const handleChange = function (direction) {
        const currentPos = scrollpos;
        const shift = headerContainer.current.offsetWidth / 10;
        if(!headerContainer.current || !scrollbar.current) {
            return false;
        }
        const containerWidth = titleContainer.current.offsetWidth;
        const maxStep = headerContainer.current.offsetWidth-containerWidth;
        if(direction === 'right') {
            const newPos = maxStep < scrollpos+shift ? maxStep : scrollpos+shift;
            setscrollpos(newPos);
        }
        if(direction === 'left') {
            const newPos = currentPos-shift < 0 ? 0 : currentPos-shift;
            setscrollpos(newPos);
        }
        props.handleScroll(scrollpos);
    }

    return(
        <thead className="sticky-top">
            <tr  className='chart-header'>
                <th colSpan={2} className="text-left sticky-left">{props.xlabel}</th>
                <th ref={headerContainer} colSpan={props.cols.length} className="data sticky-left">
                    <div ref={titleContainer} className="title-container">
                        <div className="title" style={{width:'calc(100vw-200)', display: 'inline-block'}}>
                            <Button $direction='left' onClick={() => handleChange('left')} className="scroller nav-left" ><FontAwesomeIcon icon={faAngleLeft} /></Button>
                            {props.ylabel}
                            <Button $direction='right' onClick={() => handleChange('right')} className="scroller nav-right"><FontAwesomeIcon icon={faAngleRight}/></Button>
                        </div>
                        <Scrollbar className="scrollbar" ref={scrollbar}  $width={scrollwidth} $scrollpos={scrollpos}/>
                    </div>
                </th>
            </tr>
            <SubHeader cols={props.cols} scrollpos={scrollpos}/>
        </thead>
    )
}
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
    top:55px;
    height:2px;
    background:#FFFFFF50;
    width: ${props=> props.$width}px;
    left: ${props=> props.$scrollpos/5}px;
    transition: left 2s;
`
export default Header