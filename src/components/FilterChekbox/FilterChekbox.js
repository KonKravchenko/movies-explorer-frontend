import React, { useState } from 'react';
import styles from './FilterChekbox.module.css'
import { ReactComponent as FilterCheckboxActive } from '../../images/FilterChekbox_active.svg';
import { ReactComponent as FilterCheckboxDisable } from '../../images/FilterChekbox_disable.svg';

function FilterChekbox({ searchFun, movies, searchData }) {
  const [onFilter, setOnFilter] = useState(false);

  function onFilterCheckbox() {
    localStorage.setItem('filter', JSON.stringify(true))
    setOnFilter(true)
    searchFun(searchData, movies)
  }

  function offFilterChekbox() {
    localStorage.removeItem('filter')
    setOnFilter(false)
    searchFun(searchData, movies)
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