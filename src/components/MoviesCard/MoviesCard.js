import React from 'react';
import styles from './MoviesCard.module.css'
import { ReactComponent as TochkaActive } from '../../images/tochka_active.svg';
import { ReactComponent as TochkaDisable } from '../../images/tochka.svg';



function MoviesCard({ addMovies, setAddMovies, movie }) {
 
    function addMoviesCheckbox() {
    setAddMovies(true)
  }

  function remMoviesCheckbox() {
    setAddMovies(false)
  }

  function toogleaMoviesCheckbox() {
    !addMovies ? addMoviesCheckbox() : remMoviesCheckbox()
  }

  return (
    
    <li className={styles.moviesCard} key={movie.id}>
      <div className={styles.moviesCard__image}
        style={{
          backgroundImage: `url('https://api.nomoreparties.co${movie.image.url}')`,
        }}>
      </div>
      <div className={styles.moviesCard__bottom}>
        <div className={styles.moviesCard__info}>
          <h3 className={styles.moviesCard__title}>{movie.nameRU}</h3>
          <p className={styles.moviesCard__time}>{movie.duration}</p>
        </div>
        <button className={styles.moviesCard__tochka} onClick={toogleaMoviesCheckbox}>
          {addMovies ? (<TochkaActive />) : (<TochkaDisable />)}
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;