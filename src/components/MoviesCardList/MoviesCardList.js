import React from 'react';
import styles from './MoviesCardList.module.css'

function MoviesCardList({ children }) {


  return (
    <ul className={styles.moviesCardList}>
      {children}
    </ul>
  );
}

export default MoviesCardList;