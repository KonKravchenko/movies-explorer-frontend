import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ReactComponent as SearchButton } from '../../images/search_button.svg';
import styles from './SearchForm.module.css'

function SearchForm({ handleMovies, formValue, setSearchError }) {

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
    resetForm();
  }

  function handleDisable(event) {
    event.preventDefault();
    console.log('disable')
    setSearchError("Введите ключевое слово")
  }

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