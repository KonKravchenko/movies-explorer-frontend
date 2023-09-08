import React, { useState } from 'react';
import styles from './SavedMovies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  setHeadHidden,
  setFootHidden,
  setIsActive,
  onFilter,
  setOnFilter,
  handleSavedMovieLink,
  searchResult,
  checkSavedMovies,
  isLoading,
  setIsLoading
}) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleSavedMovieLink()
    getSavedMovies()
  }, [])

  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([])

  function getSavedMovies() {
    setIsLoading(true)
    mainApi.getSavedMovies()
      .then((data) => {
        setSavedMovies(data)
        setSearchSavedMovies(data)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const [formValue, setFormValue] = useState({
    search: ''
  })

  function handleMovies(search) {
    searchFun(search, savedMovies)
  }

  const [searchData, setSearchData] = useState('')

  function searchFun(search, film) {
    setSearchData(search)
    if (search === '') {
      shortFilm(film)
    } else {
      const result = film.filter(data =>
        (data.nameRU || data.nameEN).toLowerCase().includes(search.search)
      );
      const filter = localStorage.getItem('filter')
      if (filter) {
        shortFilm(result)
      } else {
        setSearchSavedMovies(result)
      }
    }
  }

  function shortFilm(result) {
    const filter = localStorage.getItem('filter')
    if (filter) {
      const shortFilms = result.filter(data =>
        data.duration < 40)
      setSearchSavedMovies(shortFilms)
    } else {
      setSearchSavedMovies(savedMovies)
    }
  }

  function handleDeleteMovies(data) {
    mainApi.deleteMovie(data._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter(function item(c) { if (c._id !== data._id) { return c } }))
        checkSavedMovies(searchResult)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  return (
    <section className={styles.savedMovies}>
      <MoviesSearch
        onFilter={onFilter}
        setOnFilter={setOnFilter}
        formValue={formValue}
        handleMovies={handleMovies}
        searchData={searchData}
        searchFun={searchFun}
        movies={savedMovies} />
      {isLoading ? (<Preloader />) : null}
      {searchResult && !isLoading ? (<MoviesCardList result={searchSavedMovies} handleDeleteMovies={handleDeleteMovies} />) : null}
    </section>
  );
}

export default SavedMovies;