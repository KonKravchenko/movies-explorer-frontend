// AboutMe — компонент с информацией о студенте.
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import styles from './AboutMe.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import ParagraphTitle from '../ParagraphTitle/ParagraphTitle';
import ParagraphText from '../ParagraphText/ParagraphText';
import { ReactComponent as ProfileFoto } from '../../../images/profile_foto.svg';


function AboutMe() {

  return (
    <Section style={styles.aboutMe}>
      <SectionTitle sectionTitle='Студент' />

      <div className={styles.aboutStudent}>
        <div className={styles.studentInfo}>
          <ParagraphTitle
            style={styles.studentInfo__name}
            paragraphTitle='Виталий' />
          <ParagraphText
            style={styles.studentInfo__profession}
            paragraphText='Фронтенд-разработчик, 30 лет' />
          <ParagraphText
            style={styles.studentInfo__about}
            paragraphText='Я родился и живу в Саратове,
       закончил факультет экономики СГУ.
       У меня есть жена и дочь. Я люблю слушать музыку, 
       а ещё увлекаюсь бегом. Недавно начал кодить. 
       С 2015 года работал в компании «СКБ Контур». 
       После того, как прошёл курс по веб-разработке, 
       начал заниматься фриланс-заказами и ушёл с постоянной работы.'/>

          <Link to='https://github.com/KonKravchenko'
            className={styles.aboutMe__link}
            target="_blank" rel="noreferrer"
          >Github</Link>
        </div>
        <ProfileFoto className={styles.profile_image} />
      </div>

      


    </Section >
  );
}

export default AboutMe;