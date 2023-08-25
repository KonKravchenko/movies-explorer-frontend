import React from 'react';
import styles from './ParagraphText.module.css';
import cx from 'classnames';

function Paragraph({ paragraphText, style }) {

  return (

    <p className={cx(styles.text, style)}>{`${paragraphText}`}</p>

  );
}

export default Paragraph;