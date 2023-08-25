import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Register.module.css'

function Register({ setHeadHidden, setFootHidden }) {

  return (
    <div className={styles.register}>
      <AuthForm
        setHeadHidden={setHeadHidden}
        setFootHidden={setFootHidden}
        name='register'
        title='Добро пожаловать!'
        button='Зарегистрироваться'
        text='Уже зарегестрированы?'
        pathLink='/signin'
        pathText='Войти'
        style={styles.button}
      />

    </div>
  )
}

export default Register;