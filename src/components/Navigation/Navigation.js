import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile_icon.svg';
import { ReactComponent as Burger } from '../../images/burger.svg'
import cx from 'classnames';

import styles from './Navigation.module.css';

import { ReactComponent as HeaderLogo } from '../../images/header_logo.svg';

function Navigation({ loggedIn, isActive, openPopup, movieLink, savedMovieLink }) {

  const movieLinkStyle = movieLink ? cx(styles.link__movies, styles.link_active) : styles.link__movies;
  const savedMovieLinkStyle = savedMovieLink ? cx(styles.link__savedMovies, styles.link_active) : styles.link__savedMovies;

  const history = useNavigate();
  function onMain() {
    history('/')
  }

  return (
    <nav className={styles.container}>

      {!isActive ? (<HeaderLogo />) : (<HeaderLogo onClick={onMain} className={styles.logo} />)}


      {loggedIn &&
        <button className={styles.burger} onClick={openPopup}>
          <Burger />
        </button>
      }


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
          <NavLink to="/movies" className={movieLinkStyle}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={savedMovieLinkStyle}>Сохранённые фильмы</NavLink>
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
          <NavLink to="/movies" className={movieLinkStyle}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={savedMovieLinkStyle}>Сохранённые фильмы</NavLink>
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