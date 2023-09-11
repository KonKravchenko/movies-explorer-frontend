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
  setIsLoading,
  savedMovies,
  setSavedMovies,
  searchSavedMovies,
  setSearchSavedMovies
}) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleSavedMovieLink()
  }, [])


  function getSavedMovies() {
    setIsLoading(true)
    mainApi.getSavedMovies()
      .then((userMovies) => {
        localStorage.setItem('UserMovies', JSON.stringify({ userMovies }))

        setSavedMovies(userMovies)
        setSearchSavedMovies(userMovies)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  React.useEffect(() => {
    localStorage.removeItem('SearchHistorySavedMovies')
    localStorage.removeItem('SavedMoviesSearchValue')
    localStorage.removeItem('FilterSavedMovies')
    const item = localStorage.getItem('UserMovies')

    if (item) {
      const local = JSON.parse(item)
      setSearchSavedMovies(local.userMovies)
      setSavedMovies(local.userMovies)
    } else {
      getSavedMovies()
    }
  }, [])


  function handleDeleteMovies(film) {
    console.log(film)
    mainApi.deleteMovie(film._id)
      .then((res) => {
        const userMovies = savedMovies.filter(function item(c) { if (c._id !== film._id) { return c } })
        const searchUserMovies = searchSavedMovies.filter(function item(c) { if (c._id !== film._id) { return c } })
        setSavedMovies(userMovies)
        setSearchSavedMovies(searchUserMovies)
        localStorage.setItem('UserMovies', JSON.stringify({ userMovies }))
        if (searchResult) {
          checkSavedMovies(searchResult)
        }

      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }



  const [formValue, setFormValue] = useState({
    search: ''
  })


  function handleMovies(search) {

    const searchValue = search
    localStorage.setItem('SavedMoviesSearchValue', JSON.stringify({ searchValue }))
    const item = search.search.toLowerCase()
    searchFun(item, savedMovies)
  }

  const [searchData, setSearchData] = useState('')

  function searchFun(search, film) {
    setSearchData(search)
    if (search === '') {
      shortFilm(film)
    } else {
      const result = film.filter(data =>
        (data.nameRU || data.nameEN).toLowerCase().includes(search.toLowerCase())
      );
      const filter = localStorage.getItem('FilterSavedMovies')
      if (filter) {
        shortFilm(result)
      } else {
        setSearchSavedMovies(result)
        localStorage.setItem('SearchHistorySavedMovies', JSON.stringify({ result }))
      }
    }
  }

  function shortFilm(result) {
    const filter = localStorage.getItem('FilterSavedMovies')
    if (filter) {
      const shortFilms = result.filter(data =>
        data.duration < 40)
      setSearchSavedMovies(shortFilms)
    } else {
      setSearchSavedMovies(savedMovies)
    }
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
      {!isLoading ? (<MoviesCardList result={searchSavedMovies} handleDeleteMovies={handleDeleteMovies} />) : null}
    </section>
  );
}

export default SavedMovies;