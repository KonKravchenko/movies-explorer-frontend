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
  }, [])

  const [savedMovies, setSavedMovies] = useState([]);


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
    const item = localStorage.getItem('UserMovies')
    if (item) {
      const local = JSON.parse(item)
      setSavedMovies(local.userMovies)
      setSearchSavedMovies(null)
    } else { getSavedMovies() }
  }, [])


  function handleDeleteMovies(film) {
    console.log(film)
    mainApi.deleteMovie(film._id)
      .then((res) => {
        const userMovies = savedMovies.filter(function item(c) { if (c._id !== film._id) { return c } })
        setSavedMovies(userMovies)
        localStorage.setItem('UserMovies', JSON.stringify({ userMovies }))
        checkSavedMovies(searchResult)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }


  const [searchSavedMovies, setSearchSavedMovies] = useState([])
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
        (data.nameRU || data.nameEN).toLowerCase().includes(search)
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
      {searchResult && !isLoading ? (<MoviesCardList result={searchSavedMovies ? searchSavedMovies : savedMovies} handleDeleteMovies={handleDeleteMovies} />) : null}
    </section>
  );
}

export default SavedMovies;