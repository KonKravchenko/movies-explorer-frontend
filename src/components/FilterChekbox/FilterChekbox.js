import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import styles from './FilterChekbox.module.css'
import { ReactComponent as FilterCheckboxActive } from '../../images/FilterChekbox_active.svg';
import { ReactComponent as FilterCheckboxDisable } from '../../images/FilterChekbox_disable.svg';

function FilterChekbox({ searchFun, movies, searchData}) {
  const location = useLocation();

  const [onFilter, setOnFilter] = useState(false);

  function onFilterCheckbox() {
    if (location.pathname === '/movies') {
      localStorage.setItem('FilterMovies', JSON.stringify(true))
      setOnFilter(true)
      searchFun(searchData, movies)
      console.log(searchData, movies)
    } else {
      localStorage.setItem('FilterSavedMovies', JSON.stringify(true))
      setOnFilter(true)
      searchFun(searchData, movies)
    }

  }

  function offFilterChekbox() {
    if (location.pathname === '/movies') {
      localStorage.removeItem('FilterMovies')
      setOnFilter(false)
      searchFun(searchData, movies)
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