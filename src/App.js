import React, { useState, useEffect } from 'react';
import { getMovies } from './services/fakeMovieService';
import './App.css';
import Movies from './components/movies';
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

  function handleLike(movie){
    const newMovies = [...movies]
    const index = newMovies.indexOf(movie)
    newMovies[index].liked = !newMovies[index].liked
    updateMovies(newMovies)
  }

  return (
    <div className='App'>
      <Navbar movies={movies}></Navbar>
      <Movies movies={movies} onDelete={handleDelete} onLike={handleLike}></Movies>
    </div>
  );
}

export default App;
