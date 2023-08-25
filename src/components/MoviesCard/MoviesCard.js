import React from 'react';
import styles from './MoviesCard.module.css'
import { ReactComponent as TochkaActive } from '../../images/tochka_active.svg';
import { ReactComponent as TochkaDisable } from '../../images/tochka.svg';



function MoviesCard({ addMovies, setAddMovies }) {

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
    <div className={styles.moviesCard}>
      <div className={styles.moviesCard__image}
        style={{
          backgroundImage: `url(https://traveltimes.ru/wp-content/uploads/2021/11/marseille-4950003_1280.jpg)`,
        }}>

      </div>
      <div className={styles.moviesCard__bottom}>
        <div className={styles.moviesCard__info}>
          <h3 className={styles.moviesCard__title}>Название</h3>
          <p className={styles.moviesCard__time}>Время</p>
        </div>
        <button className={styles.moviesCard__tochka} onClick={toogleaMoviesCheckbox}>
          {addMovies ? (<TochkaActive />) : (<TochkaDisable />)}
        </button>
      </div>
    </div>
  );
}

export default MoviesCard;