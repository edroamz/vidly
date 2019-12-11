import { apiUrl } from '../config.json';
import http from './httpService';

export async function getGenres() {
  return http.get(`${apiUrl}/genres`);
}
