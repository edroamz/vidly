import React, { useState, useEffect } from 'react';
import { getMovies } from './services/fakeMovieService';
import './App.css';
import Movie from './components/movie';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [movies, updateMovies] = useState([]);

  useEffect(() => {
    updateMovies(getMovies());
  }, []);

  function handleDelete(movieId) {
    updateMovies(movies.filter(m => m._id !== movieId));
  }

  return (
    <div className='App'>
      <Navbar movies={movies}></Navbar>
      <Movie movies={movies} onDelete={handleDelete}></Movie>
    </div>
  );
}

export default App;
