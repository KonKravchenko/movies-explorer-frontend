import React from 'react';
import { ReactComponent as SearchButton } from '../../images/search_button.svg'
import styles from './SearchForm.module.css'

function SearchForm() {


  return (

    <form className={styles.search__form}>
      <input
        className={styles.search__input}
        id="search"
        name="search"
        type="text"
        placeholder="Фильм"
        autoComplete="off"></input>
      <button className={styles.serch__button}>
        <SearchButton />
      </button>
    </form>

  );
}

export default SearchForm;