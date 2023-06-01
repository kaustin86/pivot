// @ts-nocheck
import React from 'react'

const SubCategory = ({label, data, count}) => {

    const content = <>
        <td className="subcategory sticky-left">{label}</td>
       
        {Object.entries(data).map(([state, value]):Props => {
            return (
                <td className="text-right data" id={state}  key={state}>{value}</td> 
            )
        })}
    
    </>
    const wrapper = <tr><td className="category sticky-left"></td>{content}</tr>
    if (count > 0) {
        return wrapper;
    } else {
        return content;
    }
}

export default SubCategory;