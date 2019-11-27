import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import Movies from './components/movies';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from './components/common/listgroup';
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';

function App() {
  const [movies, updateMovies] = useState([]);
  const [currentPage, changeCurrentPage] = useState(1);
  const pageSize = 4;
  const moviesPerPage = paginate(movies, currentPage, pageSize);
  let genres = getGenres();
  genres.unshift({ name: 'All genres', _id: '0' });

  useEffect(() => {
    updateMovies(getMovies());
  }, []);

  function handleDelete(movieId) {
    updateMovies(movies.filter(m => m._id !== movieId));
  }

  function handleLike(movie) {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    updateMovies(newMovies);
  }

  function handlePageChange(page) {
    changeCurrentPage(page);
  }

  return (
    <div className='App'>
      <Navbar movies={movies}></Navbar>
      <main className='main'>
        <div className='row mt-5'>
          <div className='col-md-3'>
            <ListGroup genres={genres}></ListGroup>
          </div>
          <div className='col-md-9'>
            <Movies
              movies={moviesPerPage}
              onDelete={handleDelete}
              onLike={handleLike}
            ></Movies>
            <Pagination
              itemsCount={movies.length}
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
