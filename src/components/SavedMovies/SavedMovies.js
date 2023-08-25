import React from 'react';
import styles from './SavedMovies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch'

function SavedMovies({ setHeadHidden, setFootHidden, setIsActive, onFilter, setOnFilter, handleSavedMovieLink }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
    handleSavedMovieLink()
  })

  return (
    <section className={styles.savedMovies}>
      <MoviesSearch
        onFilter={onFilter}
        setOnFilter={setOnFilter} />
    </section>
  );
}

export default SavedMovies;