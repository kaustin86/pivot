import React from "react"

const AggregationRow = function ({title, cols, data, btn, collapsed=false}) {

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
            <td className="category bold sticky-left" colSpan={2}>
            {collapsed && btn}
             {title}</td>
            {cols.map((state, i) => {
                return (
                    <td key={i}className="text-right data bold">{calculateColumnTotal(state)}</td>
                )
            })}
        </tr>
      )
}

export default AggregationRow