import React from 'react';
import styles from './BurgerPopup.module.css'
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile_icon.svg';
import { ReactComponent as PopupClose } from '../../images/popup_close.svg'

function BurgerPopup({ isOpen, closePopup, mainLink, movieLink, savedMovieLink }) {
  const popup = isOpen ? (cx(styles.popup, styles.opened)) : (styles.popup);
  const burgerPopup = isOpen ? (cx(styles.burgerPopup, styles.opened)) : (styles.burgerPopup);
  const mainLinkStyle = mainLink ? cx(styles.popup__link_border, styles.popup__link_border_visible) : styles.popup__link_border;
  const movieLinkStyle = movieLink ? cx(styles.popup__link_border, styles.popup__link_border_visible) : styles.popup__link_border;
  const savedMovieLinkStyle = savedMovieLink ? cx(styles.popup__link_border, styles.popup__link_border_visible) : styles.popup__link_border;

  return (
    <div className={popup}>
      <div className={burgerPopup}>
        <button className={styles.popup_close_button}>
          <PopupClose onClick={closePopup} />

        </button>
        <nav className={styles.popup__navigation}>

          <nav className={styles.popup__nav_movies_container}>
            <NavLink to="/" className={cx(styles.popup__link)} onClick={closePopup}>
              На главную
              <hr className={mainLinkStyle}></hr>
            </NavLink>
            <NavLink to="/movies" className={styles.popup__link} onClick={closePopup}>
              Фильмы
              <hr className={movieLinkStyle}></hr>
            </NavLink>
            <NavLink to="/saved-movies" className={cx(styles.popup__link)} onClick={closePopup}>
              Сохранённые фильмы
              <hr className={savedMovieLinkStyle}></hr>
            </NavLink>


          </nav>


          <NavLink to="/profile" className={cx(styles.popup__link, styles.popup__link_profile)} onClick={closePopup} >
            <p>Аккаунт</p>
            <ProfileIcon />
          </NavLink>
        </nav>
      </div>
    </div>

  )
}

export default BurgerPopup;