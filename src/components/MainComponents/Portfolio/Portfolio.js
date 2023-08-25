// Portfolio — компонент со ссылками на другие проекты.
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section/Section'
import styles from './Portfolio.module.css'
import SectionTitle from '../SectionTitle/SectionTitle';

import ParagraphText from '../ParagraphText/ParagraphText';
import { ReactComponent as PortfolioArrow } from '../../../images/portfolio_arrow.svg';

function Portfolio() {

  return (
   <Section style={styles.portfolio}>
    
        <SectionTitle
          style={styles.portfolio__title}
          sectionTitle='Портфолио' />
        <nav className={styles.portfolio__link_container}>
          <Link
            to='https://konkravchenko.github.io/how-to-learn/'
            target="_blank"
            className={styles.portfolio__link}>
            <ParagraphText
              paragraphText='Статичный сайт'
              style={styles.portfolio__link_text} />
            <PortfolioArrow />
          </Link>
          <hr className={styles.portfolio__link_border}></hr>
          <Link
            to='https://konkravchenko.github.io/russian-travel/'
            target="_blank"
            className={styles.portfolio__link}>
            <ParagraphText
              paragraphText='Адаптивный сайт'
              style={styles.portfolio__link_text} />
            <PortfolioArrow />
          </Link>
          <hr className={styles.portfolio__link_border}></hr>
          <Link to='https://konkravchenko.nomoreparties.sbs/'
            target="_blank"
            className={styles.portfolio__link}>
            <ParagraphText
              paragraphText='Одностраничное приложение'
              style={styles.portfolio__link_text} />
            <PortfolioArrow />
          </Link>
        </nav>
      
   </Section>
  );
}

export default Portfolio;