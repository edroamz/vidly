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

  function renderSortIcon(column) {
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === 'asc')
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='9'
          height='9'
          viewBox='0 0 24 24'
        >
          <path d='M0 21l12-18 12 18z' />
        </svg>
      );
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='9'
        height='9'
        viewBox='0 0 24 24'
      >
        <path d='M24 3l-12 18-12-18z' />
      </svg>
    );
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
            {column.label} {renderSortIcon(column)}
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
