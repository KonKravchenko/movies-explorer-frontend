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
    const searchHistory = localStorage.getItem('SearchHistoryMovies')
    if (searchHistory) {
      const local = JSON.parse(searchHistory)
      setSearchResult(local.data)
    }
  }, [])


  const [formValue, setFormValue] = useState({
    search: ''
  })

  function handleMovies(search) {
    localStorage.setItem('SearchHistoryMovies', JSON.stringify('data'))
    const searchValue = search
    localStorage.setItem('MoviesSearchValue', JSON.stringify({ searchValue }))
    const item = search.search.toLowerCase()
    setIsLoading(true)
    const localMovies = localStorage.getItem('Movies')

    if (localMovies) {
      const local = JSON.parse(localMovies)
      setMovies(local.data)
      searchFun(item, local.data)
    }
    else { getAllMovies(item) }
  }

  const [searchData, setSearchData] = useState('')

  function searchFun(search, film) {
    setSearchData(search)

    const result = film.filter(data =>
      (data.nameRU || data.nameEN).toLowerCase().includes(search)
    );

    const filter = localStorage.getItem('FilterMovies')

    if (filter) {
      shortFilm(result)
      console.log('short')
    } else {
      checkSavedMovies(result)
      console.log('res')
    }
  }

  const [short, setShort] = useState([])

  function shortFilm(result) {
    setIsLoading(true)
    const shortFilms = result.filter(data =>
      data.duration < 40)
    console.log('крокозябра', shortFilms)
    setShort(shortFilms)

    setIsLoading(false)
  }


  function addMovie(data) {
    mainApi.addMovie(data)
      .then((res) => {
        checkSavedMovies(searchResult)
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