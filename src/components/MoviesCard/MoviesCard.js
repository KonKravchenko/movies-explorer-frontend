import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MoviesCard.module.css'
import { ReactComponent as TochkaActive } from '../../images/tochka_active.svg';
import { ReactComponent as TochkaDisable } from '../../images/tochka.svg';
import { ReactComponent as DeleteMovieButton } from '../../images/popup_close.svg';


function MoviesCard({ movie, addMovie, handleDeleteMovies, movies }) {
  // console.log(movie)
  const location = useLocation()
  const { country, director, duration, year, description, image: { url }, trailerLink, nameRU, nameEN, id: movieId
  } = movie
  function addMoviesCheckbox() {
    addMovie({
      country, director, duration, year, description,
      image: `https://api.nomoreparties.co${url}`,
      trailerLink, nameRU, nameEN, movieId,
      thumbnail: `https://api.nomoreparties.co${url}`
    })
    
  }

  function getDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours ? `${hours}ч` : ''} ${minutes === 0 ? '' : `${minutes}м`}`.trim()
  }

  function deleteMovie() {
    handleDeleteMovies(movie)
  }

  return (

    <li className={styles.moviesCard} key={movie.id}>

      <a href={trailerLink} target="myTab" className={styles.a}>
        {location.pathname === '/movies'
          ? <div className={styles.moviesCard__image}
            style={{ backgroundImage: `url('https://api.nomoreparties.co${movie.image.url}')` }} />
          : <div className={styles.moviesCard__image}
            style={{ backgroundImage: `url(${movie.image})` }} />
        }
      </a>

      <div className={styles.moviesCard__bottom}>
        <div className={styles.moviesCard__info}>
          <h3 className={styles.moviesCard__title}>{movie.nameRU}</h3>
          <p className={styles.moviesCard__time}>{getDuration(duration)}</p>
        </div>
        {location.pathname === '/movies'
          ? <button className={styles.moviesCard__button} onClick={addMoviesCheckbox} disabled={movie.isSaved}>
            {movie.isSaved ? (<TochkaActive />) : (<TochkaDisable />)}
          </button>
          : <button className={styles.moviesCard__button} onClick={deleteMovie}>
            <DeleteMovieButton />
          </button>}
      </div>
    </li>
  );
}

export default MoviesCard;