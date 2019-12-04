import React from 'react';
import PropTypes from 'prop-types';
import { get } from '../../utils/get';

const TableBody = ({ data, columns }) => {
  function renderCell(item, column) {
    if (column.content) return column.content(item);

    return get(item, column.path);
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={item._id + (column.path || column.key)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default TableBody;
