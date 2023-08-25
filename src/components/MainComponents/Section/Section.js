import React from 'react';
import styles from './Section.css';
import cx from 'classnames';
// import Title from '../Title/Title'
// import Paragraph from '../Paragraph/Paragraph';


function Section({ children, style }) {

  return (
    <div className={cx(styles.section, style)}>
      {children}
    </div>
  );
}

export default Section;
