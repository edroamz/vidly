import React, { useState, useEffect } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { compareValues } from '../utils/compare';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

const Movies = () => {
  const [allMovies, updateMovies] = useState([]);
  const [sortColumn, changeSortedColumn] = useState({
    path: 'title',
    order: 'asc'
  });
  const [genres, updateGenres] = useState([]);
  const [currentPage, changeCurrentPage] = useState(1);
  const [selectedGenre, changeSelectedGenre] = useState({});

  useEffect(() => {
    updateMovies(getMovies());

    const genres = [{ name: 'AllGenres', _id: 0 }, ...getGenres()];
    updateGenres(genres);
  }, []);

  function handleDelete(movie) {
    updateMovies(allMovies.filter(m => m._id !== movie._id));
  }

  function handleLike(movie) {
    const movies = [...allMovies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    updateMovies(movies);
  }

  function handlePageChange(page) {
    changeCurrentPage(page);
  }

  function handleGenreSelect(genre) {
    changeSelectedGenre(genre);
    changeCurrentPage(1);
  }

  function handleSort(sortColumn) {
    changeSortedColumn(sortColumn);
  }

  function getPagedData() {
    const filtered =
      selectedGenre &&
      selectedGenre._id &&
      Object.entries(selectedGenre).length > 0
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = filtered.sort(
      compareValues(sortColumn.path, sortColumn.order)
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies
    };
  }

  const pageSize = 4;
  const { totalCount, data: movies } = getPagedData();

  return (
    <>
      <div className='col-md-3'>
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        ></ListGroup>
      </div>
      <div className='col-md-9'>
        <p>
          {totalCount === 0
            ? 'There are no movies in the database'
            : `Showing ${totalCount} movies in the database`}
        </p>
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        ></MoviesTable>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </>
  );
};

export default Movies;
