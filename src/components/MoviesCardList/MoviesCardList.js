import React from 'react';
import styles from './MoviesCardList.module.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ addMovies, setAddMovies }) {


  return (
    <section className={styles.moviesCardList}>
      <MoviesCard
        addMovies={addMovies}
        setAddMovies={setAddMovies}
      />
    </section>
  );
}

export default MoviesCardList;