import React from 'react'
import './index.scss'

const SubCategory = ({label, data, count}) => {

    const content = <>
        <td className="subcategory sticky-left">{label}</td>
        {Object.entries(data).map(([state, value]) => {
            return (
                <td class="text-right data" id={state}  key={state}>{value}</td> 
            )

        })}
    
    </>
    const wrapper = <tr><td className="category sticky-left"></td>{content}</tr>
    
    if(count > 0) {
        return wrapper;
    } else {
        return content;
    }
}

export default SubCategory;