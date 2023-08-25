import React from 'react';
import styles from './Block.module.css'

function Block({ item }) {
  return (
    <li className={styles.block} key={item.id}>{`${item.name}`}</li>
  );
}

export default Block;