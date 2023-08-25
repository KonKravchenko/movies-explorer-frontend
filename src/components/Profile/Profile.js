import React from 'react';
import styles from './Profile.css'

function Profile({ setHeadHidden, setFootHidden, setIsActive }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(true)
    setIsActive(true)
  })

  return (
    <section className={styles.profile}>
      <h2 className={styles.profile__title}>Привет, Виталий!</h2>
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
          ></input>
        </form>
      </div>


      <div className={styles.profile__button_container}>
        <button className={styles.profile__button_change}>Редактировать</button>
        <button className={styles.profile__button_signout}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;