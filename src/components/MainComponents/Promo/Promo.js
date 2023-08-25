// Promo — компонент с вёрсткой баннера страницы «О проекте».
import React from 'react';
import { ReactComponent as PromoLogo } from '../../../images/promo-logo.svg';

import styles from './Promo.css';

function Promo() {

  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className = {styles.title}>Учебный проект студента факультета <br></br>Веб-разработки.</h1>
          <p className = {styles.text}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <button className = {styles.button}>Узнать больше</button>
      </div>

      <PromoLogo className={styles.logo}/>
    </section>
  );
}

export default Promo;