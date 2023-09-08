import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ReactComponent as HeaderLogo } from '../../images/header_logo.svg';
import styles from './AuthForm.module.css';

function AuthForm({
  handle,
  formValue,
  setHeadHidden,
  setFootHidden,
  name,
  title,
  button,
  text,
  pathLink,
  pathText,
  style,
  error
}) {

  const location = useLocation();
  const {
    values,
    handleChange,
    // errors,
    isValid,
    // resetForm,
  } = useFormAndValidation(formValue)


  const history = useNavigate();

  React.useEffect(() => {
    setHeadHidden(true)
    setFootHidden(true)
  })

  function onMain() {
    history('/')
  }

  function handleRegister(event) {
    if (!values.name || !values.email || !values.password) {
      return;
    }
    handle(values);
  }

  function handleLogin(event) {
    if (!values.email || !values.password) {
      return;
    }
    handle(values);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    name === "register" ? handleRegister() : handleLogin()
  }

  const buttonSubmitStyle = isValid ? cx(styles.button, style, styles.enable__button) : cx(styles.button, style, styles.disable__button)

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
            value={values.name}
            onChange={handleChange}
            noValidate
          ></input>}


          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            required
            noValidate
          ></input>


          <label className={styles.label}>Пароль</label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            required
            noValidate
          ></input>


          <p className={styles.error}>{error}</p>
        </div>
        {location.pathname === '/signup'
          ? <button
            type="submit"
            onSubmit={handleSubmit}
            className={buttonSubmitStyle}
            disabled={!(isValid && (values.name !== '' || values.email !== '' || values.password !== ''))}
          >{`${button}`}</button>
          : <button
            type="submit"
            onSubmit={handleSubmit}
            className={buttonSubmitStyle}
            disabled={!(isValid && (values.email !== '' || values.password !== ''))}
          >{`${button}`}</button>}
        <nav className={styles.nav_container}>
          <p className={styles.nav_text}>{`${text}`}</p>
          <NavLink to={`${pathLink}`} className={styles.nav__link}>{`${pathText}`}</NavLink>
        </nav>

      </form>

    </div >
  );
}

export default AuthForm;