import React, { useState, useEffect } from 'react';
import { getMovies } from './services/fakeMovieService';
import './App.css';
import Movies from './components/movies';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';

function App() {
  const [movies, updateMovies] = useState([]);
  const [currentPage, changeCurrentPage] = useState(1);
  const pageSize = 4;
  const moviesPerPage = paginate(movies, currentPage, pageSize);

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
  );
}

export default App;
