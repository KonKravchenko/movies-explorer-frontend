import React from 'react';
import styles from './SavedMovies.module.css'
import MoviesSearch from '../MoviesSearch/MoviesSearch'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

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
        <MoviesCardList />
    </section>
  );
}

export default SavedMovies;