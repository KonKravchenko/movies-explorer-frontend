// Techs — компонент с использованными технологиями.
import React from 'react';
import styles from './Techs.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import Section from '../Section/Section';
import ParagraphTitle from '../ParagraphTitle/ParagraphTitle';
import ParagraphText from '../ParagraphText/ParagraphText';
import Block from '../Block/Block';

function Techs() {
  const items = [
    { id: 0, name: 'HTML' },
    { id: 1, name: 'CSS' },
    { id: 3, name: 'JS' },
    { id: 4, name: 'React' },
    { id: 5, name: 'Git' },
    { id: 6, name: 'Express.js' },
    { id: 7, name: 'mongoDB' }]


  return (
    <Section>
      <SectionTitle sectionTitle='Технологии' />
      <div className={styles.container}>
        <ParagraphTitle
          paragraphTitle='7 технологий'
          style={styles.title} />
        <ParagraphText
          paragraphText='На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.'
          style={styles.text}
        />
      
      <ul className={styles.blocks}>
        {items.map((item) => {
          return (<Block item={item} key={item.id}/>)
        })}
      </ul>
</div>
    </Section>
  );
}

export default Techs;