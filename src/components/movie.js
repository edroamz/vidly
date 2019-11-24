import React from 'react';

const Movie = ({ movies, onDelete }) => {
  function handleDelete(event) {
    onDelete(event.target.id);
  }

  return (
    <>
      {movies.length === 0 ? (
        <p className='mt-4 mb-4'>There are no movies in the database</p>
      ) : (
        <p className='mt-4 mb-4'>
          Showing {movies.length} movies in the database
        </p>
      )}
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Genre</th>
            <th scope='col'>Stock</th>
            <th scope='col'>Rate</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={handleDelete}
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
    </>
  );
};

export default Movie;
