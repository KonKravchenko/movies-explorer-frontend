// Promo — компонент с вёрсткой баннера страницы «О проекте».
import React from 'react';
import { ReactComponent as PromoLogo } from '../../../images/promo-logo.svg';
import Section from '../Section/Section'
import styles from './Promo.module.css';


function Promo() {

  return (
    <Section style={styles.promo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Учебный проект студента факультета Веб-разработки.</h1>
          <p className={styles.text}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <button className={styles.button}>Узнать больше</button>
      </div>

      <PromoLogo className={styles.logo} />
    </Section>
  );
}

export default Promo;