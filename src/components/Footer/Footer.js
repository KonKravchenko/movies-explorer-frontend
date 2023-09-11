import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Footer.module.css';


function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={cx(styles.footer__title, styles.footer__font)}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className={styles.footer__bottom}>
          <p className={cx(styles.footer__copiright, styles.footer__font)}>© 2023</p>
          <nav className={styles.footer__nav}>
            <Link to='https://practicum.yandex.ru/' className={cx(styles.footer__link, styles.footer__font)}>Яндекс.Практикум</Link>
            <Link to='https://github.com/' className={cx(styles.footer__link, styles.footer__font)}>Github</Link>
          </nav>
        </div>
      </div>

    </footer >
  );
}

export default Footer;