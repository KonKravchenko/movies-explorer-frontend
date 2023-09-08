import React, { useState } from 'react';
import styles from './MoviesSearch.module.css'
import SearchForm from '../SearchForm/SearchForm';
import FilterChekbox from '../FilterChekbox/FilterChekbox';

function MoviesSearch({ onFilter, setOnFilter, handleMovies, formValue, searchData, searchFun, movies }) {
  const [searchError, setSearchError] = useState('')
  return (

    <div className={styles.moviesSearch}>
      <SearchForm
        handleMovies={handleMovies}
        formValue={formValue}
        setSearchError={setSearchError}
      />
      <hr className={styles.border}></hr>
      <p className={styles.error}>{searchError}</p>
      <FilterChekbox
        onFilter={onFilter}
        setOnFilter={setOnFilter}
        searchFun={searchFun}
        movies={movies}
        searchData={searchData} />
    </div>
  );
}

export default MoviesSearch;