import React, { useState } from 'react';
import styles from './MoviesCardList.module.css'


import MoviesCard from '../MoviesCard/MoviesCard';

const { screen: { width } } = window;
let step = width >= 1280 ? 16 : width <= 1279 && width >= 955 ? 12 : width <= 954 && width >= 788 ? 8 : width <= 767 ? 5 : 5;

function MoviesCardList({ result, addMovie }) {
  console.log(result)
  const [showCards, setShowCards] = useState(result.slice(0, step))
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
    console.log(width)
  }


  return (
    <section className={styles.moviesCardList}>
      <ul className={styles.moviesCardList_container}>
        {result.length >= 1
          ? showCards.map((film) =>
            <MoviesCard
              movie={film}
              key={film.id ?? film._id}
              addMovie={addMovie}
              movies={result}
            />)
          : (<p className={styles.moviesCardList_error} >
            Ничего не найдено
          </p>)}
      </ul>
      {result.length > position
        ? (<button type="button" className={styles.moviesCardList_button} onClick={showMore}>Ещё</button>)
        : null}

    </section>
  );
}

export default MoviesCardList;