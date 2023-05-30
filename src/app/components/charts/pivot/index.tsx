import React, { useState, useEffect }  from 'react';
import AggregationRow from './aggregationRow';
import Header from './header';
import SubHeader from './subheader';
import Category from './category';
import './index.scss';

const PivotTable =  function ({title, xlabel, ylabel, tableData, cols, categories}) {
    const [scrollPos, setScrollPos] = useState(0);

    const calculateScrollMovement = function () {

    }
    return (
        <table className='pivot table'>
            <thead>
                <tr className='chart-header sticky'>
                    <th colSpan={2} className="text-left">{xlabel}</th>
                    <th colSpan={cols.length} className="td">
                        <div className="title-container">
                            <div className="scroller nav-left"><button onClick={() => setScrollPos(scrollPos-60)} >{'<'}</button></div>
                            <div className="title">{ylabel}</div>
                            <div className="scroller nav-right"><button onClick={() => setScrollPos(scrollPos+60)} >{'>'}</button></div>
                            <div className="scrollbar"></div>
                        </div>
                       
                    </th>
                       
                </tr>
                <tr className='chart-subheader sticky'>
                    <th className="text-left">Category</th>
                    <th className="text-left">SubCategory</th>
                    {cols.map((state, i) =>
                        <th key={i} id="" className="td">{state}</th>
                    )}
                </tr>
               
            </thead>
            <tbody className={'chart-body tbody'}>
                {tableData.map(row => {
                    return <Category data={row} cols={cols} scrollPos={scrollPos}/>
                })}  
                <AggregationRow title='Grand Total' cols={cols} data={tableData} />
                
            </tbody>
        </table>
                
           
        
    )
}
export default PivotTable