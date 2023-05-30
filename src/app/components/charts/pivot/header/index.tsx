import React, {useState, useEffect} from 'react';
import SubHeader from '../subheader';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.headerContainer = React.createRef()
        this.scrollbar = React.createRef();
        this.state = {
            scrollpos: 0,
            scrollwidth: 0,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    calcScrollWidth() {
        const windowWidth = window.innerWidth;
    }

    handleChange(shift, direction) {
        const currentPos = this.state.scrollpos;
        const containerWidth = this.headerContainer.current.offsetWidth;
        const scrollbarWidth = this.scrollbar.current.offsetWidth;
        const maxStep = containerWidth-scrollbarWidth;
        if(direction === 'right') {
            const newPos = maxStep < currentPos+shift ? maxStep : currentPos+shift;
            this.setState(newPos);
        }
        if(direction === 'left') {
            const newPos = currentPos-shift < 0 ? 0 : currentPos-shift;
            this.setState(newPos);
        }
    }

    render(){
        return(
            <tr ref="headerContainer" className='chart-header sticky'>
                <th colSpan={2} className="text-left">{this.props.xlabel}</th>
                <th colSpan={this.props.cols.length} className="td">
                    <div className="title-container">
                        <div className="scroller nav-left"><button onClick={() => this.handleChange(this.props.step, 'left')}  >{'<'}</button></div>
                        <div className="title">{this.props.ylabel}</div>
                        <div className="scroller nav-right"><button onClick={() => this.handleChange(this.props.step, 'right')} >{'>'}</button></div>
                        <div className="scrollbar" ref="scrollbar" style={{left: this.state.scrollpos, width: this.props.scrollwidth}}></div>
                    </div>
                </th>
                <SubHeader scrollpos={this.state.scrollpos}/>
            </tr>
        )

    }
}
export const Header = (props) => {
    let [scrollpos, setscrollpos] = useState(0);
    let [scrollWidth, setscrollwidth] = useState(0);

    
}

export default Header;