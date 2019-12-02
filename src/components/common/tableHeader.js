import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  function raiseSort(path) {
    const sortColumnTemp = { ...sortColumn };
    if (sortColumnTemp.path === path)
      sortColumnTemp.order = sortColumnTemp.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumnTemp.path = path;
      sortColumnTemp.order = 'asc';
    }

    onSort({ ...sortColumnTemp });
  }

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            scope='col'
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func
};

export default TableHeader;
