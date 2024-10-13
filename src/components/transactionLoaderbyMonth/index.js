import React, { useState } from 'react';
import MonthYearDropDown from '../MonthYearDropdown';
import TableTransaction from '../TableTransactions';



const TransactionLoaderByMonth = () => {
    const [data, setData] = useState(null);

    const hadleDataChange = (newData) => {
        setData(newData)
    };

    return (
        <>
            <MonthYearDropDown onDataChange={hadleDataChange}/>
            <TableTransaction data={data}/>
        </>
    )

}

export default TransactionLoaderByMonth