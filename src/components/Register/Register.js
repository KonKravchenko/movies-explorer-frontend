import React, { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Register.module.css'

function Register({ handleRegister, setHeadHidden, setFootHidden, status, setStatus }) {
  
  React.useEffect(()=>{
    setStatus('')
  },[])

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  const errorText =

  status === 409 ? 'Пользователь с таким email уже существует' :
    status === 400 ? 'При регистрации пользователя произошла ошибка' :
      status === 500 ? 'На сервере произошла ошибка' : ''
  ;

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
        error={errorText}
      />

    </div>
  )
}

export default Register;