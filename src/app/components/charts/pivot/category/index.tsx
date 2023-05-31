import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import AggregationRow from "../aggregationRow";
import SubCategory from '../subcategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.scss';
import { faMinus, faMinusSquare, faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";



const Category = ({data, cols}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState(`${data.Category} Total`)
    const [animate, setAnimate] = useState(false);
    const handleChange = function (newState) {
        setAnimate(!animate);
        if(newState === false){
            setTitle(`${data.Category} Total`);
        } else {
            setTitle(`${data.Category}`);
        }
        setCollapsed(newState);
    }
    const transitionStyles = {
        entering: { height: 'inherit' },
        entered:  { height: 'inherit' },
        exiting:  { height: 0 },
        exited:     { height: 0 },
      };
      
    
    let i = -1;
    return (
         <>
            {!collapsed && 
                <>
                    <tr className="animate">
                        <td className="category sticky-left">
                            <AccordionBtn onClick={() => handleChange(!collapsed) } $collapsed={collapsed} className="button collapsable"><FontAwesomeIcon icon={faMinusSquare}/></AccordionBtn>
                            <span className="label">{data.Category}</span>
                        </td>
                        {!collapsed && <SubCategory count={0} label={data.SubCategories[0].label} data={data.SubCategories[0].states}/>}
                    </tr>
                    {data.SubCategories.map((data,i) => {
                        if(i > 0) {
                        return <SubCategory label={data.label} count={i} data={data.states} />
                        }
                    })}
                </>
            }
            
            <AggregationRow title={title} btn={<AccordionBtn onClick={() => handleChange(!collapsed) } $collapsed={collapsed} className="button collapsable sticky-left"><FontAwesomeIcon icon={faPlusSquare}/></AccordionBtn> }
            collapsed={collapsed} data={[data]} cols={cols}/>

        </>
    )
   
}
const AccordionBtn = styled.button<{$collapsed?: boolean}> `

display:inline-block;
position: absolute;
left: 5px;
top: 9px;
line-height:10px;
font-weight:bold;
margin: 0 5px 0 0;
color: blue;
font-size:20px;
z-index:11;

`
export default Category