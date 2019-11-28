import React from 'react';
import MoviesTable from './moviesTable';

const Movies = ({ movies, onDelete, onLike, onSort }) => {
  const { length: count } = movies;

  return (
    <>
      <p>
        {count === 0
          ? 'There are no movies in the database'
          : `Showing ${count} movies in the database`}
      </p>
      <MoviesTable
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        onSort={onSort}
      ></MoviesTable>
    </>
  );
};

export default Movies;
