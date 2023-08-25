import React from 'react';
import styles from './Header.module.css';
import cx from 'classnames';

import Navigation from '../Navigation/Navigation'
function Header({ loggedIn, isActive, openPopup, movieLink, savedMovieLink }) {


  const headerStyle = !isActive ? (styles.header) : (cx(styles.header, styles.background));
  return (
    <header className={headerStyle}>

      <Navigation
        loggedIn={loggedIn}
        isActive={isActive}
        openPopup={openPopup}
        movieLink={movieLink}
        savedMovieLink={savedMovieLink}
      />
    </header>
  );
}

export default Header;