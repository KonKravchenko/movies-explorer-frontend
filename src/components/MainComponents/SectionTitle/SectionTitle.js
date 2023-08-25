import React from 'react';
import styles from './SectionTitle.css';

function SectionTitle ({sectionTitle}) {

  return (
    <h2 className={styles.title}>{`${sectionTitle}`}</h2>
  );
}

export default SectionTitle;