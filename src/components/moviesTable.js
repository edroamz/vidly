import React from 'react';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

const user = auth.getCurrentUser();

const MoviesTable = ({ movies, sortColumn, onDelete, onLike, onSort }) => {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
      )
    }
  ];

  if (user && user.isAdmin) {
    columns.push({
      key: 'delete',
      content: movie => {
        return (
          <button
            onClick={() => onDelete(movie)}
            id={movie._id}
            className='btn btn-danger btn-sm'
          >
            Delete
          </button>
        );
      }
    });
  }

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    ></Table>
  );
};

export default MoviesTable;
