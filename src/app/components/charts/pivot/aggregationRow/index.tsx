import React from "react"

const AggregationRow = function ({title, cols, data, collapsed=false}) {

    const calculateColumnTotal = (columnIndex) => {
        let total = 0;
        data.forEach((row) => {
            Object.entries(row.Totals).map(([state, category_total]) => {
                if (state === columnIndex) {
                    total = parseFloat(total)+parseFloat(category_total);
                }
            });
        });
        return total.toFixed(2);
      };
   
      return  (
        <tr className="aggregation-row">
            <td className="category" colSpan={2}>{title}</td>
            {cols.map(state => {
                return (
                    <td className="text-right">{calculateColumnTotal(state)}</td>
                )
            })}
        </tr>
      )
}

export default AggregationRow