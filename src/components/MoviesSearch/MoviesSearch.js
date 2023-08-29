import React from 'react';
import styles from './MoviesSearch.module.css'
import SearchForm from '../SearchForm/SearchForm';
import FilterChekbox from '../FilterChekbox/FilterChekbox';

function MoviesSearch({ onFilter, setOnFilter, handleMovies, formValue}) {

  return (

    <div className={styles.moviesSearch}>
      <SearchForm 
      handleMovies={handleMovies}
      formValue={formValue}
      />
      <hr className={styles.border}></hr>
      <FilterChekbox
        onFilter={onFilter}
        setOnFilter={setOnFilter} />
    </div>
  );
}

export default MoviesSearch;