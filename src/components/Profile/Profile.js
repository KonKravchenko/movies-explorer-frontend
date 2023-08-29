import React from 'react';
import styles from './Profile.module.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ setHeadHidden, setFootHidden, setIsActive, handleLogout }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(true)
    setIsActive(true)
  })

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className={styles.profile}>
      <h2 className={styles.profile__title}>Привет, {`${currentUser.name}`}!</h2>
      <div className={styles.profile__form_container}>
        <form className={styles.profile__form}>
          <label className={styles.profile__label}>Имя</label>
          <input
            className={styles.profile__input}
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            autoComplete="off"
            minLength="2"
            maxLength="30"
            value={currentUser.name}
          ></input>
        </form>
        <hr className={styles.border}></hr>
        <form className={styles.profile__form}>
          <label className={styles.profile__label}>E-mail</label>
          <input
            className={styles.profile__input}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={currentUser.email}
          ></input>
        </form>
      </div>

      <p className={styles.error}>Здесь будет текст ошибки после отправки запроса</p>
      <div className={styles.profile__button_container}>
        <button className={styles.profile__button_change}>Редактировать</button>
        <button className={styles.profile__button_signout} type="button" onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;