import React from 'react';
import styles from './Section.module.css';
import cx from 'classnames';

function Section({ children, style }) {

  return (
    <section className={cx(styles.section, style)}>
      {children}
    </section>
  );
}

export default Section;
