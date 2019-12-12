import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { compareValues } from '../utils/compare';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

const Movies = () => {
  const [allMovies, updateMovies] = useState([]);
  const [sortColumn, changeSortedColumn] = useState({
    path: 'title',
    order: 'asc'
  });
  const [searchQuery, updateSearch] = useState('');
  const [genres, updateGenres] = useState([]);
  const [currentPage, changeCurrentPage] = useState(1);
  const [selectedGenre, changeSelectedGenre] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: movies } = await getMovies();
      updateMovies(movies);

      const { data } = await getGenres();
      const genres = [{ name: 'AllGenres', _id: 0 }, ...data];
      updateGenres(genres);
    };

    fetchData();
  }, []);

  async function handleDelete(movie) {
    const originalMovies = allMovies;
    updateMovies(originalMovies.filter(m => m._id !== movie._id));

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('this movie has already been deleted');

        updateMovies(originalMovies);
      }
    }
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
    updateSearch('');
  }

  function handleSort(sortColumn) {
    changeSortedColumn(sortColumn);
  }

  function handleSearch(query) {
    updateSearch(query);
    changeCurrentPage(1);
    changeSelectedGenre(null);
  }

  function getPagedData() {
    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(
        m => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

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
        <Link className='btn btn-primary mb-4' to='/movies/new'>
          New Movie
        </Link>
        <p>
          {totalCount === 0
            ? 'There are no movies in the database'
            : `Showing ${totalCount} movies in the database`}
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
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
