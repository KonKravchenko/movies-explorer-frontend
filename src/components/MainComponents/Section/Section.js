import React from 'react';
import styles from './Section.module.css';
import cx from 'classnames';
// import Title from '../Title/Title'
// import Paragraph from '../Paragraph/Paragraph';


function Section({ children, style }) {

  return (
    <section className={cx(styles.section, style)}>
      {children}
    </section>
  );
}

export default Section;
