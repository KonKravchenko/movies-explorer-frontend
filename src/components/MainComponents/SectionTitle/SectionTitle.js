import React from 'react';
import styles from './SectionTitle.module.css';
import cx from 'classnames'

function SectionTitle ({sectionTitle, style}) {

  return (
    <h2 className={cx(styles.title, style)}>{`${sectionTitle}`}</h2>
  );
}

export default SectionTitle;