import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { ReactComponent as HeaderLogo } from '../../images/header_logo.svg';
import styles from './AuthForm.module.css';

function AuthForm({ setHeadHidden, setFootHidden , name, title, button, text, pathLink, pathText, style, handleLogin }) {

  const history = useNavigate();

  React.useEffect(() => {
    setHeadHidden(true)
    setFootHidden(true)
  })

  function onMain() {
    history('/')
  }

  function handleSubmit(event) {
    event.preventDefault();
    // if (!values.email || !values.password) {
    //   return;
    // }
    handleLogin();
  }

  return (
    <div className={styles.authForm}>
      <HeaderLogo onClick={onMain} className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit}>

        <h2 className={styles.title}>{`${title}`}</h2>

        <div className={styles.input__container}>


          {name === "register" && <label className={styles.label}>Имя</label>}
          {name === "register" && <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            autoComplete="off"
            required
            minLength="2"
            maxLength="30"
          ></input>}


          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            required
          ></input>


          <label className={styles.label}>Пароль</label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            required
          ></input>


          <p className={styles.error}>Здесь будет текст ошибки после отправки запроса</p>
        </div>

        <button 
        type="submit" 
        onSubmit={handleSubmit} 
        className={cx( styles.button, style)}>{`${button}`}</button>

        <nav className={styles.nav_container}>
          <p className={styles.nav_text}>{`${text}`}</p>
          <NavLink to={`${pathLink}`} className={styles.nav__link}>{`${pathText}`}</NavLink>
        </nav>

      </form>

    </div >
  );
}

export default AuthForm;