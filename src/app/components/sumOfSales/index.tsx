"use client"; 
import React, {useEffect, useState} from 'react';
import PivotTable from '../charts/pivot';
import {states} from '../../constants';
const salesData = require('../../assets/data/sales-orders.json')
let dataSet = {
    title: '',
    dimensions: {
        states: states
    },
    categories: [
    ]
};
export default function sumOfSales() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       handleData();
    })
    const handleData =  function () {
        setLoading(true);
        //api endpoint for sales data here
        try {
            const res = salesData;
        
            res.forEach((order, i) => {
                const category = order.category;
                const subcat = order.subCategory;
                const state = order.state;
                const sales = order.sales;
                console.log(dataSet);
                addDimension(state, sales, category, subcat);
            });
            
        } catch (err:any) {
            setError(err.message ||  "Unexpected Error!")
        } finally {
            setLoading(false);
            if (error === false) {
                setData(dataSet);
                console.log(data);
            }
        }
      
    }

    const addCategory = function (category:string) {
        if (!dataSet.categories.find(x =>x.label === category)) {
            let set = {
                label: category,
                subCategories: []
            }
            dataSet.categories.push(set);
            return data.categories.findIndex(x => x.label === category);
        }
        
    }

    const addSubCategory = function (catkey, category, subcat) {
        if(!dataSet.categories[catkey]) {
            addCategory(category)
        }
        if(!dataSet.categories[catkey].subCategories.find(x => x.label === subcat)) {
            let set = {
                label: subcat,
                dimensions: []
            }
            dataSet.categories[catkey].subCategories.push(set);
            return dataSet.categories[catkey].subCategories.findIndex(x => x.label === subcat);
        }
    }

    const addDimension = function (dimension, dimensionValue, category, subcat){
        //Add Category if it doesn't exist.
        let catKey = dataSet.categories.findIndex(x => x.label === category) ?? -1;
        if (catKey < 0) {
            console.log('add category');
            catKey = addCategory(category);
        }

        let subcatKey = dataSet.categories[catKey].subCategories.findIndex(x => x.label === subcat) ?? -1;
        if(subcatKey < 0 ) {
            console.log('add sub');
            subcatKey = addSubCategory(catKey,category,subcat);
        }

        let dimKey = dataSet.categories[catKey].subCategories[subcatKey].dimensions.findIndex(x => x.label === dimension) ?? -1;
        if(dimKey < 0){
            dataSet.categories[catKey].subCategories[subcatKey].dimensions.push({
                label: dimension,
                value: dimensionValue
            })
        } else {
            let dimensionObj = dataSet.categories[catKey].subCategories[subcatKey].dimensions[dimKey];
            if (dimensionObj) {
                dimensionObj.value += dimensionValue;
            }
        }
        
        return dataSet;
    }
}
