import React from 'react';
import styles from './Movies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ setHeadHidden, setFootHidden, setIsActive, onFilter, setOnFilter, addMovies, setAddMovies, handleMovieLink  }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleMovieLink()
  })

  return (
    <section className={styles.movies}>
      <MoviesSearch
        onFilter={onFilter}
        setOnFilter={setOnFilter} />
      <MoviesCardList
      addMovies={addMovies}
      setAddMovies={setAddMovies}
      />
    </section>
  );
}

export default Movies;