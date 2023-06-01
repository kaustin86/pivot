// @ts-nocheck
import React, { useRef }  from 'react';
import AggregationRow from './aggregationRow';
import Header from './header';
import Category from './category';
import './index.scss';

const PivotTable =  function (props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const handleScroll = function(scrollAmount:number) {
        if(!contentRef.current) {
            return;
        }
        contentRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
        });
    }

    return (
        <div ref={contentRef} className='table-container'>
            <table className='pivot table'>
                    <Header xlabel={props.xlabel} 
                        ylabel={props.ylabel} 
                        handleScroll={handleScroll} 
                        tableData={props.tableData} 
                        cols={props.cols}
                        ref={contentRef}
                    />
                <tbody className={'chart-body tbody'}>
                    {props.tableData.map((row,i) => {
                        return <Category key={i} data={row} cols={props.cols}/>
                    })}  
                    <AggregationRow btn={false} title='Grand Total' cols={props.cols} data={props.tableData} />
                </tbody>
            </table> 
        </div>
    )
}
export default PivotTable