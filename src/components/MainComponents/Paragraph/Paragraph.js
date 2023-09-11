import React from 'react';
import styles from './Paragraph.module.css';
import ParagraphTitle from '../ParagraphTitle/ParagraphTitle';
import ParagraphText from '../ParagraphText/ParagraphText';

function Paragraph({ paragraphTitle, paragraphText }) {

  return (
    <div className={styles.container}>
      <ParagraphTitle paragraphTitle={paragraphTitle} />
      <ParagraphText paragraphText={paragraphText} />
    </div>
  );
}

export default Paragraph;