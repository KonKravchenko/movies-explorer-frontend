import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ReactComponent as SearchButton } from '../../images/search_button.svg';
import styles from './SearchForm.module.css'

function SearchForm({ handleMovies, formValue, setSearchError }) {

  const location = useLocation();

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation(formValue)

  React.useEffect(() => {
    if (values.search !== '') {
      setSearchError(errors.search)
    }
  }, [handleChange])

  function handleSubmit(event) {
    event.preventDefault();
    handleMovies(values);
  }

  function handleDisable(event) {
    event.preventDefault();
    console.log('disable')
    setSearchError("Введите ключевое слово")
  }

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      const item = localStorage.getItem('MoviesSearchValue')
      if (item) {
        const local = JSON.parse(item)
        values.search = local.searchValue.search
      }
    } else {
      const item = localStorage.getItem('SavedMoviesSearchValue')
      if (item) {
        const local = JSON.parse(item)
        values.search = local.searchValue.search
      }
    }

  }, [])

  return (

    <form className={styles.search__form} onSubmit={isValid && values.search !== '' ? handleSubmit : handleDisable} noValidate>
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
        noValidate
      ></input>

      {isValid && values.search !== ''
        ? (<button type="submit" onSubmit={handleSubmit} className={styles.serch__button}>
          <SearchButton />
        </button>)
        : (<button type="button" onClick={handleDisable} className={styles.serch__button} disable="true">
          <SearchButton />
        </button>)}
    </form>

  );
}

export default SearchForm;