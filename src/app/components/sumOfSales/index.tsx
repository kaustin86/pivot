"use client"; 
import React, {useEffect, useState} from 'react';
import PivotTable from '../charts/pivot';
import {states} from '../../constants';
import { KeyValuePair } from 'tailwindcss/types/config';
const salesData = require('../../assets/data/sales-orders.json')
let salesDataUrl = '../../data/sales-orders.json';

type DatasetType = {
    title: string,
    dimensions: Array<any>,
    categories: Array<CategoryType>,
    metrics?: Array<MetricType>,
}
type MetricType = {
    parent: string,
    label: string,
    values?: Array<DimensionValueType>
}

let dataSet:DatasetType = {
    title: 'Sum of Sales',
    dimensions: [{
        useHeader: true, 
        title: 'Purchases',
        fixed_x: true,
        fixed_y: true,
        cols: [
            {
                title: 'Category', 
                fixed_x: true,
                fixed_y: false
            },
            {
                title: 'Sub Category',
                fixed_x: true,
                fixed_y: true
            }
        ]
    },{
        useHeader: true, 
        title: 'States',
        cols: states.map(state => ({
            title: state,
            fixed_x:false,
            fixed_y: true,
        }))
    }],
    categories: [],
    metrics: []
};

type DimensionValueType = {
    dimension: string,
    value: number
}

type CategoryType = {
    title: string,
    collapsible: boolean
}

export default function sumOfSales() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])
   

    const fetchData = () => {
        setLoading(true);
        fetch(salesDataUrl)
            .then(res => res.json())
            .then(data => {
                handleData(data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error.msg);
                setLoading(false);
              });
    }

    const handleData = (orders:Array<object>) => {
        setLoading(true);


        const categories = [...new Set(orders.map(item => item.category))];
        let tableData = categories.map(category  => {
            const subcategories =  [...new Set(orders.filter(item => item.category === category).map(item => item.subCategory))];
            const rowData = {
                Category: category,
                SubCategories: [],
                Totals:[]
            };

            subcategories.forEach((subcategory, i) => {
                rowData.SubCategories[i] = {
                    label: subcategory,
                    states: []
                }
                states.forEach(state => {
                        const sales = orders
                            .filter(item => item.subCategory === subcategory && item.state === String(state))
                            .reduce((sum, item) => sum + item.sales, 0);
                        rowData.SubCategories[i].states[state] = sales.toFixed(2)
                        const catTotal = orders
                            .filter(item => item.category === category && item.state === String(state))
                            .reduce((sum, item) => sum = sum + item.sales, 0)
                        rowData.Totals[state] = catTotal.toFixed(2)
                    });
                return rowData

            })
            return rowData
        })
        setData(tableData);
    }
   
    if(loading) {
        return  <div className={'loader'}> Loading </div>
    } else if (data === null) {
        return <div className={'loader'}> <span className={'alert'}>No data available.</span></div>
    } else {
        //return 'done';
       return <PivotTable title="Sum of Sales" xlabel='Purchases' tableData={data} ylabel='States' cols={states} />
    }
   
}
