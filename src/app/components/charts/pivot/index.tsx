import React, { useState, useEffect, useRef }  from 'react';
import AggregationRow from './aggregationRow';
import Header from './header';
import Category from './category';
import Scrollbar from '../utilities/scrollbar';
import './index.scss';

const PivotTable =  function (props) {

    return (

        <table className='pivot table'>
                <Header 
                    title={props.title} 
                    xlabel={props.xlabel} 
                    ylabel={props.ylabel} 
                    handleScroll={props.handleScroll} 
                    tableData={props.tableData} 
                    cols={props.cols}
                />
            <tbody className={'chart-body tbody'}>
                {props.tableData.map(row => {
                    return <Category data={row} cols={props.cols}/>
                })}  
                <AggregationRow title='Grand Total' cols={props.cols} data={props.tableData} />
            </tbody>
        </table> 
    )
}
export default PivotTable