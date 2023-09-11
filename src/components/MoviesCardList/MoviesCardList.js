import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MoviesCardList.module.css'


import MoviesCard from '../MoviesCard/MoviesCard';

const { screen: { width } } = window;
let step = width >= 1280 ? 16 : width <= 1279 && width >= 955 ? 12 : width <= 954 && width >= 768 ? 8 : width <= 767 && 5;

function MoviesCardList({ result, addMovie, handleDeleteMovies }) {
  const location = useLocation();

  const [notFound, setNotFound] = useState(true)

  React.useEffect(() => {
    
    cardsState()
    if (location.pathname === '/movies') {
      const item = localStorage.getItem('SearchHistoryMovies')
      if (item) {
        setNotFound(true)
      } else {
        setNotFound(false)
      }
    } else {
      const item = localStorage.getItem('SearchHistorySavedMovies')
      if (item) {
        setNotFound(true)
      } else {
        setNotFound(false)
      }
    }
  }, [result])

  function cardsState() {
    setShowCards(result.slice(0, step))
  }


  const [showCards, setShowCards] = useState([])
  const [position, setPosition] = useState(step);


  function showMore() {
    const { screen: { width } } = window;
    if (width >= 1280) {
      setShowCards(result.slice(0, position + 4));
      setPosition(position + 4);
    } else if (width <= 1279 && width >= 955) {
      setShowCards(result.slice(0, position + 3));
      setPosition(position + 3);
    } else if (width <= 954) {
      setShowCards(result.slice(0, position + 2));
      setPosition(position + 2);
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleResize() {
    const { screen: { width } } = window;
    if (width >= 1280) {
      step = 16
    } else if (width <= 1279 && width >= 955) {
      step = 12
    } else if (width <= 954 && width >= 768) {
      step = 8
    } else if (width <= 767) {
      step = 5
    }
  }

  
  return (

    <section className={styles.moviesCardList}>
      {location.pathname === '/movies'
        ? <ul className={styles.moviesCardList_container}>
          {result.length >= 1
            ? result.length > step
              ? showCards.map((film) =>
                <MoviesCard
                  movie={film}
                  key={film.id ?? film._id}
                  addMovie={addMovie}
                  movies={result}
                  handleDeleteMovies={handleDeleteMovies}
                />)
              : result.map((film) =>
                <MoviesCard
                  movie={film}
                  key={film.id ?? film._id}
                  addMovie={addMovie}
                  movies={result}
                  handleDeleteMovies={handleDeleteMovies}
                />)
            : notFound ? (<p className={styles.moviesCardList_error} >
              Ничего не найдено
            </p>) : null}
        </ul>
        : <ul className={styles.moviesCardList_container}>
          {result.map((film) =>
            <MoviesCard
              movie={film}
              key={film.id ?? film._id}
              addMovie={addMovie}
              movies={result}
              handleDeleteMovies={handleDeleteMovies}
            />
          )}
        </ul>}
      {location.pathname === '/movies'
        ? (result.length > position
          ? (<button type="button" className={styles.moviesCardList_button} onClick={showMore}>Ещё</button>)
          : null)
        : null}
    </section >
  );
}

export default MoviesCardList;