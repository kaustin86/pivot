import React from 'react'


const SubCategory = ({label, data, count}) => {

    const content = <>
        <td className="sticky">{label}</td>
        {Object.entries(data).map(([state, value]) => {
            return (
                <td class="text-right" id={state}  key={state}>{value}</td> 
            )

        })}
    
    </>
    const wrapper = <tr><td className="category sticky"></td>{content}</tr>
    
    if(count > 0) {
        return wrapper;
    } else {
        return content;
    }
}

export default SubCategory;