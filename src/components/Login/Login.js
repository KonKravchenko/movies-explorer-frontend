import React, { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Login.module.css'

function Login({ setHeadHidden, setFootHidden, handleLogin, status, setStatus }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const errorText =

  status === 401 ? 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.' :
    status === 400 ? 'Вы ввели неправильный логин или пароль' :
      status === 500 ? 'На сервере произошла ошибка' : ''
  ;


  function handle(data) {
    handleLogin(data)
  }

  return (
    <div className={styles.login}>
      <AuthForm
        formValue={formValue}
        handle={handle}
        setHeadHidden={setHeadHidden}
        setFootHidden={setFootHidden}
        name='login'
        title='Рады видеть!'
        button='Войти'
        text='Ещё не зарегистрированы?'
        pathLink='/signup'
        pathText='Регистрация'
        style={styles.button}
        handleLogin={handleLogin}
        error={errorText}
      />

    </div>
  );
}

export default Login;