import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile_icon.svg';
import cx from 'classnames';

import styles from './Navigation.css';

import { ReactComponent as HeaderLogo } from '../../images/header_logo.svg';

function Navigation({ loggedIn, isActive }) {
  const history = useNavigate();
  function onMain() {
    history('/')
  }

  return (
    <nav className={styles.container}>

      {!isActive ? (<HeaderLogo />) : (<HeaderLogo onClick={onMain} className={styles.logo} />)}

      {!loggedIn &&
        <nav className={styles.nav__auth_container}>
          <NavLink to='/signup'
            className={cx(styles.fonts, styles.link)}
          >Регистрация</NavLink>
          <NavLink to='/signin' >
            <button className={cx(styles.fonts, styles.button)}>Войти</button>
          </NavLink>
        </nav>
      }

      {isActive && (
        loggedIn &&
        <nav className={styles.nav__movies_container}>
          <NavLink to="/movies" className={styles.link__movies}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={styles.link__savedMovies}>Сохранённые фильмы</NavLink>
        </nav>
      )}

      {isActive && (
        loggedIn && <NavLink to="/profile" className={styles.link__profile}>
          <p>Аккаунт</p>
          <ProfileIcon />
        </NavLink>
      )}

      {!isActive && (
        loggedIn &&
        <nav className={styles.nav__movies_container}>
          <NavLink to="/movies" className={styles.link__movies}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={styles.link__savedMovies}>Сохранённые фильмы</NavLink>
          <NavLink to="/profile" className={styles.link__profile}>
            <p>Аккаунт</p>
            <ProfileIcon />
          </NavLink>
        </nav>

      )}
    </nav >
  );
}

export default Navigation;