import React from 'react';
import Like from '../components/common/like';
import TableHeader from '../components/common/tableHeader';

const MoviesTable = props => {
  const { movies, sortColumn, onDelete, onLike, onSort } = props;

  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' }
  ];

  return (
    <table className='table'>
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <tbody>
        {movies &&
          movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  id={movie._id}
                  className='btn btn-danger btn-sm'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
