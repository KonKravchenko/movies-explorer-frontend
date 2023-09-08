import React, { useState } from 'react';
import styles from './Movies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function Movies({
  setHeadHidden,
  setFootHidden,
  setIsActive,
  onFilter,
  setOnFilter,
  handleMovieLink,
  searchResult,
  setSearchResult,
  checkSavedMovies,
  isLoading,
  setIsLoading
}) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleMovieLink()
  }, [])

  const [movies, setMovies] = useState([])

  function getAllMovies(search) {
    moviesApi.getMovies()
      .then((data) => {
        setMovies(data)
        localStorage.setItem('Movies', JSON.stringify({ data }))

        searchFun(search, data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    const searchHistory = localStorage.getItem('SearchHistory')
    if (searchHistory) {
      const local = JSON.parse(searchHistory)
      setSearchResult(local.data)
    }
  }, [])


  const [formValue, setFormValue] = useState({
    search: ''
  })

  function handleMovies(search) {
    setIsLoading(true)
    const localMovies = localStorage.getItem('Movies')

    if (localMovies) {
      const local = JSON.parse(localMovies)
      setMovies(local.data)
      searchFun(search, movies)
    }
    else { getAllMovies(search) }
  }

  const [searchData, setSearchData] = useState('')

  function searchFun(search, film) {
    setSearchData(search)
    const result = film.filter(data =>
      (data.nameRU || data.nameEN).toLowerCase().includes(search.search)
    );
    const filter = localStorage.getItem('filter')
    console.log('filter d ', filter)
    if (filter) {
      console.log('включен', filter)
      shortFilm(result)
    } else {
      console.log('выключен', filter)
      checkSavedMovies(result)
    }
  }

  function shortFilm(result) {
    const shortFilms = result.filter(data =>
      data.duration < 40)
    setSearchResult(shortFilms)
    setIsLoading(false)
  }


  function addMovie(data) {
    mainApi.addMovie(data)
      .then((res) => {
        checkSavedMovies(searchResult)
        console.log(res)
      })
      .catch(err => {
        console.log('err', err)
        console.log('data', data)
      })
  }



  return (
    <section className={styles.movies}>
      <MoviesSearch
        onFilter={onFilter}
        setOnFilter={setOnFilter}
        handleMovies={handleMovies}
        formValue={formValue}
        searchData={searchData}
        searchFun={searchFun}
        movies={movies}
      />
      {isLoading ? (<Preloader />) : null}
      {searchResult && !isLoading ? (<MoviesCardList result={searchResult} addMovie={addMovie} />) : null}
    </section>
  );
}

export default Movies;