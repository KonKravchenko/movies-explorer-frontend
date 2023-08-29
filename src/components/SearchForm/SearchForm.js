import React from 'react';

// import { useForm } from '../../hooks/useForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ReactComponent as SearchButton } from '../../images/search_button.svg';
import styles from './SearchForm.module.css'
import cx from 'classnames';

function SearchForm({ handleMovies, formValue }) {

  const {
    values,
    handleChange,
    // errors,
    isValid,
    resetForm,
  } = useFormAndValidation(formValue)

  // const errorStyle = errors.search ? cx(styles.error, styles.visible) : styles.error


  function handleSubmit(event) {
    event.preventDefault();
    handleMovies(values);
    resetForm();
  }

  function handleDisable(event) {
    event.preventDefault();
    console.log('disable')
    // errors.search = "Введите ключевое слово"
  }

  return (

    <form className={styles.search__form} onSubmit={handleSubmit} noValidate>
      <input
        className={styles.search__input}
        id="search"
        name="search"
        type="text"
        placeholder="Фильм"
        autoComplete="off"
        value={values.search ?? ''}
        onChange={handleChange}
        required
      ></input>

      {isValid && <button type="submit" onSubmit={handleSubmit} className={styles.serch__button}>
        <SearchButton />
      </button>}
      {!isValid && <button type="button" onClick={handleDisable} className={styles.serch__button} disable="true">
        <SearchButton />
      </button>}
      {/* <p className={errorStyle}>{errors.search}</p> */}
    </form>

  );
}

export default SearchForm;