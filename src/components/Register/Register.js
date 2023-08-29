import React, { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Register.module.css'

function Register({ handleRegister, setHeadHidden, setFootHidden }) {

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handle(data) {
    handleRegister(data)
  }

  return (
    <div className={styles.register}>
      <AuthForm
        formValue={formValue}
        handle={handle}
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