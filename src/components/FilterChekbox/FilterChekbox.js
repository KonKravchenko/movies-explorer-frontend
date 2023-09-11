import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import styles from './FilterChekbox.module.css'
import { ReactComponent as FilterCheckboxActive } from '../../images/FilterChekbox_active.svg';
import { ReactComponent as FilterCheckboxDisable } from '../../images/FilterChekbox_disable.svg';

function FilterChekbox({ searchFun, movies, searchData }) {
  const location = useLocation();

  const [onFilter, setOnFilter] = useState(false);

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      const item = localStorage.getItem('FilterMovies')
      if (item) { onFilterCheckbox() }
    } else {
      const item = localStorage.getItem('FilterSavedMovies')
      if (item) { onFilterCheckbox() }
    }
  }, [])


  function onFilterCheckbox() {
    if (location.pathname === '/movies') {

      const searchValues = localStorage.getItem('MoviesSearchValue')
      const localValue = JSON.parse(searchValues)

      if (localValue) {
        localStorage.setItem('FilterMovies', JSON.stringify(true))
        setOnFilter(true)
        searchFun(localValue.searchValue.search, movies)
      } else {
        localStorage.setItem('FilterMovies', JSON.stringify(true))
        setOnFilter(true)
      }

    } else {
      localStorage.setItem('FilterSavedMovies', JSON.stringify(true))
      setOnFilter(true)
      searchFun(searchData, movies)

    }
  }

  function offFilterChekbox() {
    if (location.pathname === '/movies') {
      const searchValues = localStorage.getItem('MoviesSearchValue')
      const localValue = JSON.parse(searchValues)

      if (localValue) {
        localStorage.removeItem('FilterMovies')
        setOnFilter(false)
        searchFun(localValue.searchValue.search, movies)
      } else {
        localStorage.removeItem('FilterMovies')
        setOnFilter(false)
      }
    } else {
      localStorage.removeItem('FilterSavedMovies')
      setOnFilter(false)
      searchFun(searchData, movies)
    }
  }

  return (
    <div className={styles.filterChekbox__container}>
      {onFilter
        ? <button className={styles.chekbox} onClick={offFilterChekbox}>
          <FilterCheckboxActive />
        </button>
        : <button className={styles.chekbox} onClick={onFilterCheckbox}>
          <FilterCheckboxDisable />
        </button>}

      <p className={styles.text}>Короткометражки</p>
    </div>
  );
}

export default FilterChekbox;