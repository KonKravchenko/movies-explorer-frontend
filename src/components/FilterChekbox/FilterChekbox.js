import React from 'react';
import styles from './FilterChekbox.module.css'
import { ReactComponent as FilterCheckboxActive } from '../../images/FilterChekbox_active.svg';
import { ReactComponent as FilterCheckboxDisable } from '../../images/FilterChekbox_disable.svg';

function FilterChekbox({ onFilter, setOnFilter }) {

  function onFilterCheckbox (){
    setOnFilter(true)
  }

  function offFilterChekbox(){
    setOnFilter(false)
  }

  function toogleFilterChekbox(){
    !onFilter ? onFilterCheckbox() : offFilterChekbox()
  }

  return (
    <div className={styles.filterChekbox__container}>
      <button className={styles.chekbox} onClick={toogleFilterChekbox}>
        {!onFilter ? (<FilterCheckboxDisable />) : (<FilterCheckboxActive />)}
      </button>
      <p className={styles.text}>Короткометражки</p>
    </div>


  );
}

export default FilterChekbox;