import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const Table = ({data}) => {
    if (!Array.isArray(data)) return null;
    if (data.length === 0) return null;

    const keys = Object.keys(data[0]);
    const columns = keys.map(key => {
        return {
            header: key,
            accessor: key
        };
    });

    return <ReactTable columns={columns} data={data} />;
};

export default Table;
