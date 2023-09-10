import React, { useState } from 'react';
import styles from './Profile.module.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import cx from 'classnames';

function Profile({ profileChange, setProfileChange, setHeadHidden, setFootHidden, setIsActive, handleLogout, changeProfileData, status, setStatus }) {

  const currentUser = React.useContext(CurrentUserContext);

  const errorText =
    status === 200 ? 'Данные успешно изменены' :
      status === 409 ? 'Пользователь с таким email уже существует' :
        status === 400 ? 'При обновлении профиля произошла ошибка' :
          status === 500 ? 'При обновлении профиля произошла ошибка' : '';

  React.useEffect(() => {
    setStatus('')
  }, [])

  const errorStyle = status === 200 ? styles.done : styles.error;
  
  const {
    values,
    handleChange,
    errors,
    isValid,
    // resetForm,
    setValues,
    setIsValid
  } = useFormAndValidation(currentUser)


  React.useEffect(() => {
    setValues(currentUser)
  }, [currentUser]);

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(true)
    setIsActive(true)
    setProfileChange(false)
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const { name, email } = values;
    changeProfileData({ name, email });

  }

  function change() {
    setStatus('')
    values.name = currentUser.name
    values.email = currentUser.email
    !profileChange ? setProfileChange(true) : setProfileChange(false)
  }

  const buttonSaveStyle = isValid && (values.name !== currentUser.name || values.email !== currentUser.email)
    ? cx(styles.profile__button_save, styles.enable__button_save)
    : cx(styles.profile__button_save, styles.disable__button_save)
  const formContainerStyle = profileChange ? cx(styles.profile__form_container, styles.profile__f_con_change) : styles.profile__form_container;



  return (
    <section className={styles.profile}>
      <h2 className={styles.profile__title}>Привет, {`${currentUser.name}`}!</h2>
      <div className={formContainerStyle}>
        <form className={styles.profile__form} onSubmit={handleSubmit}>
          <label className={styles.profile__label}>Имя</label>
          {!profileChange ?
            (<p className={styles.profile__text}>{currentUser.name}</p>)
            :
            (<input
              className={styles.profile__input}
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              autoComplete="off"
              minLength="2"
              maxLength="30"
              value={values.name}
              onChange={handleChange}
              required
              noValidate
            />)}

        </form>

        <hr className={styles.border}></hr>
        <form className={styles.profile__form} onSubmit={handleSubmit}>
          <label className={styles.profile__label}>E-mail</label>
          {!profileChange ?
            (<p className={styles.profile__text}>{currentUser.email}</p>)
            :
            (<input
              className={styles.profile__input}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              required
              noValidate
            ></input>)}

        </form>

      </div>

      <div className={styles.profile__button_container}>
        <p className={errorStyle}>{errorText}</p>
        {profileChange
          ? (<button
            type="submit"
            onClick={handleSubmit}
            disabled={!(isValid && (values.name !== currentUser.name || values.email !== currentUser.email))}
            className={buttonSaveStyle}>
            Сохранить
          </button>)
          : (<button className={styles.profile__button_change} type="submit" onClick={change}>Редактировать</button>)}
        {profileChange
          ? (<button className={styles.profile__button_red} type="button" onClick={change}>Отменить</button>)
          : (<button className={styles.profile__button_red} type="button" onClick={handleLogout}>Выйти из аккаунта</button>)}
      </div>
    </section >
  );
}

export default Profile;