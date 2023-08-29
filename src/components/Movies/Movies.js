import React, { useState } from 'react';
import styles from './Movies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';

function Movies({
  setHeadHidden,
  setFootHidden,
  setIsActive,
  onFilter,
  setOnFilter,
  addMovies,
  setAddMovies,
  handleMovieLink,
}) {


  const [movies, setMovies] = useState([])

  React.useEffect(() => {
    moviesApi.getMovies()
      .then(data => {
        setMovies(data)
      })
  }, [])

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleMovieLink()
  })

  const [formValue, setFormValue] = useState({
    search: ''
  })
  const [searchData, setSearchData] = useState()
  const [searchResult, setSearchResult] = useState([])

  function handleMovies(data) {
    setSearchData(data)
  }

  React.useEffect(() => {
    const result = movies.filter(data =>
      (data.nameRU || data.nameEN).toLowerCase().includes(searchData.search)
    );
    setSearchResult(result)
  }, [searchData]);

  return (
    <section className={styles.movies}>
      <MoviesSearch
        onFilter={onFilter}
        setOnFilter={setOnFilter}
        handleMovies={handleMovies}
        formValue={formValue}
      />
      <MoviesCardList
        addMovies={addMovies}
        setAddMovies={setAddMovies}>

        {searchResult.map((film) =>
          <MoviesCard
            movie={film}
            key={film.id}
            addMovies={addMovies}
            setAddMovies={setAddMovies}
          />

        )}

      </MoviesCardList>

    </section>
  );
}

export default Movies;