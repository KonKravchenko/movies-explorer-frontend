// Promo — компонент с вёрсткой баннера страницы «О проекте».
import React from 'react';
import { ReactComponent as PromoLogo } from '../../../images/promo-logo.svg';

function Promo() {

  return (
    <section className="Promo">
      <div className="Promo__container">
        <div className="Promo__header">
          <h1 className = "Promo__title">Учебный проект студента факультета<br></br>Веб-разработки.</h1>
          <p className = "Promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <button className = "Promo__button">Узнать больше</button>
      </div>

      <PromoLogo className="Promo__logo"/>
    </section>
  );
}

export default Promo;