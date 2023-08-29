import React from 'react';
import styles from './ParagraphTitle.module.css';
import cx from 'classnames';

function Paragraph ({paragraphTitle, style}) {

  return(
    
      <h2 className={cx(styles.title, style)}>{`${paragraphTitle}`}</h2>
      
    
  );
}

export default Paragraph;