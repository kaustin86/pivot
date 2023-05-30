import React, {useState, useEffect} from "react";
import AggregationRow from "../aggregationRow";
import SubCategory from '../subcategory';



const Category = ({data, cols}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [count, setCount] = useState(-1);
    const [title, setTitle] = useState(`${data.Category} Total`)
    
    let i = -1;
    return (
        <>
        <tr>
            <td className="category sticky">
                    <button onClick={() => setCollapsed(!collapsed) } className="button collapsable">{collapsed ? '+' : '-'}</button>
                    <span className="label">{data.Category}</span>
            </td>
            {!collapsed && <SubCategory count={0} label={data.SubCategories[0].label} data={data.SubCategories[0].states}/>}
        </tr>
        {!collapsed && data.SubCategories.map((data,i) => {
            if(i > 0) {
               return <SubCategory label={data.label} count={i} data={data.states} />
            }
        })}
        <AggregationRow title={!collapsed && data.Category+' Total'} collapsed={collapsed} data={[data]} cols={cols}/>

        </>
    )
}
export default Category