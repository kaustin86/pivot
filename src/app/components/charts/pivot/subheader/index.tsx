import React from 'react';

const SubHeader = (props) => {
    return (
        <tr style={{left: props.scrollpos}} className='chart-subheader'>
            <th className="text-left category sticky-left">Category</th>
            <th className="text-left subcategory sticky-left">SubCategory</th>
            {props.cols.map((state, i) =>
                <th key={i} id="" className="data text-right">{state}</th>
            )}
        </tr>
    )
}

export default SubHeader