import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Login.module.css'

function Login({ setHeadHidden, setFootHidden, handleLogin }) {


  return (
    <div className={styles.login}>
      <AuthForm
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
      />

    </div>
  );
}

export default Login;