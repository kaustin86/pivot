import React from 'react';
import './index.scss'


const Arrow = (props) => {
    
    return <button type="button" onClick={props.onclick} className={`arrow arrow-${props.direction}`}/>  
}

const Scrollbar = (props) => {

    return <div className="scrollbar" style={{width: props.width, left: props.left}}></div>

}

export {Arrow, Scrollbar}

