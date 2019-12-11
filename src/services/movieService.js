import { apiUrl } from '../config.json';
import http from './httpService';

export function getMovies() {
  return http.get(`${apiUrl}/movies`);
}

export function getMovie(id) {
  return http.get(`${apiUrl}/movies/${id}`);
}

export function deleteMovie(id) {
  return http.delete(`${apiUrl}/movies/${id}`);
}

export function saveMovie(movie) {
  delete movie._id;
  return http.post(`${apiUrl}/movies/`, movie);
}
