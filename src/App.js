import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import Movies from './components/movies';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from './components/common/listGroup';
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';
import { compareValues } from './utils/compare';

function App() {
  const [allMovies, updateMovies] = useState([]);
  const [genres, updateGenres] = useState([]);
  const [currentPage, changeCurrentPage] = useState(1);
  const [selectedGenre, changeSelectedGenre] = useState({});
  const [sortColumn, changeSortedColumn] = useState({
    path: 'title',
    order: 'asc'
  });

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

  const pageSize = 4;
  const filtered =
    selectedGenre &&
    selectedGenre._id &&
    Object.entries(selectedGenre).length > 0
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

  const sorted = filtered.sort(
    compareValues(sortColumn.path, sortColumn.order)
  );

  const moviesPerPage = paginate(sorted, currentPage, pageSize);

  return (
    <div className='App'>
      <Navbar movies={allMovies}></Navbar>
      <main className='main'>
        <div className='row mt-5'>
          <div className='col-md-3'>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={handleGenreSelect}
            ></ListGroup>
          </div>
          <div className='col-md-9'>
            <Movies
              movies={moviesPerPage}
              onDelete={handleDelete}
              onLike={handleLike}
              onSort={handleSort}
              sortColumn={sortColumn}
            ></Movies>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
