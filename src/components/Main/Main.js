import React from 'react';

import Promo from '../MainComponents/Promo/Promo';
// import NavTab from '../MainComponents/NavTab/NavTab';
import AboutProject from '../MainComponents/AboutProject/AboutProject';
import Techs from '../MainComponents/Techs/Techs';
import AboutMe from '../MainComponents/AboutMe/AboutMe';
import Portfolio from '../MainComponents/Portfolio/Portfolio';
import styles from './Main.module.css'

function Main({ setHeadHidden, setFootHidden, setIsActive, handleMainLink }) {
  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(false)
    handleMainLink()
  })

  return (
    <div className={styles.main}>
      {/* // <div> */}
      <Promo />         {/* Promo — компонент с вёрсткой баннера страницы «О проекте». */}
      {/* <NavTab />        NavTab — компонент с навигацией по странице «О проекте». */}
      <AboutProject />  {/* AboutProject — компонент с описанием дипломного проекта. */}
      <Techs />         {/* Techs — компонент с использованными технологиями. */}
      <AboutMe />       {/* AboutMe — компонент с информацией о студенте. */}
      <Portfolio />     {/* Portfolio — компонент со ссылками на другие проекты. */}
    </div>
  );
}

export default Main;