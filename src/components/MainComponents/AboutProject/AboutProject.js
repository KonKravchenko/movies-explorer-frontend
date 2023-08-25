// AboutProject — компонент с описанием дипломного проекта.
import React from 'react';
import styles from './AboutProject.css';
import cx from 'classnames';
import SectionTitle from '../SectionTitle/SectionTitle';
import Paragraph from '../Paragraph/Paragraph';
import Section from '../Section/Section'

function AboutProject() {

  return (
    <Section className={styles.section}>
      <SectionTitle sectionTitle='О проекте' />
      <div className={styles.container}>
        <Paragraph
          paragraphTitle='Дипломный проект включал 5 этапов'
          paragraphText='Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.'
        />
        <Paragraph
          paragraphTitle='На выполнение диплома ушло 5 недель'
          paragraphText='У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.' />
      </div>
      <div className={cx(styles.line)}>
        <div className={styles.week}>
          <p className={cx(styles.oneWeek, styles.textAlign, styles.weekFonts)}>1 неделя</p>
          <p className={cx(styles.endFonts, styles.textAlign)}>Back-end</p>
        </div>
        <div className={styles.week}>
          <p className={cx(styles.fourWeek, styles.textAlign, styles.weekFonts)}>4 недели</p>
          <p className={cx(styles.endFonts, styles.textAlign)}>Front-end</p>
        </div>
      </div>

    </Section>
  );
}

export default AboutProject;